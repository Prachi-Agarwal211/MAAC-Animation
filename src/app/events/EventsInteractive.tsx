"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import VideoFacade from "@/components/ui/VideoFacade";
import Image from "next/image";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { EVENT_PHOTOS, PRESS_PHOTOS, LANDSCAPE_PHOTOS, PORTRAIT_PHOTOS } from "@/data/events";

/* ── Timeline Event Sections — with dates, status, and countdown ── */

type RegStatus = 'open' | 'full' | 'ended';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  day: number;
  month: string;
  year: number;
  status: RegStatus;
  countdownStart?: string;
  youtubeId: string;
  videoTitle: string;
  tags: string[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "24fps",
    title: "24FPS International Animation Awards",
    description: "A globally recognized event where students compete with the best in the animation and VFX industry. This is your chance to impress industry leaders and make a mark in the creative world!",
    day: 15, month: 'MAR', year: 2026, status: 'ended',
    youtubeId: 'C2ix6uKTaAQ', videoTitle: '24FPS International Animation Awards',
    tags: ['Competition', 'Awards', 'International'],
  },
  {
    id: "100hours",
    title: "100 Hours — The Ultimate Creative Marathon",
    description: "Push your limits! Create a 3D-animated short film or a 1-minute mobile film in just 100 hours! Work non-stop, collaborate with teammates, and experience the thrill of filmmaking under real-world deadlines.",
    day: 10, month: 'MAY', year: 2026, status: 'ended',
    youtubeId: '3BuVrYHjIq4', videoTitle: '100 Hours — The Ultimate Creative Marathon',
    tags: ['Marathon', 'Film', 'Challenge'],
  },
  {
    id: "manifest",
    title: "MAAC Manifest",
    description: "We celebrate YOU! MAAC Manifest is where we honor our students and alumni for their outstanding contributions to the animation and VFX industry. Get recognized for your talent and be inspired by industry leaders.",
    day: 22, month: 'JUN', year: 2026, status: 'full',
    youtubeId: 'RaQivBSoEak', videoTitle: 'MAAC Manifest',
    tags: ['Celebration', 'Awards', 'Alumni'],
  },
  {
    id: "nsm",
    title: "National Students' Meet (NSM)",
    description: "A dream event for every MAAC student! Meet like-minded artists from across India, participate in creative workshops, panel discussions, and exclusive hands-on training sessions with industry pros.",
    day: 5, month: 'AUG', year: 2026, status: 'open',
    countdownStart: '2026-08-05T09:00:00+05:30',
    youtubeId: 'F0WMuSpXMK0', videoTitle: "National Students' Meet (NSM)",
    tags: ['Meetup', 'Workshops', 'Networking'],
  },
  {
    id: "mcl",
    title: "MAAC Creative League (MCL)",
    description: "Compete in one of the most exciting design and animation challenges at MAAC! Unleash your creativity, showcase your talent, and win exciting prizes as you go head-to-head with the best in the field.",
    day: 18, month: 'SEP', year: 2026, status: 'open',
    countdownStart: '2026-09-18T10:00:00+05:30',
    youtubeId: 'FPgueLMvlMI', videoTitle: 'MAAC Creative League (MCL)',
    tags: ['Competition', 'Design', 'Gaming'],
  },
  {
    id: "klick",
    title: "MAAC Klick — Nature & Wildlife Photography Expeditions",
    description: "Step outside the classroom and capture breathtaking moments! Travel to stunning locations like Coorg, Ranthambore, and Sariska National Park, and learn the art of professional photography in real-world environments.",
    day: 12, month: 'NOV', year: 2026, status: 'open',
    countdownStart: '2026-11-12T06:00:00+05:30',
    youtubeId: 'ao5k9ZTVbS0', videoTitle: 'MAAC Klick — Nature & Wildlife Photography Expeditions',
    tags: ['Photography', 'Expedition', 'Nature'],
  },
  {
    id: "bts",
    title: "BTS: Behind the Screen — Industry Webinars",
    description: "Gain exclusive insights from industry legends through our webinars and Masterclasses. Learn about cutting-edge tools, techniques, and career opportunities straight from professionals & our Alumni who have worked on blockbuster movies and AAA games.",
    day: 3, month: 'DEC', year: 2026, status: 'open',
    countdownStart: '2026-12-03T15:00:00+05:30',
    youtubeId: 'Fs6YutaEejc', videoTitle: 'BTS: Behind the Screen',
    tags: ['Webinar', 'Masterclass', 'Industry'],
  },
];

export default function EventsInteractive() {

  const [photos, setPhotos] = useState(LANDSCAPE_PHOTOS);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const slideTimer = useRef<NodeJS.Timeout | null>(null);
  const prefersReduced = useRef(false);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const updatePhotos = () => {
        const isMobile = window.innerWidth < 768;
        const newPhotos = isMobile ? PORTRAIT_PHOTOS : LANDSCAPE_PHOTOS;
        setPhotos(newPhotos);
        setSlideIndex((prev) => (prev >= newPhotos.length ? 0 : prev));
      };
      updatePhotos();
      window.addEventListener("resize", updatePhotos);
      return () => window.removeEventListener("resize", updatePhotos);
    }
  }, []);

  const runSlide = useCallback(() => {
    if (slideTimer.current) clearTimeout(slideTimer.current);
    if (prefersReduced.current) return;
    slideTimer.current = setTimeout(() => {
      setSlideIndex((i) => (i + 1) % photos.length);
    }, 3800);
  }, [photos.length]);

  const stopSlide = useCallback(() => {
    if (slideTimer.current) {
      clearTimeout(slideTimer.current);
      slideTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (isSlidePlaying && !prefersReduced.current) runSlide();
    else stopSlide();
    return stopSlide;
  }, [isSlidePlaying, slideIndex, photos, runSlide, stopSlide]);

  const goToPhoto = (i: number) => setSlideIndex((i + photos.length) % photos.length);
  const nextPhoto = () => goToPhoto(slideIndex + 1);
  const prevPhoto = () => goToPhoto(slideIndex - 1);
  const toggleSlidePlay = () => setIsSlidePlaying((p) => !p);

  const openPhotosLightbox = (idx?: number) => {
    const target = idx ?? slideIndex;
    setLightboxStart(target);
    setShowLightbox(true);
    document.body.style.overflow = "hidden";
    setIsSlidePlaying(false);
  };
  const closePhotosLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = "";
    setIsSlidePlaying(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showLightbox) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setSlideIndex(i => (i + 1) % photos.length); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setSlideIndex(i => (i - 1 + photos.length) % photos.length); }
      if (e.key.toLowerCase() === "p") setIsSlidePlaying(p => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showLightbox, photos.length]);

  // ── Timeline scroll-triggered reveals (DesignxHand inspired) ──
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    timelineRefs.current.forEach((el, i) => {
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "top 55%",
        id: `timeline-item-${i}`,
        onEnter: () => {
          el.querySelector('.timeline-dot')?.classList.add('revealed');
          el.querySelector('.timeline-date')?.classList.add('revealed');
          el.querySelector('.timeline-card')?.classList.add('revealed');
          el.querySelector('.timeline-connector')?.classList.add('revealed');
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach(st => st.kill());
    };
  }, []);

  // ── Countdown timer for upcoming events ──
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      const next: Record<string, string> = {};
      TIMELINE_EVENTS.forEach((ev) => {
        if (ev.countdownStart && ev.status === 'open') {
          const target = new Date(ev.countdownStart).getTime();
          const diff = target - now;
          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            next[ev.id] = `${days}d ${hours}h`;
          } else {
            next[ev.id] = 'Happening now!';
          }
        }
      });
      setCountdowns(next);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig: Record<RegStatus, { label: string; className: string }> = {
    open: { label: 'Open for Registration', className: 'timeline-status open' },
    full: { label: 'Fully Booked', className: 'timeline-status full' },
    ended: { label: 'Ended', className: 'timeline-status ended' },
  };

  return (<>
      {/* ========== CENTERED SLIDESHOW: Event Photos ========== */}
      <section id="moments" className="relative py-14 md:py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="metallic-gold-text-sm text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase mb-2">MAAC GALLERY</p>
            <h3 className="font-display text-3xl md:text-5xl text-white font-bold tracking-tight drop-shadow-lg">Campus Moments</h3>
          </div>

          <div className="relative mx-auto rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-white/5 aspect-[3/4] md:aspect-video w-full group">
            <div className="absolute inset-0 z-0">
              <Image
                key={`glow-${slideIndex}-${photos[slideIndex].src}`}
                src={photos[slideIndex].src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover blur-2xl opacity-20 transition-opacity duration-1000"
              />
            </div>

            <Image
              key={`${slideIndex}-${photos[slideIndex].src}`}
              src={photos[slideIndex].src}
              alt={`Event moment ${slideIndex + 1}`}
              fill
              className="object-cover z-10 transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />

            <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20" />

            <div className="absolute top-6 right-6 z-40">
              <button onClick={toggleSlidePlay} aria-label={isSlidePlaying ? "Pause slideshow" : "Play slideshow"} className="px-5 py-3 min-h-[44px] text-[10px] font-bold tracking-widest rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white hover:bg-[#C4A882] hover:text-black transition-all duration-300">
                {isSlidePlaying ? "PAUSE" : "PLAY"}
              </button>
            </div>

            <button 
               onClick={prevPhoto} 
               aria-label="Previous photo"
               className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-16 md:h-16 min-w-[44px] min-h-[44px] rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-black/40 flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
             >
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button 
               onClick={nextPhoto} 
               aria-label="Next photo"
               className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-16 md:h-16 min-w-[44px] min-h-[44px] rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-black/40 flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
             >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] md:text-xs font-mono text-white/70 z-40 tracking-[0.4em]">
              <span className="text-[#C4A882] font-bold">{slideIndex + 1}</span> / {photos.length}
            </div>
          </div>
        </div>
      </section>

      {/* ========== IN THE PRESS ========== */}
      <section className="relative py-14 md:py-20 border-t border-white/10 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-8">
            <p className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.3em] mb-2">MAKING HEADLINES</p>
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-none text-white font-bold tracking-tight">In the Press</h2>
            <p className="text-white/85 mt-3 max-w-lg mx-auto">Our events and community making the news.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRESS_PHOTOS.map((photo, idx) => {
              const globalIdx = EVENT_PHOTOS.findIndex(p => p.src === photo.src);
              return (
                <div 
                  key={idx}
                  onClick={() => openPhotosLightbox(globalIdx >= 0 ? globalIdx : 0)}
                  className="group glass-card overflow-hidden cursor-pointer border border-white/10 hover:border-[#C4A882]/40 transition-all"
                >
                  <div className="bg-[#f8f1e3] p-3">
                    <Image 
                      src={photo.src} 
                      alt={photo.title || "Newspaper clipping from MAAC event"} 
                      width={720} height={920} 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="w-full h-auto object-contain" 
                    />
                  </div>
                  <div className="px-4 py-3 text-xs text-white/85">
                    <span className="font-medium text-white">{photo.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[10px] tracking-widest text-white/85/50 mt-5">
            More clippings from the collection &bull; Tap to view full
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TIMELINE — DesignxHand inspired event timeline
          with glowing dots, date badges, scroll reveals
          ═══════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-transparent">
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold metallic-gold-text mb-16 leading-tight text-center">
            Our Event Timeline
          </h2>

          {/* Timezone note */}
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-12">
            All times in IST (UTC+5:30)
          </p>

          <div className="event-timeline">
            {TIMELINE_EVENTS.map((event, idx) => {
              const config = statusConfig[event.status];
              return (
                <div
                  key={event.id}
                  ref={(el) => { timelineRefs.current[idx] = el; }}
                  className="timeline-item"
                >
                  {/* Glowing dot */}
                  <div className="timeline-dot" />

                  {/* Van Morrison inspired date badge */}
                  <div className="timeline-date">
                    <span className="date-day">{event.day}</span>
                    <span className="date-month">{event.month} {String(event.year).slice(2)}</span>
                  </div>

                  {/* Connector line */}
                  <div className="timeline-connector" />

                  {/* Content Card */}
                  <div className="timeline-card">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl md:text-2xl text-white font-bold uppercase leading-[1.2] tracking-[0.05em] mb-2">
                          {event.title}
                        </h3>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.tags.map((tag) => (
                            <span key={tag} className="text-[8px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Status badge */}
                      <span className={config.className}>
                        {config.label}
                      </span>
                    </div>

                    <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* Countdown */}
                      {event.status === 'open' && countdowns[event.id] && (
                        <div className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-[#C4A882]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span className="timeline-countdown">{countdowns[event.id]}</span>
                        </div>
                      )}

                      {event.status === 'full' && (
                        <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-[0.15em]">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0H10" />
                          </svg>
                          Join the waitlist
                        </div>
                      )}

                      {/* CTA */}
                      <a
                        href="/contact"
                        className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 px-5 py-2 rounded-full ${
                          event.status === 'ended'
                            ? 'border border-white/10 text-white/40 cursor-not-allowed'
                            : event.status === 'full'
                              ? 'border border-orange-500/40 text-orange-400 hover:bg-orange-500/10'
                              : 'bg-[#C4A882] text-black hover:bg-[#BF953F]'
                        }`}
                        {...(event.status === 'ended' ? { onClick: (e) => e.preventDefault() } : {})}
                      >
                        {event.status === 'ended' ? 'Event Ended' : event.status === 'full' ? 'Join Waitlist' : 'Register Now'}
                        {event.status !== 'ended' && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        )}
                      </a>
                    </div>

                    {/* Video preview */}
                    {event.youtubeId && (
                      <div className="mt-5 pt-5 border-t border-white/5">
                        <div className="rounded-xl overflow-hidden border border-white/5 w-full max-w-md">
                          <VideoFacade youtubeId={event.youtubeId} title={event.videoTitle} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Can Attend MAAC Events Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#C4A882", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "#8B2635", stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 V600 H0 Z" fill="url(#wave-gradient)" />
            <path d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200 V600 H0 Z" fill="url(#wave-gradient)" opacity="0.5" />
            <path d="M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300 V600 H0 Z" fill="url(#wave-gradient)" opacity="0.3" />
          </svg>
        </div>

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-left metallic-gold-text">
            Who Can Attend MAAC Events?
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-16 text-left max-w-3xl">
            The different events at MAAC cater to different audience types. Some of them include:
          </p>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { num: 1, text: "Animation, VFX and multimedia students - both MAAC students and others." },
              { num: 2, text: "Studios and industry professionals, from India and overseas." },
              { num: 3, text: "Anyone with talent and passion for animation, gaming, VFX, web & graphic designing and media and entertainment." },
            ].map((item) => (
              <div key={item.num} className="relative">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-8 w-full max-w-3xl">
                    <div className="flex-shrink-0 w-12 flex justify-center items-center">
                      <span className="text-4xl md:text-5xl font-bold metallic-gold-text">{item.num}</span>
                    </div>
                    <p className="text-xl md:text-2xl text-white leading-relaxed font-medium flex-grow">{item.text}</p>
                    <svg className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 metallic-gold-text" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        images={EVENT_PHOTOS.map(p => p.src)}
        alt="MAAC Jaipur Event Moments"
        initialIndex={lightboxStart}
        isOpen={showLightbox}
        onClose={closePhotosLightbox}
      />
    </>
  );
}
