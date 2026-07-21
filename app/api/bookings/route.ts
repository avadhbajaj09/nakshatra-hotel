import { getSupabaseAdmin, jsonError, throwIfSupabaseError } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string | number>;
    const required = ["reference", "roomSlug", "roomName", "guestName", "phone", "checkIn", "checkOut", "guests"];
    if (required.some((key) => !String(body[key] ?? "").trim())) {
      return Response.json({ error: "Please complete all required booking details." }, { status: 400 });
    }
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("bookings").insert({
      reference: String(body.reference), source: String(body.source || "Website Direct"), room_slug: String(body.roomSlug), room_name: String(body.roomName), guest_name: String(body.guestName), phone: String(body.phone), email: String(body.email || ""), check_in: String(body.checkIn), check_out: String(body.checkOut), guests: Number(body.guests), meal_plan: String(body.mealPlan || "Room only"), total: Number(body.total || 0), arrival: String(body.arrival || ""), requests: String(body.requests || ""), payment_method: "Pay at hotel",
    });
    throwIfSupabaseError(error);
    return Response.json({ ok: true, reference: body.reference }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
