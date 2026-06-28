"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Initialize Lenis ONCE - let lenis.ts handle all setup
  useEffect(() => {
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useGSAP(() => {
    // CRITICAL: Refresh all ScrollTriggers after initial layout
    // Single refresh point - no duplication
    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 500);
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 500);
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
