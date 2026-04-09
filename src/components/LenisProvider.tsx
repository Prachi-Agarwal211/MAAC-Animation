"use client";

import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Lenis ONCE - let lenis.ts handle all setup
  useEffect(() => {
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  useGSAP(() => {
    // CRITICAL: Refresh all ScrollTriggers after initial layout
    // Single refresh point - no duplication
    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 300);
    
    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 200);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Don't wrap in a div - just render children directly in the document flow
  return <>{children}</>;
}
