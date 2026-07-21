"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageLightbox from "@/components/ui/ImageLightbox";
import ErrorBoundary from "@/components/ErrorBoundary";
import ApplyNow from "@/components/ApplyNow";

gsap.registerPlugin(ScrollTrigger);

const tripImages = [
  { title: "Annual Trip Moment 01", src: "/annual-trip/event-002.jpeg" },
  { title: "Annual Trip Moment 02", src: "/annual-trip/event-003.jpeg" },
  { title: "Annual Trip Moment 03", src: "/annual-trip/event-004.jpeg" },
  { title: "Annual Trip Moment 04", src: "/annual-trip/event-005.jpeg" },
  { title: "Annual Trip Moment 05", src: "/annual-trip/event-006.jpeg" },
  { title: "Annual Trip Moment 06", src: "/annual-trip/event-007.jpeg" },
  { title: "Annual Trip Moment 07", src: "/annual-trip/event-008.jpeg" },
  { title: "Annual Trip Moment 08", src: "/annual-trip/event-009.jpeg" },
  { title: "Annual Trip Moment 09", src: "/annual-trip/event-010.jpeg" },
  { title: "Annual Trip Moment 10", src: "/annual-trip/event-011.jpeg" },
  { title: "Annual Trip Moment 11", src: "/annual-trip/event-012.jpeg" },
  { title: "Annual Trip Moment 12", src: "/annual-trip/event-013.jpeg" },
  { title: "Annual Trip Moment 13", src: "/annual-trip/event-014.jpeg" },
  { title: "Annual Trip Moment 14", src: "/annual-trip/event-015.jpeg" },
  { title: "Annual Trip Moment 15", src: "/annual-trip/event-016.jpeg" },
  { title: "Annual Trip Moment 16", src: "/annual-trip/event-017.jpeg" },
  { title: "Annual Trip Moment 17", src: "/annual-trip/event-018.jpeg" },
  { title: "Annual Trip Moment 18", src: "/annual-trip/event-019.jpeg" },
  { title: "Annual Trip Moment 19", src: "/annual-trip/event-020.jpeg" },
  { title: "Annual Trip Moment 20", src: "/annual-trip/event-021.jpeg" },
  { title: "Annual Trip Moment 21", src: "/annual-trip/event-022.jpeg" },
  { title: "Annual Trip Moment 22", src: "/annual-trip/event-023.jpeg" },
  { title: "Annual Trip Moment 23", src: "/annual-trip/event-024.jpeg" },
  { title: "Annual Trip Moment 24", src: "/annual-trip/event-025.jpeg" },
  { title: "Annual Trip Moment 25", src: "/annual-trip/event-027.jpeg" },
  { title: "Annual Trip Moment 26", src: "/annual-trip/event-028.jpeg" },
  { title: "Annual Trip Moment 27", src: "/annual-trip/event-029.jpeg" },
  { title: "Annual Trip Moment 28", src: "/annual-trip/event-030.jpeg" },
  { title: "Annual Trip Moment 29", src: "/annual-trip/event-031.jpeg" },
  { title: "Annual Trip Moment 30", src: "/annual-trip/event-032.jpeg" },
  { title: "Annual Trip Moment 31", src: "/annual-trip/event-033.jpeg" },
  { title: "Annual Trip Moment 32", src: "/annual-trip/event-034.jpeg" },
  { title: "Annual Trip Moment 33", src: "/annual-trip/event-035.jpeg" },
  { title: "Annual Trip Moment 34", src: "/annual-trip/event-036.jpeg" },
  { title: "Annual Trip Moment 35", src: "/annual-trip/event-037.jpeg" },
  { title: "Annual Trip Moment 36", src: "/annual-trip/event-040.jpeg" },
  { title: "Annual Trip Moment 37", src: "/annual-trip/event-065.jpeg" },
];

const heroImage = tripImages[0].src;

function AnnualTripPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotionRef = useRef(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentImage = tripImages[currentIndex];

  /* ── GSAP scroll animations ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRef.current) return;

    const ctx = gsap.context(() => {
      const container = mainRef.current;
      if (!container) return;

      // Hero parallax: image moves slower than scroll
      const heroBg = container.querySelector(".parallax-bg");
      if (heroBg) {
        gsap.to(heroBg, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Story content reveals
      const reveals = container.querySelectorAll(".story-reveal");
      reveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      const leftReveals = container.querySelectorAll(".story-reveal-left");
      leftReveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      const rightReveals = container.querySelectorAll(".story-reveal-right");
      rightReveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Parallax mid-sections
      container.querySelectorAll(".parallax-section-mid").forEach((section) => {
        const bg = section.querySelector(".parallax-bg");
        if (bg) {
          gsap.to(bg, {
            y: "20%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        // Content fades in on scroll
        const content = section.querySelector(".parallax-content");
        if (content) {
          gsap.fromTo(content,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Gallery section reveal
      const gallerySection = container.querySelector(".gallery-section-reveal");
      if (gallerySection) {
        gsap.fromTo(gallerySection,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "expo.out",
            scrollTrigger: {
              trigger: gallerySection,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  /* ── Auto-advance timer ── */
  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (reducedMotionRef.current) return;
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % tripImages.length);
    }, 4200);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !reducedMotionRef.current) startAutoPlay();
    else stopAutoPlay();
    return stopAutoPlay;
  }, [isPlaying, currentIndex, startAutoPlay, stopAutoPlay]);

  /* ── Navigation ── */
  const scrollActiveThumbnail = useCallback((index: number) => {
    const thumb = thumbnailRefs.current[index];
    if (thumb) {
      thumb.scrollIntoView({
        behavior: reducedMotionRef.current ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  const goToSlide = useCallback((index: number) => {
    const newIndex = (index + tripImages.length) % tripImages.length;
    setCurrentIndex(newIndex);
    scrollActiveThumbnail(newIndex);
  }, [scrollActiveThumbnail]);

  const goToNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);
  const goToPrev = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);

  const openLightbox = useCallback((index?: number) => {
    const target = index ?? currentIndex;
    setLightboxIndex(target);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
    setIsPlaying(false);
  }, [currentIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
    setCurrentIndex(lightboxIndex);
    setIsPlaying(true);
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      switch (e.key) {
        case "ArrowRight": case " ": e.preventDefault(); goToNext(); break;
        case "ArrowLeft": e.preventDefault(); goToPrev(); break;
        case "Enter": case "f": case "F": openLightbox(); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToNext, goToPrev, openLightbox]);

  const lightboxImages = tripImages.map((img) => img.src);

  return (
    <main ref={mainRef} className="bg-transparent min-h-screen overflow-hidden">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "MAAC Annual Trip",
            description: "Moments from MAAC Animation Jaipur's annual student trip — Dalhousie & Khajjiar.",
            url: "https://www.maacanimationjaipur.com/annual-trip",
            image: tripImages.map((img) => `https://www.maacanimationjaipur.com${img.src}`),
            author: { "@type": "Organization", name: "MAAC Animation Jaipur" },
            numberOfItems: tripImages.length,
          }),
        }}
      />

      {/* ════════════════════════════════════════════
          SECTION 1: PARALLAX HERO
          ════════════════════════════════════════════ */}
      <section className="parallax-section">
        <div className="parallax-bg">
          <Image
            src={heroImage}
            alt="MAAC Annual Trip"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="parallax-overlay-dark" />

        <div className="parallax-content">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.35em] uppercase mb-6">
            Dalhousie &amp; Khajjiar
          </p>
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-[0.82] text-white font-bold uppercase tracking-[0.02em] mb-6">
            ANNUAL{" "}
            <span className="metallic-gold-text italic">TRIP</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
            A journey of creativity and camaraderie through the Himalayan landscapes.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="parallax-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2: STORY INTRO
          ════════════════════════════════════════════ */}
      <section className="story-section">
        <div className="chapter-watermark">01</div>
        <div className="story-content max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[2px] bg-gradient-to-r from-[#BF953F] to-transparent" />
                <span className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase">Chapter 01</span>
              </div>
              <h2 className="story-reveal font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-white font-bold uppercase leading-[1.1] tracking-[0.02em] mb-6">
                The Mountains{" "}
                <span className="metallic-gold-text italic">Called</span>
              </h2>
              <p className="story-reveal text-white/70 text-base leading-relaxed">
                Every year, our students trade the studio for the summit. The annual trip is more than a getaway — it&apos;s where bonds are forged beyond the classroom, where creativity finds new horizons, and where memories are captured that last a lifetime.
              </p>
            </div>
            <div className="story-reveal">
              <div className="story-stats">
                <div className="stat-item">
                  <div className="stat-number">85+</div>
                  <div className="stat-label">Students</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Days</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">37</div>
                  <div className="stat-label">Memories</div>
                </div>
              </div>
            </div>
          </div>

          <div className="story-divider" />

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-20">
            <p className="story-reveal-left text-white/60 text-sm leading-relaxed italic border-l-2 border-[#BF953F]/30 pl-6">
              &ldquo;The best classroom has no walls. The annual trip is where theory meets the real world — and where friendships become family.&rdquo;
            </p>
            <div className="story-reveal-right space-y-4">
              {[
                { label: "Destination", value: "Dalhousie & Khajjiar" },
                { label: "Elevation", value: "1,970m / 6,463ft" },
                { label: "Season", value: "Peak Autumn" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-[0.15em]">{item.label}</span>
                  <span className="text-white/80 text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3: PARALLAX MOMENT 1
          ════════════════════════════════════════════ */}
      <section className="parallax-section parallax-section-mid">
        <div className="parallax-bg">
          <Image
            src={tripImages[Math.floor(tripImages.length * 0.3)].src}
            alt="Campus on the road"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="parallax-overlay" />
        <div className="parallax-content">
          <p className="text-[#C4A882] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">02 · The Journey</p>
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] text-white font-bold uppercase leading-[1] tracking-[0.02em]">
            Roads Less<br />
            <span className="metallic-gold-text italic">Traveled</span>
          </h2>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4: STORY CONTINUED
          ════════════════════════════════════════════ */}
      <section className="story-section">
        <div className="chapter-watermark">02</div>
        <div className="story-content max-w-4xl mx-auto px-6 relative z-10 text-center">
          <p className="story-reveal text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            Beyond the Frame
          </p>
          <h2 className="story-reveal font-display text-[clamp(1.5rem,4vw,3rem)] text-white font-bold uppercase leading-[1.1] mb-8">
            Every Frame Tells a{" "}
            <span className="metallic-gold-text italic">Story</span>
          </h2>
          <p className="story-reveal text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
            From sunrise hikes to campfire stories, from sketching in the valleys to dancing under the stars — each photograph captures a moment that words cannot describe.
          </p>

          <div className="story-reveal mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {tripImages.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-[#C4A882]/40 transition-all duration-500 group"
                onClick={() => openLightbox(i + 1)}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5: PARALLAX MOMENT 2
          ════════════════════════════════════════════ */}
      <section className="parallax-section parallax-section-mid">
        <div className="parallax-bg">
          <Image
            src={tripImages[Math.floor(tripImages.length * 0.6)].src}
            alt="Memories made"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="parallax-overlay" />
        <div className="parallax-content">
          <p className="text-[#C4A882] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">03 · The Bond</p>
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] text-white font-bold uppercase leading-[1] tracking-[0.02em]">
            Friendships{" "}
            <span className="metallic-gold-text italic">Forged</span>
          </h2>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6: GALLERY VIEWER
          ════════════════════════════════════════════ */}
      <section className="story-section gallery-section-reveal">
        <div className="chapter-watermark">—</div>
        <div className="story-content max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase mb-4">
              The Full Gallery
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white font-bold uppercase leading-[1.1]">
              All{" "}
              <span className="metallic-gold-text italic">{tripImages.length} Moments</span>
            </h2>
          </div>

          {/* Main Viewer */}
          <div
            className="group relative w-full rounded-3xl overflow-hidden glass-card border border-white/5 shadow-2xl bg-[#0A0A0A]"
            style={{ aspectRatio: "16/9" }}
          >
            <div className="absolute inset-0">
              <Image
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.title}
                fill
                className="object-cover transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                priority={currentIndex < 3}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/35 to-transparent pointer-events-none" />

            {/* Fullscreen button */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => openLightbox()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-widest bg-black/60 text-white/90 border border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-md transition-all"
                aria-label="Open full screen lightbox"
              >
                <span className="hidden sm:inline">FULLSCREEN</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>

            {/* Prev/Next */}
            <button
              onClick={goToPrev}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full glass border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C4A882]/60 hover:bg-white/5 active:scale-95 transition-all"
              aria-label="Previous photo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full glass border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C4A882]/60 hover:bg-white/5 active:scale-95 transition-all"
              aria-label="Next photo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-7 flex justify-end pointer-events-none">
              <div className="text-right text-white/60 text-sm font-mono tracking-widest tabular-nums drop-shadow-md">
                {currentIndex + 1} <span className="text-white/40">/ {tripImages.length}</span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-5">
            <div className="flex items-center justify-between px-1 mb-2.5">
              <p className="text-white/50 text-xs tracking-widest uppercase">Browse the full story</p>
              <p className="text-white/40 text-[10px] hidden md:block">Click any frame · Use ← → keys · Press F for fullscreen</p>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 rounded-l-2xl" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10 rounded-r-2xl" />

              <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar px-1">
                {tripImages.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      ref={(el) => { thumbnailRefs.current[idx] = el; }}
                      onClick={() => goToSlide(idx)}
                      className={`group relative flex-shrink-0 w-24 h-16 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 snap-start outline-none focus-visible:ring-2 focus-visible:ring-[#C4A882]/70 ${
                        isActive
                          ? "border-[#C4A882] scale-[1.03] shadow-lg shadow-black/50 z-10"
                          : "border-white/5 hover:border-white/20 opacity-80 hover:opacity-100"
                      }`}
                      aria-label={`Go to ${img.title}`}
                      aria-current={isActive ? "true" : "false"}
                    >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:-translate-y-1"
                        sizes="110px"
                        loading={idx < 6 ? "eager" : "lazy"}
                      />
                      <div className={`absolute inset-0 transition-opacity ${isActive ? "bg-black/10" : "bg-black/40 group-hover:bg-black/20"}`} />
                      {isActive && (
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-px text-[9px] font-bold tracking-wider bg-black/70 text-[#C4A882] rounded">
                          NOW
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fullscreen CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => openLightbox()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 hover:border-[#C4A882]/40 px-6 h-11 text-white/80 hover:text-white transition-all active:scale-[0.985] text-xs font-bold tracking-[0.15em] uppercase"
            >
              View All {tripImages.length} Photos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 7: CTA
          ════════════════════════════════════════════ */}
      <ApplyNow />

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        alt="MAAC Annual Trip — Dalhousie & Khajjiar"
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </main>
  );
}

export default function AnnualTripPageWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <AnnualTripPage />
    </ErrorBoundary>
  );
}
