"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "@/lib/gsap";

export default function StudentWorkHeroClient({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      {children}
    </section>
  );
}
