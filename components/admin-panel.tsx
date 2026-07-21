"use client";

import { useEffect, useMemo, useState } from "react";
import { BedDouble, CalendarRange, Check, ChevronRight, ImagePlus, IndianRupee, LayoutDashboard, LoaderCircle, Mail, MessageSquareText, Phone, RefreshCw, Search, Settings2, Trash2, Upload, UtensilsCrossed, X } from "lucide-react";

type RoomRow = { id: number; slug: string; name: string; description: string; base_price: number; total_rooms: number; max_guests: number; active: boolean; featured_image_url: string; gallery_image_urls: string[] };
type MealRow = { id: number; slug: string; name: string; price_per_guest: number; description: string; active: boolean };
type BookingRow = { id: number; reference: string; status: string; source: string; room_slug: string; room_name: string; guest_name: string; phone: string; email: string; check_in: string; check_out: string; guests: number; meal_plan: string; total: number; arrival: string; requests: string; payment_method: string; created_at: string };
type AvailabilityRow = { id: number; room_slug: string; date: string; inventory_rooms: number; booked_rooms: number; available_rooms: number; price_override: number | null; note: string };
type EnquiryRow = { id: number; type: string; name: string; phone: string; email: string; preferred_date: string; message: string; status: string; source: string; created_at: string };
type AdminData = { rooms: RoomRow[]; meals: MealRow[]; bookings: BookingRow[]; availability: AvailabilityRow[]; enquiries: EnquiryRow[] };
type Tab = "dashboard" | "bookings" | "rooms" | "meals" | "availability" | "enquiries";

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarRange },
  { id: "rooms", label: "Rooms & pricing", icon: BedDouble },
  { id: "meals", label: "Meal pricing", icon: UtensilsCrossed },
  { id: "availability", label: "Availability", icon: Settings2 },
  { id: "enquiries", label: "Event enquiries", icon: MessageSquareText },
];
const bookingStatuses = ["new", "confirmed", "checked-in", "checked-out", "cancelled"];
const enquiryStatuses = ["new", "contacted", "converted", "closed"];

export function AdminPanel() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [openBooking, setOpenBooking] = useState<number | null>(null);

  async function load(signal?: AbortSignal) {
    try {
      setError("");
      const response = await fetch("/api/hotel", { signal, cache: "no-store" });
      const result = await response.json() as AdminData & { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not load hotel data.");
      setData(result);
    } catch (loadError) {
      if (loadError instanceof DOMException && loadError.name === "AbortError") return;
      setError(loadError instanceof Error ? loadError.message : "Could not load hotel data.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, []);

  async function update(payload: Record<string, string | number | boolean | string[] | null>, success: string) {
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/hotel", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "The change could not be saved.");
      await load();
      setNotice(success);
      window.setTimeout(() => setNotice(""), 2600);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "The change could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadRoomImages(room: RoomRow, kind: "featured" | "gallery", files: File[]) {
    if (!files.length) return;
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.set("roomSlug", room.slug);
      form.set("kind", kind);
      files.forEach((file) => form.append("files", file));
      const response = await fetch("/api/uploads", { method: "POST", body: form });
      const result = await response.json() as { urls?: string[]; error?: string };
      if (!response.ok || !result.urls?.length) throw new Error(result.error || "The images could not be uploaded.");
      await update({
        action: "save-room-images",
        slug: room.slug,
        featuredImageUrl: kind === "featured" ? result.urls[0] : room.featured_image_url,
        galleryImageUrls: kind === "gallery" ? [...room.gallery_image_urls, ...result.urls].slice(0, 12) : room.gallery_image_urls,
      }, kind === "featured" ? `${room.name} featured image updated.` : `${result.urls.length} gallery image${result.urls.length === 1 ? "" : "s"} added.`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "The images could not be uploaded.");
    } finally {
      setBusy(false);
    }
  }

  function saveRoomImages(room: RoomRow, featuredImageUrl: string, galleryImageUrls: string[], success: string) {
    return update({ action: "save-room-images", slug: room.slug, featuredImageUrl, galleryImageUrls }, success);
  }

  const filteredBookings = useMemo(() => {
    if (!data) return [];
    const term = query.trim().toLowerCase();
    return term ? data.bookings.filter((item) => [item.reference, item.guest_name, item.phone, item.room_name, item.source, item.status].some((value) => value.toLowerCase().includes(term))) : data.bookings;
  }, [data, query]);

  if (!data) return <main className="admin-loading"><LoaderCircle/><h1>Opening hotel control centre</h1><p>{error || "Loading rooms, prices and reservations…"}</p>{error && <button onClick={() => void load()}>Try again</button>}</main>;

  const totalRooms = data.rooms.filter((room) => room.active).reduce((sum, room) => sum + room.total_rooms, 0);
  const arriving = data.bookings.filter((booking) => booking.status !== "cancelled" && booking.check_in >= new Date().toISOString().slice(0, 10)).length;
  const newBookings = data.bookings.filter((booking) => booking.status === "new").length;
  const newEnquiries = data.enquiries.filter((enquiry) => enquiry.status === "new").length;

  return <main className="admin-page">
    <aside className="admin-sidebar">
      <div className="admin-brand"><span>✦</span><div><b>Nakshatra</b><small>HOTEL CONTROL CENTRE</small></div></div>
      <nav>{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)}><Icon/><span>{item.label}</span>{item.id === "bookings" && newBookings > 0 && <em>{newBookings}</em>}</button>; })}</nav>
      <div className="admin-open-access"><b>Open access</b><p>This admin has no password, as requested. Anyone with the link can manage hotel data.</p></div>
    </aside>

    <section className="admin-workspace">
      <header className="admin-topbar"><div><p>NAKSHATRA HOTEL &amp; RESORT</p><h1>{navItems.find((item) => item.id === tab)?.label}</h1></div><div><span className="admin-live"><i/> Live management</span><button className="admin-refresh" onClick={() => void load()} aria-label="Refresh data"><RefreshCw/></button></div></header>
      {notice && <div className="admin-notice"><Check/>{notice}</div>}
      {error && <div className="admin-error">{error}<button onClick={() => setError("")}>Dismiss</button></div>}

      {tab === "dashboard" && <>
        <section className="admin-stat-grid">
          <article><span><BedDouble/></span><div><small>ROOM INVENTORY</small><b>{totalRooms}</b><p>Across {data.rooms.filter((room) => room.active).length} categories</p></div></article>
          <article><span><CalendarRange/></span><div><small>UPCOMING BOOKINGS</small><b>{arriving}</b><p>{newBookings} waiting for confirmation</p></div></article>
          <article><span><IndianRupee/></span><div><small>BOOKING VALUE</small><b>₹{data.bookings.reduce((sum, item) => sum + item.total, 0).toLocaleString("en-IN")}</b><p>All website requests</p></div></article>
          <article><span><MessageSquareText/></span><div><small>NEW ENQUIRIES</small><b>{newEnquiries}</b><p>Events and general requests</p></div></article>
        </section>
        <section className="admin-two-column"><div className="admin-panel-card"><div className="admin-card-head"><div><small>LATEST ACTIVITY</small><h2>Recent bookings</h2></div><button onClick={() => setTab("bookings")}>View all <ChevronRight/></button></div>{data.bookings.slice(0, 5).map((booking) => <div className="admin-activity" key={booking.id}><span>{booking.guest_name.slice(0, 1).toUpperCase()}</span><div><b>{booking.guest_name}</b><p>{booking.room_name} · {booking.check_in}</p></div><em className={`status status-${booking.status}`}>{booking.status}</em><strong>₹{booking.total.toLocaleString("en-IN")}</strong></div>)}{data.bookings.length === 0 && <p className="admin-empty">New website bookings will appear here automatically.</p>}</div>
        <div className="admin-panel-card"><div className="admin-card-head"><div><small>INVENTORY SNAPSHOT</small><h2>Room categories</h2></div><button onClick={() => setTab("rooms")}>Manage <ChevronRight/></button></div>{data.rooms.map((room) => <div className="inventory-line" key={room.slug}><div><b>{room.name}</b><p>₹{room.base_price.toLocaleString("en-IN")} / night</p></div><span><strong>{room.total_rooms}</strong> rooms</span></div>)}</div></section>
      </>}

      {tab === "bookings" && <section className="admin-panel-card admin-full-card"><div className="admin-card-head bookings-head"><div><small>ALL RESERVATIONS</small><h2>Booking register</h2></div><label className="admin-search"><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guest, phone or reference"/></label></div><div className="booking-table-wrap"><table className="admin-table"><thead><tr><th>Reference / Guest</th><th>Stay</th><th>Room</th><th>Source</th><th>Total</th><th>Status</th><th/></tr></thead><tbody>{filteredBookings.map((booking) => <tr key={booking.id} className={openBooking === booking.id ? "expanded" : ""}><td><b>{booking.reference}</b><span>{booking.guest_name}</span></td><td><b>{booking.check_in}</b><span>to {booking.check_out} · {booking.guests} guests</span></td><td><b>{booking.room_name}</b><span>{booking.meal_plan}</span></td><td><span className="source-pill">{booking.source}</span></td><td><b>₹{booking.total.toLocaleString("en-IN")}</b><span>{booking.payment_method}</span></td><td><select value={booking.status} onChange={(event) => void update({ action: "booking-status", id: booking.id, status: event.target.value }, "Booking status updated.")}>{bookingStatuses.map((status) => <option key={status}>{status}</option>)}</select></td><td><button className="detail-toggle" onClick={() => setOpenBooking(openBooking === booking.id ? null : booking.id)} aria-label="Show full booking details"><ChevronRight/></button></td></tr>)}{filteredBookings.length === 0 && <tr><td colSpan={7} className="admin-empty">No matching bookings yet.</td></tr>}</tbody></table></div>{openBooking && (() => { const booking = data.bookings.find((item) => item.id === openBooking); return booking ? <article className="booking-detail-drawer"><div><small>COMPLETE BOOKING DETAILS</small><h3>{booking.guest_name}</h3><p>{booking.reference} · received {new Date(booking.created_at).toLocaleString("en-IN")}</p></div><dl><div><dt>Phone</dt><dd><a href={`tel:${booking.phone}`}><Phone/>{booking.phone}</a></dd></div><div><dt>Email</dt><dd><a href={`mailto:${booking.email}`}><Mail/>{booking.email || "Not supplied"}</a></dd></div><div><dt>Arrival</dt><dd>{booking.arrival || "Not supplied"}</dd></div><div><dt>Booking source</dt><dd>{booking.source}</dd></div><div className="wide"><dt>Special requests</dt><dd>{booking.requests || "No special requests"}</dd></div></dl></article> : null; })()}</section>}

      {tab === "rooms" && <section className="admin-edit-grid">{data.rooms.map((room) => <form className="admin-edit-card" key={room.slug} onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); void update({ action: "save-room", slug: room.slug, name: String(form.get("name")), description: String(form.get("description")), basePrice: Number(form.get("basePrice")), totalRooms: Number(form.get("totalRooms")), maxGuests: Number(form.get("maxGuests")), active: form.get("active") === "on" }, `${room.name} updated.`); }}><div className="edit-card-number">{String(room.id).padStart(2, "0")}</div><section className="admin-room-images"><div className="admin-featured-image">{room.featured_image_url ? <img src={room.featured_image_url} alt={`${room.name} featured`}/> : <span><ImagePlus/></span>}<div><b>Featured image</b><p>Used on the room card and listing.</p><label className="admin-upload-control"><Upload/>Upload featured<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadRoomImages(room, "featured", [file]); event.target.value = ""; }}/></label>{room.featured_image_url && <button type="button" className="admin-remove-featured" disabled={busy} onClick={() => void saveRoomImages(room, "", room.gallery_image_urls, "Featured image removed.")}><X/> Remove</button>}</div></div><div className="admin-gallery-manager"><div><span><b>Other room images</b><small>{room.gallery_image_urls.length}/12 images</small></span><label className="admin-upload-control"><ImagePlus/>Add images<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" disabled={busy || room.gallery_image_urls.length >= 12} onChange={(event) => { const files = Array.from(event.target.files || []).slice(0, 12 - room.gallery_image_urls.length); void uploadRoomImages(room, "gallery", files); event.target.value = ""; }}/></label></div><div className="admin-gallery-thumbs">{room.gallery_image_urls.map((image, index) => <figure key={`${image}-${index}`}><img src={image} alt={`${room.name} gallery ${index + 1}`}/><button type="button" disabled={busy} aria-label={`Remove gallery image ${index + 1}`} onClick={() => void saveRoomImages(room, room.featured_image_url, room.gallery_image_urls.filter((_, imageIndex) => imageIndex !== index), "Gallery image removed.")}><X/></button></figure>)}{room.gallery_image_urls.length === 0 && <p>No gallery images uploaded yet.</p>}</div></div></section><label>Category name<input name="name" defaultValue={room.name} required/></label><label>Description<textarea name="description" defaultValue={room.description} rows={3}/></label><div className="admin-form-row"><label>Nightly price ₹<input name="basePrice" type="number" min="0" defaultValue={room.base_price} required/></label><label>Total rooms<input name="totalRooms" type="number" min="0" defaultValue={room.total_rooms} required/></label></div><div className="admin-form-row"><label>Maximum guests<input name="maxGuests" type="number" min="1" defaultValue={room.max_guests} required/></label><label className="admin-switch">Visible for booking<input name="active" type="checkbox" defaultChecked={Boolean(room.active)}/><span/></label></div><button className="admin-save" disabled={busy}>Save room category</button></form>)}</section>}

      {tab === "meals" && <><section className="meal-admin-intro"><div><UtensilsCrossed/></div><p>Set simple per-person prices for breakfast, lunch and dinner. These values are available to the booking system and can be changed at any time.</p></section><section className="admin-edit-grid meals-grid">{data.meals.map((meal) => <form className="admin-edit-card" key={meal.slug} onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); void update({ action: "save-meal", slug: meal.slug, name: String(form.get("name")), description: String(form.get("description")), pricePerGuest: Number(form.get("pricePerGuest")), active: form.get("active") === "on" }, `${meal.name} pricing updated.`); }}><span className="meal-icon"><UtensilsCrossed/></span><label>Meal name<input name="name" defaultValue={meal.name} required/></label><label>Price per guest ₹<input name="pricePerGuest" type="number" min="0" defaultValue={meal.price_per_guest} required/></label><label>Description<textarea name="description" defaultValue={meal.description} rows={3}/></label><label className="admin-switch">Offer this meal<input name="active" type="checkbox" defaultChecked={Boolean(meal.active)}/><span/></label><button className="admin-save" disabled={busy}>Save meal pricing</button></form>)}</section></>}

      {tab === "availability" && <section className="admin-two-column availability-layout"><form className="admin-panel-card availability-form" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); void update({ action: "save-availability", roomSlug: String(form.get("roomSlug")), date: String(form.get("date")), availableRooms: Number(form.get("availableRooms")), priceOverride: form.get("priceOverride") ? Number(form.get("priceOverride")) : null, note: String(form.get("note")) }, "Date availability saved."); }}><div className="admin-card-head"><div><small>DATE CONTROL</small><h2>Add or update availability</h2></div></div><label>Room category<select name="roomSlug">{data.rooms.map((room) => <option value={room.slug} key={room.slug}>{room.name}</option>)}</select></label><div className="admin-form-row"><label>Date<input name="date" type="date" required/></label><label>Inventory before bookings<input name="availableRooms" type="number" min="0" max={Math.max(...data.rooms.map((room) => room.total_rooms))} defaultValue={data.rooms[0]?.total_rooms || 15} required/></label></div><label>Special price ₹ <small>(optional)</small><input name="priceOverride" type="number" min="0" placeholder="Use normal room price"/></label><label>Internal note<textarea name="note" rows={3} placeholder="Sold out for wedding, festival rate…"/></label><button className="admin-save" disabled={busy}>Save availability</button></form><div className="admin-panel-card"><div className="admin-card-head"><div><small>LIVE INVENTORY</small><h2>Availability calendar</h2></div></div><div className="availability-list">{data.availability.map((item) => <article key={item.id}><div className="date-tile"><b>{new Date(`${item.date}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit" })}</b><span>{new Date(`${item.date}T00:00:00`).toLocaleDateString("en-IN", { month: "short" })}</span></div><div><b>{data.rooms.find((room) => room.slug === item.room_slug)?.name || item.room_slug}</b><p>{item.available_rooms} remaining · {item.booked_rooms} booked · {item.inventory_rooms} inventory{item.price_override ? ` · ₹${item.price_override.toLocaleString("en-IN")}` : " · regular price"}</p><small>{item.note}</small></div><button onClick={() => void update({ action: "delete-availability", id: item.id }, "Availability rule removed.")} aria-label="Delete availability rule"><Trash2/></button></article>)}{data.availability.length === 0 && <p className="admin-empty">No special dates yet. Standard inventory minus active bookings is used automatically.</p>}</div></div></section>}

      {tab === "enquiries" && <section className="admin-panel-card admin-full-card"><div className="admin-card-head"><div><small>WEDDINGS, EVENTS &amp; GENERAL</small><h2>Enquiry inbox</h2></div></div><div className="enquiry-grid">{data.enquiries.map((enquiry) => <article key={enquiry.id}><div className="enquiry-top"><span>{enquiry.type}</span><select value={enquiry.status} onChange={(event) => void update({ action: "enquiry-status", id: enquiry.id, status: event.target.value }, "Enquiry status updated.")}>{enquiryStatuses.map((status) => <option key={status}>{status}</option>)}</select></div><h3>{enquiry.name}</h3><p>{enquiry.message || "No additional message."}</p><div><a href={`tel:${enquiry.phone}`}><Phone/>{enquiry.phone}</a>{enquiry.email && <a href={`mailto:${enquiry.email}`}><Mail/>{enquiry.email}</a>}</div><small>{enquiry.preferred_date ? `Preferred date: ${enquiry.preferred_date}` : "No preferred date"} · {enquiry.source}</small></article>)}{data.enquiries.length === 0 && <p className="admin-empty">Website enquiries will appear here automatically.</p>}</div></section>}
    </section>
  </main>;
}
