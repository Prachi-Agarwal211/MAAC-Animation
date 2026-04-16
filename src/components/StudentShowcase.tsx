"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { VolumeX, Volume2, ArrowRight, Play, Pause } from "lucide-react";

const showcaseVideos = [
  { title: "ANANDI", category: "Animation", video: "/student-work/ANANDI-compressed.mp4", duration: "2:34", fallbackImage: "/portfolio/featured/nancy-verma-page1.jpg" },
  { title: "FAST LIFE", category: "Short Film", video: "/student-work/FAST%20LIFE-compressed.mp4", duration: "3:12", fallbackImage: "/portfolio/environment-modeling/sayan-chowdhury-page1.jpg" },
  { title: "KARMA", category: "Visual Effects", video: "/student-work/KARMA-compressed.mp4", duration: "4:05", fallbackImage: "/portfolio/matte-painting/akshat-asolkar.jpg" },
  { title: "THE PLASTIC PLAGUE", category: "Documentary", video: "/student-work/THE%20PLASTIC%20PLAGUE-compressed.mp4", duration: "5:20", fallbackImage: "/portfolio/digital-painting/deshna-shah.jpg" },
];

export default function StudentShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const activeVideo = videoRefs.current[active];
    if (!activeVideo) return;

    const updateProgress = () => {
      const p = (activeVideo.currentTime / activeVideo.duration) * 100;
      setProgress(p || 0);
    };

    activeVideo.addEventListener("timeupdate", updateProgress);
    return () => activeVideo.removeEventListener("timeupdate", updateProgress);
  }, [active]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach(v => { if(v) v.muted = !isMuted; });
  };

  const togglePlay = () => {
    const v = videoRefs.current[active];
    if (v) {
      if (isPaused) {
        v.play();
        setIsPaused(false);
      } else {
        v.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-transparent py-24 md:py-40 flex flex-col overflow-hidden">
      <div className="atmosphere-blob blob-red top-1/4 -right-20 opacity-10" />
      
      {/* ── HEADER ── */}
      <div className="ss-header relative z-10 max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
        <span className="inline-block px-4 py-2 bg-[#E31837]/10 backdrop-blur-md border border-[#E31837]/30 rounded-full text-[#E31837] text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
          Premium Student Reel
        </span>
        <h2 className="font-display font-bold text-[clamp(1.8rem,4.5vw,3rem)] text-white leading-[0.9] tracking-tighter">
          Cinematic <span className="gradient-text">Showcase</span>
        </h2>
      </div>

      {/* ── MAIN THEATRE ── */}
      <div className="ss-main relative flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-10">
        <div className="relative aspect-video rounded-[40px] overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 group">
          
          {showcaseVideos.map((item, i) => {
            const isActive = i === active;
            
            return (
              <div key={i} className={`absolute inset-0 transition-all duration-1000 ease-expo-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
                {/* Only set src for the active video to save bandwidth */}
                <video
                  ref={el => { videoRefs.current[i] = el; }}
                  src={isActive ? item.video : undefined}
                  poster={item.fallbackImage}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  loop
                  playsInline
                  autoPlay={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* Loader overlay for when video is buffering */}
                {isActive && !isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                     <div className="w-12 h-12 border-4 border-[#E31837] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Controls Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex justify-end">
               <button onClick={toggleMute} className="w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform">
                 {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
               </button>
            </div>

            <div className="flex items-end justify-between gap-8">
              <div className="flex-1">
                <p className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase mb-3">{showcaseVideos[active].category}</p>
                <h3 className="text-white text-3xl md:text-5xl font-display font-bold tracking-tighter">{showcaseVideos[active].title}</h3>
                
                {/* Tech Stats Overlay */}
                <div className="mt-6 flex flex-wrap gap-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                   {[
                    { label: "Engine", val: "Arnold v7.2" },
                    { label: "Polys", val: "4.2M+" },
                    { label: "Pipeline", val: "USD / Solaris" }
                   ].map((stat, i) => (
                     <div key={i} className="flex flex-col">
                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{stat.label}</span>
                        <span className="text-white/80 text-xs font-mono tabular-nums">{stat.val}</span>
                     </div>
                   ))}
                </div>
              </div>
              
              <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                {isPaused ? <Play size={28} fill="currentColor" /> : <Pause size={28} fill="currentColor" />}
              </button>
            </div>
          </div>

          {/* Timeline Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
            <div className="h-full bg-[#E31837] transition-all duration-100 ease-linear shadow-[0_0_15px_#E31837]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* ── THUMBNAILS ── */}
        <div className="mt-12 flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4">
          {showcaseVideos.map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-40 md:w-64 aspect-video rounded-2xl overflow-hidden border-2 transition-all duration-500 ${i === active ? 'border-[#E31837] scale-95 shadow-lg shadow-[#E31837]/20' : 'border-white/5 opacity-40 hover:opacity-100'}`}
            >
              <Image src={item.fallbackImage} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play size={20} className="text-white" fill="white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative z-10 mt-20 flex justify-center">
        <a href="/student-work" className="group flex items-center gap-4 text-white text-xs font-bold tracking-[0.3em] uppercase">
          View All Projects
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E31837] group-hover:border-[#E31837] transition-all duration-500">
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </div>
        </a>
      </div>
    </section>
  );
}
