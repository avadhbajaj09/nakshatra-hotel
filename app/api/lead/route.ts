import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { normalizePhone, buildDetailsLine, getEnquiryTypeLabel } from "@/lib/phone-utils";
import { sendTemplate } from "@/lib/whatsapp";

// Rate limiting: IP -> submissions timestamps
const ipSubmissions = new Map<string, number[]>();

const LeadSchema = z.object({
  sessionId: z.string().min(1),
  type: z.enum(["room", "restaurant", "banquet", "celebration", "question", "other"]).default("other"),
  answers: z.record(z.string(), z.any()).default({}),
  name: z.string().optional(),
  phone: z.string().optional(),
  pageUrl: z.string().optional(),
  honeypot: z.string().optional(),
  partial: z.boolean().optional(),
  marketingOptIn: z.boolean().optional(),
});

async function sendBackupEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.MANAGER_EMAIL || "nakshtraweddings@gmail.com";
  const fromEmail = process.env.RESEND_FROM || "Nakshatra Hotel <enquiries@nakshatrahotel.in>";

  if (!apiKey || apiKey.startsWith("re_placeholder")) {
    console.log(`[resend] Email backup skipped (placeholder key): To ${toEmail} | Subject: ${subject}`);
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html,
      }),
    });
  } catch (err) {
    console.error("[resend] Email sending error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = LeadSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 400 });
    }

    const { sessionId, type, answers, name, phone, pageUrl, honeypot, partial, marketingOptIn } = parsed.data;

    // Honeypot check
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true, message: "Accepted" }); // silent discard
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const now = Date.now();

    // Rate limiting: max 5 per hour per IP
    const hourMs = 60 * 60 * 1000;
    const timestamps = (ipSubmissions.get(ip) || []).filter((t) => now - t < hourMs);
    if (timestamps.length >= 5) {
      return NextResponse.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
    }

    const supabase = getSupabaseAdmin();

    // Partial lead case (visitor leaves before entering phone)
    if (partial || !phone) {
      const details = buildDetailsLine(type, answers);
      const { data: leadRow, error: leadErr } = await supabase
        .from("leads")
        .upsert(
          {
            session_id: sessionId,
            type,
            name: name ? name.trim().slice(0, 100) : null,
            answers,
            details,
            status: "partial",
            page_url: pageUrl ? pageUrl.slice(0, 500) : null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "session_id" }
        )
        .select("id")
        .single();

      if (leadErr) {
        console.error("[api/lead] Error upserting partial lead:", leadErr);
      }
      return NextResponse.json({ ok: true, leadId: leadRow?.id, partial: true });
    }

    // Full lead case: validate phone
    const normalized = normalizePhone(phone);
    if (!normalized) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit WhatsApp number." },
        { status: 400 }
      );
    }

    const { e164: phone_e164, digits: phone_digits } = normalized;
    const sanitizedName = (name || "Guest").trim().slice(0, 100);
    const details = buildDetailsLine(type, answers);

    // Dedup check: Same phone within last 30 mins
    const thirtyMinsAgo = new Date(now - 30 * 60 * 1000).toISOString();
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id, manager_notified_at")
      .eq("phone_digits", phone_digits)
      .gte("created_at", thirtyMinsAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let leadId: string;
    let shouldNotifyManager = true;

    if (existingLead) {
      // Update existing lead without duplicate manager notification
      leadId = existingLead.id;
      shouldNotifyManager = !existingLead.manager_notified_at;
      await supabase
        .from("leads")
        .update({
          name: sanitizedName,
          type,
          answers,
          details,
          updated_at: new Date().toISOString(),
        })
        .eq("id", leadId);
    } else {
      // Create new lead (or upsert on sessionId)
      const { data: newLead, error: insertErr } = await supabase
        .from("leads")
        .upsert(
          {
            session_id: sessionId,
            type,
            name: sanitizedName,
            phone_e164,
            phone_digits,
            answers,
            details,
            status: "new",
            source: "website",
            page_url: pageUrl ? pageUrl.slice(0, 500) : null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "session_id" }
        )
        .select("id")
        .single();

      if (insertErr || !newLead) {
        console.error("[api/lead] Error inserting lead:", insertErr);
        return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
      }
      leadId = newLead.id;
      timestamps.push(now);
      ipSubmissions.set(ip, timestamps);
    }

    // Step 6: Notify Manager via WhatsApp
    const managerPhone = process.env.MANAGER_WHATSAPP_NUMBER || "918878933778";
    const typeLabel = getEnquiryTypeLabel(type);

    if (shouldNotifyManager) {
      const managerResult = await sendTemplate({
        to: managerPhone,
        templateName: "new_enquiry_manager",
        languageCode: "en_US",
        bodyParams: [
          sanitizedName,
          phone_e164,
          typeLabel,
          details,
        ],
        buttonUrlParam: phone_digits,
      });

      if (managerResult.ok) {
        await supabase
          .from("leads")
          .update({ manager_notified_at: new Date().toISOString() })
          .eq("id", leadId);
      } else {
        console.error("[api/lead] Manager notification failed:", managerResult.error);
        await supabase
          .from("leads")
          .update({ status: "notify_failed" })
          .eq("id", leadId);

        // Send Resend email fallback
        await sendBackupEmail(
          `[ACTION REQUIRED] WhatsApp Failed: New Enquiry from ${sanitizedName}`,
          `<h2>New Website Enquiry (WhatsApp Failed)</h2>
           <p><strong>Guest Name:</strong> ${sanitizedName}</p>
           <p><strong>Phone:</strong> <a href="https://wa.me/${phone_digits}">${phone_e164}</a></p>
           <p><strong>Enquiry Type:</strong> ${typeLabel}</p>
           <p><strong>Details:</strong> ${details}</p>
           <p><strong>Error:</strong> ${managerResult.error || "Delivery failure"}</p>`
        );
      }
    }

    // Step 7: Send Guest Acknowledgment (Template: enquiry_ack_client)
    const firstName = sanitizedName.split(" ")[0] || "Guest";
    const guestResult = await sendTemplate({
      to: phone_e164,
      templateName: "enquiry_ack_client",
      languageCode: "en_US",
      bodyParams: [
        firstName,
        typeLabel.toLowerCase(),
      ],
    });

    if (guestResult.ok) {
      await supabase
        .from("leads")
        .update({ guest_ack_sent_at: new Date().toISOString() })
        .eq("id", leadId);
    }

    // Step 8: Always send an email backup copy to manager
    await sendBackupEmail(
      `New Website Lead: ${sanitizedName} (${typeLabel})`,
      `<h2>New Website Enquiry Received</h2>
       <p><strong>Guest Name:</strong> ${sanitizedName}</p>
       <p><strong>Phone:</strong> <a href="https://wa.me/${phone_digits}">${phone_e164}</a></p>
       <p><strong>Type:</strong> ${typeLabel}</p>
       <p><strong>Details:</strong> ${details}</p>
       <p><strong>Marketing Consent:</strong> ${marketingOptIn ? "Yes" : "No"}</p>
       <p><a href="https://www.nakshatrahotel.in/admin/leads">View in Hotel Admin Panel</a></p>`
    );

    return NextResponse.json({
      ok: true,
      leadId,
      message: "Enquiry submitted successfully",
    });
  } catch (err: unknown) {
    console.error("[api/lead] Uncaught error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
