/**
 * Cookie Consent Utility — DPDPA / GDPR compliant
 * Categories: necessary, analytics, marketing
 * Stores consent in localStorage with expiry
 */

const CONSENT_KEY = 'maac_cookie_consent';
const CONSENT_EXPIRY_DAYS = 180;

export interface CookieConsent {
  necessary: boolean;  // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: Date.now(),
};

export function getConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as CookieConsent;
    // Check expiry
    const age = Date.now() - parsed.timestamp;
    if (age > CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(consent: Omit<CookieConsent, 'necessary' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  const full: CookieConsent = {
    ...defaultConsent,
    ...consent,
    timestamp: Date.now(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
  } catch {}
}

export function hasConsent(): boolean {
  return getConsent() !== null;
}

export function hasAnalyticsConsent(): boolean {
  const c = getConsent();
  return c?.analytics ?? false;
}

export function hasMarketingConsent(): boolean {
  const c = getConsent();
  return c?.marketing ?? false;
}

export function revokeConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {}
}
