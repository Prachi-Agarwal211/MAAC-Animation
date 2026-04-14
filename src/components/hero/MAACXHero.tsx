"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { VolumeX, Volume2 } from "lucide-react";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

const HERO_VIDEO_MP4 = "/hero-video-compressed.mp4";
const HERO_VIDEO_WEBM = "/hero-video.webm";
const INTRO_VIDEO_MP4 = "/intro.mp4";
const INTRO_VIDEO_WEBM = "/intro.webm";

export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [introComplete, setIntroComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Check for slow connection or save data preference
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlowConnection = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const skipIntro =
      window.innerWidth < 1024 ||
      sessionStorage.getItem("maac_intro_v9") ||
      isSlowConnection ||
      prefersReducedMotion;

    if (skipIntro) {
      setIntroComplete(true);
      // Ensure navbar shows immediately if intro is skipped
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("maac:intro_revealed"));
      });
    } else {
      const timer = setTimeout(() => setShowSkip(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleIntroEnded = () => {
    if (introComplete) return;
    sessionStorage.setItem("maac_intro_v9", "1");
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
        window.dispatchEvent(new Event("maac:intro_revealed"));
      }
    });

    tl.to(".intro-ui-elements", { opacity: 0, duration: 0.4 })
      .to(introOverlayRef.current, {
        opacity: 0,
        // Keep the cinematic feel but avoid filter blur (expensive on GPUs).
        scale: 1.06,
        duration: 1.0,
        ease: "power4.inOut"
      });
  };

  useGSAP(() => {
    if (!introComplete) {
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 8,
        ease: "none",
        onComplete: handleIntroEnded
      });
      return;
    }

    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    
    tl.fromTo(".maacx-content > *", 
      // Avoid animating CSS filters (blur) for smoother performance.
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.05, stagger: 0.08, delay: 0.35 }
    );

    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }

  }, { dependencies: [introComplete], scope: containerRef });

  return (
    <>
      {/* ── CINEMATIC INTRO OVERLAY ── */}
      {!introComplete && (
        <div ref={introOverlayRef} className="fixed inset-0 z-[9999] bg-[#080808] overflow-hidden flex items-center justify-center">
          {videoError ? (
            <div className="flex flex-col items-center gap-8">
               <div className="w-16 h-16 border-t-2 border-[#E31837] rounded-full animate-spin" />
               <span className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase">Loading Experience</span>
            </div>
          ) : (
            <>
              <video
                ref={introVideoRef}
                className="w-full h-full object-contain pointer-events-none"
                autoPlay muted playsInline
                onEnded={handleIntroEnded}
                onError={() => setVideoError(true)}
              >
                <source src={INTRO_VIDEO_WEBM} type="video/webm" />
                <source src={INTRO_VIDEO_MP4} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              
              <div className="intro-ui-elements absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <p className="text-white/50 text-xs tracking-[0.25em] uppercase font-light">Animation · VFX · Jaipur</p>
                <div className="h-[1px] w-6 bg-[#E31837] mt-4 shadow-[0_0_10px_#E31837]" />
              </div>

              {showSkip && (
                <button onClick={handleIntroEnded} className="intro-ui-elements absolute bottom-12 left-12 z-10 text-white/30 hover:text-white uppercase tracking-[0.3em] text-[9px] transition-colors border-b border-white/5 pb-1">
                  Skip Experience
                </button>
              )}

              <button 
                onClick={() => { setIsMuted(!isMuted); if(introVideoRef.current) introVideoRef.current.muted = !isMuted; }}
                className="intro-ui-elements absolute bottom-12 right-12 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white/60"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <div className="intro-ui-elements absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-10">
                <div ref={progressRef} className="h-full bg-[#E31837] w-0 shadow-[0_0_15px_#E31837]" />
              </div>
            </>
          )}
        </div>
      )}

      {/* ── PROFESSIONAL HERO SECTION ── */}
      <section ref={containerRef} className="relative h-[100svh] w-full bg-[#080808] overflow-hidden flex flex-col justify-end">
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          {/* High-End Vignette Matrix */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-24 pb-16 sm:pb-20 md:pb-32 maacx-content max-w-[1800px] mx-auto w-full">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold tracking-[0.3em] uppercase">
                Animation & VFX Academy · Jaipur
              </span>
            </div>

            <h1 className="mb-5 sm:mb-6">
              <span className="block text-white font-display font-bold text-[clamp(1.6rem,6.2vw,2.5rem)] leading-[0.95] tracking-tighter uppercase">
                <SplitTextReveal>Learn Animation & VFX</SplitTextReveal>
              </span>
              <span className="block gradient-text font-display font-black text-[clamp(1.35rem,5.4vw,2.2rem)] leading-[0.95] tracking-tighter mt-2 uppercase">
                <span className="animate-fade-in-up inline-block" style={{animationDelay:"0.6s",animationFillMode:"both"}}>From Basics to Portfolio</span>
              </span>
            </h1>

            <p className="text-[#A8A29C] text-[15px] sm:text-base md:text-lg font-medium mb-8 sm:mb-10 max-w-xl leading-relaxed sm:border-l-2 sm:border-[#E31837]/50 sm:pl-6 sm:italic">
              Get hands-on training in 3D, VFX, motion graphics, and game art—learn industry tools, build real projects, and graduate with a showreel that’s ready for interviews.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-8">
              <a href="#courses" className="btn btn-primary w-full sm:w-auto px-10 py-4 rounded-xl text-[10px] font-bold tracking-[0.3em] text-center">
                VIEW PROGRAMS
              </a>
              
              <button 
                onClick={() => { setIsMuted(!isMuted); if(heroVideoRef.current) heroVideoRef.current.muted = !isMuted; }}
                className="flex items-center justify-center sm:justify-start gap-4 group w-full sm:w-auto"
              >
                <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white transition-all">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">
                  {isMuted ? 'PLAY REEL' : 'MUTE AUDIO'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal High-End Stats */}
        <div className="hidden xl:block absolute right-24 bottom-32 z-10 text-right space-y-12">
           {[
            { v: "95%", l: "PLACEMENTS" },
            { v: "30+", l: "YEARS LEGACY" }
           ].map((s, i) => (
             <div key={i} className="group cursor-default">
                <div className="text-white font-display font-black text-5xl leading-none transition-all duration-500 group-hover:text-[#E31837] group-hover:-translate-x-2">{s.v}</div>
                <div className="text-[#6B6560] text-[9px] font-bold tracking-[0.4em] mt-3 uppercase">{s.l}</div>
             </div>
           ))}
        </div>

        {/* Dynamic Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-20">
           <div className="flex flex-col items-center gap-4">
              <span className="text-[8px] font-bold tracking-[0.5em] text-white uppercase">Scroll</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
           </div>
        </div>
      </section>
    </>
  );
}
