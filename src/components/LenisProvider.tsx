"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { destroyLenis } from "@/lib/lenis";
import gsap, { ScrollTrigger } from "@/lib/gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tickerCallback: any;
    
    const init = async () => {
      const { initLenis } = await import("@/lib/lenis");
      const lenis = initLenis();
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        tickerCallback = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);
      }
    };

    init();

    return () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      destroyLenis();
    };
  }, []);

  useGSAP(() => {
    // Global scroll-reveal
    const revealElements = gsap.utils.toArray(".scroll-reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el as Element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el as Element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // CRITICAL: Refresh all ScrollTriggers after initial layout
    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 500);
    window.addEventListener("resize", refresh);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", refresh);
    };
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
