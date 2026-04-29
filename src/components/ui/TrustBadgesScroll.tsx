"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Certification {
  name: string;
  logo: string;
  sub: string;
}

export default function TrustBadgesScroll({ certifications }: { certifications: Certification[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

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
        {certifications.map((cert) => (
          <div
            key={cert.name}
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
  );
}
