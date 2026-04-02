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

    // Simple GSAP text reveal for headings with [data-splitting] attribute
    // (Replaced Splitting.js to avoid SSR issues and memory leaks)
    if (typeof window !== "undefined") {
      const headings = gsap.utils.toArray<HTMLElement>("[data-splitting]");
      headings.forEach((heading) => {
        // Wrap text content in spans for animation (simple approach without Splitting.js)
        const text = heading.textContent;
        heading.innerHTML = text
          ?.split(" ")
          .map((word) => `<span class="word" style="display:inline-block; white-space:nowrap;">${word}</span>`)
          .join(" ") || "";

        const words = heading.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    return () => {
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
      // Kill any pending text reveal animations
      gsap.killTweensOf("[data-splitting]");
      gsap.killTweensOf(".word");
    };
  }, []);

  return <>{children}</>;
}
