import { ensureHotelDatabase, jsonError } from "@/lib/hotel-db";

type AdminAction =
  | "save-room"
  | "save-meal"
  | "save-availability"
  | "delete-availability"
  | "booking-status"
  | "enquiry-status";

export async function GET(request: Request) {
  try {
    const db = await ensureHotelDatabase();
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode");
    const [rooms, meals] = await Promise.all([
      db.prepare("SELECT * FROM room_categories ORDER BY sort_order, id").all(),
      db.prepare("SELECT * FROM meal_options ORDER BY id").all(),
    ]);

    if (mode === "public") {
      const checkIn = url.searchParams.get("in") || "";
      const checkOut = url.searchParams.get("out") || checkIn;
      const inventory = checkIn
        ? await db.prepare(
          `SELECT room_slug, MIN(available_rooms) AS available_rooms,
                  MAX(price_override) AS price_override
           FROM availability
           WHERE date >= ? AND date < ?
           GROUP BY room_slug`
        ).bind(checkIn, checkOut || checkIn).all()
        : { results: [] };
      return Response.json({ rooms: rooms.results, meals: meals.results, availability: inventory.results });
    }

    const [bookings, availability, enquiries] = await Promise.all([
      db.prepare("SELECT * FROM bookings ORDER BY created_at DESC, id DESC LIMIT 500").all(),
      db.prepare("SELECT * FROM availability ORDER BY date DESC, room_slug LIMIT 500").all(),
      db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 500").all(),
    ]);
    return Response.json({ rooms: rooms.results, meals: meals.results, bookings: bookings.results, availability: availability.results, enquiries: enquiries.results });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const db = await ensureHotelDatabase();
    const body = await request.json() as Record<string, string | number | boolean | null> & { action?: AdminAction };

    if (body.action === "save-room") {
      await db.prepare(
        `UPDATE room_categories SET name = ?, description = ?, base_price = ?, total_rooms = ?,
          max_guests = ?, active = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?`
      ).bind(String(body.name), String(body.description || ""), Number(body.basePrice), Number(body.totalRooms), Number(body.maxGuests), body.active ? 1 : 0, String(body.slug)).run();
    } else if (body.action === "save-meal") {
      await db.prepare(
        `UPDATE meal_options SET name = ?, price_per_guest = ?, description = ?, active = ?,
          updated_at = CURRENT_TIMESTAMP WHERE slug = ?`
      ).bind(String(body.name), Number(body.pricePerGuest), String(body.description || ""), body.active ? 1 : 0, String(body.slug)).run();
    } else if (body.action === "save-availability") {
      await db.prepare(
        `INSERT INTO availability (room_slug, date, available_rooms, price_override, note)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(room_slug, date) DO UPDATE SET available_rooms = excluded.available_rooms,
           price_override = excluded.price_override, note = excluded.note, updated_at = CURRENT_TIMESTAMP`
      ).bind(String(body.roomSlug), String(body.date), Number(body.availableRooms), body.priceOverride === null || body.priceOverride === "" ? null : Number(body.priceOverride), String(body.note || "")).run();
    } else if (body.action === "delete-availability") {
      await db.prepare("DELETE FROM availability WHERE id = ?").bind(Number(body.id)).run();
    } else if (body.action === "booking-status") {
      await db.prepare("UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(String(body.status), Number(body.id)).run();
    } else if (body.action === "enquiry-status") {
      await db.prepare("UPDATE enquiries SET status = ? WHERE id = ?").bind(String(body.status), Number(body.id)).run();
    } else {
      return Response.json({ error: "Unknown action" }, { status: 400 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error);
  }
}
