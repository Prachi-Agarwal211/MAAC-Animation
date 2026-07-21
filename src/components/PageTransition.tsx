"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap, { ScrollTrigger } from "@/lib/gsap";

/**
 * GSAP-powered page transition wrapper for MAAC.
 * Uses smooth fade+scale on route changes without flash/flicker.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Set initial state instantly — no flash
      gsap.set(el, { opacity: 1 });
      // Smooth fade in from translucent state (avoids white flash)
      gsap.fromTo(el, { opacity: 0.85 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      return;
    }

    // Route change — cinematic scale+fade reveal
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.97, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "expo.out",
        clearProps: "scale,y",
        onStart: () => { ScrollTrigger.refresh(); },
      }
    );
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
