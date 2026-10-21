import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | undefined;

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) throw new Error("Supabase server configuration is missing.");
  adminClient ??= createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return adminClient;
}

export function jsonError(error: unknown, status = 500) {
  return Response.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status });
}

export function throwIfSupabaseError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}
