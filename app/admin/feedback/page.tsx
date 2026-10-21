"use client";

import { useEffect, useState } from "react";
import { MessageSquareQuote, Star, RefreshCw, Loader2, MessageCircle } from "lucide-react";

interface FeedbackItem {
  id: string;
  guest_name: string;
  phone_digits: string;
  room_name: string;
  check_out_date: string;
  feedback_rating: string;
  updated_at: string;
}

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/feedback");
      const data = await res.json();
      if (res.ok) {
        setFeedback(data.feedback || []);
      }
    } catch (err) {
      console.error("Failed to load feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-[#9c7c3c] tracking-widest uppercase">
            Quality &amp; Experience
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#092218]">
            Guest Feedback &amp; Ratings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated WhatsApp responses received from checkout guests
          </p>
        </div>

        <button
          type="button"
          onClick={fetchFeedback}
          disabled={loading}
          className="flex items-center gap-1.5 self-start sm:self-auto bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 transition shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold">
                <th className="py-3 px-4">Guest &amp; Contact</th>
                <th className="py-3 px-4">Room &amp; Checkout</th>
                <th className="py-3 px-4">Rating / Response</th>
                <th className="py-3 px-4">Received Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#9c7c3c]" />
                      <span>Loading feedback…</span>
                    </div>
                  </td>
                </tr>
              ) : feedback.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No guest ratings received on WhatsApp yet.
                  </td>
                </tr>
              ) : (
                feedback.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <b className="block text-slate-900 font-semibold">{item.guest_name}</b>
                      <span className="font-mono text-[10px] text-slate-400">
                        {item.phone_digits}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="block text-slate-800">{item.room_name}</span>
                      <span className="text-[10px] text-slate-400">
                        Checked out: {item.check_out_date}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{item.feedback_rating}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(item.updated_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {item.phone_digits && (
                        <a
                          href={`https://wa.me/${item.phone_digits}?text=Hello%20${encodeURIComponent(
                            item.guest_name
                          )}%2C%20thank%20you%20for%20your%20kind%20feedback%20regarding%20your%20stay%20at%20Hotel%20Nakshatra%20%26%20Resort!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition"
                          title="Message guest on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="hidden sm:inline text-xs font-medium">Thank Guest</span>
                        </a>
                      )}
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
