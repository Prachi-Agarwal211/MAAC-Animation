"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  hero: React.ReactNode;
  badges: React.ReactNode;
};

export default function HeroTrustTransition({ hero, badges }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    // Wait for Next.js to render everything
    const ctx = gsap.context(() => {
      const videoBg = document.querySelector(".hero-bg-container") as HTMLElement;
      const heroContent = document.querySelector(".hero-content") as HTMLElement;
      const badgesContent = document.querySelector(".trust-badges-content") as HTMLElement;
      const targetBox = document.querySelector("#trust-badges-logo-row") as HTMLElement;
      const targetBoxInner = document.querySelector("#trust-badges-logo-row > div") as HTMLElement;

      if (!videoBg || !heroContent || !badgesContent || !targetBox) return;

      // Ensure transform origin is top left for accurate scaling
      gsap.set(videoBg, { transformOrigin: "top left" });
      
      // Hide badges stuff initially
      gsap.set(badgesContent, { opacity: 0, x: -30 });
      gsap.set(targetBoxInner, { opacity: 0 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Calculate the destination metrics for the video
        const calculateMorph = () => {
          // Reset transforms temporarily to get accurate rects if resizing
          const currentTransform = videoBg.style.transform;
          videoBg.style.transform = "none";
          
          const vRect = videoBg.getBoundingClientRect();
          const tRect = targetBox.getBoundingClientRect();
          
          videoBg.style.transform = currentTransform;

          return {
            x: tRect.left - vRect.left,
            y: tRect.top - vRect.top,
            scaleX: tRect.width / vRect.width,
            scaleY: tRect.height / vRect.height,
          };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%", // Pin for 1.5x screen height
            pin: true,
            pinSpacing: true, // We want space because we are completely replacing the scroll flow
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Fade out hero text
        tl.to(heroContent, {
          opacity: 0,
          y: -50,
          duration: 0.2,
          ease: "power2.in",
        });

        // 2. Morph the video into the target box shape
        // Using function to allow invalidateOnRefresh to recalculate on resize
        tl.to(videoBg, {
          x: () => calculateMorph().x,
          y: () => calculateMorph().y,
          scaleX: () => calculateMorph().scaleX,
          scaleY: () => calculateMorph().scaleY,
          borderRadius: "24px",
          duration: 0.6,
          ease: "power2.inOut",
        }, "+=0.1");

        // 3. Fade in Trust Badges text on the left
        tl.to(badgesContent, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        }, "<0.2"); // Start slightly after the video morph starts

        // 4. Fade in the actual logos inside the target box (and optionally fade out video if needed, but user wants morph)
        tl.to(targetBoxInner, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        }, "<0.1");

        // 5. Fade out the video so the actual logos and background remain
        tl.to(videoBg, {
          opacity: 0,
          duration: 0.2,
          ease: "none",
        }, "<0.1");
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile fallback - simpler sequence
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
          },
        });
        
        tl.to(heroContent, { opacity: 0, y: -20, duration: 0.3 });
        tl.to(videoBg, { opacity: 0, duration: 0.3 });
        tl.to(badgesContent, { opacity: 1, x: 0, duration: 0.3 });
        tl.to(targetBoxInner, { opacity: 1, duration: 0.3 }, "<");
      });

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-[#080808]">
      {/* Both components render stacked on top of each other in the same space */}
      <div className="absolute inset-0 z-0">
        {hero}
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
        {/* Pointer events auto so links/buttons work after it reveals */}
        <div className="pointer-events-auto">
          {badges}
        </div>
      </div>
    </div>
  );
}
