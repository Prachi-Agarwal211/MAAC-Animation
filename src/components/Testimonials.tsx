"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { testimonialsData } from "@/data/siteData";

function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const startXRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tm-heading", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => { ctx.revert(); };
  }, []);

  // Auto-advance interval (separate from GSAP context)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActive((prev) => (prev + 1) % testimonialsData.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => { startXRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setActive(prev => diff > 0
        ? Math.min(prev + 1, testimonialsData.length - 1)
        : Math.max(prev - 1, 0)
      );
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0C0C0C 0%, #17110C 50%, #0C0C0C 100%)" }}>
      <div className="atmosphere-blob blob-red" style={{ top: "30%", left: "-100px", width: "400px", height: "400px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="tm-heading text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.12em] uppercase mb-4">Testimonials</p>
          <h2 data-splitting className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.08] tracking-tight mb-4 pb-1">
            What Our <span className="gradient-text-warm">Students Say</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="glass-card rounded-3xl p-8 md:p-12 text-center mb-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div className="text-5xl text-[#E31837]/30 font-display mb-6">&ldquo;</div>
            <p 
              className="text-[#A8A29C] text-lg md:text-xl leading-relaxed mb-8 min-h-[120px] transition-all duration-500"
              aria-live="polite"
              aria-atomic="true"
            >
              {testimonialsData[active].text}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E31837]/30 to-[#FF6B35]/30 flex items-center justify-center text-[#F0EBE1] font-display font-bold text-lg">
                {testimonialsData[active].name.charAt(0)}
              </div>
              <div className="text-left">
                <h4 className="text-[#F0EBE1] font-display font-semibold">{testimonialsData[active].name}</h4>
                <p className="text-[#E31837] text-sm">{testimonialsData[active].role}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === active ? "w-8 h-3 bg-gradient-to-r from-[#E31837] to-[#FF6B35]" : "w-3 h-3 bg-white/20 hover:bg-white/30"
                }`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
