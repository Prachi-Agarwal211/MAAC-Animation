"use client";

import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { Globe, Star, ShieldCheck, Briefcase } from "lucide-react";

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
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  // Render company logo card with image
  const renderCompany = (company: typeof placementCompanies[0], i: number) => (
    <div key={`${company.name}-${i}`} className="group">
      <div 
        className="h-16 sm:h-18 md:h-20 lg:h-20 w-full rounded-xl border border-white/10 bg-white flex items-center justify-center px-6 transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
        style={{ backgroundColor: company.bgColor }}
      >
        {/* Company Logo Image */}
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-h-full w-auto object-contain object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
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
      className="relative bg-[#080408] py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="pl-header text-center mb-16">
          <p className="text-[#E31837] text-[10px] font-bold tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#E31837]" />
            Career Trajectory
            <span className="w-6 h-[1px] bg-[#E31837]" />
          </p>
          <h2 className="font-display font-black text-[clamp(1.8rem,4.5vw,3rem)] text-white leading-[0.95] tracking-tight mb-8 uppercase">
            The Alumni <span className="gradient-text italic">Network</span>
          </h2>
          <p className="text-[#A8A29C] text-lg md:text-xl max-w-2xl mx-auto italic">
            Engineering success at the world&apos;s most prestigious production houses.
          </p>
        </div>

        {/* Alumni Network Logo Rows (like reference screenshot) */}
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-b-2 border-red-600/40 pt-10 pb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
              {placementCompanies.slice(0, 7).map((company, i) => renderCompany(company, i))}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5 lg:max-w-[1100px] lg:mx-auto">
              {placementCompanies.slice(7).map((company, i) => renderCompany(company, i + 7))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Ticker */}
      <div className="mt-32 py-12 border-y border-white/5 bg-[#111111]/50 backdrop-blur-md">
        <div className="animate-marquee-fast flex items-center gap-20 whitespace-nowrap">
          {[
            { l: "95% PLACEMENT SUCCESS", i: <ShieldCheck size={14} /> },
            { l: "500+ HIRING PARTNERS", i: <Globe size={14} /> },
            { l: "₹15L TOP PACKAGE", i: <Star size={14} /> },
            { l: "30+ YEARS LEGACY", i: <Briefcase size={14} /> }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
              <span className="text-[#E31837]">{item.i}</span>
              {item.l}
            </div>
          ))}
          {[
            { l: "95% PLACEMENT SUCCESS", i: <ShieldCheck size={14} /> },
            { l: "500+ HIRING PARTNERS", i: <Globe size={14} /> },
            { l: "₹15L TOP PACKAGE", i: <Star size={14} /> },
            { l: "30+ YEARS LEGACY", i: <Briefcase size={14} /> }
          ].map((item, i) => (
            <div key={`d-${i}`} className="flex items-center gap-4 text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
              <span className="text-[#E31837]">{item.i}</span>
              {item.l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Placements);
