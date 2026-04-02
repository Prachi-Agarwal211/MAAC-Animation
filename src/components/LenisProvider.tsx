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
    // Initialize Lenis smooth scroll (GSAP sync is handled in initLenis)
    const lenis = initLenis();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}