import { getSupabaseAdmin, jsonError, throwIfSupabaseError } from "@/lib/supabase-admin";

type AdminAction =
  | "save-room"
  | "save-meal"
  | "save-availability"
  | "delete-availability"
  | "booking-status"
  | "enquiry-status";

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode");
    const [roomsResult, mealsResult] = await Promise.all([
      supabase.from("room_categories").select("*").order("sort_order").order("id"),
      supabase.from("meal_options").select("*").order("id"),
    ]);
    throwIfSupabaseError(roomsResult.error);
    throwIfSupabaseError(mealsResult.error);
    const rooms = roomsResult.data || [];
    const meals = mealsResult.data || [];

    if (mode === "public") {
      const checkIn = url.searchParams.get("in") || "";
      const checkOut = url.searchParams.get("out") || checkIn;
      const inventoryResult = checkIn
        ? await supabase.from("availability").select("room_slug, available_rooms, price_override").gte("date", checkIn).lt("date", checkOut || checkIn)
        : { data: [], error: null };
      throwIfSupabaseError(inventoryResult.error);
      const inventory = Array.from((inventoryResult.data || []).reduce((map, item) => {
        const current = map.get(item.room_slug);
        map.set(item.room_slug, { room_slug: item.room_slug, available_rooms: Math.min(current?.available_rooms ?? Number.MAX_SAFE_INTEGER, item.available_rooms), price_override: Math.max(current?.price_override ?? 0, item.price_override ?? 0) || null });
        return map;
      }, new Map<string, { room_slug: string; available_rooms: number; price_override: number | null }>()).values());
      return Response.json({ rooms, meals, availability: inventory });
    }

    const [bookingsResult, availabilityResult, enquiriesResult] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }).order("id", { ascending: false }).limit(500),
      supabase.from("availability").select("*").order("date", { ascending: false }).order("room_slug").limit(500),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }).order("id", { ascending: false }).limit(500),
    ]);
    throwIfSupabaseError(bookingsResult.error);
    throwIfSupabaseError(availabilityResult.error);
    throwIfSupabaseError(enquiriesResult.error);
    return Response.json({ rooms, meals, bookings: bookingsResult.data || [], availability: availabilityResult.data || [], enquiries: enquiriesResult.data || [] });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json() as Record<string, string | number | boolean | null> & { action?: AdminAction };
    let error: { message: string } | null = null;

    if (body.action === "save-room") {
      ({ error } = await supabase.from("room_categories").update({ name: String(body.name), description: String(body.description || ""), base_price: Number(body.basePrice), total_rooms: Number(body.totalRooms), max_guests: Number(body.maxGuests), active: Boolean(body.active), updated_at: new Date().toISOString() }).eq("slug", String(body.slug)));
    } else if (body.action === "save-meal") {
      ({ error } = await supabase.from("meal_options").update({ name: String(body.name), price_per_guest: Number(body.pricePerGuest), description: String(body.description || ""), active: Boolean(body.active), updated_at: new Date().toISOString() }).eq("slug", String(body.slug)));
    } else if (body.action === "save-availability") {
      ({ error } = await supabase.from("availability").upsert({ room_slug: String(body.roomSlug), date: String(body.date), available_rooms: Number(body.availableRooms), price_override: body.priceOverride === null || body.priceOverride === "" ? null : Number(body.priceOverride), note: String(body.note || ""), updated_at: new Date().toISOString() }, { onConflict: "room_slug,date" }));
    } else if (body.action === "delete-availability") {
      ({ error } = await supabase.from("availability").delete().eq("id", Number(body.id)));
    } else if (body.action === "booking-status") {
      ({ error } = await supabase.from("bookings").update({ status: String(body.status), updated_at: new Date().toISOString() }).eq("id", Number(body.id)));
    } else if (body.action === "enquiry-status") {
      ({ error } = await supabase.from("enquiries").update({ status: String(body.status) }).eq("id", Number(body.id)));
    } else {
      return Response.json({ error: "Unknown action" }, { status: 400 });
    }
    throwIfSupabaseError(error);
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error);
  }
}
