"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const certifications = [
  {
    name: "MESC",
    logo: "/govt/mesc.png",
  },
  {
    name: "NSDC",
    logo: "/govt/nsdc.png",
  },
  {
    name: "Skill India",
    logo: "/govt/skillIndia.jpg",
  },
];

export default function TrustBadges() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Basic intro animation for the section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, { scope: sectionRef });

  // Create an array with duplicated items to ensure smooth infinite scrolling
  const duplicatedCerts = [...certifications, ...certifications, ...certifications, ...certifications];

  return (
    <section ref={sectionRef} className="relative py-8 md:py-10 bg-transparent border-y border-white/5 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-[#E31837] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#E31837]" />
          Government Affiliated & Recognized
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center before:absolute before:left-0 before:w-24 before:h-full before:bg-gradient-to-r before:from-bg-primary before:to-transparent before:z-10 after:absolute after:right-0 after:w-24 after:h-full after:bg-gradient-to-l after:from-bg-primary after:to-transparent after:z-10">
        <div ref={marqueeRef} className="animate-marquee flex gap-6 px-3 cursor-pointer">
          {duplicatedCerts.map((cert, index) => (
            <div
              key={`${cert.name}-${index}`}
              className="flex-shrink-0 group relative w-36 h-36 md:w-40 md:h-40 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 hover:border-[#E31837]/40 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-full h-16 md:h-20 mb-3 flex items-center justify-center relative">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  fill
                  className="object-contain transition-all duration-500"
                />
              </div>
              <span className="text-[#A8A29C] group-hover:text-white text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-300">
                {cert.name}
              </span>
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E31837]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
