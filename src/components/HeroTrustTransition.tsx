"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  hero: React.ReactNode;
  badges: React.ReactNode;
  stats: React.ReactNode;
};

export default function HeroTrustTransition({ hero, badges, stats }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const videoBg = document.querySelector(".hero-bg-container") as HTMLElement;
      const heroContent = document.querySelector(".hero-content") as HTMLElement;
      const badgesContent = document.querySelector(".trust-badges-content") as HTMLElement;
      const targetBox = document.querySelector("#trust-badges-logo-row") as HTMLElement;
      const targetBoxInner = document.querySelector("#trust-badges-logo-row > div") as HTMLElement;

      if (!videoBg || !heroContent || !badgesContent || !targetBox) return;

      gsap.set(videoBg, { transformOrigin: "top left" });
      gsap.set(badgesContent, { opacity: 0, x: -30 });
      gsap.set(targetBoxInner, { opacity: 0 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Uniform scale — never stretches the video
        const calculateMorph = () => {
          const currentTransform = videoBg.style.transform;
          videoBg.style.transform = "none";
          const vRect = videoBg.getBoundingClientRect();
          const tRect = targetBox.getBoundingClientRect();
          videoBg.style.transform = currentTransform;

          const scale = Math.min(tRect.width / vRect.width, tRect.height / vRect.height);
          const scaledW = vRect.width * scale;
          const scaledH = vRect.height * scale;

          return {
            x: tRect.left - vRect.left + (tRect.width - scaledW) / 2,
            y: tRect.top - vRect.top + (tRect.height - scaledH) / 2,
            scale,
          };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Fade out hero text
        tl.to(heroContent, { opacity: 0, y: -50, duration: 0.2, ease: "power2.in" });

        // 2. Uniform scale morph — single `scale` tween, no distortion
        tl.to(videoBg, {
          x: () => calculateMorph().x,
          y: () => calculateMorph().y,
          scale: () => calculateMorph().scale,
          borderRadius: "24px",
          duration: 0.6,
          ease: "power2.inOut",
        }, "+=0.1");

        // 3. Fade in Trust Badges text
        tl.to(badgesContent, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, "<0.2");

        // 4. Fade in logos inside the target box
        tl.to(targetBoxInner, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, "<0.1");

        // 5. Fade out video so logos and background remain
        tl.to(videoBg, { opacity: 0, duration: 0.2, ease: "none" }, "<0.1");

        // 6. Third act — badges recede, stats pie reveals
        tl.to("#stats-pie-layer", { opacity: 1, duration: 0.3, ease: "power2.out" }, "+=0.2");
        tl.to(badgesContent, { opacity: 0.4, scale: 0.96, duration: 0.3 }, "<");
      });

      mm.add("(max-width: 1023px)", () => {
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
        tl.to("#stats-pie-layer", { opacity: 1, duration: 0.3 }, "+=0.1");
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 z-0">
        {hero}
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
        <div className="pointer-events-auto">
          {badges}
        </div>
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-0" id="stats-pie-layer">
        <div className="pointer-events-auto">{stats}</div>
      </div>
    </div>
  );
}
