"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { CalendarDays, Users, Minus, Plus, ArrowRight, Check, X } from "lucide-react";
import { rooms } from "@/lib/content";
import { useHotelConfig } from "@/lib/use-hotel-config";

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [showGuests, setShowGuests] = useState(false);
  const [results, setResults] = useState(false);
  const config = useHotelConfig(checkIn, checkOut);
  const nights = useMemo(() => Math.max(1, differenceInCalendarDays(new Date(checkOut), new Date(checkIn))), [checkIn, checkOut]);
  return <>
    <div className={`booking-widget glass-panel ${compact ? "booking-compact" : ""}`} id="book">
      <div className="booking-intro"><span className="star-glyph">✦</span><span><small>GRAND OPENING COMING SOON</small><b>Advance Stay &amp; Event Inquiries</b></span></div>
      <label><span>Check in</span><div><CalendarDays size={17}/><input aria-label="Check in date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(format(addDays(new Date(e.target.value), 1), "yyyy-MM-dd")); }} type="date"/></div></label>
      <label><span>Check out</span><div><CalendarDays size={17}/><input aria-label="Check out date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="date"/></div></label>
      <div className="guest-control">
        <span>Guests</span><button onClick={() => setShowGuests(!showGuests)}><Users size={17}/>{guests} guests</button>
        {showGuests && <div className="guest-pop glass-panel"><span>Guests</span><button onClick={() => setGuests(Math.max(1, guests - 1))}><Minus/></button><b>{guests}</b><button onClick={() => setGuests(Math.min(12, guests + 1))}><Plus/></button></div>}
      </div>
      <button className="gold-button availability" onClick={() => setResults(true)}>Check Pre-Booking <ArrowRight size={18}/></button>
    </div>
    {results && <div className="results-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setResults(false)}>
      <section className="results-panel" aria-modal="true" role="dialog" aria-label="Available rooms">
        <button className="close-results" onClick={() => setResults(false)} aria-label="Close"><X/></button>
        <div className="results-head"><p className="kicker">✦ GRAND OPENING COMING SOON ✦</p><h2>Pre-Book Your <em>Stay.</em></h2><p>{format(new Date(checkIn), "dd MMM")} — {format(new Date(checkOut), "dd MMM yyyy")} · {guests} guests</p></div>
        <p className="preview-note">✦ GRAND OPENING COMING SOON ✦ Submit your dates below for advance stay or event reservations! Our team will contact you directly to confirm your booking for opening season.</p>
        <div className="result-list">{rooms.slice(0, 4).map((room, i) => <article key={room.slug}>
          <img src={room.image} alt={`${room.name} at Nakshatra Hotel & Resort`}/><div><span className="availability-tag"><Check/> {config?.availability.find((item) => item.room_slug === room.slug)?.available_rooms ?? config?.rooms.find((item) => item.slug === room.slug)?.total_rooms ?? 15} rooms available</span><h3>{config?.rooms.find((item) => item.slug === room.slug)?.name || room.name}</h3><p>{room.features.slice(0,2).join(" · ")}</p></div><div className="result-price"><small>Direct rate / night</small><b>₹{(config?.availability.find((item) => item.room_slug === room.slug)?.price_override || config?.rooms.find((item) => item.slug === room.slug)?.base_price || room.rate).toLocaleString("en-IN")}</b><Link className="gold-button" href={`/rooms/${room.slug}?in=${checkIn}&out=${checkOut}&guests=${Math.min(guests, config?.rooms.find((item) => item.slug === room.slug)?.max_guests || room.maxGuests)}`}>View room</Link></div>
        </article>)}</div>
      </section>
    </div>}
  </>;
}
