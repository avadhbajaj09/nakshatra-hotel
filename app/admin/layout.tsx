"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  PlusCircle,
  MessageSquareQuote,
  Users,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // If on the login page, don't show the admin shell navigation
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#071f16]">{children}</div>;
  }

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/leads", label: "Enquiries & Leads", icon: Inbox },
    { href: "/admin/bookings", label: "All Bookings", icon: CalendarDays },
    { href: "/admin/bookings/new", label: "Add New Booking", icon: PlusCircle },
    { href: "/admin/feedback", label: "Guest Feedback", icon: MessageSquareQuote },
    { href: "/admin/staff", label: "Staff Management", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col md:flex-row text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#092218] text-[#f5f1e8] flex flex-col border-r border-[#c9a961]/20">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a961] to-[#9c7c3c] text-[#092218] font-bold text-lg flex items-center justify-center shadow">
              ✦
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm tracking-wide text-[#e1c781]">
                Hotel Nakshatra
              </h2>
              <p className="text-[10px] text-white/60 tracking-wider uppercase">
                Staff Control Centre
              </p>
            </div>
          </div>
        </div>

        {/* Current user badge */}
        {isClient && userEmail && (
          <div className="px-5 py-3 bg-black/20 text-xs text-white/70 flex items-center justify-between border-b border-white/5">
            <span className="truncate max-w-[170px]" title={userEmail}>
              {userEmail}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-900/60 text-emerald-300 font-medium">
              Active
            </span>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? "bg-[#c9a961] text-[#092218] font-semibold shadow-xs"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="https://www.nakshatrahotel.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-white/60 hover:text-[#e1c781] px-2 py-1.5 rounded transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-950/40 px-2 py-2 rounded transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
