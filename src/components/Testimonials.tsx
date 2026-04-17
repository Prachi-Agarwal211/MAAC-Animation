"use client";

import { useRef, useState, memo, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { testimonialsData } from "@/data/siteData";
import { ChevronLeft, ChevronRight, Play, Volume2 } from "lucide-react";

function Waveform() {
  // Memoize waveform heights to prevent jitter on re-renders
  const heights = useMemo(() => 
    Array.from({ length: 12 }, () => Math.random() * 100),
    []
  );
  
  return (
    <div className="flex items-center gap-1 h-8">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-1 metallic-gold-accent rounded-full animate-pulse"
          style={{
            height: `${height}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.5 + (i % 5) * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".tm-header > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out" })
      .fromTo(".tm-main", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }, "-=0.8");
  }, { scope: sectionRef });

  const next = () => setActive((prev) => (prev + 1) % testimonialsData.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-transparent">
      <div className="atmosphere-blob blob-red top-1/4 -left-20 opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="tm-header text-center mb-24">
          <p className="metallic-gold-text text-sm font-bold tracking-[0.3em] uppercase mb-6">Success Stories</p>
          <h2 className="font-display font-black text-[clamp(1.8rem,4.5vw,3rem)] text-white leading-[0.9] tracking-tighter uppercase">
            The Alumni <span className="metallic-gold-text">Voices</span>
          </h2>
        </div>

        <div className="tm-main max-w-5xl mx-auto relative">
          <div
            className="glass rounded-[48px] p-10 md:p-20 relative overflow-hidden group border-white/5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Header: Audio UI */}
            <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-8">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full metallic-gold-accent flex items-center justify-center text-white">
                    <Play size={20} fill="currentColor" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold metallic-gold-text uppercase tracking-[0.3em] mb-1">Live Playback</span>
                    <Waveform />
                  </div>
               </div>
               <div className="hidden sm:flex items-center gap-3 text-white/20">
                  <Volume2 size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest tabular-nums">00:4{active} / 03:12</span>
               </div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <p 
                className="text-[#A8A29C] text-xl md:text-3xl leading-relaxed mb-16 font-medium italic min-h-[180px] flex items-center justify-center transition-all duration-700"
              >
                &ldquo;{testimonialsData[active].text}&rdquo;
              </p>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#BF953F] to-[#FF6B35] p-[1px] rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <div className="w-full h-full rounded-3xl bg-[#080808] flex items-center justify-center text-3xl font-display font-black text-white">
                    {testimonialsData[active].name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-white text-2xl font-display font-bold tracking-tight mb-1">{testimonialsData[active].name}</h4>
                  <p className="metallic-gold-text text-xs font-bold tracking-[0.3em] uppercase">{testimonialsData[active].role}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-4 md:left-10 flex items-center">
               <button onClick={prev} className="w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-[#BF953F]/40 transition-all active:scale-90 group/arrow">
                 <ChevronLeft size={28} className="group-hover/arrow:scale-110 transition-transform" />
               </button>
            </div>
            <div className="absolute inset-y-0 right-4 md:right-10 flex items-center">
               <button onClick={next} className="w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-[#BF953F]/40 transition-all active:scale-90 group/arrow">
                 <ChevronRight size={28} className="group-hover/arrow:scale-110 transition-transform" />
               </button>
            </div>
          </div>

          {/* Timeline Dots */}
          <div className="flex items-center justify-center gap-4 mt-16">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`transition-all duration-700 rounded-full h-1 ${
                  index === active ? "w-16 metallic-gold-accent" : "w-2 bg-white/10 hover:bg-white/20"
                }`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
