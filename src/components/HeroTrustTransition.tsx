"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

type Props = {
  hero: React.ReactNode;
};

const certifications = [
  { name: "SKILL INDIA", logo: "/govt/skillIndia.jpg" },
  { name: "MESC", logo: "/govt/mesc.png" },
  { name: "NSDC", logo: "/govt/nsdc.png" },
];

const extendedLogos = [
  ...certifications, ...certifications,
  ...certifications, ...certifications,
];

export default function HeroTrustTransition({ hero }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      let videoBg: HTMLElement | null;
      let heroText: HTMLElement | null;
      try {
        videoBg = document.querySelector(".hero-bg-container") as HTMLElement;
        heroText = document.querySelector(".maacx-content") as HTMLElement;
        if (!videoBg) return;
      } catch { return; }

      gsap.set(videoBg, { transformOrigin: "top left" });
      gsap.set(".morph-badges-text", { opacity: 0, y: 30 });
      gsap.set(".morph-logos", { opacity: 0, y: 20 });

      const mm = gsap.matchMedia();

      // ── Desktop ──
      mm.add("(min-width: 1024px)", () => {
        const getMorphTarget = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const spacer = document.getElementById("morph-card-spacer");
          if (spacer) {
            const sRect = spacer.getBoundingClientRect();
            const scale = sRect.width / vw;
            return { x: sRect.left, y: sRect.top, scale };
          }
          const cardW = Math.min(vw * 0.45, 720);
          return {
            x: (vw - cardW) / 2,
            y: (vh - cardW * 0.5625) / 2 - 40,
            scale: cardW / vw,
          };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        if (heroText) {
          tl.to(heroText, { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, 0);
        }

        tl.to(videoBg, {
          x: () => getMorphTarget().x,
          y: () => getMorphTarget().y,
          scale: () => getMorphTarget().scale,
          borderRadius: "20px",
          duration: 0.7,
          ease: "power2.inOut",
        }, 0.1);

        tl.to(".morph-badges-text", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.55);
        tl.to(".morph-logos", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.6);
      });

      // ── Mobile ──
      mm.add("(max-width: 1023px)", () => {
        const getMobileTarget = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const cardW = vw * 0.88; // 88% viewport width — leaves 6% margin on each side
          return {
            x: (vw - cardW) / 2,
            y: vh * 0.08, // 8% from top — clear of notch/status bar on mobile
            scale: cardW / vw,
          };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 0-20%: hero text fades
        if (heroText) {
          tl.to(heroText, { opacity: 0, y: -20, duration: 0.2 }, 0);
        }

        // 10-65%: video shrinks to card
        tl.to(videoBg, {
          x: () => getMobileTarget().x,
          y: () => getMobileTarget().y,
          scale: () => getMobileTarget().scale,
          borderRadius: "14px",
          duration: 0.55,
        }, 0.1);

        // 45-75%: badges text fades in
        tl.to(".morph-badges-text", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.45);

        // 50-80%: logos fade in
        tl.to(".morph-logos", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.5);
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
      <div id="hero" ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-transparent">
      {/* Hero layer */}
      <div className="absolute inset-0 z-0">
        {hero}
      </div>

      {/* Morphed content layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Desktop */}
        <div className="hidden lg:flex w-full h-full items-center justify-center px-20 gap-16 max-w-[1800px] mx-auto">
          <div className="morph-badges-text w-[35%] flex flex-col items-start shrink-0 pointer-events-auto">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-[1px] metallic-gold-accent" />
              <span className="metallic-gold-text-sm text-[11px] font-bold tracking-[0.25em] uppercase">
                Govt Affiliated &amp; Recognized
              </span>
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] uppercase mb-6">
              <span className="block text-white/90 tracking-[0.15em]">RECOGNIZED</span>
              <span className="block metallic-gold-text italic tracking-normal">EXCELLENCE</span>
            </h2>
            <div className="flex flex-row items-center gap-4">
              <div className="w-[1px] h-6 metallic-gold-accent" />
              <p className="text-white text-lg md:text-xl font-bold tracking-wide">
                Industry aligned. Future focused.
              </p>
            </div>
          </div>
          <div id="morph-card-spacer" className="w-[45%] aspect-video rounded-[20px]" />
        </div>

        {/* Mobile — text below video card with gradient scrim */}
        <div className="flex lg:hidden w-full h-full flex-col">
          {/* Spacer for video card area */}
          <div className="h-[55svh] shrink-0" />
          <div className="relative flex-1 flex flex-col justify-start px-5 pt-6 pb-20 pointer-events-none">
            <div className="morph-badges-text pointer-events-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-[1px] metallic-gold-accent" />
                <span className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.25em] uppercase">
                  Govt Affiliated &amp; Recognized
                </span>
              </div>
              <h2 className="font-display font-bold text-[clamp(1.8rem,6vw,2.5rem)] leading-[1.1] uppercase mb-4">
                <span className="block text-white tracking-[0.15em]">RECOGNIZED</span>
                <span className="block metallic-gold-text italic tracking-normal">EXCELLENCE</span>
              </h2>
              <p className="text-white/80 text-sm font-bold tracking-wide">
                Industry aligned. Future focused.
              </p>
            </div>
          </div>
        </div>

        {/* Logos — full-width marquee */}
        <div className="morph-logos absolute bottom-0 left-0 right-0 pointer-events-auto opacity-0 translate-y-2 overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-6 md:gap-8 w-max animate-marquee py-4 md:py-6">
            {extendedLogos.map((cert, i) => (
              <div
                key={`${cert.name}-${i}`}
                className="flex-shrink-0 w-[110px] h-[60px] md:w-[140px] md:h-[76px] rounded-xl bg-white border border-white/10 flex items-center justify-center p-2 shadow-lg"
              >
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={100}
                  height={54}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
