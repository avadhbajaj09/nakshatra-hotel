"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Inbox,
  Search,
  MessageCircle,
  CheckCircle,
  CalendarPlus,
  RefreshCw,
  Loader2,
  Filter,
} from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  phone_e164: string;
  phone_digits: string;
  type: string;
  details: string;
  status: string;
  source: string;
  created_at: string;
  manager_notified_at: string | null;
  followup_count: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const markContacted = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "contacted" }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: "contacted" } : lead))
        );
      }
    } catch (err) {
      console.error("Failed to update lead status:", err);
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
            Inquiry Management
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#092218]">
            Enquiries &amp; Leads
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Website inquiries routed directly to hotel management
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-1.5 self-start sm:self-auto bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 transition shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone or details…"
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#c9a961] transition"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="partial">Partial</option>
              <option value="notify_failed">Failed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-700 focus:outline-hidden capitalize"
            >
              <option value="all">All Types</option>
              <option value="room">Room Booking</option>
              <option value="restaurant">Restaurant</option>
              <option value="banquet">Banquet / Function</option>
              <option value="celebration">Celebration</option>
              <option value="question">Question</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold">
                <th className="py-3 px-4">Guest Name &amp; Time</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Enquiry Details</th>
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
                      <span>Loading enquiries…</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No enquiries match the current filter.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <b className="block text-slate-900 font-semibold">{lead.name || "Guest"}</b>
                      <span className="text-[10px] text-slate-400">
                        {new Date(lead.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {lead.phone_e164 || lead.phone_digits || "—"}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-medium capitalize">
                        {lead.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="line-clamp-2 text-slate-600 text-[11px] leading-relaxed">
                        {lead.details || "—"}
                      </p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === "new"
                            ? "bg-amber-100 text-amber-900"
                            : lead.status === "contacted"
                            ? "bg-emerald-100 text-emerald-900"
                            : lead.status === "partial"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-red-100 text-red-900"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Button */}
                        {lead.phone_digits && (
                          <a
                            href={`https://wa.me/${lead.phone_digits}?text=Hello%20${encodeURIComponent(
                              lead.name || "Guest"
                            )}%2C%20thank%20you%20for%20contacting%20Hotel%20Nakshatra%20%26%20Resort%20Khargone.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}

                        {/* Mark Contacted Button */}
                        {lead.status !== "contacted" && (
                          <button
                            type="button"
                            onClick={() => markContacted(lead.id)}
                            disabled={updatingId === lead.id}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition disabled:opacity-50"
                            title="Mark as Contacted"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Convert to Booking Button */}
                        <Link
                          href={`/admin/bookings/new?lead_id=${lead.id}&name=${encodeURIComponent(
                            lead.name || ""
                          )}&phone=${encodeURIComponent(lead.phone_digits || "")}&type=${lead.type}`}
                          className="p-1.5 bg-[#092218] hover:bg-[#124231] text-[#e1c781] rounded-lg transition"
                          title="Convert to Booking"
                        >
                          <CalendarPlus className="w-4 h-4" />
                        </Link>
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
