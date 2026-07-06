"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

type Props = {
  hero: React.ReactNode;
};

const certifications = [
  { id: "cert-1", name: "SKILL INDIA", logo: "/govt/skillIndia.jpg" },
  { id: "cert-2", name: "MESC", logo: "/govt/mesc.png" },
  { id: "cert-3", name: "NSDC", logo: "/govt/nsdc.png" },
  { id: "cert-4", name: "SKILL INDIA", logo: "/govt/skillIndia.jpg" },
  { id: "cert-5", name: "MESC", logo: "/govt/mesc.png" },
];

export default function HeroTrustTransition({ hero }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const videoBg = document.querySelector(".hero-bg-container") as HTMLElement;
      const heroText = document.querySelector(".maacx-content") as HTMLElement;

      if (!videoBg) return;

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
          const cardW = vw * 0.85;
          return {
            x: (vw - cardW) / 2,
            y: vh * 0.1,
            scale: cardW / vw,
          };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
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
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-transparent">
      {/* Hero layer — video + hero text */}
      <div className="absolute inset-0 z-0">
        {hero}
      </div>

      {/* Morphed content layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Desktop: text left, card spacer right */}
        <div className="hidden lg:flex w-full h-full items-center justify-center px-20 gap-16 max-w-[1800px] mx-auto">
          <div className="morph-badges-text w-[35%] flex flex-col items-start shrink-0 pointer-events-auto opacity-0 translate-y-4">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-[1px] metallic-gold-accent" />
              <span className="metallic-gold-text text-[11px] font-bold tracking-[0.25em] uppercase">
                Govt Affiliated &amp; Recognized
              </span>
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,6vw,4.5rem)] leading-[1.1] uppercase mb-8">
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

        {/* Mobile: text at bottom, card above */}
        <div className="flex lg:hidden w-full h-full flex-col justify-end px-5 pb-[40%]">
          <div className="morph-badges-text pointer-events-auto opacity-0 translate-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-[1px] metallic-gold-accent" />
              <span className="metallic-gold-text text-[10px] font-bold tracking-[0.25em] uppercase">
                Govt Affiliated &amp; Recognized
              </span>
            </div>
            <h2 className="font-display font-bold text-[clamp(1.8rem,6vw,2.5rem)] leading-[1.1] uppercase mb-5">
              <span className="block text-white/90 tracking-[0.15em]">RECOGNIZED</span>
              <span className="block metallic-gold-text italic tracking-normal">EXCELLENCE</span>
            </h2>
            <p className="text-white text-sm font-bold tracking-wide">
              Industry aligned. Future focused.
            </p>
          </div>
        </div>

        {/* Logos — both breakpoints */}
        <div className="morph-logos absolute bottom-12 md:bottom-20 left-0 right-0 px-5 pointer-events-auto opacity-0 translate-y-2">
          <div className="relative flex max-w-[1600px] mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-8 sm:gap-16 py-4 items-center hover:[animation-play-state:paused]">
              {[...certifications, ...certifications, ...certifications, ...certifications].map((cert, i) => (
                <div
                  key={`${cert.id}-${i}`}
                  className="shrink-0 flex items-center justify-center bg-white aspect-square w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-xl md:rounded-2xl p-2 md:p-3 shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    width={120}
                    height={120}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
