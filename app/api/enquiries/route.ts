import { ensureHotelDatabase, jsonError } from "@/lib/hotel-db";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string>;
    if (!body.name?.trim() || !body.phone?.trim()) {
      return Response.json({ error: "Name and phone number are required." }, { status: 400 });
    }
    const db = await ensureHotelDatabase();
    await db.prepare(
      `INSERT INTO enquiries (type, name, phone, email, preferred_date, message, source)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(body.type || "general", body.name, body.phone, body.email || "", body.preferredDate || "", body.message || "", body.source || "Website").run();
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
