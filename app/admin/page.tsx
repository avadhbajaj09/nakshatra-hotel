"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CalendarX,
  BedDouble,
  Inbox,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  PlusCircle,
  RefreshCw,
  Loader2,
  Clock,
} from "lucide-react";

interface DashboardStats {
  todayCheckIns: number;
  todayCheckOuts: number;
  totalBookings: number;
  newLeads: number;
  unattendedLeads: number;
}

interface RecentLead {
  id: string;
  name: string;
  phone_digits: string;
  type: string;
  details: string;
  status: string;
  created_at: string;
}

interface RecentBooking {
  id: string;
  reference: string;
  guest_name: string;
  phone_digits: string;
  room_name: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  total: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setRecentLeads(data.recentLeads || []);
        setRecentBookings(data.recentBookings || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-[#9c7c3c] tracking-widest uppercase">
            Management Overview
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#092218]">
            Hotel Control Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status for Hotel Nakshatra &amp; Resort Khargone
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchStats}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl transition shadow-xs disabled:opacity-50"
            title="Refresh statistics"
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

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Today's Check-ins */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Today Check-in
            </span>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#092218]">
            {loading ? "…" : stats?.todayCheckIns ?? 0}
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Arrivals expected</span>
        </div>

        {/* Today's Check-outs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Today Check-out
            </span>
            <CalendarX className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#092218]">
            {loading ? "…" : stats?.todayCheckOuts ?? 0}
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Departures scheduled</span>
        </div>

        {/* Total Active Bookings */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Active Bookings
            </span>
            <BedDouble className="w-4 h-4 text-[#9c7c3c]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#092218]">
            {loading ? "…" : stats?.totalBookings ?? 0}
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Confirmed stays</span>
        </div>

        {/* New Leads */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">
              New Enquiries
            </span>
            <Inbox className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#092218]">
            {loading ? "…" : stats?.newLeads ?? 0}
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Pending contact</span>
        </div>

        {/* Unattended Leads (>2h) */}
        <div className={`p-4 rounded-2xl border shadow-xs flex flex-col justify-between col-span-2 lg:col-span-1 ${
          stats?.unattendedLeads && stats.unattendedLeads > 0
            ? "bg-red-50 border-red-200 text-red-950"
            : "bg-white border-slate-200/80"
        }`}>
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-red-800">
              Unattended &gt;2h
            </span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-red-700">
            {loading ? "…" : stats?.unattendedLeads ?? 0}
          </div>
          <span className="text-[10px] text-red-600/80 mt-1">Requires follow-up</span>
        </div>
      </div>

      {/* Two Column Grid: Recent Leads & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries / Leads */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#9c7c3c]" />
              <h2 className="font-serif font-bold text-sm text-[#092218]">
                Recent Website Enquiries
              </h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#9c7c3c] hover:text-[#092218] flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#9c7c3c]" />
                <span>Loading enquiries…</span>
              </div>
            ) : recentLeads.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No website enquiries received yet.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition">
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2">
                      <b className="text-xs text-slate-900 font-semibold">{lead.name || "Guest"}</b>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize font-medium">
                        {lead.type}
                      </span>
                      {lead.status === "new" && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{lead.details}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(lead.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://wa.me/${lead.phone_digits}?text=Hello%20${encodeURIComponent(lead.name || "Guest")}%2C%20greetings%20from%20Hotel%20Nakshatra%20%26%20Resort%20Khargone.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition shadow-xs flex items-center gap-1.5 text-xs font-medium"
                      title="Open WhatsApp chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#9c7c3c]" />
              <h2 className="font-serif font-bold text-sm text-[#092218]">
                Recent Bookings
              </h2>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-semibold text-[#9c7c3c] hover:text-[#092218] flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#9c7c3c]" />
                <span>Loading bookings…</span>
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No bookings registered yet.
              </div>
            ) : (
              recentBookings.map((b) => (
                <div key={b.id} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <b className="text-xs text-slate-900 font-semibold">{b.guest_name}</b>
                      <span className="text-[10px] text-slate-400">({b.reference})</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        b.status === "confirmed" ? "bg-emerald-100 text-emerald-800" :
                        b.status === "checked-in" ? "bg-blue-100 text-blue-800" :
                        b.status === "checked-out" ? "bg-slate-100 text-slate-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {b.room_name} · {b.check_in_date} to {b.check_out_date}
                    </p>
                  </div>

                  <div className="text-right">
                    <b className="text-xs font-serif font-bold text-[#092218]">
                      ₹{b.total ? b.total.toLocaleString("en-IN") : "0"}
                    </b>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
