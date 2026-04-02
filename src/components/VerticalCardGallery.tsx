"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureCards = [
  {
    title: "Transformative Educational Events",
    desc: "Industry workshops, masterclasses, and live projects that bridge classroom learning with real-world experience",
    icon: "🎬",
    image: "/images/feature-events.webp",
    imageFallback: "🎬",
    color: "#E31837",
  },
  {
    title: "Industry-Ready Portfolio Development",
    desc: "Build a professional portfolio with live projects, animations, and visual effects work that showcases your skills",
    icon: "🎨",
    image: "/images/feature-portfolio.webp",
    imageFallback: "🎨",
    color: "#FF6B35",
  },
  {
    title: "Exclusive Industry Exposure",
    desc: "Studio visits, live briefs, and internship opportunities with top animation and VFX companies",
    icon: "🏢",
    image: "/images/feature-exposure.webp",
    imageFallback: "🏢",
    color: "#00B4D8",
  },
  {
    title: "Portfolio That Speaks Volumes",
    desc: "Graduate with a professional showreel and portfolio that showcases your skills to potential employers",
    icon: "📁",
    image: "/images/feature-showreel.webp",
    imageFallback: "📁",
    color: "#9D4EDD",
  },
  {
    title: "Industry-Grade Facilities",
    desc: "State-of-the-art labs, rendering farms, and production suites equipped with latest software and hardware",
    icon: "🖥️",
    image: "/images/feature-facilities.webp",
    imageFallback: "🖥️",
    color: "#06D6A0",
  },
  {
    title: "Courses Built For Future",
    desc: "Curriculum updated regularly with emerging technologies like AI, VR, AR, and real-time rendering",
    icon: "🚀",
    image: "/images/feature-courses.webp",
    imageFallback: "🚀",
    color: "#FFD166",
  },
  {
    title: "Creative Careers That Click",
    desc: "Placement support, career counseling, and alumni network that helps you land your dream job",
    icon: "💼",
    image: "/images/feature-careers.webp",
    imageFallback: "💼",
    color: "#EF476F",
  },
];

export default function VerticalCardGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // Desktop: pinned horizontal scroll
      const ctx = gsap.context(() => {
        const track = cardsContainerRef.current;
        if (!track) return;
        
        const totalWidth = track.scrollWidth - window.innerWidth;
        if (totalWidth <= 0) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          pinSpacing: true, // was false - this was causing collapse
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        gsap.to(track, {
          x: () => -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, containerRef);

      return () => ctx.revert();
    });
    
    mm.add("(max-width: 767px)", () => {
      // Mobile: simple staggered reveal
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".feature-card-mobile");
        if (cards.length === 0) return;
        
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, containerRef);
      
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* Desktop: Horizontal pinned scroll (≥768px) */}
      <div
        ref={containerRef}
        className="hidden md:block relative bg-[#0C0C0C] overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <div className="flex h-screen">
          {/* LEFT (40%): Fixed heading + description with parallax */}
          <div
            ref={headingRef}
            className="w-[40%] flex-shrink-0 flex flex-col justify-center px-8 lg:px-12 xl:px-16"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-6">
              Empower Your Future
            </p>
            <h2 data-splitting className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-[#F0EBE1] mb-4">
              Creative Careers That Click
            </h2>
            <h2 data-splitting className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-[#E31837] mb-6">
              Think MAAC
            </h2>
            <p className="text-[#A8A29C] text-base leading-relaxed max-w-md">
              Train in animation, VFX, gaming, and digital content creation with
              expert-led courses that prepare you for real industry success.
            </p>
          </div>

          {/* RIGHT (60%): Cards scroll horizontally */}
          <div
            ref={cardsContainerRef}
            className="flex h-screen items-center"
            style={{ willChange: "transform" }}
          >
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="feature-card flex-shrink-0 w-[380px] h-screen flex flex-col"
                style={{
                  marginRight: index < featureCards.length - 1 ? "32px" : "0",
                  willChange: "transform",
                }}
              >
                {/* Image area — top 55% */}
                <div className="relative h-[55%] overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a1a1a] to-[#1a1a1a]">
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <rect x="10" y="10" width="60" height="60" rx="8"
                        stroke={card.color} strokeWidth="1.5" fill="none"/>
                      <path d="M10 40 L40 10 L70 40 L40 70 Z"
                        stroke={card.color} strokeWidth="1" fill="none"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E31837] to-[#FF6B35]" />
                </div>

                {/* Text area — bottom 45% */}
                <div className="flex-1 bg-[#0C0C0C] p-8 flex flex-col justify-center border-l border-white/5">
                  <span
                    className="text-xs font-semibold tracking-[0.15em] uppercase mb-3"
                    style={{ color: card.color }}
                  >
                    0{index + 1}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#A8A29C] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Simple vertical list with staggered animation (<768px) */}
      <div className="md:hidden bg-[#0C0C0C] py-16 px-4 sm:px-6">
        <div ref={cardsContainerRef} className="max-w-3xl mx-auto">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-6 text-center">
            Empower Your Future
          </p>
          <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] tracking-tight text-[#F0EBE1] mb-3 text-center">
            Creative Careers That Click
          </h2>
          <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] tracking-tight text-[#E31837] mb-4 text-center">
            Think MAAC
          </h2>
          <p className="text-[#A8A29C] text-sm leading-relaxed max-w-md mx-auto mb-10 text-center">
            Train in animation, VFX, gaming, and digital content creation with
            expert-led courses that prepare you for real industry success.
          </p>

          <div className="space-y-4">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="feature-card-mobile rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.08]"
                style={{
                  borderLeft: `3px solid ${card.color}`,
                  willChange: "transform, opacity",
                }}
              >
                {/* Image area — aspect-[16/9] */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a1a1a] to-[#1a1a1a]">
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <rect x="10" y="10" width="60" height="60" rx="8"
                        stroke={card.color} strokeWidth="1.5" fill="none"/>
                      <path d="M10 40 L40 10 L70 40 L40 70 Z"
                        stroke={card.color} strokeWidth="1" fill="none"/>
                    </svg>
                  </div>
                </div>

                {/* Text area */}
                <div className="p-5">
                  <span
                    className="text-xs font-semibold tracking-[0.12em] uppercase mb-2 block"
                    style={{ color: card.color }}
                  >
                    0{index + 1}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#A8A29C] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
