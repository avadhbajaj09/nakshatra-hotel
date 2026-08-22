"use client";

import { useMemo, useState } from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { CalendarDays, Users, Minus, Plus, MessageCircle } from "lucide-react";

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [showGuests, setShowGuests] = useState(false);

  const handleWhatsAppInquiry = () => {
    const formattedIn = format(new Date(checkIn), "dd MMM yyyy");
    const formattedOut = format(new Date(checkOut), "dd MMM yyyy");
    const message = `Hello Nakshatra Hotel %26 Resort, I would like to inquire about room availability and booking from ${formattedIn} to ${formattedOut} for ${guests} guests.`;
    window.open(`https://wa.me/919479793778?text=${message}`, "_blank");
  };

  return (
    <div className={`booking-widget glass-panel ${compact ? "booking-compact" : ""}`} id="book">
      <div className="booking-intro"><span className="star-glyph">✦</span><span><small>RESERVE YOUR STAY</small><b>Direct WhatsApp Inquiry</b></span></div>
      <label><span>Check in</span><div><CalendarDays size={17}/><input aria-label="Check in date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(format(addDays(new Date(e.target.value), 1), "yyyy-MM-dd")); }} type="date"/></div></label>
      <label><span>Check out</span><div><CalendarDays size={17}/><input aria-label="Check out date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="date"/></div></label>
      <div className="guest-control">
        <span>Guests</span><button onClick={() => setShowGuests(!showGuests)}><Users size={17}/>{guests} guests</button>
        {showGuests && <div className="guest-pop glass-panel"><span>Guests</span><button onClick={() => setGuests(Math.max(1, guests - 1))}><Minus/></button><b>{guests}</b><button onClick={() => setGuests(Math.min(12, guests + 1))}><Plus/></button></div>}
      </div>
      <button type="button" className="gold-button availability" onClick={handleWhatsAppInquiry}><MessageCircle size={18}/> Inquire on WhatsApp</button>
    </div>
  );
}
