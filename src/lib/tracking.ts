/**
 * Unified tracking utility for MAAC Jaipur.
 * Always checks cookie consent before firing events.
 */
import { hasAnalyticsConsent, hasMarketingConsent } from "./cookie-consent";

type WindowWithTracking = Window & {
  fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
  gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  dataLayer?: unknown[];
};

interface TrackEvent {
  content_name: string;
  content_category: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

const w = typeof window !== "undefined" ? (window as WindowWithTracking) : null;

/**
 * Track a conversion/lead event.
 * Only fires if marketing consent has been given.
 */
export function trackLead(event: TrackEvent): void {
  if (typeof window === "undefined") return;
  if (!hasMarketingConsent()) {
    return;
  }

  try {
    // Meta Pixel (fbq)
    if (typeof w?.fbq === "function") {
      w.fbq("track", "Lead", event);
    }

    // Google Ads gtag - only allow whitelisted params
    if (typeof w?.gtag === "function") {
      const allowedParams: Record<string, unknown> = {
        content_name: event.content_name,
        content_category: event.content_category,
      };
      if (event.value !== undefined) allowedParams.value = event.value;
      if (event.currency !== undefined) allowedParams.currency = event.currency;
      w.gtag("event", "conversion", {
        send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
        ...allowedParams,
      });
    }
  } catch (e) {
    console.error("trackLead error:", e instanceof Error ? e.message : e);
  }
}

/**
 * Track a page view / visit.
 * Only fires if analytics consent has been given.
 */
export function trackPageView(_path: string): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) {
    return;
  }

  try {
    if (typeof w?.fbq === "function") {
      w.fbq("track", "PageView");
    }
  } catch (e) {
    console.error("trackPageView error:", e instanceof Error ? e.message : e);
  }
}

/**
 * Track a custom event (e.g., form start, video play).
 * Only fires if marketing consent has been given.
 */
export function trackCustomEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!hasMarketingConsent()) return;

  try {
    if (typeof w?.fbq === "function") {
      w.fbq("trackCustom", eventName, params);
    }
    if (typeof w?.gtag === "function") {
      w.gtag("event", eventName, params);
    }
  } catch (e) {
    console.error("trackCustomEvent error:", e instanceof Error ? e.message : e);
  }
}
