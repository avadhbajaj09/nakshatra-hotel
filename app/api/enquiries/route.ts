import { getSupabaseAdmin, jsonError, throwIfSupabaseError } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string>;
    if (!body.name?.trim() || !body.phone?.trim()) {
      return Response.json({ error: "Name and phone number are required." }, { status: 400 });
    }
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("enquiries").insert({ type: body.type || "general", name: body.name, phone: body.phone, email: body.email || "", preferred_date: body.preferredDate || null, message: body.message || "", source: body.source || "Website Direct" });
    throwIfSupabaseError(error);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
