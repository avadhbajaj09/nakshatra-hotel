import { getSupabaseAdmin, jsonError, throwIfSupabaseError } from "@/lib/supabase-admin";
import { calculateStayAvailability, stayDates } from "@/lib/room-availability";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string | number>;
    const required = ["reference", "roomSlug", "roomName", "guestName", "phone", "checkIn", "checkOut", "guests"];
    if (required.some((key) => !String(body[key] ?? "").trim())) {
      return Response.json({ error: "Please complete all required booking details." }, { status: 400 });
    }
    const roomSlug = String(body.roomSlug);
    const checkIn = String(body.checkIn);
    const checkOut = String(body.checkOut);
    if (!stayDates(checkIn, checkOut).length) return Response.json({ error: "Choose valid check-in and check-out dates." }, { status: 400 });
    const supabase = getSupabaseAdmin();
    const [roomResult, rulesResult, occupancyResult] = await Promise.all([
      supabase.from("room_categories").select("slug, total_rooms, active").eq("slug", roomSlug).maybeSingle(),
      supabase.from("availability").select("room_slug, date, available_rooms, price_override").eq("room_slug", roomSlug).gte("date", checkIn).lt("date", checkOut),
      supabase.from("bookings").select("room_slug, check_in, check_out, status").eq("room_slug", roomSlug).neq("status", "cancelled").lt("check_in", checkOut).gt("check_out", checkIn),
    ]);
    throwIfSupabaseError(roomResult.error);
    throwIfSupabaseError(rulesResult.error);
    throwIfSupabaseError(occupancyResult.error);
    if (!roomResult.data || !roomResult.data.active) return Response.json({ error: "This room category is not available for booking." }, { status: 409 });
    const inventory = calculateStayAvailability(roomResult.data, rulesResult.data || [], occupancyResult.data || [], checkIn, checkOut);
    if (inventory.available_rooms < 1) return Response.json({ error: "This room is sold out for one or more selected nights. Please choose different dates or another room." }, { status: 409 });
    const { error } = await supabase.from("bookings").insert({
      reference: String(body.reference), source: String(body.source || "Website Direct"), room_slug: roomSlug, room_name: String(body.roomName), guest_name: String(body.guestName), phone: String(body.phone), email: String(body.email || ""), check_in: checkIn, check_out: checkOut, guests: Number(body.guests), meal_plan: String(body.mealPlan || "Room only"), total: Number(body.total || 0), arrival: String(body.arrival || ""), requests: String(body.requests || ""), payment_method: "Pay at hotel",
    });
    throwIfSupabaseError(error);
    return Response.json({ ok: true, reference: body.reference }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
