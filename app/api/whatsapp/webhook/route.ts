import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { normalizePhone } from "@/lib/phone-utils";

/**
 * Inbound WhatsApp Webhook Endpoint for Nakshatra Hotel & Resort
 * Handles webhook verification (GET) and incoming guest events/replies (POST).
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "nakshatra_waba_verify_2026";

  if (mode === "subscribe" && token === expectedToken) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: true });
    }

    const supabase = getSupabaseAdmin();
    const entries = body.entry || [];

    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        const val = change.value;
        if (!val) continue;

        // Check if there are incoming messages
        const messages = val.messages || [];
        for (const msg of messages) {
          const from = msg.from; // e.g. "919425088369"
          const normalized = normalizePhone(from);
          const digits = normalized?.digits || from;

          // Message content can be text, button_reply, interactive, etc.
          let text = "";
          if (msg.type === "text" && msg.text?.body) {
            text = msg.text.body.trim();
          } else if (msg.type === "button" && msg.button?.text) {
            text = msg.button.text.trim();
          } else if (msg.type === "interactive") {
            text =
              msg.interactive?.button_reply?.title ||
              msg.interactive?.list_reply?.title ||
              "";
          }

          const lowerText = text.toLowerCase();

          // 1. Opt-out handling ("STOP", "UNSUBSCRIBE", "STOP UPDATES")
          if (
            lowerText === "stop" ||
            lowerText === "unsubscribe" ||
            lowerText === "stop updates" ||
            lowerText === "opt out"
          ) {
            await supabase
              .from("bookings")
              .update({ opted_out: true, updated_at: new Date().toISOString() })
              .or(`phone_digits.eq.${digits},phone_e164.eq.+${digits}`);

            await supabase.from("message_log").insert({
              recipient_phone: digits,
              template: "inbound (opt_out)",
              status: "received",
              error: `Guest requested opt-out with text: "${text}"`,
            });
            continue;
          }

          // 2. Feedback ratings handling ("Excellent", "Good", "Needs improvement")
          if (
            lowerText.includes("excellent") ||
            lowerText.includes("good") ||
            lowerText.includes("improvement") ||
            lowerText.includes("average") ||
            lowerText.includes("poor")
          ) {
            // Find most recent active/checked-out booking for this phone
            const { data: latestBooking } = await supabase
              .from("bookings")
              .select("id")
              .or(`phone_digits.eq.${digits},phone_e164.eq.+${digits}`)
              .order("created_at", { ascending: false })
              .limit(1)
              .maybeSingle();

            if (latestBooking) {
              await supabase
                .from("bookings")
                .update({
                  feedback_rating: text.slice(0, 50),
                  updated_at: new Date().toISOString(),
                })
                .eq("id", latestBooking.id);

              await supabase.from("message_log").insert({
                booking_id: latestBooking.id,
                recipient_phone: digits,
                template: "inbound (feedback_rating)",
                status: "received",
                error: `Feedback rating saved: "${text}"`,
              });
            }
            continue;
          }

          // General inbound message log
          await supabase.from("message_log").insert({
            recipient_phone: digits,
            template: "inbound (general)",
            status: "received",
            error: text ? `Text: "${text.slice(0, 200)}"` : `Type: ${msg.type}`,
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[whatsapp/webhook] Error handling incoming webhook:", err);
    return NextResponse.json({ ok: true }); // Always 200 to acknowledge Meta
  }
}
