"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP-powered page transition wrapper for MAAC.
 * Cinematic scale+fade reveal on route changes.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      return;
    }

    const el = ref.current;
    if (!el) return;

    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.97, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "expo.out", clearProps: "all", onComplete: () => ScrollTrigger.refresh() }
        );
      });
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.97, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "expo.out", clearProps: "all", onComplete: () => ScrollTrigger.refresh() }
      );
    }
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
