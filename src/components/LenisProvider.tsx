"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();

    // Expose ScrollTrigger to window for lenis.ts
    if (typeof window !== "undefined") {
      (window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
    }

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
