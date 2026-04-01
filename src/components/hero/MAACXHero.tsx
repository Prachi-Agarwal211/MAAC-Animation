"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // === HERO REVEAL ANIMATION ===
      const revealTl = gsap.timeline({ delay: 0.3 });

      // Video fade in
      revealTl.from(".maacx-video", {
        opacity: 0,
        scale: 1.1,
        duration: 2,
        ease: "expo.out",
      });

      // Overlay gradient fade
      revealTl.from(".maacx-overlay", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      }, "-=1.5");

      // Badge fade in
      revealTl.from(".maacx-badge", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "expo.out",
      }, "-=1");

      // Headline stagger reveal
      revealTl.from(".maacx-headline-white, .maacx-headline-accent", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out",
      }, "-=0.8");

      // Subtitle fade in
      revealTl.from(".maacx-subtitle", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "expo.out",
      }, "-=0.8");

      // CTA button slide in
      revealTl.from(".maacx-cta", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.6");

      // Info card items stagger
      revealTl.from(".maacx-info-item", {
        opacity: 0,
        x: 40,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
      }, "-=1");

      // === PARALLAX EFFECTS (Desktop only) ===
      if (!isMobile && !isTouchDevice) {
        // Video parallax
        gsap.to(".maacx-video", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".maacx-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Left content parallax
        gsap.to(".maacx-content-left", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".maacx-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Right info card parallax
        gsap.to(".maacx-info-card", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".maacx-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // === MAGNETIC CTA BUTTONS ===
      const ctas = document.querySelectorAll(".maacx-cta");
      if (ctas.length && !isTouchDevice) {
        ctas.forEach((cta) => {
          cta.addEventListener("mousemove", (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = cta.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;

            gsap.to(cta, {
              x: x * 0.3,
              y: y * 0.3,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          cta.addEventListener("mouseleave", () => {
            gsap.to(cta, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
            });
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isTouchDevice]);

  return (
    <>
      <section
        ref={containerRef}
        className="maacx-hero relative h-screen w-full overflow-hidden bg-[#080808]"
      >
        {/* === VIDEO BACKGROUND === */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="maacx-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/intro.webm" type="video/webm" />
            <source src="/intro.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay gradient for text readability */}
          <div className="maacx-overlay absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

          {/* Radial gradient for focus */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* === HERO CONTENT - LEFT SIDE === */}
        <div className="maacx-content-left absolute left-0 top-1/2 translate-y-[15%] z-30 px-6 md:px-12 lg:px-20 max-w-[55%]">
          {/* Badge */}
          <div className="maacx-badge mb-4 md:mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[#E31837] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              SKILL INDIA • NSDC • MESC TRAINING PARTNER
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-3 md:mb-5">
            <span className="maacx-headline-white block text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight drop-shadow-lg">
              Big Leaps
            </span>
            <span className="maacx-headline-accent block text-[#E31837] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight drop-shadow-lg">
              Begin with the Right Course
            </span>
          </h1>

          {/* Subtitle */}
          <div className="maacx-subtitle mb-6 md:mb-8 max-w-xl">
            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-[#E31837]/90 to-[#FF6B35]/90 backdrop-blur-sm rounded-lg text-white text-base md:text-lg lg:text-xl font-bold leading-relaxed shadow-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              Presenting B.Voc in 3D Animation & VFX
            </span>
          </div>

          {/* CTA Button */}
          <a
            href="#explore"
            className="maacx-cta group inline-flex items-center gap-3 px-8 py-4 bg-[#E31837] hover:bg-[#B8132C] text-white font-bold tracking-wide rounded-md overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">EXPLORE NOW</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* === INFO CARD - RIGHT SIDE === */}
        <div className="maacx-content-right absolute right-0 top-1/2 -translate-y-[35%] z-20 px-6 md:px-12 lg:px-20">
          <div className="maacx-info-card backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 max-w-sm w-full">
            {/* Item 1 */}
            <div className="maacx-info-item flex items-start gap-4 pb-6 border-b border-white/10">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                <span className="text-white font-extrabold text-lg md:text-xl">30+</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">YEARS</h3>
                <p className="text-gray-400 text-xs md:text-sm tracking-wide">LEGACY OF EXCELLENCE</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="maacx-info-item flex items-start gap-4 py-6 border-b border-white/10">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">CAREERX</h3>
                <p className="text-gray-400 text-xs md:text-sm tracking-wide">INDUSTRY PATHWAYS</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="maacx-info-item flex items-start gap-4 pt-6">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">DEDICATED</h3>
                <p className="text-gray-400 text-xs md:text-sm tracking-wide">PLACEMENT SUPPORT</p>
              </div>
            </div>
          </div>
        </div>

        {/* === SCROLL INDICATOR === */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#E31837]/60 to-transparent overflow-hidden">
            <div className="w-full h-8 bg-[#E31837] animate-scroll-indicator" />
          </div>
          <span className="text-gray-400 text-xs tracking-[0.2em] uppercase">
            Scroll
          </span>
        </div>
      </section>
    </>
  );
}
