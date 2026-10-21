import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";
import { normalizePhone } from "@/lib/phone-utils";
import { sendTemplate } from "@/lib/whatsapp";

export async function GET(req: Request) {
  try {
    const supabaseUser = await createClient();
    const {
      data: { user },
    } = await supabaseUser.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q")?.trim();

    const supabase = getSupabaseAdmin();
    let query = supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (q) {
      query = query.or(`guest_name.ilike.%${q}%,phone_digits.ilike.%${q}%,reference.ilike.%${q}%,room_name.ilike.%${q}%`);
    }

    const { data, error } = await query.limit(100);

    if (error) {
      console.error("[api/admin/bookings] GET Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ bookings: data || [] });
  } catch (err: unknown) {
    console.error("[api/admin/bookings] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabaseUser = await createClient();
    const {
      data: { user },
    } = await supabaseUser.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.guest_name || !body.phone || !body.check_in_date || !body.check_out_date) {
      return NextResponse.json(
        { error: "Guest name, phone, check-in date, and check-out date are required." },
        { status: 400 }
      );
    }

    const normalized = normalizePhone(body.phone);
    if (!normalized) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit WhatsApp number." },
        { status: 400 }
      );
    }

    const { e164: phone_e164, digits: phone_digits } = normalized;
    const reference = "NAK-" + Math.floor(100000 + Math.random() * 900000);
    const supabase = getSupabaseAdmin();

    const bookingPayload = {
      lead_id: body.lead_id || null,
      guest_name: String(body.guest_name).trim(),
      phone_e164,
      phone_digits,
      type: body.type || "room",
      check_in_date: body.check_in_date,
      check_out_date: body.check_out_date,
      details: body.details || `Stay from ${body.check_in_date} to ${body.check_out_date}`,
      room_name: body.room_name || "Executive Room",
      room_slug: body.room_slug || "executive-room",
      guests: Number(body.guests) || 2,
      total: Number(body.total) || 0,
      requests: body.requests || "",
      status: "confirmed",
      marketing_opt_in: body.marketing_opt_in !== false,
      opted_out: false,
      reference,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newBooking, error: insertErr } = await supabase
      .from("bookings")
      .insert(bookingPayload)
      .select("*")
      .single();

    if (insertErr || !newBooking) {
      console.error("[api/admin/bookings] Insert Error:", insertErr);
      return NextResponse.json({ error: insertErr?.message || "Failed to create booking" }, { status: 500 });
    }

    // If linked from a lead, mark lead as contacted
    if (body.lead_id) {
      await supabase
        .from("leads")
        .update({ status: "contacted", updated_at: new Date().toISOString() })
        .eq("id", body.lead_id);
    }

    // Send WhatsApp confirmation to guest if requested (default true)
    let whatsappSent = false;
    if (body.sendConfirmation !== false) {
      const templateRes = await sendTemplate({
        to: phone_e164,
        templateName: "booking_confirmation_guest",
        languageCode: "en_US",
        bodyParams: [
          bookingPayload.guest_name,
          bookingPayload.room_name,
          bookingPayload.check_in_date,
          `Reference: ${reference} (${bookingPayload.guests} guests)`,
        ],
      });

      if (templateRes.ok) {
        whatsappSent = true;
        await supabase
          .from("bookings")
          .update({ confirmation_sent_at: new Date().toISOString() })
          .eq("id", newBooking.id);

        await supabase.from("message_log").insert({
          booking_id: newBooking.id,
          recipient_phone: phone_e164,
          template: "booking_confirmation_guest",
          status: "sent",
        });
      } else {
        console.error("[api/admin/bookings] WhatsApp confirmation failed:", templateRes.error);
        await supabase.from("message_log").insert({
          booking_id: newBooking.id,
          recipient_phone: phone_e164,
          template: "booking_confirmation_guest",
          status: "failed",
          error: templateRes.error,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      booking: newBooking,
      whatsappSent,
      reference,
    });
  } catch (err: unknown) {
    console.error("[api/admin/bookings] POST Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const supabaseUser = await createClient();
    const {
      data: { user },
    } = await supabaseUser.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.id) {
      return NextResponse.json({ error: "Booking ID is required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Action 1: Resend WhatsApp Confirmation
    if (body.action === "resend-confirmation") {
      const { data: b } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", body.id)
        .single();

      if (!b) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }

      const phone = b.phone_e164 || b.phone_digits;
      const templateRes = await sendTemplate({
        to: phone,
        templateName: "booking_confirmation_guest",
        languageCode: "en_US",
        bodyParams: [
          b.guest_name,
          b.room_name || "Stay",
          b.check_in_date,
          `Reference: ${b.reference || "NAK-STAY"}`,
        ],
      });

      if (templateRes.ok) {
        await supabase
          .from("bookings")
          .update({ confirmation_sent_at: new Date().toISOString() })
          .eq("id", b.id);

        await supabase.from("message_log").insert({
          booking_id: b.id,
          recipient_phone: phone,
          template: "booking_confirmation_guest (resend)",
          status: "sent",
        });

        return NextResponse.json({ ok: true, message: "Confirmation sent to guest on WhatsApp." });
      } else {
        return NextResponse.json({ error: templateRes.error || "Failed to send WhatsApp message" }, { status: 500 });
      }
    }

    // Action 2: Update status
    if (body.status) {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: body.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", body.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: unknown) {
    console.error("[api/admin/bookings] PATCH Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
