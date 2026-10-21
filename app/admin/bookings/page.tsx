"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Search,
  MessageCircle,
  PlusCircle,
  RefreshCw,
  Loader2,
  Send,
  CheckCircle2,
  Filter,
} from "lucide-react";

interface BookingItem {
  id: string;
  reference: string;
  guest_name: string;
  phone_e164: string;
  phone_digits: string;
  room_name: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total: number;
  status: string;
  confirmation_sent_at: string | null;
  created_at: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());

      const res = await fetch(`/api/admin/bookings?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        setNotice(`Booking status updated to ${newStatus}.`);
        setTimeout(() => setNotice(""), 3000);
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const resendConfirmation = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "resend-confirmation" }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotice("Confirmation dispatched to guest on WhatsApp.");
        setTimeout(() => setNotice(""), 3000);
      } else {
        alert(data.error || "Failed to resend confirmation.");
      }
    } catch (err) {
      console.error("Resend confirmation error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-[#9c7c3c] tracking-widest uppercase">
            Reservations
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#092218]">
            Guest Bookings Register
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage front desk bookings, guest lifecycle, and WhatsApp confirmations
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchBookings}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl transition shadow-xs disabled:opacity-50"
            title="Refresh bookings"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/bookings/new"
            className="flex items-center gap-2 bg-[#092218] hover:bg-[#124231] text-[#e1c781] px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Booking</span>
          </Link>
        </div>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by guest, phone, or reference…"
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#c9a961] transition"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-xs text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked-In</option>
            <option value="checked-out">Checked-Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold">
                <th className="py-3 px-4">Reference &amp; Guest</th>
                <th className="py-3 px-4">Room &amp; Stay Dates</th>
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#9c7c3c]" />
                      <span>Loading bookings…</span>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No bookings found matching current criteria.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <b className="block text-slate-900 font-semibold">{b.guest_name}</b>
                      <span className="font-mono text-[10px] text-slate-400">
                        {b.reference} · {b.phone_digits || b.phone_e164}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <b className="block text-slate-800">{b.room_name}</b>
                      <span className="text-[11px] text-slate-500">
                        {b.check_in_date} to {b.check_out_date}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">{b.guests} Guests</td>

                    <td className="py-3.5 px-4 font-serif font-bold text-slate-900">
                      ₹{b.total ? b.total.toLocaleString("en-IN") : "0"}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        disabled={updatingId === b.id}
                        className={`text-[11px] font-semibold rounded-lg px-2 py-1 border focus:outline-hidden ${
                          b.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : b.status === "checked-in"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : b.status === "checked-out"
                            ? "bg-slate-50 text-slate-700 border-slate-200"
                            : "bg-red-50 text-red-800 border-red-200"
                        }`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="checked-in">Checked-In</option>
                        <option value="checked-out">Checked-Out</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Direct WhatsApp button */}
                        {b.phone_digits && (
                          <a
                            href={`https://wa.me/${b.phone_digits}?text=Hello%20${encodeURIComponent(
                              b.guest_name
                            )}%2C%20regarding%20your%20stay%20at%20Hotel%20Nakshatra%20%26%20Resort%20Khargone.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}

                        {/* Resend WhatsApp Confirmation */}
                        <button
                          type="button"
                          onClick={() => resendConfirmation(b.id)}
                          disabled={updatingId === b.id}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition disabled:opacity-50"
                          title="Resend WhatsApp confirmation"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
