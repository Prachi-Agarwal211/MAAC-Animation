"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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

    const ctx = gsap.context(() => {
      // Mobile: simple staggered fade-up animation
      if (window.innerWidth < 768) {
        gsap.fromTo(
          ".feature-card-mobile",
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
        return;
      }

      // Desktop: pinned horizontal scroll with GSAP
      const totalWidth = cardsContainerRef.current!.scrollWidth;
      const containerWidth = window.innerWidth;
      const scrollDistance = totalWidth - containerWidth;

      // Pin the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // Horizontal scroll animation
      gsap.to(cardsContainerRef.current, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect for heading
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          yPercent: 20,
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
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
            <h2 data-splitting className="font-display font-bold text-[clamp(2.5rem, 5vw, 4rem)] leading-[1.05] tracking-tight text-[#F0EBE1] mb-4">
              Creative Careers That Click
            </h2>
            <h2 data-splitting className="font-display font-bold text-[clamp(2.5rem, 5vw, 4rem)] leading-[1.05] tracking-tight text-[#E31837] mb-6">
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
                <div className="relative h-[55%] overflow-hidden bg-[#111]">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="380px"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-7xl opacity-40"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      {card.imageFallback}
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent" />
                  {/* Red accent line */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[3px]"
                    style={{ backgroundColor: card.color }}
                  />
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
          <h2 className="font-display font-bold text-[clamp(1.75rem, 4vw, 2.5rem)] leading-[1.05] tracking-tight text-[#F0EBE1] mb-3 text-center">
            Creative Careers That Click
          </h2>
          <h2 className="font-display font-bold text-[clamp(1.75rem, 4vw, 2.5rem)] leading-[1.05] tracking-tight text-[#E31837] mb-4 text-center">
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
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#111]">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 380px"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-5xl opacity-40"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      {card.imageFallback}
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-transparent to-transparent" />
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
