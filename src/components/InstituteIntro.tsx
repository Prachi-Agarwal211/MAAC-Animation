"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

function CountUpStat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const countRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: number,
      duration: 2.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: countRef.current,
        start: "top 90%",
      },
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.round(obj.value).toString();
        }
      },
    });
  }, { scope: countRef });

  return (
    <div className="text-center px-4 group">
      <div className="font-display font-black text-[clamp(1.5rem,3.5vw,2.5rem)] leading-none text-white tabular-nums flex items-center justify-center tracking-tighter">
        <span ref={countRef}>0</span>
        <span className="text-[#E31837] ml-1">{suffix}</span>
      </div>
      <div className="text-[#6B6560] text-[9px] mt-3 font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-white">{label}</div>
    </div>
  );
}

export default function InstituteIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".institute-title", { opacity: 0, y: 30, duration: 1, ease: "expo.out" })
      .from(".institute-description", { opacity: 0, y: 20, duration: 1, ease: "expo.out" }, "-=0.7")
      .from(".institute-badges > span", { opacity: 0, y: 10, stagger: 0.1, duration: 0.8, ease: "expo.out" }, "-=0.6")
      .from(".institute-video-container", { opacity: 0, scale: 0.98, duration: 1.2, ease: "expo.out" }, "-=0.8");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 bg-[#0C0C0C] py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Video */}
          <div className="lg:col-span-7 institute-video-container">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/5 group">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/_D7gd6bSE0A?autoplay=0&controls=1&rel=0&modestbranding=1&showinfo=0"
                title="MAAC Animation Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-5">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-1 h-12 bg-[#E31837] flex-shrink-0 rounded-full mt-1" />
              <h2 className="institute-title font-display font-bold text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-white uppercase tracking-tighter">
                Jaipur&apos;s Elite <br />
                <span className="text-[#E31837]">Creative Powerhouse</span>
              </h2>
            </div>

            <div className="institute-description text-[#A8A29C] text-base md:text-lg leading-relaxed mb-10">
              <p>
                As Rajasthan&apos;s leading Animation and VFX institute, MAAC Jaipur provides industry-aligned training engineered for the global production pipeline.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="institute-badges flex flex-wrap gap-3 mb-12">
              {["NSDC Partner", "MESC Certified", "B.Voc Degree"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase glass border border-white/10 text-white/80"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E31837]" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Stats row inside content */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
              <CountUpStat number={30} suffix="+" label="Years" />
              <CountUpStat number={95} suffix="%" label="Placement" />
              <CountUpStat number={50} suffix="K+" label="Alumni" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
