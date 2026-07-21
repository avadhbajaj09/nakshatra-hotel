"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { rooms } from "@/lib/content";
import { ArrowRight, Check, CreditCard, PhoneCall, ShieldCheck } from "lucide-react";

export function BookingConfirm() {
  const params = useSearchParams();
  const room = rooms.find(r => r.slug === params.get("room")) || rooms[0];
  const [complete, setComplete] = useState(false);
  const [payMode, setPayMode] = useState<"deposit"|"hotel">("deposit");
  const total = useMemo(() => room.rate, [room]);
  const deposit = Math.round(total * .25);
  if (complete) return <section className="booking-complete"><div className="success-ring"><Check/></div><p className="kicker">PREVIEW RESERVATION RECEIVED</p><h1>Your stay is<br/><em>almost here.</em></h1><p>Preview reference <b>NKS-DEMO-001</b>. No real booking or payment was created. Connect Supabase, Razorpay and Resend to activate confirmation.</p><a className="gold-button" href="https://wa.me/919770370076?text=Hello%2C%20I%20would%20like%20to%20confirm%20a%20stay%20at%20Nakshatra%20Hotel%20%26%20Resort.">Confirm on WhatsApp <ArrowRight/></a></section>;
  return <div className="confirm-layout section-shell">
    <section className="confirm-form"><p className="kicker">SECURE YOUR STAY</p><h1>Just a few<br/><em>details.</em></h1><p className="lead">No account needed. Complete your request in one simple step.</p>
      <form onSubmit={(e) => { e.preventDefault(); setComplete(true); }}>
        <div className="form-row"><label>Full name<input required placeholder="Guest name"/></label><label>Phone<input required inputMode="tel" placeholder="+91"/></label></div>
        <label>Email address<input required type="email" placeholder="you@email.com"/></label><label>Special requests<textarea rows={3} placeholder="Anything we should know?"/></label>
        <fieldset><legend>How would you like to reserve?</legend><button type="button" className={payMode === "deposit" ? "selected" : ""} onClick={() => setPayMode("deposit")}><CreditCard/><span><b>Pay 25% deposit</b><small>Preview amount ₹{deposit.toLocaleString("en-IN")}</small></span>{payMode === "deposit" && <Check/>}</button><button type="button" className={payMode === "hotel" ? "selected" : ""} onClick={() => setPayMode("hotel")}><PhoneCall/><span><b>Reserve · pay at hotel</b><small>Hotel team confirms by phone</small></span>{payMode === "hotel" && <Check/>}</button></fieldset>
        <button className="gold-button submit-booking" type="submit">{payMode === "deposit" ? "Continue to preview payment" : "Request reservation"}<ArrowRight/></button>
        <p className="secure-line"><ShieldCheck/> Payment is not live in this preview. No card details will be requested.</p>
      </form>
    </section>
    <aside className="stay-summary glass-panel"><img src={room.image} alt={`${room.name} at Nakshatra Hotel & Resort`}/><div><p className="kicker">YOUR SELECTION</p><h3>{room.name}</h3><p>{params.get("in") || "Selected check-in"} → {params.get("out") || "Selected check-out"}</p><p>{params.get("guests") || 2} guests · 1 room</p><hr/><span><small>Preview rate</small><b>₹{total.toLocaleString("en-IN")}</b></span><span><small>Deposit today</small><b>₹{deposit.toLocaleString("en-IN")}</b></span><p className="rate-warning">Rates are placeholders pending confirmation by the hotel.</p></div></aside>
  </div>;
}
