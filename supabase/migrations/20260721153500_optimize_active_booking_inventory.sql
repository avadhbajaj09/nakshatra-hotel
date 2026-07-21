create index if not exists bookings_active_room_dates_idx
  on public.bookings (room_slug, check_in, check_out)
  where status <> 'cancelled';
