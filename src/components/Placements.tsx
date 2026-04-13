"use client";

import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { Globe, Star, ShieldCheck, Briefcase } from "lucide-react";

const placementCompanies = [
  { 
    name: "DNEG", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/DNEG_logo.svg",
    bgColor: "#1a1a2e"
  },
  { 
    name: "Prime Focus", 
    logo: "https://logo.clearbit.com/primefocusworld.com",
    bgColor: "#ffffff"
  },
  { 
    name: "Redchillies VFX", 
    logo: "https://logo.clearbit.com/redchillies.com",
    bgColor: "#ffffff"
  },
  { 
    name: "MPC", 
    logo: "https://logo.clearbit.com/mpcfilm.com",
    bgColor: "#ffffff"
  },
  { 
    name: "Technicolor", 
    logo: "https://logo.clearbit.com/technicolor.com",
    bgColor: "#ffffff"
  },
  { 
    name: "Method Studios", 
    logo: "https://logo.clearbit.com/methodstudios.com",
    bgColor: "#ffffff"
  },
  { 
    name: "Ubisoft", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Ubisoft_logo.svg",
    bgColor: "#000000"
  },
  { 
    name: "EA Games", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Electronic_Arts_Logo.svg",
    bgColor: "#ffffff"
  },
  { 
    name: "Rockstar Games", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Rockstar_Games_Logo.svg",
    bgColor: "#ffffff"
  },
  { 
    name: "Makuta VFX", 
    logo: "https://logo.clearbit.com/makutavfx.com",
    bgColor: "#ffffff"
  },
  { 
    name: "DQ Entertainment", 
    logo: "https://logo.clearbit.com/dqentertainment.com",
    bgColor: "#ffffff"
  },
  { 
    name: "Green Gold", 
    logo: "https://logo.clearbit.com/greengoldtv.com",
    bgColor: "#ffffff"
  },
  { 
    name: "Reliance", 
    logo: "https://logo.clearbit.com/relianceada.com",
    bgColor: "#ffffff"
  },
  { 
    name: "Xentrix", 
    logo: "https://logo.clearbit.com/xentrix.in",
    bgColor: "#ffffff"
  },
];

// Create 4 copies for seamless loop
const extendedCompanies = [...placementCompanies, ...placementCompanies, ...placementCompanies, ...placementCompanies];
const reversedCompanies = [...extendedCompanies].reverse();

function Placements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Setup Row 1: Scroll left
    if (row1Ref.current) {
      const row1 = row1Ref.current;
      const items = Array.from(row1.children) as HTMLElement[];
      
      let singleSetWidth = 0;
      for (let i = 0; i < placementCompanies.length && i < items.length; i++) {
        singleSetWidth += items[i].offsetWidth + 20;
      }

      const duration = singleSetWidth / 60;

      gsap.to(row1, {
        x: -singleSetWidth,
        duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => { gsap.set(row1, { x: 0 }); }
      });
    }

    // Setup Row 2: Scroll right
    if (row2Ref.current) {
      const row2 = row2Ref.current;
      const items = Array.from(row2.children) as HTMLElement[];
      
      let singleSetWidth = 0;
      for (let i = 0; i < placementCompanies.length && i < items.length; i++) {
        singleSetWidth += items[i].offsetWidth + 20;
      }

      const duration = singleSetWidth / 60;

      gsap.set(row2, { x: -singleSetWidth });
      gsap.to(row2, {
        x: 0,
        duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => { gsap.set(row2, { x: -singleSetWidth }); }
      });
    }

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
    <div key={`${company.name}-${i}`} className="shrink-0 group">
      <div 
        className="w-40 h-24 md:w-48 md:h-28 rounded-lg border-2 border-gray-200 flex items-center justify-center p-5 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-gray-300 overflow-hidden relative"
        style={{ backgroundColor: company.bgColor }}
      >
        {/* Company Logo Image */}
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="w-full h-full object-contain object-center opacity-90 group-hover:opacity-100 transition-all duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        
        {/* Fallback company name (hidden by default) */}
        <span className="text-sm text-gray-700 font-bold uppercase tracking-wider text-center items-center justify-center hidden w-full h-full">
          {company.name}
        </span>
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#080408] py-24 md:py-32 overflow-hidden border-t-2 border-red-600/40"
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

        {/* Dual-Row Scrolling Logo Cloud */}
        <div className="relative space-y-6">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#080408] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#080408] to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Scrolls Left */}
          <div 
            ref={row1Ref}
            className="flex items-center gap-5 w-max"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { timeScale: 0.2, duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { timeScale: 1, duration: 0.3 })}
          >
            {extendedCompanies.map((company, i) => renderCompany(company, i))}
          </div>

          {/* Row 2 - Scrolls Right */}
          <div 
            ref={row2Ref}
            className="flex items-center gap-5 w-max"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { timeScale: 0.2, duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { timeScale: 1, duration: 0.3 })}
          >
            {reversedCompanies.map((company, i) => renderCompany(company, i))}
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
