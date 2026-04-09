"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

const cardImages: Record<number, string> = {
  0: "/portfolio/featured/nancy-verma-page1.jpg",
  1: "/portfolio/character-modeling/aarush-kumar-page1.jpg",
  2: "/portfolio/matte-painting/akshat-asolkar.jpg",
  3: "/portfolio/digital-painting/deshna-shah.jpg",
  4: "/portfolio/environment-modeling/raghav-gupta-page1.jpg",
  5: "/portfolio/3d-game-asset/archita-roy-page1.jpg",
  6: "/portfolio/architectural-design/sharanjit-kaur-page1.jpg",
};

const featureCards = [
  {
    title: "Educational Events",
    desc: "Industry workshops, masterclasses, and live projects that bridge classroom learning with real-world experience",
    color: "#E31837",
  },
  {
    title: "Portfolio Mastery",
    desc: "Build a professional portfolio with live projects, animations, and visual effects work that showcases your skills",
    color: "#FF6B35",
  },
  {
    title: "Industry Exposure",
    desc: "Studio visits, live briefs, and internship opportunities with top animation and VFX companies",
    color: "#00B4D8",
  },
  {
    title: "Premier Placements",
    desc: "Graduate with a professional showreel and portfolio that showcases your skills to potential employers",
    color: "#9D4EDD",
  },
  {
    title: "Pro Facilities",
    desc: "State-of-the-art labs, rendering farms, and production suites equipped with latest software and hardware",
    color: "#06D6A0",
  },
  {
    title: "Future-Proof Courses",
    desc: "Curriculum updated regularly with emerging technologies like AI, VR, AR, and real-time rendering",
    color: "#FFD166",
  },
  {
    title: "Creative Careers",
    desc: "Placement support, career counseling, and alumni network that helps you land your dream job",
    color: "#EF476F",
  },
];

export default function VerticalCardGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const items = gsap.utils.toArray(".gallery-item");
      
      items.forEach((item: any) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 100, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      });

      // Pin Left Panel
      gsap.to(leftPanelRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80px",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
        }
      });

      // Progress Line
      gsap.to(progressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80px",
          end: "bottom bottom",
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#080808] py-24 md:py-40 px-6 lg:px-20 relative overflow-hidden border-b border-white/5">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* Left Side: Sticky Headers */}
        <div ref={leftPanelRef} className="lg:w-[40%] h-fit z-10">
          <div className="relative pl-12">
            {/* Progress Track */}
            <div className="absolute left-0 top-0 w-[2px] h-64 bg-white/5 rounded-full overflow-hidden">
               <div ref={progressRef} className="w-full h-0 bg-[#E31837] shadow-[0_0_15px_#E31837]" />
            </div>

            <p className="text-[#E31837] text-sm font-bold tracking-[0.3em] uppercase mb-8 flex items-center gap-3">
              Elite Training
            </p>
            <h2 className="font-display font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85] tracking-tighter text-white mb-6">
              CREATIVE<br />
              <span className="gradient-text italic">EVOLUTION</span>
            </h2>
            <h3 className="font-display font-bold text-xl tracking-widest text-[#6B6560] mb-8 uppercase">
              The MAAC Standard
            </h3>
            <p className="text-[#A8A29C] text-lg md:text-xl font-medium leading-relaxed max-w-sm italic">
              Experience a curriculum engineered for the global production pipeline. We don&apos;t just teach software; we forge cinematic careers.
            </p>
          </div>
        </div>

        {/* Right Side: Gallery Items */}
        <div 
          ref={rightPanelRef} 
          className="lg:w-[60%] flex flex-col gap-12 lg:gap-32"
        >
          {featureCards.map((card, index) => (
            <div 
              key={index}
              className="gallery-item group relative flex-shrink-0 w-full"
            >
              <div className="relative overflow-hidden rounded-[48px] bg-[#111111] border border-white/5 transition-all duration-1000 group-hover:border-[#E31837]/30 shadow-2xl">
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Image Side */}
                  <div className="w-full md:w-1/2 aspect-square relative overflow-hidden">
                    {cardImages[index] ? (
                      <Image
                        src={cardImages[index]}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-expo-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-10 left-10 md:hidden">
                       <span className="text-white/10 text-6xl font-display font-black">0{index + 1}</span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative">
                    <span className="hidden md:block absolute top-12 right-12 text-white/[0.03] text-8xl font-display font-black">0{index + 1}</span>
                    
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-8 h-[1px] bg-[#E31837]" />
                      <span className="text-[#E31837] text-[10px] font-bold tracking-[0.3em] uppercase">Insight</span>
                    </div>

                    <h4 className="font-display font-bold text-3xl text-white mb-6 leading-[0.9] tracking-tighter group-hover:text-[#E31837] transition-colors duration-500">
                      {card.title}
                    </h4>
                    
                    <p className="text-[#A8A29C] text-base font-medium leading-relaxed mb-10">
                      {card.desc}
                    </p>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E31837] group-hover:border-[#E31837] transition-all duration-500">
                        <ArrowRight size={20} className="text-white transition-transform group-hover:translate-x-1" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors">Details</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Atmosphere blobs */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#E31837]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#FF6B35]/5 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
}
