"use client";

import { useRef, memo } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const placementCompanies = [
  { 
    name: "DNEG", 
    logo: "/logos/DNEG_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "Prime Focus", 
    logo: "/logos/prime_focus_logo.png",
    bgColor: "#ffffff"
  },
  { 
    name: "Redchillies VFX", 
    logo: "/logos/Red_Chillies_Entertainment_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "MPC", 
    logo: "/logos/mpc_logo.png",
    bgColor: "#ffffff"
  },
  { 
    name: "Technicolor", 
    logo: "/logos/technicolor_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "Method Studios", 
    logo: "/logos/Method_Studios_logo.png",
    bgColor: "#ffffff"
  },
  { 
    name: "Ubisoft", 
    logo: "/logos/ubisoft_logo.png",
    bgColor: "#ffffff"
  },
  { 
    name: "EA Games", 
    logo: "/logos/ea_games_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "Rockstar Games", 
    logo: "/logos/rockstar_games_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "Makuta VFX", 
    logo: "/logos/makuta_vfx_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "DQ Entertainment", 
    logo: "/logos/dq_entertainment_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "Green Gold", 
    logo: "/logos/green_gold_animation_pvt_ltd_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "Reliance", 
    logo: "/logos/reliance_logo.jpg",
    bgColor: "#ffffff"
  },
  { 
    name: "Xentrix", 
    logo: "/logos/Xentrix_logo.png",
    bgColor: "#ffffff"
  },
];

function Placements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.fromTo(".pl-header > *", 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        }
      }
    );
  }, { scope: containerRef });

  // Render company logo card with image
  const renderCompany = (company: typeof placementCompanies[0], i: number) => (
    <div key={`${company.name}-${i}`} className="group">
      <div
        className="h-20 sm:h-24 md:h-28 w-full rounded-xl border border-white/10 bg-white flex items-center justify-center px-4 sm:px-6 transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
        style={{ backgroundColor: company.bgColor }}
      >
        {/* Company Logo Image */}
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={120}
          height={80}
          className="h-full w-auto object-contain object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />

        {/* Fallback company name (hidden by default) */}
        <span className="text-[11px] text-gray-800 font-bold uppercase tracking-wider text-center items-center justify-center hidden w-full h-full">
          {company.name}
        </span>
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-transparent py-16 md:py-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-content mx-auto px-6">
        {/* Header */}
        <div className="pl-header text-center mb-16">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Career Trajectory
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h2 className="font-display text-[clamp(1.8rem,6vw,3.5rem)] leading-[0.85] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
            The Alumni <span className="metallic-gold-text italic">Network</span>
          </h2>
        </div>

        {/* Alumni Network Logo Rows */}
        <div className="max-w-content mx-auto">
          <div className="border-t-2 border-b-2 border-red-600/40 pt-10 pb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-5">
              {placementCompanies.map((company, i) => renderCompany(company, i))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Placements);
