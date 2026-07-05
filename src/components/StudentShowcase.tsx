"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { VolumeX, Volume2, ArrowRight, Play, Pause } from "lucide-react";

const showcaseVideos = [
  { title: "ANANDI", category: "Animation", video: "/student-work/ANANDI-compressed.mp4", duration: "2:34", fallbackImage: "/portfolio/featured/nancy-verma-page1.jpg" },
  { title: "FAST LIFE", category: "Short Film", video: "/student-work/fast-life-compressed.mp4", duration: "3:12", fallbackImage: "/portfolio/environment-modeling/sayan-chowdhury-page1.jpg" },
  { title: "KARMA", category: "Visual Effects", video: "/student-work/KARMA-compressed.mp4", duration: "4:05", fallbackImage: "/portfolio/matte-painting/akshat-asolkar.jpg" },
  { title: "THE PLASTIC PLAGUE", category: "Documentary", video: "/student-work/the-plastic-plague-compressed.mp4", duration: "5:20", fallbackImage: "/portfolio/digital-painting/deshna-shah.jpg" },
];

export default function StudentShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Deep research findings on original implementation:
  // - Used a stack of 4 <video> elements with conditional `src={shouldLoad ? ... : undefined}` + opacity switching.
  // - This is fragile: setting src to undefined doesn't reliably unload/pause media elements across re-renders.
  // - No explicit .load() or play() promise handling → autoplay often fails silently, switching between the 4 videos was unreliable (especially jumping indices).
  // - Ref callbacks inside .map on every render (anti-pattern, can cause stale refs or extra work).
  // - "Adjacent only" loading meant not all 4 were instantly available when clicking thumbnails.
  // - No pause on switch, leading to background playback or load races.
  // - Result: "not showing all these 4 things" reliably — some videos wouldn't play, switch, or load promptly from the public/student-work folder.
  // Fix: Single <video> ref + useEffect on `active` to switch src + proper play handling. This makes all 4 selectable and playable cleanly.

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".ss-header > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" })
      .fromTo(".ss-main", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" }, "-=0.6");
  }, { scope: containerRef });

  // Switch the single video when active changes. This is the core fix for reliably showing/playing the 4 films.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const item = showcaseVideos[active];
    setIsVideoLoading(true);
    setIsPaused(false);

    // Set new source
    v.src = item.video;

    // Important: call load() after changing src
    v.load();

    const handleCanPlay = () => {
      setIsVideoLoading(false);
      // Autoplay the new one (muted, so should work; catch the promise)
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay was prevented (common on some browsers/devices without prior interaction)
          console.warn('Video autoplay prevented for', item.title, err);
          setIsPaused(true);
        });
      }
    };

    const handleTimeUpdate = () => {
      if (v.duration) {
        const p = (v.currentTime / v.duration) * 100;
        setProgress(p || 0);
      }
    };

    const handleError = () => {
      setIsVideoLoading(false);
      console.error('Failed to load student film video:', item.video);
    };

    v.addEventListener('canplay', handleCanPlay, { once: true });
    v.addEventListener('timeupdate', handleTimeUpdate);
    v.addEventListener('error', handleError, { once: true });

    return () => {
      v.removeEventListener('timeupdate', handleTimeUpdate);
      v.removeEventListener('canplay', handleCanPlay);
      v.removeEventListener('error', handleError);
      // Pause and clear src on unmount or before next switch to free resources
      v.pause();
      v.removeAttribute('src');
    };
  }, [active]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const v = videoRef.current;
    if (v) v.muted = nextMuted;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (isPaused || v.paused) {
      v.play().then(() => setIsPaused(false)).catch(() => setIsPaused(true));
    } else {
      v.pause();
      setIsPaused(true);
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-transparent py-16 md:py-24 flex flex-col overflow-hidden">
      <div className="atmosphere-blob blob-red top-1/4 -right-20 opacity-10" />
      
      {/* ── HEADER ── */}
      <div className="ss-header relative z-10 max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
        <div className="text-center mb-16 md:mb-20">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Witness the Talent
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] text-white leading-[0.9] font-bold uppercase leading-[1.1] tracking-[0.1em]">
            STUDENT <span className="metallic-gold-text italic">SHOWCASE</span>
          </h2>
        </div>
      </div>

      {/* ── MAIN THEATRE ── */}
      <div className="ss-main relative flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-10">
        <div className="relative aspect-video rounded-[40px] overflow-hidden bg-[#050000] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 group">
          {/* SINGLE VIDEO PLAYER - the reliable fix.
             Original stacked + conditional-src approach was the root cause of not being able to properly show/play all 4 videos from the folder.
             Now one video element; src + play managed in useEffect when user selects a different film via thumbnails.
          */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

          {/* Loader overlay */}
          {(isVideoLoading || (!isPaused && active !== null)) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex justify-end">
               <button onClick={toggleMute} aria-label={isMuted ? "Unmute video" : "Mute video"} className="w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform">
                 {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
               </button>
            </div>

            <div className="flex items-end justify-between gap-8">
              <div className="flex-1">
                <p className="text-[#FFD700] text-xs font-bold tracking-[0.2em] uppercase mb-3">{showcaseVideos[active].category}</p>
                <h3 className="text-white text-3xl md:text-5xl font-display font-bold uppercase leading-[1.1] tracking-[0.1em]">{showcaseVideos[active].title}</h3>
                
                {/* Tech Stats Overlay - kept but noted as generic (original was hardcoded the same for all 4) */}
                <div className="mt-6 flex flex-wrap gap-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                   {[
                    { label: "Engine", val: "Arnold v7.2" },
                    { label: "Polys", val: "4.2M+" },
                    { label: "Pipeline", val: "USD / Solaris" }
                   ].map((stat, i) => (
                     <div key={i} className="flex flex-col">
                         <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{stat.label}</span>
                        <span className="text-white text-xs font-mono tabular-nums">{stat.val}</span>
                     </div>
                   ))}
                </div>
              </div>
              
              <button onClick={togglePlay} aria-label={isPaused ? "Play video" : "Pause video"} className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                {isPaused ? <Play size={28} fill="currentColor" /> : <Pause size={28} fill="currentColor" />}
              </button>
            </div>
          </div>

          {/* Timeline Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
            <div className="h-full bg-[#FFD700] transition-all duration-100 ease-linear shadow-[0_0_15px_#FFD700]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* ── THUMBNAILS ── */}
        <div className="mt-12 flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4">
          {showcaseVideos.map((item, i) => {
            const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
            return (
            <button 
              key={i} 
              onClick={() => setActive(i)}
              aria-label={`Play ${item.title}`}
              onMouseEnter={(e) => {
                // Skip hover preview on touch devices
                if (isTouchDevice) return;
                const vid = e.currentTarget.querySelector("video");
                if (vid) vid.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                if (isTouchDevice) return;
                const vid = e.currentTarget.querySelector("video");
                if (vid) {
                  vid.pause();
                  vid.currentTime = 0;
                }
              }}
              className={`relative flex-shrink-0 w-40 md:w-64 aspect-video rounded-2xl overflow-hidden border-2 transition-all duration-500 ${i === active ? 'border-[#FFD700] scale-95 shadow-lg shadow-[#FFD700]/20' : 'border-white/5 opacity-40 hover:opacity-100'}`}
            >
              <video
                src={item.video}
                className="w-full h-full object-cover pointer-events-none"
                muted
                playsInline
                preload="none"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play size={20} className="text-white" fill="white" />
              </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative z-10 mt-20 flex justify-center">
        <a href="/student-work" className="group flex items-center gap-4 text-white text-xs font-bold tracking-[0.3em] uppercase">
          View All Projects
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-500">
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </div>
        </a>
      </div>
    </section>
  );
}
