"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function EnquiryForm({ type = "general" }: { type?: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  if (sent) return <div className="form-success"><Check/><h3>Thank you.</h3><p>Your enquiry has been saved. The hotel team can now review it in the control centre and contact you.</p><a className="gold-button" href={`https://wa.me/919479793778?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20${encodeURIComponent(type)}%20at%20Nakshatra.`}>Continue on WhatsApp <ArrowRight/></a></div>;
  return <form className="enquiry-form" onSubmit={async (e) => { e.preventDefault(); setError(""); const form = new FormData(e.currentTarget); try { const response = await fetch("/api/enquiries", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type, name: form.get("name"), phone: form.get("phone"), email: form.get("email"), preferredDate: form.get("date"), message: form.get("message"), source: "Website Direct" }) }); const result = await response.json() as { error?: string }; if (!response.ok) throw new Error(result.error || "Could not save your enquiry."); setSent(true); } catch (submitError) { setError(submitError instanceof Error ? submitError.message : "Could not save your enquiry."); } }}>
    <div><label>Your name<input required name="name" placeholder="Full name"/></label><label>Phone number<input required name="phone" inputMode="tel" placeholder="+91"/></label></div>
    <div><label>Email address<input name="email" type="email" placeholder="you@email.com"/></label><label>Preferred date<input name="date" type="date"/></label></div>
    <label>Tell us what you’re planning<textarea name="message" rows={4} placeholder={`A few details about your ${type}...`}/></label>
    <button className="gold-button" type="submit">Send enquiry <ArrowRight/></button>
    {error && <small className="form-error">{error}</small>}
    <small>Your details are saved securely for the hotel team to follow up.</small>
  </form>;
}
