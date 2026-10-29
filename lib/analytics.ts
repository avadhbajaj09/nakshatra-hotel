/**
 * Google Analytics 4 (GA4) event helper
 */

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-Q1P1VH2VET";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export type GAEventAction =
  | "click_call"
  | "click_whatsapp"
  | "click_directions"
  | "submit_enquiry"
  | "view_banquet"
  | string;

export function trackEvent(
  action: GAEventAction,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}
