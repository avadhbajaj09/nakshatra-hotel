import { getSupabaseAdmin, jsonError, throwIfSupabaseError } from "@/lib/supabase-admin";
import { bookedRoomsOnDate, calculateStayAvailability, stayDates } from "@/lib/room-availability";

type AdminAction =
  | "save-room"
  | "save-meal"
  | "save-availability"
  | "delete-availability"
  | "booking-status"
  | "enquiry-status"
  | "save-room-images";

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
      const dates = stayDates(checkIn, checkOut);
      const [inventoryResult, occupancyResult] = dates.length ? await Promise.all([
        supabase.from("availability").select("room_slug, date, available_rooms, price_override").gte("date", checkIn).lt("date", checkOut),
        supabase.from("bookings").select("room_slug, check_in, check_out, status").neq("status", "cancelled").lt("check_in", checkOut).gt("check_out", checkIn),
      ]) : [{ data: [], error: null }, { data: [], error: null }];
      throwIfSupabaseError(inventoryResult.error);
      throwIfSupabaseError(occupancyResult.error);
      const inventory = dates.length ? rooms.map((room) => calculateStayAvailability(room, inventoryResult.data || [], occupancyResult.data || [], checkIn, checkOut)) : [];
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
    const availabilityRules = availabilityResult.data || [];
    const firstRuleDate = availabilityRules.reduce((first, item) => !first || item.date < first ? item.date : first, "");
    const lastRuleDate = availabilityRules.reduce((last, item) => !last || item.date > last ? item.date : last, "");
    const occupancyResult = availabilityRules.length
      ? await supabase.from("bookings").select("room_slug, check_in, check_out, status").neq("status", "cancelled").lte("check_in", lastRuleDate).gt("check_out", firstRuleDate)
      : { data: [], error: null };
    throwIfSupabaseError(occupancyResult.error);
    const availability = availabilityRules.map((rule) => {
      const bookedRooms = bookedRoomsOnDate(occupancyResult.data || [], rule.room_slug, rule.date);
      const categoryCapacity = rooms.find((room) => room.slug === rule.room_slug)?.total_rooms ?? rule.available_rooms;
      const inventoryRooms = Math.min(rule.available_rooms, categoryCapacity);
      return { ...rule, inventory_rooms: inventoryRooms, booked_rooms: bookedRooms, available_rooms: Math.max(0, inventoryRooms - bookedRooms) };
    });
    return Response.json({ rooms, meals, bookings: bookingsResult.data || [], availability, enquiries: enquiriesResult.data || [] });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json() as Record<string, string | number | boolean | string[] | null> & { action?: AdminAction };
    let error: { message: string } | null = null;

    if (body.action === "save-room") {
      ({ error } = await supabase.from("room_categories").update({ name: String(body.name), description: String(body.description || ""), base_price: Number(body.basePrice), total_rooms: Number(body.totalRooms), max_guests: Number(body.maxGuests), active: Boolean(body.active), updated_at: new Date().toISOString() }).eq("slug", String(body.slug)));
    } else if (body.action === "save-room-images") {
      const gallery = Array.isArray(body.galleryImageUrls) ? body.galleryImageUrls.filter((item): item is string => typeof item === "string" && item.length > 0).slice(0, 12) : [];
      ({ error } = await supabase.from("room_categories").update({ featured_image_url: String(body.featuredImageUrl || ""), gallery_image_urls: gallery, updated_at: new Date().toISOString() }).eq("slug", String(body.slug)));
    } else if (body.action === "save-meal") {
      ({ error } = await supabase.from("meal_options").update({ name: String(body.name), price_per_guest: Number(body.pricePerGuest), description: String(body.description || ""), active: Boolean(body.active), updated_at: new Date().toISOString() }).eq("slug", String(body.slug)));
    } else if (body.action === "save-availability") {
      const requestedInventory = Number(body.availableRooms);
      const roomResult = await supabase.from("room_categories").select("total_rooms").eq("slug", String(body.roomSlug)).maybeSingle();
      throwIfSupabaseError(roomResult.error);
      if (!roomResult.data) return Response.json({ error: "Room category not found." }, { status: 404 });
      if (!Number.isInteger(requestedInventory) || requestedInventory < 0 || requestedInventory > roomResult.data.total_rooms) {
        return Response.json({ error: `Inventory must be between 0 and ${roomResult.data.total_rooms} rooms for this category.` }, { status: 400 });
      }
      ({ error } = await supabase.from("availability").upsert({ room_slug: String(body.roomSlug), date: String(body.date), available_rooms: requestedInventory, price_override: body.priceOverride === null || body.priceOverride === "" ? null : Number(body.priceOverride), note: String(body.note || ""), updated_at: new Date().toISOString() }, { onConflict: "room_slug,date" }));
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
