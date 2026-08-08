"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { VolumeX, Volume2, Play, Pause, Film } from "lucide-react";

interface ShowcaseItem {
  title: string;
  category: string;
  video: string;
  duration: string;
  poster: string;
  student?: string;
  batch?: string;
  software?: string[];
}

const showcaseVideos: ShowcaseItem[] = [
  { title: "ANANDI", category: "Animation", video: "/student-work/ANANDI-compressed.mp4", duration: "2:34", poster: "/portfolio/featured/nancy-verma-page1.jpg", student: "Nancy Verma", batch: "2025", software: ["Maya", "After Effects"] },
  { title: "FAST LIFE", category: "Short Film", video: "/student-work/fast-life-compressed.mp4", duration: "3:12", poster: "/portfolio/environment-modeling/sayan-chowdhury-page1.jpg", student: "Sayan Chowdhury", batch: "2025", software: ["Premiere Pro", "DaVinci"] },
  { title: "KARMA", category: "Visual Effects", video: "/student-work/KARMA-compressed.mp4", duration: "4:05", poster: "/portfolio/matte-painting/akshat-asolkar.jpg", student: "Akshat Asolkar", batch: "2024", software: ["Nuke", "Maya", "Houdini"] },
  { title: "THE PLASTIC PLAGUE", category: "Documentary", video: "/student-work/the-plastic-plague-compressed.mp4", duration: "5:20", poster: "/portfolio/digital-painting/deshna-shah.jpg", student: "Deshna Shah", batch: "2025", software: ["Premiere Pro", "After Effects"] },
  { title: "CHARACTER REEL 1", category: "Character Animation", video: "/student-work/char-anim-1.mp4", duration: "0:30", poster: "/portfolio/character-modeling/aarush-kumar-page1.jpg", student: "Aarush Kumar", batch: "2025", software: ["Maya", "Blender"] },
  { title: "CHARACTER REEL 2", category: "Character Animation", video: "/student-work/char-anim-2.mp4", duration: "0:30", poster: "/portfolio/character-modeling/arfat-aziz-khan-page1.jpg", student: "Arfat Khan", batch: "2025", software: ["Blender", "ZBrush"] },
  { title: "CHARACTER REEL 3", category: "Character Animation", video: "/student-work/char-anim-3.mp4", duration: "0:30", poster: "/portfolio/character-modeling/abhay-suryavanshi.jpg", student: "Abhay Suryavanshi", batch: "2024", software: ["Maya", "Substance"] },
  { title: "CHARACTER REEL 4", category: "Character Animation", video: "/student-work/char-anim-4.mp4", duration: "0:30", poster: "/portfolio/featured/prerit-mehan-page1.jpg", student: "Prerit Mehan", batch: "2024", software: ["Maya", "Marvelous"] },
];

/* ── Format seconds to MM:SS ── */
function formatTime(sec: number): string {
  if (!sec || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function StudentShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  /* ── GSAP section reveal ── */
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 92%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".cinema-header > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }
    ).fromTo(".cinema-body",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  /* ── Switch video when active changes ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    setIsLoading(true);
    setIsTransitioning(true);
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);

    // Curtain transition: setTimeout to let CSS animation play
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);

      const item = showcaseVideos[active];
      v.src = item.video;
      v.load();
    }, 400);

    const handleCanPlay = () => {
      setIsLoading(false);
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };

    const handleTimeUpdate = () => {
      if (v.duration) {
        setCurrentTime(v.currentTime);
        setDuration(v.duration);
        setProgress((v.currentTime / v.duration) * 100 || 0);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (autoAdvance && showcaseVideos.length > 1) {
        setTimeout(() => {
          setActive((prev) => (prev + 1) % showcaseVideos.length);
        }, 1500);
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setIsTransitioning(false);
    };

    v.addEventListener('canplay', handleCanPlay, { once: true });
    v.addEventListener('timeupdate', handleTimeUpdate);
    v.addEventListener('ended', handleEnded);
    v.addEventListener('error', handleError, { once: true });

    // Scroll to film strip frame
    if (filmStripRef.current) {
      const frame = filmStripRef.current.children[active] as HTMLElement;
      if (frame) {
        frame.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    return () => {
      clearTimeout(transitionTimer);
      v.removeEventListener('timeupdate', handleTimeUpdate);
      v.removeEventListener('canplay', handleCanPlay);
      v.removeEventListener('ended', handleEnded);
      v.removeEventListener('error', handleError);
      v.pause();
      v.removeAttribute('src');
    };
  }, [active, autoAdvance]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const v = videoRef.current;
    if (v && v.duration) {
      v.currentTime = pct * v.duration;
    }
  }, []);

  const nextVideo = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % showcaseVideos.length);
    }, 400);
  }, []);

  const prevVideo = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActive((prev) => (prev - 1 + showcaseVideos.length) % showcaseVideos.length);
    }, 400);
  }, []);

  const activeItem = showcaseVideos[active];

  /* ── Ambient color based on category ── */
  const ambientColors: Record<string, string> = {
    "Animation": "rgba(196, 168, 130, 0.08)",
    "Short Film": "rgba(227, 24, 55, 0.08)",
    "Visual Effects": "rgba(255, 107, 53, 0.08)",
    "Documentary": "rgba(160, 180, 140, 0.08)",
    "Character Animation": "rgba(140, 180, 220, 0.08)",
  };
  const ambientColor = ambientColors[activeItem.category] || "rgba(196, 168, 130, 0.08)";

  return (
    <section ref={containerRef} className="relative min-h-screen bg-transparent py-16 md:py-28 flex flex-col overflow-hidden">
      {/* ── Ambient Background Shift ── */}
      <div
        className="cinema-ambient"
        style={{ background: `radial-gradient(ellipse at center, ${ambientColor.replace("0.08", "0.12")} 0%, transparent 70%)` }}
      />

      {/* ── HEADER ── */}
      <div className="cinema-header relative z-10 max-w-7xl mx-auto px-6 mb-14 md:mb-20 text-center">
        <p className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] metallic-gold-accent" />
          MAAC CINEMA
          <span className="w-8 h-[1px] metallic-gold-accent" />
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
          <span className="title-layer">
            <span className="title-layer-glow" aria-hidden="true">STUDENT</span>
            <span className="relative z-10">STUDENT</span>
          </span>{' '}
          <span className="metallic-gold-text italic title-layer">
            <span className="title-layer-glow" aria-hidden="true">SHOWCASE</span>
            <span className="relative z-10 metallic-gold-text italic">SHOWCASE</span>
          </span>
        </h2>
        <p className="text-white/70 text-sm md:text-base mt-4 max-w-xl mx-auto font-light">
          Premiering the next generation of animation, VFX & game design talent
        </p>
      </div>

      {/* ── CINEMA BODY ── */}
      <div className="cinema-body relative z-10 max-w-[1400px] mx-auto w-full px-4 md:px-10">
        {/* Split-screen: Poster + Player */}
        <div className="cinema-split">
          {/* ── FILM POSTER CARD ── */}
          <div className="film-poster group">
            <video
              src={`${activeItem.video}#t=0.1`}
              className="poster-bg w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
            <div className="poster-overlay" />
            <div className="poster-content">
              <span className="poster-category">
                <Film size={10} className="inline mr-1" />
                {activeItem.category}
              </span>
              <h3 className="poster-title">{activeItem.title}</h3>
              <div className="poster-meta">
                {activeItem.student && <span>By {activeItem.student}</span>}
                {activeItem.batch && <span className="meta-badge">Batch {activeItem.batch}</span>}
              </div>
              {activeItem.software && activeItem.software.length > 0 && (
                <div className="poster-software">
                  {activeItem.software.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── CINEMA PLAYER ── */}
          <div className="cinema-player group">
            <div className={isTransitioning ? "cinema-curtain" : ""}>
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                muted={isMuted}
                loop={false}
                playsInline
                preload="metadata"
              />
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-[#C4A882] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Loading...</span>
                </div>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="player-gradient" />

            {/* Controls */}
            <div className="player-controls">
              <div className="flex items-center gap-3">
                <button onClick={prevVideo} aria-label="Previous video" className="play-btn !w-10 !h-10 !bg-transparent !border-0 hover:!bg-white/5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="play-btn">
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <button onClick={nextVideo} aria-label="Next video" className="play-btn !w-10 !h-10 !bg-transparent !border-0 hover:!bg-white/5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="progress-track" onClick={handleProgressClick}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              {/* Time display */}
              <span className="time-display">{formatTime(currentTime)} / {formatTime(duration)}</span>

              {/* Right controls */}
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} className="mute-btn">
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button
                  onClick={() => setAutoAdvance(!autoAdvance)}
                  aria-label={autoAdvance ? "Disable auto-advance" : "Enable auto-advance"}
                  className={`mute-btn text-[9px] font-bold tracking-wider ${autoAdvance ? 'text-[#C4A882]' : ''}`}
                  title={autoAdvance ? "Auto-advance on" : "Auto-advance off"}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── FILM STRIP NAVIGATION ── */}
        <div className="mt-8 md:mt-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-white/20" />
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Film Strip</span>
              <span className="text-white/50 text-[10px] font-mono">
                {String(active + 1).padStart(2, '0')}/{String(showcaseVideos.length).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div ref={filmStripRef} className="film-strip">
            {showcaseVideos.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== active) {
                    setIsTransitioning(true);
                    setTimeout(() => setActive(i), 400);
                  }
                }}
                className={`film-strip-frame ${i === active ? 'active' : ''}`}
              >
                <span className="frame-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="frame-duration">{item.duration}</span>
                <video
                  src={`${item.video}#t=0.1`}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative z-10 mt-14 md:mt-20 flex justify-center">
        <a
          href="/student-work"
          className="group inline-flex items-center gap-4 text-white text-xs font-bold tracking-[0.3em] uppercase"
        >
          View Full Gallery
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#C4A882] group-hover:border-[#C4A882] group-hover:text-black transition-all duration-500">
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}
