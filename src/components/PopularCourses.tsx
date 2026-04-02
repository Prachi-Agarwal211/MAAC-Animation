"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coursesData } from "@/data/siteData";

const courseGradients = [
  "linear-gradient(135deg, #1a0505 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #0a1a0a 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #0a0a1a 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #1a1a05 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #0a0f1a 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #1a0a10 0%, #0C0C0C 100%)",
];

export default function PopularCourses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null = not yet mounted (SSR)
  const [hasMounted, setHasMounted] = useState(false);
  const resizeTimerRef = useRef<NodeJS.Timeout>();

  // Touch swipe support for desktop
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const wasMobile = isMobile;
      setIsMobile(window.innerWidth < 768);

      // Clear GSAP scroll triggers on breakpoint change to prevent conflicts
      if (wasMobile !== null && wasMobile !== (window.innerWidth < 768)) {
        ScrollTrigger.refresh();
      }
    };

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(checkMobile, 300);
    };

    checkMobile();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [isMobile]);

  // GSAP horizontal scroll on desktop ONLY (≥768px)
  useEffect(() => {
    // Guard: only run on desktop
    if (isMobile || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Animate heading on enter
      gsap.fromTo(".pc-heading", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      // Calculate total horizontal scroll distance
      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update active dot
            const progress = self.progress;
            const cardCount = coursesData.popularCourses.length;
            const index = Math.round(progress * (cardCount - 1));
            setActiveIndex(Math.min(index, cardCount - 1));
          },
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  // Mobile: simple CSS scroll with dots
  const handleScroll = () => {
    if (!trackRef.current || !isMobile) return;
    const el = trackRef.current;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (el.firstElementChild?.clientWidth || 0 + gap));
    setActiveIndex(Math.min(index, coursesData.popularCourses.length - 1));
  };

  // Scroll to active card on desktop when index changes (from touch swipe)
  useEffect(() => {
    if (!trackRef.current || !isMobile || !trackRef.current.firstElementChild) return;

    const card = trackRef.current.firstElementChild as HTMLElement;
    const cardWidth = card.clientWidth || 400;
    const gap = 24;
    const scrollPosition = activeIndex * (cardWidth + gap);

    gsap.to(trackRef.current, {
      x: -scrollPosition,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [activeIndex, isMobile]);

  // Touch handlers for swipe navigation (desktop)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next card
        setActiveIndex((prev) => Math.min(prev + 1, coursesData.popularCourses.length - 1));
      } else {
        // Swiped right - previous card
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // Render skeleton during SSR to prevent hydration mismatch
  if (!hasMounted || isMobile === null) {
    return (
      <section ref={sectionRef} className="relative bg-[#0C0C0C]" style={{ minHeight: "100vh" }}>
        <div className="atmosphere-blob" style={{
          width: "600px", height: "600px", opacity: 0.04,
          background: "radial-gradient(circle, rgba(227,24,55,0.4) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />

        {/* Header */}
        <div className="pc-heading text-center pt-24 md:pt-32 pb-12 md:pb-16 relative z-10 max-w-7xl mx-auto px-4">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.12em] uppercase mb-4">Master Your Craft</p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.08] tracking-tight mb-4 pb-1">
            Popular <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
            Master industry-standard tools and techniques with our most sought-after programs
          </p>
        </div>

        {/* Loading skeleton */}
        <div className="relative z-10 px-[10vw] pb-8">
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[380px]">
                <div className="glass-card rounded-2xl overflow-hidden h-[480px] animate-pulse">
                  <div className="h-[200px] bg-white/5" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 w-24 bg-white/5 rounded-full" />
                    <div className="h-8 w-48 bg-white/5 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-3/4 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-[#0C0C0C]" style={{ minHeight: isMobile ? "auto" : "100vh" }}>
      <div className="atmosphere-blob" style={{
        width: "600px", height: "600px", opacity: 0.04,
        background: "radial-gradient(circle, rgba(227,24,55,0.4) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }} />

      {/* Header */}
      <div className="pc-heading text-center pt-24 md:pt-32 pb-12 md:pb-16 relative z-10 max-w-7xl mx-auto px-4">
        <p className="text-[#E31837] text-xs font-semibold tracking-[0.12em] uppercase mb-4">Master Your Craft</p>
        <h2 data-splitting className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.08] tracking-tight mb-4 pb-1">
          Popular <span className="gradient-text">Courses</span>
        </h2>
        <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
          Master industry-standard tools and techniques with our most sought-after programs
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative z-10">
        <div
          ref={trackRef}
          onScroll={isMobile ? handleScroll : undefined}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-6 ${isMobile ? "overflow-x-auto snap-x snap-mandatory pb-4 hscroll-container px-6" : "block px-[10vw] pb-8"}`}
          style={isMobile === false ? { willChange: "transform" } : { scrollSnapType: "x mandatory" }}
        >
          {coursesData.popularCourses.map((course, index) => (
            <div
              key={course.name}
              className={`flex-shrink-0 ${isMobile ? "w-[85vw] snap-start hscroll-card" : "w-[380px]"}`}
            >
              <div className="glass-card rounded-2xl overflow-hidden h-[480px] flex flex-col relative">
                {/* Top image section with watermark */}
                <div className="h-[200px] relative flex items-center justify-center" style={{ background: courseGradients[index % courseGradients.length] }}>
                  <div className="text-[#E31837]/20 font-display font-extrabold text-7xl select-none">{course.code || course.name}</div>
                </div>

                {/* Bottom content */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-[#E31837]/10 text-[#E31837] text-xs font-medium mb-3">
                    {course.duration}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#F0EBE1] mb-0.5">{course.name}</h3>
                  <p className="text-[#6B6560] text-sm mb-3">{course.fullName}</p>
                  <p className="text-[#A8A29C] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{course.description}</p>
                  <a href="/contact" className="inline-flex items-center gap-2 text-[#E31837] text-sm font-medium group/link">
                    Learn More
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll dots */}
        <div className="flex items-center justify-center gap-2 pb-12 md:pb-16 relative z-10">
          {coursesData.popularCourses.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-[#E31837] w-6" : "bg-white/20 w-2 hover:bg-white/30"
              }`}
              onClick={() => {
                if (isMobile && trackRef.current) {
                  const cardWidth = trackRef.current.firstElementChild?.clientWidth || 0;
                  trackRef.current.scrollTo({ left: i * (cardWidth + 24), behavior: "smooth" });
                }
              }}
              aria-label={`Go to course ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
