"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const logosRef = useRef<HTMLDivElement>(null);

  const scrollLogos = (dir: number) => {
    logosRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  useGSAP(() => {
    if (!containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const videoBg = document.querySelector(".hero-bg-container") as HTMLElement;
      const heroText = document.querySelector(".maacx-content") as HTMLElement;
      const heroVideoEl = videoBg?.querySelector("video") as HTMLVideoElement | null;

      if (!videoBg) return;

      gsap.set(videoBg, { transformOrigin: "top left" });
      gsap.set(".morph-badges-text", { opacity: 0, x: -40 });
      gsap.set(".morph-logos", { opacity: 0, y: 30 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getMorphTarget = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const spacer = document.getElementById("morph-card-spacer");
          
          if (spacer && window.getComputedStyle(spacer).display !== 'none') {
            const sRect = spacer.getBoundingClientRect();
            // Need to account for the video being full width (vw) scaling down to sRect.width
            const scale = sRect.width / vw;
            return {
              x: sRect.left,
              y: sRect.top,
              scale: scale,
            };
          }

          // Fallback to centered if spacer not visible
          const cardW = Math.min(vw * 0.45, 720);
          const cardH = cardW * 0.5625;
          return {
            x: (vw - cardW) / 2,
            y: (vh - cardH) / 2 - 40,
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

        // 0-25%: hero text fades out
        if (heroText) {
          tl.to(heroText, { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, 0);
        }

        // 10-80%: video shrinks to card
        tl.to(videoBg, {
          x: () => getMorphTarget().x,
          y: () => getMorphTarget().y,
          scale: () => getMorphTarget().scale,
          borderRadius: () => `${20 / getMorphTarget().scale}px`,
          duration: 0.7,
          ease: "power2.inOut",
        }, 0.1);

        // 55-85%: badges text appears left
        tl.to(".morph-badges-text", { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 0.55);

        // 60-90%: logos appear below
        tl.to(".morph-logos", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.6);
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
          },
        });

        const getMobileTarget = () => {
          const vw = window.innerWidth;
          const cardW = vw * 0.85;
          return {
            x: (vw - cardW) / 2,
            y: 50,
            scale: cardW / vw,
          };
        };

        if (heroText) {
          tl.to(heroText, { opacity: 0, y: -20, duration: 0.25 }, 0);
        }

        tl.to(videoBg, {
          x: () => getMobileTarget().x,
          y: () => getMobileTarget().y,
          scale: () => getMobileTarget().scale,
          borderRadius: () => `${20 / getMobileTarget().scale}px`,
          duration: 0.7,
        }, 0.1);

        tl.to(".morph-badges-text", { opacity: 1, x: 0, duration: 0.3 }, 0.55);
        tl.to(".morph-logos", { opacity: 1, y: 0, duration: 0.3 }, 0.6);
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

      {/* Morphed content layer — appears around the card */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-5 md:px-12 lg:px-20 gap-8 lg:gap-16 max-w-[1800px] mx-auto">
          {/* Left: badges text */}
          <div className="morph-badges-text w-full lg:w-[35%] flex flex-col items-start shrink-0 pointer-events-auto">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-[1px] metallic-gold-accent" />
              <span className="metallic-gold-text text-[11px] font-bold tracking-[0.25em] uppercase">
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

          {/* Spacer for card area */}
          <div id="morph-card-spacer" className="hidden lg:block lg:w-[45%] aspect-video rounded-[20px]" />
        </div>

        {/* Bottom: infinite logo marquee */}
        <div className="morph-logos absolute bottom-8 left-0 right-0 pointer-events-auto overflow-hidden opacity-0 translate-y-4">
          <div className="relative flex max-w-[1400px] mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-16 sm:gap-24 py-4 items-center">
              {[...certifications, ...certifications, ...certifications, ...certifications].map((cert, i) => (
                <div
                  key={`${cert.id}-${i}`}
                  className="shrink-0 flex items-center justify-center w-[160px] h-[90px] md:w-[220px] md:h-[110px] bg-white rounded-2xl p-4 shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    width={180}
                    height={80}
                    className="object-contain w-full h-full mix-blend-multiply"
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
