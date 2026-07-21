"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"opening" | "closing" | "idle">("opening");

  useEffect(() => {
    setPhase("opening");
    const timer = window.setTimeout(() => setPhase("idle"), 760);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || ["mailto:", "tel:"].includes(url.protocol)) return;
      event.preventDefault();
      setPhase("closing");
      window.setTimeout(() => router.push(`${url.pathname}${url.search}${url.hash}`), 430);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return <div className={`page-transition ${phase}`} aria-hidden="true"><div className="transition-panel transition-panel-left"/><div className="transition-panel transition-panel-right"/><div className="transition-mark"><img src="/images/nakshatra-official-logo.jpg" alt=""/><span>Khargone · Madhya Pradesh</span></div></div>;
}
