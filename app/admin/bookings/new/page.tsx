"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  User,
  Phone,
  BedDouble,
  Users,
  IndianRupee,
  FileText,
  Send,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

function NewBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [leadId, setLeadId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomName, setRoomName] = useState("Executive Room");
  const [roomSlug, setRoomSlug] = useState("executive-room");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [total, setTotal] = useState(2500);
  const [requests, setRequests] = useState("");
  const [sendConfirmation, setSendConfirmation] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successInfo, setSuccessInfo] = useState<{ reference: string; whatsappSent: boolean } | null>(null);

  useEffect(() => {
    const lId = searchParams.get("lead_id");
    const name = searchParams.get("name");
    const p = searchParams.get("phone");

    if (lId) setLeadId(lId);
    if (name) setGuestName(name);
    if (p) setPhone(p);

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    setCheckInDate(todayStr);
    setCheckOutDate(tomorrowStr);
  }, [searchParams]);

  const handleRoomChange = (name: string, slug: string, price: number) => {
    setRoomName(name);
    setRoomSlug(slug);
    setTotal(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId || null,
          guest_name: guestName,
          phone,
          room_name: roomName,
          room_slug: roomSlug,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests,
          total,
          requests,
          sendConfirmation,
          marketing_opt_in: marketingOptIn,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      setSuccessInfo({
        reference: data.reference,
        whatsappSent: data.whatsappSent,
      });

      setTimeout(() => {
        router.push("/admin/bookings");
      }, 2000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#092218] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bookings</span>
        </Link>
      </div>

      <div>
        <span className="text-[11px] font-semibold text-[#9c7c3c] tracking-widest uppercase">
          Front Desk Reservation
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#092218]">
          Add New Guest Booking
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Creates booking record and instantly triggers WhatsApp confirmation to the guest.
        </p>
      </div>

      {successInfo && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <b>Booking successfully confirmed! Reference: {successInfo.reference}</b>
            <p className="text-emerald-700 mt-0.5">
              {successInfo.whatsappSent
                ? "Instant WhatsApp confirmation message dispatched to guest."
                : "Booking created in system."}
            </p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6"
      >
        {/* Section 1: Guest Information */}
        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-[#9c7c3c]" />
            <span>Guest Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Guest Name *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                WhatsApp Number * (10 Digits)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Stay & Room Details */}
        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <BedDouble className="w-4 h-4 text-[#9c7c3c]" />
            <span>Room &amp; Stay Dates</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Room Category
              </label>
              <select
                value={roomSlug}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "executive-room") handleRoomChange("Executive Room", "executive-room", 2500);
                  else if (val === "deluxe-room") handleRoomChange("Deluxe Room", "deluxe-room", 3500);
                  else if (val === "family-suite") handleRoomChange("Family Suite", "family-suite", 5000);
                  else if (val === "private-pool-suite") handleRoomChange("Private Pool Suite", "private-pool-suite", 7500);
                }}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden"
              >
                <option value="executive-room">Executive Room (₹2,500 / night)</option>
                <option value="deluxe-room">Deluxe Room (₹3,500 / night)</option>
                <option value="family-suite">Family Suite (₹5,000 / night)</option>
                <option value="private-pool-suite">Private Pool Suite (₹7,500 / night)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Number of Guests
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Check-in Date *
              </label>
              <div className="relative">
                <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="date"
                  required
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Check-out Date *
              </label>
              <div className="relative">
                <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="date"
                  required
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Pricing & Notes */}
        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#9c7c3c]" />
            <span>Pricing &amp; Special Requests</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Total Amount (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="number"
                  min={0}
                  value={total}
                  onChange={(e) => setTotal(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Special Requests / Staff Notes
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="e.g. Early check-in requested, pool view preference, extra bed…"
                  className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#c9a961] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: WhatsApp Confirmation & Opt-in checkboxes */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={sendConfirmation}
              onChange={(e) => setSendConfirmation(e.target.checked)}
              className="rounded text-[#092218] focus:ring-[#c9a961]"
            />
            <span className="font-semibold text-emerald-900">
              Send instant WhatsApp confirmation message to guest now
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="rounded text-[#092218] focus:ring-[#c9a961]"
            />
            <span>Enable pre-arrival guide and automated stay messages for this guest</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-medium transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#092218] hover:bg-[#124231] text-[#e1c781] font-semibold text-xs tracking-wider uppercase rounded-xl transition shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Confirming Booking…</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Save &amp; Confirm Booking</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#9c7c3c] flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading booking form…</div>}>
      <NewBookingForm />
    </Suspense>
  );
}
