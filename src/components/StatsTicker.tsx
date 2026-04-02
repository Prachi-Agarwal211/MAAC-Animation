"use client";

import { useRef } from "react";

export default function StatsTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    "95% Placement Rate",
    "30+ Years of Excellence",
    "500+ Partner Companies",
    "50K+ Alumni Network",
    "NSDC Certified",
    "B.Voc Degree Available",
  ];

  const doubledStats = [...stats, ...stats];

  return (
    <div ref={containerRef} className="stats-ticker-bar py-3">
      <div className="animate-marquee-fast flex items-center gap-8 whitespace-nowrap">
        {doubledStats.map((stat, index) => (
          <span
            key={index}
            className="flex items-center gap-4 text-white font-semibold text-sm tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-white/60 flex-shrink-0" />
            {stat}
          </span>
        ))}
      </div>
    </div>
  );
}
