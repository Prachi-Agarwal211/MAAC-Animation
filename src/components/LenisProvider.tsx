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
    const lenis = initLenis();

    // Global scroll-reveal: any element with .scroll-reveal class fades up on enter
    const revealElements = gsap.utils.toArray(".scroll-reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el as Element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as Element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
