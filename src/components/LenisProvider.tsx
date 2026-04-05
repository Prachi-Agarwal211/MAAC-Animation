"use client";

import { useEffect, useRef } from "react";
import { destroyLenis } from "@/lib/lenis";
import gsap from "@/lib/gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in Strict Mode
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Initialize Lenis (skip on touch devices - already handled in lenis.ts)
    import("@/lib/lenis").then(({ initLenis }) => initLenis());
    const ctx = gsap.context(() => {
      // Global scroll-reveal
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

      // GSAP text reveal for headings - delay until after hydration
      // Use requestAnimationFrame to ensure this runs after React commits
      requestAnimationFrame(() => {
        setTimeout(() => {
          const headings = gsap.utils.toArray<HTMLElement>("[data-splitting]");
          headings.forEach((heading) => {
            if (heading.dataset.splittingDone) return;
            heading.dataset.splittingDone = "true";

            const text = heading.textContent;
            if (!text) return;

            // Clear text content and rebuild with spans
            heading.textContent = "";
            const words = text.split(" ");
            words.forEach((word, index) => {
              const span = document.createElement("span");
              span.className = "word";
              span.style.display = "inline-block";
              span.style.whiteSpace = "nowrap";
              span.textContent = word;
              heading.appendChild(span);

              // Add space between words (except after last word)
              if (index < words.length - 1) {
                heading.appendChild(document.createTextNode(" "));
              }
            });

            const wordElements = heading.querySelectorAll(".word");
            gsap.fromTo(
              wordElements,
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
        }, 0);
      });
    });

    return () => {
      ctx.revert(); // Only kills THIS component's GSAP instances
      destroyLenis(); // Properly destroys lenis singleton
    };
  }, []);

  return <>{children}</>;
}
