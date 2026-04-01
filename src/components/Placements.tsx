"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { placementCompanies } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Placements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

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

      // Infinite marquee animation
      if (tickerRef.current) {
        const ticker = tickerRef.current;
        const content = ticker.querySelector(".ticker-inner");
        if (content) {
          gsap.to(content, {
            x: "-50%",
            duration: 25,
            repeat: -1,
            ease: "none",
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const doubledCompanies = [...placementCompanies, ...placementCompanies];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-medium tracking-wider uppercase mb-4">
            Career Support
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Work With The <span className="gradient-text">Best</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our students are hired by the world&apos;s best studios. They
            dominate the industry with their exceptional work.
          </p>
        </div>

        {/* Company Logos Ticker */}
        <div ref={tickerRef} className="overflow-hidden mb-12">
          <div className="ticker-inner flex items-center gap-8 whitespace-nowrap">
            {doubledCompanies.map((company, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl px-8 py-4 flex-shrink-0 hover:bg-white/10 transition-colors duration-300 cursor-default"
              >
                {/* Logo placeholder */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {company.charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-300 font-medium text-sm">
                    {company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo grid placeholder for actual company logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {placementCompanies.slice(0, 12).map((company, index) => (
            <div
              key={index}
              className="image-placeholder h-24 rounded-2xl"
            >
              <div className="text-center">
                <span className="text-lg font-bold text-primary/50">
                  {company.charAt(0)}
                </span>
                <span className="text-[10px] block mt-1">Add Logo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
