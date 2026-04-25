"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";

const certifications = [
  {
    name: "SKILL INDIA",
    logo: "/govt/skillIndia.jpg",
    sub: "कौशल भारत - कुशल भारत",
  },
  {
    name: "MESC",
    logo: "/govt/mesc.png",
    sub: "Media & Entertainment\nSkills Council",
  },
  {
    name: "NSDC",
    logo: "/govt/nsdc.png",
    sub: "RE IMAGINE FUTURE",
  },
  {
    name: "SKILL INDIA",
    logo: "/govt/skillIndia.jpg",
    sub: "कौशल भारत - कुशल भारत",
  },
  {
    name: "MESC",
    logo: "/govt/mesc.png",
    sub: "Media & Entertainment\nSkills Council",
  },
];

export default function TrustBadges() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Optional GSAP animations if needed later
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }}
    );
  }, { scope: sectionRef });

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 bg-transparent border-t border-white/5 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-5 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-4">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-start z-10 shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] metallic-gold-accent" />
              <span className="metallic-gold-text text-[11px] font-bold tracking-[0.25em] uppercase">
                Govt Affiliated & Recognized
              </span>
            </div>
            
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.1] uppercase mb-8">
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

          {/* Right Content - Cards setup */}
          <div className="w-full lg:w-[55%] relative flex flex-col gap-6">
            <div 
              ref={containerRef}
              className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory mask-gradient-right pb-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                maskImage: "linear-gradient(to right, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)",
              }}
            >
              {certifications.map((cert, index) => (
                <div
                  key={`${cert.name}-${index}`}
                  className="snap-start shrink-0 w-[240px] md:w-[280px] aspect-square rounded-3xl bg-[#050000] border border-white/5 flex flex-col items-center justify-center p-4 relative overflow-hidden group hover:border-white/10 transition-colors duration-500"
                >
                  {/* Largest possible unified white badge container */}
                  <div className="w-full h-full bg-white rounded-2xl relative flex items-center justify-center shadow-lg group-hover:scale-[1.03] transition-transform duration-500">
                    <Image
                       src={cert.logo}
                       alt={cert.name}
                       fill
                       className="object-contain p-6 mix-blend-multiply opacity-100"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows positioned concisely */}
            <div className="flex items-center justify-end gap-2 pr-6">
              <button 
                onClick={scrollLeft}
                className="p-3 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all"
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollRight}
                className="p-3 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
