"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { ArrowRight, Bath, BedDouble, CalendarDays, Camera, Check, ChevronLeft, ChevronRight, Coffee, Minus, Plus, ShieldCheck, Sparkles, Users, Waves, Wifi } from "lucide-react";
import { mealPlans, roomAmenities, type Room } from "@/lib/content";

export function RoomProductPage({ room }: { room: Room }) {
  const params = useSearchParams();
  const today = format(new Date(), "yyyy-MM-dd");
  const defaultOut = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const [activeImage, setActiveImage] = useState(0);
  const [checkIn, setCheckIn] = useState(params.get("in") || today);
  const [checkOut, setCheckOut] = useState(params.get("out") || defaultOut);
  const [guests, setGuests] = useState(Math.min(room.maxGuests, Math.max(1, Number(params.get("guests")) || 2)));
  const [planSlug, setPlanSlug] = useState(params.get("plan") || "breakfast");
  const [poolHours, setPoolHours] = useState(Math.max(0, Number(params.get("poolHours")) || 0));
  const touchStart = useRef<number | null>(null);

  const plan = mealPlans.find((item) => item.slug === planSlug) || mealPlans[1];
  const nights = useMemo(() => Math.max(1, differenceInCalendarDays(new Date(checkOut), new Date(checkIn))), [checkIn, checkOut]);
  const nightly = room.rate + plan.addonPerGuest * guests;
  const listNightly = Math.round(nightly / (1 - plan.discount / 100));
  const stayTotal = nightly * nights;
  const poolTotal = poolHours * 2000;
  const grandTotal = stayTotal + poolTotal;

  const showImage = (direction: number) => setActiveImage((current) => (current + direction + room.gallery.length) % room.gallery.length);
  const checkoutHref = `/booking/checkout?room=${room.slug}&in=${checkIn}&out=${checkOut}&guests=${guests}&plan=${plan.slug}&poolHours=${poolHours}`;

  return <main className="room-product">
    <section className="room-product-shell">
      <nav className="room-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/rooms">Rooms</Link><span>/</span><b>{room.name}</b></nav>

      <div className="room-product-heading">
        <div><p className="kicker">{room.eyebrow}</p><h1>{room.name}</h1><p>{room.description}</p></div>
        <div className="room-photo-proof"><span>✦</span><div><b>{room.gallery.length} real photos</b><small>From Nakshatra Hotel &amp; Resort</small></div></div>
      </div>

      <div className="room-product-grid">
        <div className="room-product-main">
          <section className="room-gallery" aria-label={`${room.name} photo gallery`}>
            <div className="room-gallery-stage" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) showImage(distance > 0 ? -1 : 1); touchStart.current = null; }}>
              <img src={room.gallery[activeImage]} alt={`${room.name} photo ${activeImage + 1} of ${room.gallery.length}`}/>
              <div className="gallery-count"><Camera/> PHOTO GALLERY</div>
              <button type="button" className="gallery-prev" onClick={() => showImage(-1)} aria-label="Previous room photo"><ChevronLeft/></button>
              <button type="button" className="gallery-next" onClick={() => showImage(1)} aria-label="Next room photo"><ChevronRight/></button>
            </div>
            <div className="room-thumbnails" role="tablist" aria-label="Choose a room photo">
              {room.gallery.map((image, index) => <button type="button" role="tab" aria-selected={activeImage === index} key={image} className={activeImage === index ? "active" : ""} onClick={() => setActiveImage(index)}><img src={image} alt=""/></button>)}
            </div>
          </section>

          <section className="room-facts-panel">
            <div><BedDouble/><span><small>BED</small><b>{room.bed}</b></span></div>
            <div><Users/><span><small>OCCUPANCY</small><b>Up to {room.maxGuests} guests</b></span></div>
            <div><Sparkles/><span><small>SPACE</small><b>{room.size}</b></span></div>
            <div><Bath/><span><small>BATHROOM</small><b>Private bathroom</b></span></div>
          </section>

          <section className="room-story-copy">
            <p className="kicker">YOUR PRIVATE RETREAT</p>
            <h2>Everything you need.<br/><em>Nothing you do not.</em></h2>
            <p>Settle into a clean, considered room supported by the practical comforts that make a stay feel easy. Choose your dates, select a dining plan for every guest and keep the rest of the experience beautifully simple.</p>
            <div className="room-trust-row"><span><ShieldCheck/> Flexible cancellation</span><span><Wifi/> Fast WiFi</span><span><Coffee/> Guest-based meal plans</span></div>
          </section>

          <section className="room-amenities-panel">
            <div><p className="kicker">ROOM AMENITIES</p><h2>Comfort, thoughtfully included.</h2></div>
            <div className="room-amenities-grid">{roomAmenities.map((amenity) => <span key={amenity}><Check/>{amenity}</span>)}</div>
          </section>

          <section className="room-pool-addon">
            <div><img src="/images/private-rooftop-pool.jpg" alt="Nakshatra private rooftop pool"/></div>
            <div><p className="kicker">MAKE THE STAY YOURS</p><h2>Add the private rooftop pool.</h2><p>Reserve the third-floor pool exclusively with your room for ₹2,000 per hour.</p><div className="addon-stepper"><button type="button" onClick={() => setPoolHours(Math.max(0, poolHours - 1))} aria-label="Remove one pool hour"><Minus/></button><b>{poolHours}</b><span>{poolHours === 1 ? "hour" : "hours"}</span><button type="button" onClick={() => setPoolHours(Math.min(8, poolHours + 1))} aria-label="Add one pool hour"><Plus/></button></div></div>
          </section>
        </div>

        <aside className="room-booking-card">
          <div className="direct-rate-label"><span>DIRECT BOOKING</span><b>Save {plan.discount}%</b></div>
          <div className="room-card-price"><small>From, per night</small><span><s>₹{listNightly.toLocaleString("en-IN")}</s><b>₹{nightly.toLocaleString("en-IN")}</b></span><p>For {guests} {guests === 1 ? "guest" : "guests"} · taxes confirmed by hotel</p></div>

          <div className="product-date-grid">
            <label><span>Check in</span><div><CalendarDays/><input type="date" min={today} value={checkIn} onChange={(event) => { setCheckIn(event.target.value); if (event.target.value >= checkOut) setCheckOut(format(addDays(new Date(event.target.value), 1), "yyyy-MM-dd")); }}/></div></label>
            <label><span>Check out</span><div><CalendarDays/><input type="date" min={checkIn} value={checkOut} onChange={(event) => setCheckOut(event.target.value)}/></div></label>
          </div>

          <div className="product-guests"><span>Guests</span><div><button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Remove one guest"><Minus/></button><b>{guests}</b><button type="button" onClick={() => setGuests(Math.min(room.maxGuests, guests + 1))} aria-label="Add one guest"><Plus/></button><small>Maximum {room.maxGuests}</small></div></div>

          <fieldset className="meal-plan-picker"><legend>Choose your stay package</legend>{mealPlans.map((item) => {
            const itemNightly = room.rate + item.addonPerGuest * guests;
            return <button type="button" key={item.slug} className={plan.slug === item.slug ? "selected" : ""} onClick={() => setPlanSlug(item.slug)}><span className="plan-radio">{plan.slug === item.slug && <Check/>}</span><span><b>{item.shortName}</b><small>{item.addonPerGuest ? `+₹${item.addonPerGuest.toLocaleString("en-IN")} / guest / night` : "Room only"}</small></span><strong>₹{itemNightly.toLocaleString("en-IN")}</strong><em>Save {item.discount}%</em></button>;
          })}</fieldset>

          <div className="booking-total-lines"><span><small>{nights} {nights === 1 ? "night" : "nights"} · {plan.shortName}</small><b>₹{stayTotal.toLocaleString("en-IN")}</b></span>{poolHours > 0 && <span><small>Private pool · {poolHours}h</small><b>₹{poolTotal.toLocaleString("en-IN")}</b></span>}<span className="grand-total"><small>Estimated total</small><b>₹{grandTotal.toLocaleString("en-IN")}</b></span></div>
          <Link className="gold-button product-checkout" href={checkoutHref}>Continue to checkout <ArrowRight/></Link>
          <p className="product-assurance"><ShieldCheck/> No online payment required. Pay at the hotel after confirmation.</p>
        </aside>
      </div>
    </section>
  </main>;
}
