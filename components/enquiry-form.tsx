"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function EnquiryForm({ type = "general" }: { type?: string }) {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="form-success"><Check/><h3>Thank you.</h3><p>Your preview enquiry has been captured on this screen. Live delivery will activate once the hotel’s email service is connected.</p><a className="gold-button" href={`https://wa.me/919770370076?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20${encodeURIComponent(type)}%20at%20Nakshatra.`}>Continue on WhatsApp <ArrowRight/></a></div>;
  return <form className="enquiry-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
    <div><label>Your name<input required name="name" placeholder="Full name"/></label><label>Phone number<input required name="phone" inputMode="tel" placeholder="+91"/></label></div>
    <div><label>Email address<input name="email" type="email" placeholder="you@email.com"/></label><label>Preferred date<input name="date" type="date"/></label></div>
    <label>Tell us what you’re planning<textarea name="message" rows={4} placeholder={`A few details about your ${type}...`}/></label>
    <button className="gold-button" type="submit">Send enquiry <ArrowRight/></button>
    <small>Preview form · no data leaves this page until backend services are connected.</small>
  </form>;
}
