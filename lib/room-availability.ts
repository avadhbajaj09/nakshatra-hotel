export type InventoryRoom = {
  slug: string;
  total_rooms: number;
};

export type AvailabilityRule = {
  room_slug: string;
  date: string;
  available_rooms: number;
  price_override: number | null;
};

export type OccupancyBooking = {
  room_slug: string;
  check_in: string;
  check_out: string;
  status: string;
};

export function stayDates(checkIn: string, checkOut: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut) || checkOut <= checkIn) return [];
  const dates: string[] = [];
  const cursor = new Date(`${checkIn}T00:00:00Z`);
  const end = new Date(`${checkOut}T00:00:00Z`);
  while (cursor < end && dates.length < 366) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

export function bookedRoomsOnDate(bookings: OccupancyBooking[], roomSlug: string, date: string) {
  return bookings.filter((booking) => booking.room_slug === roomSlug && booking.status !== "cancelled" && booking.check_in <= date && booking.check_out > date).length;
}

export function calculateStayAvailability(room: InventoryRoom, rules: AvailabilityRule[], bookings: OccupancyBooking[], checkIn: string, checkOut: string) {
  const dates = stayDates(checkIn, checkOut);
  if (!dates.length) return { room_slug: room.slug, available_rooms: room.total_rooms, booked_rooms: 0, price_override: null as number | null };

  let availableRooms = room.total_rooms;
  let bookedRooms = 0;
  let priceOverride: number | null = null;
  for (const date of dates) {
    const rule = rules.find((item) => item.room_slug === room.slug && item.date === date);
    const booked = bookedRoomsOnDate(bookings, room.slug, date);
    availableRooms = Math.min(availableRooms, Math.max(0, (rule?.available_rooms ?? room.total_rooms) - booked));
    bookedRooms = Math.max(bookedRooms, booked);
    if (rule?.price_override) priceOverride = Math.max(priceOverride ?? 0, rule.price_override);
  }
  return { room_slug: room.slug, available_rooms: availableRooms, booked_rooms: bookedRooms, price_override: priceOverride };
}
