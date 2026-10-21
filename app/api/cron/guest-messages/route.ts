import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendTemplate } from "@/lib/whatsapp";
import { getFestivalToday } from "@/lib/festivals";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || "nakshatra_cron_2026";

    const isAuthorized =
      authHeader === `Bearer ${cronSecret}` ||
      searchParams.get("key") === cronSecret;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowStr = tomorrow.toISOString().slice(0, 10);

    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const results = {
      preArrivalSent: 0,
      reminderSent: 0,
      feedbackSent: 0,
      festivalsSent: 0,
    };

    // 1. Pre-Arrival Messages (Check-in is Tomorrow)
    const { data: preArrivalBookings } = await supabase
      .from("bookings")
      .select("id, guest_name, phone_e164, phone_digits, room_name, check_in_date")
      .eq("check_in_date", tomorrowStr)
      .is("pre_arrival_sent_at", null)
      .eq("opted_out", false)
      .eq("marketing_opt_in", true)
      .neq("status", "cancelled");

    if (preArrivalBookings && preArrivalBookings.length > 0) {
      for (const b of preArrivalBookings) {
        const phone = b.phone_e164 || b.phone_digits;
        if (!phone) continue;

        const res = await sendTemplate({
          to: phone,
          templateName: "pre_arrival_info_guest",
          languageCode: "en_US",
          bodyParams: [
            b.guest_name || "Guest",
            "12:00 PM",
          ],
        });

        if (res.ok) {
          results.preArrivalSent++;
          await supabase
            .from("bookings")
            .update({ pre_arrival_sent_at: new Date().toISOString() })
            .eq("id", b.id);

          await supabase.from("message_log").insert({
            booking_id: b.id,
            recipient_phone: phone,
            template: "pre_arrival_info_guest",
            status: "sent",
          });
        }
      }
    }

    // 2. Booking Reminder / Welcome Messages (Check-in is Today)
    const { data: todayBookings } = await supabase
      .from("bookings")
      .select("id, guest_name, phone_e164, phone_digits, room_name, check_in_date")
      .eq("check_in_date", todayStr)
      .is("welcome_sent_at", null)
      .eq("opted_out", false)
      .eq("marketing_opt_in", true)
      .neq("status", "cancelled");

    if (todayBookings && todayBookings.length > 0) {
      for (const b of todayBookings) {
        const phone = b.phone_e164 || b.phone_digits;
        if (!phone) continue;

        const res = await sendTemplate({
          to: phone,
          templateName: "booking_reminder_guest",
          languageCode: "en_US",
          bodyParams: [
            b.guest_name || "Guest",
            b.room_name || "stay",
            "today",
          ],
        });

        if (res.ok) {
          results.reminderSent++;
          await supabase
            .from("bookings")
            .update({ welcome_sent_at: new Date().toISOString() })
            .eq("id", b.id);

          await supabase.from("message_log").insert({
            booking_id: b.id,
            recipient_phone: phone,
            template: "booking_reminder_guest",
            status: "sent",
          });
        }
      }
    }

    // 3. Post-Stay Feedback Requests (Checked out Yesterday)
    const { data: checkoutBookings } = await supabase
      .from("bookings")
      .select("id, guest_name, phone_e164, phone_digits, room_name, check_out_date")
      .eq("check_out_date", yesterdayStr)
      .is("feedback_sent_at", null)
      .eq("opted_out", false)
      .eq("marketing_opt_in", true)
      .neq("status", "cancelled");

    if (checkoutBookings && checkoutBookings.length > 0) {
      for (const b of checkoutBookings) {
        const phone = b.phone_e164 || b.phone_digits;
        if (!phone) continue;

        // Try feedback template or fallback acknowledgment
        const res = await sendTemplate({
          to: phone,
          templateName: "feedback_request_guest",
          languageCode: "en_US",
          bodyParams: [],
        });

        if (res.ok) {
          results.feedbackSent++;
          await supabase
            .from("bookings")
            .update({ feedback_sent_at: new Date().toISOString() })
            .eq("id", b.id);

          await supabase.from("message_log").insert({
            booking_id: b.id,
            recipient_phone: phone,
            template: "feedback_request_guest",
            status: "sent",
          });
        }
      }
    }

    // 4. Festival Greetings
    const festival = getFestivalToday(todayStr);
    if (festival) {
      // Send greeting to recent guests opted in
      const { data: pastGuests } = await supabase
        .from("bookings")
        .select("id, guest_name, phone_e164, phone_digits")
        .eq("opted_out", false)
        .eq("marketing_opt_in", true)
        .neq("status", "cancelled")
        .limit(50);

      if (pastGuests && pastGuests.length > 0) {
        for (const guest of pastGuests) {
          const phone = guest.phone_e164 || guest.phone_digits;
          if (!phone) continue;

          // Send welcome/greeting template
          const res = await sendTemplate({
            to: phone,
            templateName: "welcome",
            languageCode: "en_US",
            bodyParams: [],
          });

          if (res.ok) {
            results.festivalsSent++;
            await supabase.from("message_log").insert({
              booking_id: guest.id,
              recipient_phone: phone,
              template: `welcome (${festival.name})`,
              status: "sent",
            });
          }
        }
      }
    }

    return NextResponse.json({
      ok: true,
      processedDate: todayStr,
      results,
    });
  } catch (err: unknown) {
    console.error("[cron/guest-messages] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
