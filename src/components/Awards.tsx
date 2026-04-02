"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { awardsData } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#080808]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[#E31837] text-xs font-ui font-semibold tracking-[0.2em] uppercase mb-4">
            Recognition
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#f5f0e8] leading-[1.05] tracking-tight mb-4">
            Awards & <span className="gradient-text">Recognition</span>
          </h2>
          <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
            Celebrated by industry leaders for our commitment to excellence in
            animation and VFX education
          </p>
        </div>

        {/* Awards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {awardsData.map((award, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 text-center group"
            >
              {/* Award image placeholder */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">🏆</span>
              </div>
              {/* Award image placeholder */}
              <div className="image-placeholder h-32 mb-4">
                <span className="text-xs">Add Award Image</span>
              </div>
              <p className="text-gray-300 text-sm font-medium leading-relaxed">
                {award}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
