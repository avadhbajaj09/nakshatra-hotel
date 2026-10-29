"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * AnalyticsTracker sitewide client component.
 * - Tracks 'view_banquet' when visiting banquet or wedding pages
 * - Uses event delegation to reliably capture:
 *   - click_call (tel: links)
 *   - click_whatsapp (wa.me / WhatsApp links)
 *   - click_directions (google maps / directions links)
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  // Pageview-based conversion tracking
  useEffect(() => {
    if (!pathname) return;

    if (
      pathname === "/banquet-hall" ||
      pathname === "/wedding" ||
      pathname === "/wedding-hall" ||
      pathname === "/wedding-garden"
    ) {
      trackEvent("view_banquet", { path: pathname });
    }
  }, [pathname]);

  // Click delegation for conversions
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";

      // 1. Phone Call Clicks
      if (href.startsWith("tel:")) {
        trackEvent("click_call", {
          phone: href.replace("tel:", ""),
          text: anchor.innerText?.trim() || "Call Button",
          page: window.location.pathname,
        });
        return;
      }

      // 2. WhatsApp Clicks
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        trackEvent("click_whatsapp", {
          url: href,
          text: anchor.innerText?.trim() || "WhatsApp Button",
          page: window.location.pathname,
        });
        return;
      }

      // 3. Directions & Map Clicks
      if (
        href.includes("maps.google.com") ||
        href.includes("maps.app.goo.gl") ||
        href.includes("google.com/maps") ||
        href === "/directions"
      ) {
        trackEvent("click_directions", {
          url: href,
          page: window.location.pathname,
        });
        return;
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
