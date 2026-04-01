"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitting from "splitting";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function TigerHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);
    console.log("Is touch device:", isTouch);

    // Initialize Splitting.js for text animations
    Splitting({ target: ".split-text", by: "chars" });
    Splitting({ target: ".split-words", by: "words" });

    const ctx = gsap.context(() => {
      // Skip animations on touch devices for performance
      const isMobile = window.innerWidth < 768;

      // === HERO REVEAL ANIMATION ===
      const revealTl = gsap.timeline({ delay: 0.5 });

      // Video container mask reveal (expanding circle)
      revealTl.from(".hero__video-mask", {
        scale: 0,
        opacity: 0,
        duration: 2.2,
        ease: "expo.out",
      });

      // Video fade and scale
      revealTl.from(
        ".hero__video",
        {
          scale: 1.3,
          opacity: 0,
          duration: 2.5,
          ease: "expo.out",
        },
        "-=2"
      );

      // Subtle glow reveal
      revealTl.from(
        ".hero__video-glow",
        {
          opacity: 0,
          scale: 0.8,
          duration: 2,
          ease: "power2.out",
        },
        "-=1.8"
      );

      // Left content - Eyebrow text
      revealTl.from(
        ".hero__eyebrow .char",
        {
          opacity: 0,
          y: 40,
          stagger: 0.03,
          duration: 1,
          ease: "expo.out",
        },
        "-=1.5"
      );

      // Left content - Title words
      revealTl.from(
        ".hero__title .word",
        {
          opacity: 0,
          y: 80,
          stagger: 0.08,
          duration: 1.2,
          ease: "expo.out",
        },
        "-=1"
      );

      // Right content - Subtitle
      revealTl.from(
        ".hero__subtitle",
        {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.8"
      );

      // Right content - CTA button
      revealTl.from(
        ".hero__cta",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.6"
      );

      // Scroll indicator
      revealTl.from(
        ".hero__scroll-indicator",
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // === PARALLAX EFFECTS (Desktop only) ===
      if (!isMobile && !isTouchDevice) {
        // Video parallax - subtle opposite movement
        gsap.to(".hero__video-container", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Left text parallax
        gsap.to(".hero__content--left", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Right text parallax
        gsap.to(".hero__content--right", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // === VIDEO GLOW ON HOVER (Desktop only) ===
      if (!isTouchDevice) {
        const videoContainer = document.querySelector(".hero__video-container");
        if (videoContainer) {
          videoContainer.addEventListener("mouseenter", () => {
            gsap.to(".hero__video-glow", {
              opacity: 0.25,
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out",
            });
          });

          videoContainer.addEventListener("mouseleave", () => {
            gsap.to(".hero__video-glow", {
              opacity: 0.08,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          });
        }
      }

      // === MAGNETIC CTA BUTTON ===
      const cta = document.querySelector(".hero__cta");
      if (cta && !isTouchDevice) {
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
      }
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <>
      {!isTouchDevice && <CustomCursor />}
      
      <section
        ref={containerRef}
        className="hero relative h-screen w-full overflow-hidden bg-tiger-black"
        style={{ zIndex: 1 }}
      >
        {/* === GRAIN OVERLAY === */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay z-[9998]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px",
            }}
          />
        </div>

        {/* === CENTER VIDEO - "TIGER IN THE VOID" with 3D Effects === */}
        <div className="hero__video-container absolute inset-0 flex items-center justify-center z-0" style={{ perspective: "1000px" }}>
          {/* 3D Glow layers behind video */}
          <div className="hero__video-glow absolute w-[55vw] h-[55vw] md:w-[42vw] md:h-[42vw] rounded-full bg-gradient-radial from-tiger-glow via-tiger-accent/5 to-transparent opacity-0 blur-2xl" />
          
          {/* Animated border ring */}
          <div className="hero__video-ring absolute w-[66vw] h-[66vw] md:w-[41vw] md:h-[41vw] rounded-full border border-tiger-accent/10 opacity-30" />
          
          {/* Circular mask container with 3D transform */}
          <div 
            className="hero__video-mask relative w-[65vw] h-[65vw] md:w-[40vw] md:h-[40vw] rounded-full overflow-hidden"
            style={{
              transform: "translateZ(0)",
              boxShadow: "0 0 120px rgba(200, 255, 0, 0.15), inset 0 0 80px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Inner glow overlay */}
            <div className="absolute inset-0 z-20 rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.08)_0%,transparent_60%)] pointer-events-none" />
            
            {/* Radial gradient overlay for edge blend */}
            <div className="absolute inset-0 z-10 rounded-full bg-[radial-gradient(circle,transparent_35%,rgba(8,8,8,0.9)_100%)] pointer-events-none" />
            
            {/* Vignette overlay */}
            <div className="absolute inset-0 z-10 rounded-full bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

            {/* Video */}
            <video
              ref={videoRef}
              className="hero__video w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23080808' width='100' height='100'/%3E%3Ccircle fill='%23101010' cx='50' cy='50' r='40'/%3E%3C/svg%3E"
              onLoadedData={() => {
                console.log("✓ Video loaded successfully");
              }}
              onLoadedMetadata={() => {
                console.log("✓ Video metadata loaded");
              }}
              onCanPlay={() => {
                console.log("✓ Video can play");
              }}
              onError={(e) => {
                console.error("✗ Video load error:", e);
                setVideoError(true);
              }}
            >
              <source src="/intro.webm" type="video/webm" />
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Error fallback */}
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center text-tiger-muted text-sm">
                Video unavailable
              </div>
            )}
            
            {/* Subtle scanline effect */}
            <div 
              className="absolute inset-0 z-20 rounded-full opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200, 255, 0, 0.1) 2px, rgba(200, 255, 0, 0.1) 4px)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
          
          {/* Outer glow ring - animated */}
          <div 
            className="absolute w-[70vw] h-[70vw] md:w-[44vw] md:h-[44vw] rounded-full border-2 border-tiger-accent/5 opacity-0"
            style={{
              animation: "pulse-ring 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* === LEFT CONTENT === */}
        <div className="hero__content hero__content--left absolute left-0 top-1/2 -translate-y-1/2 z-10 px-6 md:px-12 lg:px-20 max-w-[45%]">
          {/* Eyebrow text */}
          <p className="hero__eyebrow split-text mb-6 md:mb-8 text-tiger-accent tracking-[0.25em] text-sm md:text-base font-medium uppercase">
            MAAC
          </p>

          {/* Main title */}
          <h1 className="hero__title split-words font-display font-bold text-tiger-text leading-[0.85] tracking-tight">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              UNLEASH
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              YOUR
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-tiger-accent">
              POWER
            </span>
          </h1>
        </div>

        {/* === RIGHT CONTENT === */}
        <div className="hero__content hero__content--right absolute right-0 top-1/2 -translate-y-1/2 z-10 px-6 md:px-12 lg:px-20 max-w-[40%] flex flex-col items-end text-right">
          {/* Subtitle */}
          <p className="hero__subtitle text-tiger-muted text-sm md:text-base lg:text-lg leading-relaxed max-w-md mb-8 md:mb-12">
            Master the art of VFX, gaming, and multimedia animation. 
            Join India&apos;s premier creative institute.
          </p>

          {/* CTA Button */}
          <a
            href="#explore"
            className="hero__cta group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-tiger-accent/40 text-tiger-accent font-medium tracking-wide overflow-hidden"
            data-cursor-hover
          >
            <span className="relative z-10">EXPLORE COURSES</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-tiger-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-tiger-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>EXPLORE COURSES</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* === SCROLL INDICATOR === */}
        <div className="hero__scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-tiger-accent/60 to-transparent overflow-hidden">
            <div className="w-full h-8 bg-tiger-accent animate-scroll-indicator" />
          </div>
          <span className="text-tiger-muted text-xs tracking-[0.2em] uppercase">
            Scroll
          </span>
        </div>
      </section>
    </>
  );
}
