"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [email, setEmail] = useState("nakshtraweddings@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid credentials. Please try again.");
        return;
      }

      if (data?.user) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0d2a1f]/90 border border-[#c9a961]/30 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#c9a961] to-[#9c7c3c] flex items-center justify-center text-[#092218] font-bold text-2xl shadow-lg">
          ✦
        </div>
        <h1 className="font-serif text-2xl font-bold tracking-wide text-[#e1c781]">
          Nakshatra Control Centre
        </h1>
        <p className="text-xs text-slate-300/70 mt-1">
          Hotel &amp; Resort, Khargone · Staff Sign In
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Staff Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@nakshatrahotel.in"
              className="w-full bg-black/30 border border-slate-700 focus:border-[#c9a961] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/30 border border-slate-700 focus:border-[#c9a961] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#c9a961] to-[#b38e4a] hover:from-[#d4af37] hover:to-[#c9a961] text-[#092218] font-semibold text-xs tracking-wider uppercase rounded-xl transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing In…</span>
            </>
          ) : (
            <span>Sign In to Control Centre</span>
          )}
        </button>
      </form>

      <p className="text-center text-[11px] text-slate-400/60 mt-6">
        Access restricted to authorized Nakshatra Hotel &amp; Resort management and front desk staff.
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#071f16] via-[#092218] to-[#04130d] text-slate-100">
      <Suspense fallback={<div className="text-xs text-[#c9a961] flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
