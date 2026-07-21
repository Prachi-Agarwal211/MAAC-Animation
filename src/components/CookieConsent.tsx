"use client";

import { useState, useEffect, useCallback } from "react";
import { getConsent, setConsent, revokeConsent } from "@/lib/cookie-consent";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent already given
    const existing = getConsent();
    if (!existing) {
      // Show banner after a small delay for hero to load first
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    setConsent({ analytics: true, marketing: true });
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    setConsent({ analytics: false, marketing: false });
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    setConsent(preferences);
    setVisible(false);
  }, [preferences]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none"
      style={{ bottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div className="relative rounded-2xl bg-[#0C0C0C]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Accent bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#C4A882] via-[#BF953F] to-[#C4A882] opacity-60" />

          <div className="p-5 md:p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-white text-sm font-bold uppercase tracking-[0.1em]">
                  🍪 Cookie Preferences
                </h3>
                <p className="text-white/60 text-xs mt-1 leading-relaxed">
                  We use cookies to enhance your experience, analyze traffic, and personalize content.
                </p>
              </div>
              <button
                onClick={handleRejectAll}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all shrink-0"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>

            {/* Details / toggles */}
            {showDetails && (
              <div className="space-y-3 mb-5 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white text-xs font-semibold">Essential</p>
                    <p className="text-white/40 text-[10px]">Required for basic site functionality</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-wider">
                    Always On
                  </span>
                </div>
                <label className="flex items-center justify-between py-2 cursor-pointer group">
                  <div>
                    <p className="text-white text-xs font-semibold group-hover:text-[#C4A882] transition-colors">Analytics</p>
                    <p className="text-white/40 text-[10px]">Anonymous usage data to improve the site</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))}
                      className="sr-only peer"
                      id="cookie-analytics"
                    />
                    <div className="w-10 h-5 rounded-full bg-white/10 peer-checked:bg-[#C4A882]/40 transition-colors cursor-pointer" />
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white/50 peer-checked:bg-[#C4A882] peer-checked:translate-x-5 transition-all duration-300 shadow-sm`} />
                  </div>
                </label>
                <label className="flex items-center justify-between py-2 cursor-pointer group">
                  <div>
                    <p className="text-white text-xs font-semibold group-hover:text-[#C4A882] transition-colors">Marketing</p>
                    <p className="text-white/40 text-[10px]">Personalized ads and social media tracking</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(p => ({ ...p, marketing: e.target.checked }))}
                      className="sr-only peer"
                      id="cookie-marketing"
                    />
                    <div className="w-10 h-5 rounded-full bg-white/10 peer-checked:bg-[#C4A882]/40 transition-colors cursor-pointer" />
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white/50 peer-checked:bg-[#C4A882] peer-checked:translate-x-5 transition-all duration-300 shadow-sm`} />
                  </div>
                </label>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors"
              >
                {showDetails ? "← Simpler View" : "Customize →"}
              </button>
              <div className="flex items-center gap-2">
                {showDetails ? (
                  <button
                    onClick={handleSavePreferences}
                    className="px-5 py-2.5 rounded-full bg-[#C4A882] text-black text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#BF953F] transition-all active:scale-[0.97]"
                  >
                    Save Preferences
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleRejectAll}
                      className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-[0.15em] hover:text-white hover:border-white/20 transition-all active:scale-[0.97]"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-2.5 rounded-full bg-[#C4A882] text-black text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#BF953F] transition-all active:scale-[0.97]"
                    >
                      Accept All
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Footer link */}
            <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
              <a
                href="/privacy-policy"
                className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </a>
              <p className="text-[8px] text-white/20">Consent stored locally for 180 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Persistent widget to let users revoke / change consent anytime.
 * Renders as a small floating button after initial consent is given.
 */
export function ConsentRevokeWidget() {
  const [showRevoke, setShowRevoke] = useState(false);

  useEffect(() => {
    // Show revoke widget only after consent was given
    const check = setTimeout(() => {
      const existing = getConsent();
      setShowRevoke(existing !== null);
    }, 5000);
    return () => clearTimeout(check);
  }, []);

  if (!showRevoke) return null;

  return (
    <button
      onClick={() => {
        revokeConsent();
        window.location.reload();
      }}
      className="fixed bottom-4 left-4 z-[100] w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all backdrop-blur-md"
      aria-label="Change cookie preferences"
      title="Cookie Settings"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
        <path d="M11 17v.01" />
        <path d="M7 14v.01" />
      </svg>
    </button>
  );
}
