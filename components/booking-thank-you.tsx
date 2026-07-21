"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ArrowRight, Check, Clock3, MessageCircle, Phone, WalletCards } from "lucide-react";
import { mealPlans, rooms } from "@/lib/content";

export function BookingThankYou() {
  const params = useSearchParams();
  const room = rooms.find((item) => item.slug === params.get("room")) || rooms[0];
  const plan = mealPlans.find((item) => item.slug === params.get("plan")) || mealPlans[1];
  const reference = params.get("reference") || "NKS-REQUEST";
  const guests = Math.max(1, Number(params.get("guests")) || 2);
  const checkIn = params.get("in") || format(new Date(), "yyyy-MM-dd");
  const checkOut = params.get("out") || format(new Date(Date.now() + 86400000), "yyyy-MM-dd");
  const total = Math.max(0, Number(params.get("total")) || room.rate);
  const message = encodeURIComponent(`Hello Nakshatra Hotel & Resort, I submitted booking request ${reference} for ${room.name}, ${format(new Date(checkIn), "dd MMM yyyy")} to ${format(new Date(checkOut), "dd MMM yyyy")}, ${guests} guest(s), ${plan.name}. Please confirm availability.`);

  return <main className="thank-you-page">
    <section className="thank-you-shell">
      <div className="thank-you-mark"><Check/></div>
      <p className="kicker">REQUEST RECEIVED · {reference}</p>
      <h1>Thank you.<br/><em>Your escape starts here.</em></h1>
      <p className="thank-you-lead">Your reservation request is ready for hotel confirmation. No payment has been collected; you selected cash payment at the hotel.</p>

      <div className="thank-you-booking-card">
        <img src={room.gallery[0]} alt={`${room.name} at Nakshatra Hotel & Resort`}/>
        <div><p className="kicker">STAY SUMMARY</p><h2>{room.name}</h2><p>{format(new Date(checkIn), "dd MMM yyyy")} → {format(new Date(checkOut), "dd MMM yyyy")} · {guests} {guests === 1 ? "guest" : "guests"}</p><p>{plan.name}</p><span><small>Estimated total · taxes confirmed by hotel</small><b>₹{total.toLocaleString("en-IN")}</b></span></div>
      </div>

      <div className="thank-you-next"><article><span><Clock3/></span><div><b>Hotel confirmation</b><p>The team confirms availability, final taxes and booking conditions by phone or WhatsApp.</p></div></article><article><span><Phone/></span><div><b>Keep your phone nearby</b><p>Use the mobile number entered at checkout when speaking with the hotel.</p></div></article><article><span><WalletCards/></span><div><b>Pay at the hotel</b><p>Bring cash for payment after your reservation has been confirmed.</p></div></article></div>

      <div className="thank-you-actions"><a className="gold-button" href={`https://wa.me/919770370076?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle/> Confirm on WhatsApp <ArrowRight/></a><Link className="arrow-link" href="/rooms">Explore more rooms <ArrowRight/></Link></div>
      <p className="thank-you-note">Your booking is saved in the hotel control centre. WhatsApp or phone confirmation is still required before travel.</p>
    </section>
  </main>;
}
