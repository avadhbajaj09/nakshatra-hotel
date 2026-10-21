import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabaseUser = await createClient();
    const {
      data: { user },
    } = await supabaseUser.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const todayStr = new Date().toISOString().slice(0, 10);
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

    const [
      checkInsRes,
      checkOutsRes,
      activeBookingsRes,
      newLeadsRes,
      unattendedLeadsRes,
      recentLeadsRes,
      recentBookingsRes,
    ] = await Promise.all([
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("check_in_date", todayStr)
        .neq("status", "cancelled"),
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("check_out_date", todayStr)
        .neq("status", "cancelled"),
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .neq("status", "cancelled"),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new")
        .lt("manager_notified_at", twoHoursAgo),
      supabase
        .from("leads")
        .select("id, name, phone_digits, phone_e164, type, details, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("bookings")
        .select("id, reference, guest_name, phone_digits, phone_e164, room_name, check_in_date, check_out_date, status, total")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

    return NextResponse.json({
      stats: {
        todayCheckIns: checkInsRes.count || 0,
        todayCheckOuts: checkOutsRes.count || 0,
        totalBookings: activeBookingsRes.count || 0,
        newLeads: newLeadsRes.count || 0,
        unattendedLeads: unattendedLeadsRes.count || 0,
      },
      recentLeads: recentLeadsRes.data || [],
      recentBookings: recentBookingsRes.data || [],
    });
  } catch (err: unknown) {
    console.error("[api/admin/stats] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
