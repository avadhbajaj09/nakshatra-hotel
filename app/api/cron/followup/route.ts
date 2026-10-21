import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendTemplate } from "@/lib/whatsapp";
import { getEnquiryTypeLabel } from "@/lib/phone-utils";

function isQuietHoursIST(): boolean {
  // IST is UTC+5:30
  const now = new Date();
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const istMinutes = (utcMinutes + 330) % (24 * 60);
  const istHour = Math.floor(istMinutes / 60);

  // Quiet hours: 10:00 PM (22:00) to 08:00 AM (08:00)
  return istHour >= 22 || istHour < 8;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || "nakshatra_cron_2026";

    // Validate cron secret either via Bearer header or ?key= param
    const isAuthorized =
      authHeader === `Bearer ${cronSecret}` ||
      searchParams.get("key") === cronSecret;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isQuietHoursIST()) {
      return NextResponse.json({
        ok: true,
        message: "Quiet hours in effect (10 PM - 8 AM IST). Follow-ups paused.",
      });
    }

    const supabase = getSupabaseAdmin();
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

    // Find leads created over 2 hours ago, still in 'new' status, notified <= 2 times
    const { data: unattendedLeads, error: queryErr } = await supabase
      .from("leads")
      .select("id, name, phone_e164, phone_digits, type, details, followup_count")
      .eq("status", "new")
      .lt("manager_notified_at", twoHoursAgo)
      .lt("followup_count", 2)
      .order("created_at", { ascending: true })
      .limit(10);

    if (queryErr) {
      console.error("[cron/followup] Query error:", queryErr);
      return NextResponse.json({ error: "Database query error" }, { status: 500 });
    }

    if (!unattendedLeads || unattendedLeads.length === 0) {
      return NextResponse.json({ ok: true, processed: 0, message: "No unattended leads found." });
    }

    const managerPhone = process.env.MANAGER_WHATSAPP_NUMBER || "918878933778";
    let sentCount = 0;

    for (const lead of unattendedLeads) {
      const typeLabel = getEnquiryTypeLabel(lead.type);
      const guestName = lead.name || "Guest";
      const details = lead.details || "Enquiry pending response";

      // Send reminder template to manager
      const reminderResult = await sendTemplate({
        to: managerPhone,
        templateName: "new_enquiry_manager",
        languageCode: "en_US",
        bodyParams: [
          `[Follow-up ⏳] ${guestName}`,
          lead.phone_e164 || lead.phone_digits,
          typeLabel,
          `Unattended for 2+ hours: ${details}`,
        ],
        buttonUrlParam: lead.phone_digits,
      });

      if (reminderResult.ok) {
        sentCount++;
        const nextCount = (lead.followup_count || 0) + 1;
        await supabase
          .from("leads")
          .update({
            followup_count: nextCount,
            followup_sent_at: new Date().toISOString(),
          })
          .eq("id", lead.id);

        await supabase.from("message_log").insert({
          lead_id: lead.id,
          recipient_phone: managerPhone,
          template: "new_enquiry_manager (follow-up)",
          status: "sent",
        });
      } else {
        console.error(`[cron/followup] Failed to send reminder for lead ${lead.id}:`, reminderResult.error);
        await supabase.from("message_log").insert({
          lead_id: lead.id,
          recipient_phone: managerPhone,
          template: "new_enquiry_manager (follow-up)",
          status: "failed",
          error: reminderResult.error,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      processed: unattendedLeads.length,
      sent: sentCount,
    });
  } catch (err: unknown) {
    console.error("[cron/followup] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
