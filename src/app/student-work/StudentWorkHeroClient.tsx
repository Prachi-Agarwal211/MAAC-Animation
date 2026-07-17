"use client";

import { ReactNode } from "react";

export default function StudentWorkHeroClient({ children }: { children: ReactNode }) {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      <style>{`.animate-in { animation: fadeUp 0.8s ease forwards; } .animate-in:nth-child(2) { animation-delay: 0.15s; } .animate-in:nth-child(3) { animation-delay: 0.3s; } @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {children}
    </section>
  );
}
