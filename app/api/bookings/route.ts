import { ensureHotelDatabase, jsonError } from "@/lib/hotel-db";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string | number>;
    const required = ["reference", "roomSlug", "roomName", "guestName", "phone", "checkIn", "checkOut", "guests"];
    if (required.some((key) => !String(body[key] ?? "").trim())) {
      return Response.json({ error: "Please complete all required booking details." }, { status: 400 });
    }
    const db = await ensureHotelDatabase();
    await db.prepare(
      `INSERT INTO bookings
        (reference, source, room_slug, room_name, guest_name, phone, email, check_in, check_out,
         guests, meal_plan, total, arrival, requests, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      body.reference, body.source || "Website", body.roomSlug, body.roomName, body.guestName,
      body.phone, body.email || "", body.checkIn, body.checkOut, Number(body.guests),
      body.mealPlan || "Room only", Number(body.total || 0), body.arrival || "",
      body.requests || "", "Pay at hotel"
    ).run();
    return Response.json({ ok: true, reference: body.reference }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
