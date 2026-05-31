"use client";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
}

/**
 * Reads UTM parameters from the current URL query string.
 * Returns an object with all found UTM params (and click IDs).
 */
export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};

  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ] as const;

  for (const key of keys) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }

  return utm;
}

/**
 * Converts UTM params to a compact string for passing via hidden form fields.
 * Example: "source=facebook&medium=cpc&campaign=summer25"
 */
export function utmParamsToString(utm: UtmParams): string {
  const parts: string[] = [];
  if (utm.utm_source) parts.push(`source=${utm.utm_source}`);
  if (utm.utm_medium) parts.push(`medium=${utm.utm_medium}`);
  if (utm.utm_campaign) parts.push(`campaign=${utm.utm_campaign}`);
  if (utm.utm_content) parts.push(`content=${utm.utm_content}`);
  if (utm.utm_term) parts.push(`term=${utm.utm_term}`);
  if (utm.fbclid) parts.push(`fbclid=${utm.fbclid}`);
  if (utm.gclid) parts.push(`gclid=${utm.gclid}`);
  return parts.join("&");
}
