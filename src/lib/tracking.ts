/**
 * Unified Tracking Utility for Meta Ads + Google Ads
 *
 * This centralizes event firing so you only call one function
 * and it handles both platforms + UTM enrichment.
 */

import { firePixelEvent } from "@/components/MetaPixel";
import { getUtmParams, type UtmParams } from "@/lib/utm";

export interface LeadEventParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

/**
 * Fire a "Lead" conversion event to all connected ad platforms.
 * Call this after a successful form submission.
 */
export function trackLead(params: LeadEventParams = {}) {
  const utm = getUtmParams();

  const enrichedParams = {
    ...params,
    // UTM & click ID enrichment (very important for ad attribution)
    ...utm,
    // Add page context
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  };

  // 1. Meta Pixel (client-side)
  firePixelEvent("Lead", enrichedParams);

  // 2. Google Ads / GA4 via GTM dataLayer (if GTM is present)
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "generate_lead",
      ...enrichedParams,
    });

    // Direct Google Ads conversion (if you configured a conversion ID without GTM)
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
    const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

    if (adsId) {
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        gtag("event", "conversion", {
          send_to: adsLabel ? `${adsId}/${adsLabel}` : adsId,
          value: params.value || 1,
          currency: params.currency || "INR",
        });
      }
    }
  }

  // Note: Server-side Meta CAPI is already called from the form actions.ts / API route.
  // Do NOT call CAPI from client for security (access token must stay server-only).
}

/**
 * Generic event tracker (for future use: ViewContent, AddToCart, Contact, etc.)
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  const utm = getUtmParams();

  // Meta
  firePixelEvent(eventName, { ...params, ...utm });

  // Google / GTM
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName.toLowerCase().replace(/\s+/g, "_"),
      ...params,
      ...utm,
    });
  }
}

// Extend Window for TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}
