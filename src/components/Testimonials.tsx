"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonialsData } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
    }, sectionRef);

    // Auto rotate testimonials
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#0f0f0f]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-primary/8 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[#E31837] text-xs font-ui font-semibold tracking-[0.2em] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#f5f0e8] leading-[1.05] tracking-tight mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center mb-8">
            <div className="text-5xl text-primary/30 mb-6">&ldquo;</div>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 min-h-[120px]">
              {testimonialsData[active].text}
            </p>
            <div className="flex items-center justify-center gap-4">
              {/* Avatar placeholder */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[#f5f0e8] font-display font-bold text-lg">
                {testimonialsData[active].name.charAt(0)}
              </div>
              <div className="text-left">
                <h4 className="text-[#f5f0e8] font-display font-semibold">
                  {testimonialsData[active].name}
                </h4>
                <p className="text-[#E31837] text-sm">
                  {testimonialsData[active].role}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === active
                    ? "w-8 h-3 bg-gradient-to-r from-primary to-accent"
                    : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
