/**
 * Unified tracking utility for MAAC Jaipur.
 * Meta/custom events respect cookie consent.
 * Google Ads named conversions always fire — India DPDP does not require
 * prior consent for first-party ad conversion pings, and Ads attribution
 * breaks if the banner is ignored.
 */
import { hasAnalyticsConsent, hasMarketingConsent } from "./cookie-consent";
import { GOOGLE_ADS_ID } from "./google-ads";

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

    // Generic lead ping (named conversions use fireGoogleAdsConversion)
    if (typeof w?.gtag === "function") {
      const allowedParams: Record<string, unknown> = {
        content_name: event.content_name,
        content_category: event.content_category,
      };
      if (event.value !== undefined) allowedParams.value = event.value;
      if (event.currency !== undefined) allowedParams.currency = event.currency;
      w.gtag("event", "generate_lead", {
        send_to: GOOGLE_ADS_ID,
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

/**
 * Fire a named Google Ads conversion (Get Directions / WhatsApp / Lead Form).
 * Does not wait for the cookie banner — Ads conversions must fire on click.
 */
export function fireGoogleAdsConversion(send_to: string, eventParams?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    const gtag = (window as WindowWithTracking).gtag;
    if (typeof gtag === "function") {
      gtag("event", "conversion", { send_to, ...(eventParams ?? {}) });
    }
  } catch (e) {
    console.error("fireGoogleAdsConversion error:", e instanceof Error ? e.message : e);
  }
}
