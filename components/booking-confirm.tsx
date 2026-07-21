"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { ArrowLeft, ArrowRight, Banknote, CalendarDays, Check, Clock3, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { address, mealPlans, rooms } from "@/lib/content";
import { configuredMealAddons, useHotelConfig } from "@/lib/use-hotel-config";

export function BookingConfirm() {
  const router = useRouter();
  const params = useSearchParams();
  const room = rooms.find((item) => item.slug === params.get("room")) || rooms[0];
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const checkIn = params.get("in") || format(new Date(), "yyyy-MM-dd");
  const checkOut = params.get("out") || format(new Date(Date.now() + 86400000), "yyyy-MM-dd");
  const config = useHotelConfig(checkIn, checkOut);
  const liveRoom = config?.rooms.find((item) => item.slug === room.slug);
  const mealAddons = configuredMealAddons(config?.meals);
  const liveMealPlans = mealPlans.map((item) => ({ ...item, addonPerGuest: item.slug === "breakfast" ? mealAddons.breakfast ?? item.addonPerGuest : item.slug === "half-board" ? mealAddons.halfBoard ?? item.addonPerGuest : item.slug === "full-board" ? mealAddons.fullBoard ?? item.addonPerGuest : item.addonPerGuest }));
  const plan = liveMealPlans.find((item) => item.slug === params.get("plan")) || liveMealPlans[1];
  const effectiveRoom = { ...room, name: liveRoom?.name || room.name, rate: config?.availability.find((item) => item.room_slug === room.slug)?.price_override || liveRoom?.base_price || room.rate, maxGuests: liveRoom?.max_guests || room.maxGuests };
  const guests = Math.min(effectiveRoom.maxGuests, Math.max(1, Number(params.get("guests")) || 2));
  const nights = useMemo(() => Math.max(1, differenceInCalendarDays(new Date(checkOut), new Date(checkIn))), [checkIn, checkOut]);
  const nightly = effectiveRoom.rate + plan.addonPerGuest * guests;
  const stayTotal = nightly * nights;
  const total = stayTotal;
  const listTotal = Math.round(stayTotal / (1 - plan.discount / 100));

  return <main className="checkout-page">
    <div className="checkout-shell">
      <nav className="checkout-topline"><Link href={`/rooms/${room.slug}?${params.toString()}`}><ArrowLeft/> Back to room</Link><span><ShieldCheck/> Reservation details are securely handled on this device</span></nav>
      <div className="checkout-heading"><p className="kicker">FINAL STEP</p><h1>Complete your<br/><em>reservation request.</em></h1><p>No online payment is required. Submit your details and pay in cash at the hotel after the team confirms availability.</p></div>

      <div className="checkout-grid">
        <form className="checkout-form-card" onSubmit={async (event) => {
          event.preventDefault();
          setSubmitting(true);
          setSubmitError("");
          const reference = `NKS-${Date.now().toString().slice(-6)}`;
          const form = new FormData(event.currentTarget);
          try {
            const response = await fetch("/api/bookings", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
              reference, source: params.get("source") || "Website Direct", roomSlug: room.slug, roomName: effectiveRoom.name,
              guestName: form.get("name"), phone: form.get("phone"), email: form.get("email"), checkIn, checkOut,
              guests, mealPlan: plan.name, total, arrival: form.get("arrival"), requests: form.get("requests"),
            }) });
            const result = await response.json() as { error?: string };
            if (!response.ok) throw new Error(result.error || "The booking could not be saved.");
            router.push(`/booking/thank-you?reference=${reference}&room=${room.slug}&in=${checkIn}&out=${checkOut}&guests=${guests}&plan=${plan.slug}&total=${total}`);
          } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "The booking could not be saved. Please try again.");
            setSubmitting(false);
          }
        }}>
          <section><div className="checkout-section-title"><span><UserRound/></span><div><h2>Guest details</h2><p>Who should the hotel contact about this stay?</p></div></div>
            <div className="checkout-fields two"><label><span>Full name</span><div><UserRound/><input name="name" required autoComplete="name" placeholder="Primary guest name"/></div></label><label><span>Mobile number</span><div><Phone/><input name="phone" required autoComplete="tel" inputMode="tel" placeholder="+91"/></div></label></div>
            <div className="checkout-fields two"><label><span>Email address</span><div><Mail/><input name="email" type="email" autoComplete="email" placeholder="you@email.com"/></div></label><label><span>Expected arrival</span><div><Clock3/><select name="arrival" defaultValue="12:00–14:00"><option>12:00–14:00</option><option>14:00–17:00</option><option>17:00–20:00</option><option>After 20:00</option></select></div></label></div>
            <label className="checkout-request"><span>Special requests</span><textarea name="requests" rows={4} placeholder="Meal preferences, accessibility needs, celebration notes or anything else the hotel should know."/></label>
          </section>

          <section><div className="checkout-section-title"><span><Banknote/></span><div><h2>Payment method</h2><p>Online payments can be added later. Cash payment is available for this request.</p></div></div>
            <div className="cash-option selected"><div className="cash-icon"><Banknote/></div><div><b>Cash on arrival · Pay at hotel</b><p>No charge today. The hotel confirms the reservation and final applicable taxes before arrival.</p></div><span><Check/></span></div>
          </section>

          <label className="checkout-consent"><input type="checkbox" required/><span>I understand this is a reservation request. The hotel will confirm availability, final taxes and booking conditions by phone or WhatsApp.</span></label>
          {submitError && <p className="checkout-submit-error">{submitError}</p>}
          <button className="gold-button checkout-submit" type="submit" disabled={submitting}>{submitting ? "Saving your booking…" : "Request booking · pay at hotel"} {!submitting && <ArrowRight/>}</button>
          <p className="checkout-help"><Phone/> Need help? Call <a href="tel:+919425088369">+91 94250 88369</a></p>
        </form>

        <aside className="checkout-summary-card">
          <div className="checkout-summary-photo"><img src={room.gallery[0]} alt={`${effectiveRoom.name} at Nakshatra Hotel & Resort`}/><span>DIRECT BOOKING · SAVE {plan.discount}%</span></div>
          <div className="checkout-summary-body"><p className="kicker">YOUR STAY</p><h2>{effectiveRoom.name}</h2><div className="checkout-stay-facts"><span><CalendarDays/><b>{format(new Date(checkIn), "dd MMM")} → {format(new Date(checkOut), "dd MMM yyyy")}</b><small>{nights} {nights === 1 ? "night" : "nights"}</small></span><span><UserRound/><b>{guests} {guests === 1 ? "guest" : "guests"}</b><small>{plan.name}</small></span><span><MapPin/><b>Nakshatra Hotel &amp; Resort</b><small>{address}</small></span></div>
            <div className="checkout-price-lines"><span><small>Stay · {nights} {nights === 1 ? "night" : "nights"}</small><b>₹{stayTotal.toLocaleString("en-IN")}</b></span><span className="checkout-savings"><small>Direct package savings</small><b>−₹{(listTotal - total).toLocaleString("en-IN")}</b></span><span className="checkout-total"><small>Estimated total</small><b>₹{total.toLocaleString("en-IN")}</b></span></div>
            <p className="checkout-tax-note">Applicable taxes are confirmed by the hotel before the reservation is final.</p>
          </div>
        </aside>
      </div>
    </div>
  </main>;
}
