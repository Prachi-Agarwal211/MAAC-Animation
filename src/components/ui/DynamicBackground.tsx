"use client";

import React from "react";

/**
 * Simplified background — no more heavy Three.js fluid shader (was problematic for perf,
 * battery, bundle size, mobile, reduced-motion, and visual consistency with our
 * "proper defined" foreground images in courses/creative-evolution).
 *
 * Uses a deep consistent dark radial + the existing subtle animated mesh/atmosphere
 * layers (CSS only, cheap, always on). Grain overlay lives separately in layout.
 * This provides a clean, predictable canvas so the course promo images, creative
 * evolution feature images, glass cards, etc. pop correctly everywhere.
 */
export default function DynamicBackground() {
  return (
    <>
      {/* Base deep dark canvas - consistent across all pages and viewports */}
      <div
        className="fixed inset-0 z-[-20] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 15% 50%, #1a0101 0%, #050000 65%, #020202 100%)',
          backgroundColor: '#050000',
        }}
      />
      {/* Subtle drifting warm atmosphere (CSS, no JS cost, low opacity) */}
      <div className="fixed inset-0 z-[-10] animated-bg opacity-15 pointer-events-none" />
      {/* Extra subtle mesh variant for depth on some areas */}
      <div className="fixed inset-0 z-[-15] animated-mesh-bg opacity-10 pointer-events-none" />
    </>
  );
}
