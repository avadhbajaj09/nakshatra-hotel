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
    const { data: staffList, error } = await supabase
      .from("staff")
      .select("id, name, email, role, active, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ staff: staffList || [] });
  } catch (err: unknown) {
    console.error("[api/admin/staff] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabaseUser = await createClient();
    const {
      data: { user },
    } = await supabaseUser.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.email || !body.name || !body.password) {
      return NextResponse.json(
        { error: "Name, email, and temporary password are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // 1. Create user in Supabase Auth
    const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
      email: body.email.trim(),
      password: body.password,
      email_confirm: true,
      user_metadata: { name: body.name },
    });

    if (authErr || !authData.user) {
      return NextResponse.json({ error: authErr?.message || "Failed to create user" }, { status: 400 });
    }

    // 2. Insert into staff table
    const { error: staffErr } = await supabase.from("staff").insert({
      id: authData.user.id,
      name: body.name.trim(),
      email: body.email.trim(),
      role: body.role || "frontdesk",
      active: true,
    });

    if (staffErr) {
      return NextResponse.json({ error: staffErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, staffId: authData.user.id });
  } catch (err: unknown) {
    console.error("[api/admin/staff] POST Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const supabaseUser = await createClient();
    const {
      data: { user },
    } = await supabaseUser.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.id) {
      return NextResponse.json({ error: "Staff ID is required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (typeof body.active === "boolean") updates.active = body.active;
    if (body.role) updates.role = body.role;

    const { error } = await supabase
      .from("staff")
      .update(updates)
      .eq("id", body.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
