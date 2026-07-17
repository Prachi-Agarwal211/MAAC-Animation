"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import VideoFacade from "@/components/ui/VideoFacade";
import Image from "next/image";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { EVENT_PHOTOS, PRESS_PHOTOS, LANDSCAPE_PHOTOS, PORTRAIT_PHOTOS } from "@/data/events";

export default function EventsInteractive() {
  const video24FPSRef = useRef<HTMLDivElement>(null);
  const video100HoursRef = useRef<HTMLDivElement>(null);
  const videoManifestRef = useRef<HTMLDivElement>(null);
  const videoNSMRef = useRef<HTMLDivElement>(null);
  const videoMCLRef = useRef<HTMLDivElement>(null);
  const videoKlickRef = useRef<HTMLDivElement>(null);
  const videoBTSRef = useRef<HTMLDivElement>(null);

  const [photos, setPhotos] = useState(LANDSCAPE_PHOTOS);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const slideTimer = useRef<NodeJS.Timeout | null>(null);
  const prefersReduced = useRef(false);

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

  useEffect(() => {
    const videoRefs = [video24FPSRef, video100HoursRef, videoManifestRef, videoNSMRef, videoMCLRef, videoKlickRef, videoBTSRef];
    videoRefs.forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(ref.current, { scale: 1.1, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "top 50%", scrub: 1 } });
      }
    });
    return () => { ScrollTrigger.getAll().forEach((t) => { if (t.vars.id !== 'events-interactive') t.kill(); }); };
  }, []);

  return (<>
      {/* ========== CENTERED SLIDESHOW: Event Photos ========== */}
      <section id="moments" className="relative py-14 md:py-24 bg-transparent border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="metallic-gold-text text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase opacity-80 mb-2">MAAC GALLERY</p>
            <h3 className="font-display text-3xl md:text-5xl text-white font-bold tracking-tight drop-shadow-lg">Campus Moments</h3>
          </div>

          {/* The centered "Card" — Ratio matches the Landscape (16:9) on laptop and Portrait (3:4) on mobile */}
          <div className="relative mx-auto rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-white/5 aspect-[3/4] md:aspect-video w-full group">
            
            {/* Background Atmosphere Glow — Lightened and simplified */}
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

            {/* Main Sharp Image — Fills the card perfectly with NO black gaps */}
            <Image
              key={`${slideIndex}-${photos[slideIndex].src}`}
              src={photos[slideIndex].src}
              alt={`Event moment ${slideIndex + 1}`}
              fill
              className="object-cover z-10 transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />

            {/* Navigation Overlays — Lightened gradients */}
            <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20" />

            {/* Play/Pause Button */}
            <div className="absolute top-6 right-6 z-40">
              <button onClick={toggleSlidePlay} aria-label={isSlidePlaying ? "Pause slideshow" : "Play slideshow"} className="px-5 py-3 min-h-[44px] text-[10px] font-bold tracking-widest rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white hover:bg-[#FFD700] hover:text-black transition-all duration-300">
                {isSlidePlaying ? "PAUSE" : "PLAY"}
              </button>
            </div>

            {/* Side Controls */}
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

            {/* Progress Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] md:text-xs font-mono text-white/70 z-40 tracking-[0.4em]">
              <span className="text-[#FFD700] font-bold">{slideIndex + 1}</span> / {photos.length}
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEW: In the Press — Newspaper & Media Cutouts ========== */}
      <section className="relative py-14 md:py-20 border-t border-white/10 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-8">
            <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] mb-2">MAKING HEADLINES</p>
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-none text-white font-bold tracking-tight">In the Press</h2>
            <p className="text-[#A8A29C] mt-3 max-w-lg mx-auto">Our events and community making the news.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRESS_PHOTOS.map((photo, idx) => {
              const globalIdx = EVENT_PHOTOS.findIndex(p => p.src === photo.src);
              return (
                <div 
                  key={idx}
                  onClick={() => openPhotosLightbox(globalIdx >= 0 ? globalIdx : 0)}
                  className="group glass-card overflow-hidden cursor-pointer border border-white/10 hover:border-[#FFD700]/40 transition-all"
                >
                  <div className="bg-[#f8f1e3] p-3"> {/* warm paper-like bg for authentic newspaper feel */}
                    <Image 
                      src={photo.src} 
                      alt={photo.title || "Newspaper clipping from MAAC event"} 
                      width={720} 
                      height={920} 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="w-full h-auto object-contain" 
                    />
                  </div>
                  <div className="px-4 py-3 text-xs text-[#A8A29C]">
                    <span className="font-medium text-white">{photo.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[10px] tracking-widest text-[#A8A29C]/50 mt-5">
            More clippings from the collection • Tap to view full
          </p>
        </div>
      </section>

      {/* Why Attend MAAC Events Section — lighter treatment so video/photo backgrounds stay prominent */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent border-t border-white/10">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two column layout: Left heading, Right cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side: Heading and description */}
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold metallic-gold-text mb-6 leading-tight">
                Why Attend<br />MAAC Events?
              </h2>
              <p className="text-sm md:text-base text-white leading-relaxed max-w-lg">
                At MAAC, we don&apos;t just teach - we transform careers. Whether you aspire to be an animator, VFX artist, game designer, filmmaker, or digital creator, we equip you with the skills, tools, and global opportunities to succeed.
              </p>
              <a href="/contact" className="mt-6 inline-flex items-center gap-2 metallic-gold-text hover:text-yellow-300 transition-colors">
                <span className="font-semibold text-sm">Learn More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>

            {/* Right side: Four feature cards in 2x2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Card 1: Hands-on Learning */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold metallic-gold-text mb-3">Hands-on Learning</h3>
                <p className="text-white text-sm leading-relaxed">
                  Gain industry insights through live projects, competitions, and expert-led sessions.
                </p>
              </div>

              {/* Card 2: Showcase Your Talent */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold metallic-gold-text mb-3">Showcase Your Talent</h3>
                <p className="text-white text-sm leading-relaxed">
                  Showcase your talent in national competitions and get noticed by top studios.
                </p>
              </div>

              {/* Card 3: Network with the Best */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold metallic-gold-text mb-3">Network with the Best</h3>
                <p className="text-white text-sm leading-relaxed">
                  Connect with alumni, faculty, and industry professionals worldwide.
                </p>
              </div>

              {/* Card 4: Get Job-Ready */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold metallic-gold-text mb-3">Get Job-Ready</h3>
                <p className="text-white text-sm leading-relaxed">
                  Access job placements and internships with leading animation studios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature MAAC Events Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold metallic-gold-text mb-16 leading-tight text-center">
            Signature MAAC Events You Can Be a Part Of!
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            {/* Left side: 24FPS International Animation Awards content */}
            <div className="text-left">
              <div className="mb-6">
                <div className="w-32 h-32 metallic-gold-accent rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">24FPS</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                24FPS International Animation Awards
              </h3>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                A globally recognized event where students compete with the best in the animation and VFX industry. This is your chance to impress industry leaders and make a mark in the creative world!
              </p>
              <a href="/contact" className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors text-sm">
                Read More
              </a>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-3 md:gap-5">
              {/* Large metallic gold arrow */}
              <svg className="w-16 h-16 md:w-20 md:h-20 metallic-gold-text transform rotate-90 lg:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={video24FPSRef} className="rounded-2xl shadow-lg overflow-hidden w-full max-w-xl h-64 md:h-72 border border-white/10">
                <VideoFacade youtubeId="C2ix6uKTaAQ" title="24FPS International Animation Awards" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100 Hours - The Ultimate Creative Marathon Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/10 mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            {/* Left side: Logo, Heading, Description, Button */}
            <div className="text-left">
              {/* 100 Race Against Time Logo */}
              <div className="mb-6">
                <div className="w-32 h-16 metallic-gold-accent rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-black">100 RACE</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                100 Hours - The Ultimate<br />Creative Marathon
              </h3>
              <p className="text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                Push your limits! Create a 3D-animated short film or a 1-minute mobile film in just 100 hours! Work non-stop, collaborate with teammates, and experience the thrill of filmmaking under real-world deadlines.
              </p>
              <a href="/contact" className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors text-sm">
                Read More
              </a>
            </div>

            {/* Right side: Arrow and Image Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-3 md:gap-5">
              {/* Large yellow arrow */}
              <svg className="w-16 h-16 md:w-20 md:h-20 metallic-gold-text transform rotate-90 lg:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={video100HoursRef} className="relative w-full max-w-xl rounded-2xl shadow-lg overflow-hidden h-64 md:h-72 border border-white/10">
                <VideoFacade youtubeId="3BuVrYHjIq4" title="100 Hours - The Ultimate Creative Marathon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Event Section - Same Layout */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/10 mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            {/* Left side: Logo, Heading, Description, Button */}
            <div className="text-left">
              {/* Logo placeholder */}
              <div className="mb-6">
                <div className="w-32 h-16 metallic-gold-accent rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-black">MAAC</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                MAAC Manifest
              </h3>
              <p className="text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                We celebrate YOU! MAAC Manifest is where we honor our students and alumni for their outstanding contributions to the animation and VFX industry. Get recognized for your talent and be inspired by industry leaders.
              </p>
              <a href="/contact" className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors text-sm">
                Read More
              </a>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-3 md:gap-5">
              {/* Large yellow arrow */}
              <svg className="w-16 h-16 md:w-20 md:h-20 metallic-gold-text transform rotate-90 lg:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={videoManifestRef} className="rounded-2xl shadow-lg overflow-hidden w-full max-w-xl h-64 md:h-72 border border-white/10">
                <VideoFacade youtubeId="RaQivBSoEak" title="MAAC Manifest" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NSM - National Students' Meet Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/10 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            {/* Left side: NSM Logo, Title, Description, Button */}
            <div className="text-left">
              {/* NSM Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 metallic-gold-accent rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">NSM</span>
                  </div>
                  <span className="metallic-gold-text font-bold text-sm">National Students&apos; Meet</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                National Students&apos; Meet (NSM)
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-md">
                A dream event for every MAAC student! Meet like-minded artists from across India, participate in creative workshops, panel discussions, and exclusive hands-on training sessions with industry pros.
              </p>
              
              <a href="/contact" className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors text-sm">
                Read More
              </a>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-3 md:gap-5">
              {/* Large metallic gold arrow */}
              <svg className="w-16 h-16 md:w-20 md:h-20 metallic-gold-text transform rotate-90 lg:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={videoNSMRef} className="relative w-full max-w-xl rounded-2xl shadow-lg overflow-hidden h-64 md:h-72 border border-white/10">
                <VideoFacade youtubeId="F0WMuSpXMK0" title="National Students' Meet (NSM)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCL - MAAC Creative League Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/10 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            {/* Left side: MCL Logo, Title, Description, Button */}
            <div className="text-left">
              {/* MCL Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 metallic-gold-accent rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">MCL</span>
                  </div>
                  <span className="metallic-gold-text font-bold text-sm">MAAC Creative League</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                MAAC Creative League (MCL)
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-md">
                Compete in one of the most exciting design and animation challenges at MAAC! Unleash your creativity, showcase your talent, and win exciting prizes as you go head-to-head with the best in the field.
              </p>
              
              <a href="/contact" className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors text-sm">
                Read More
              </a>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-3 md:gap-5">
              {/* Large metallic gold arrow */}
              <svg className="w-16 h-16 md:w-20 md:h-20 metallic-gold-text transform rotate-90 lg:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={videoMCLRef} className="relative w-full max-w-xl rounded-2xl shadow-lg overflow-hidden h-64 md:h-72 border border-white/10">
                <VideoFacade youtubeId="FPgueLMvlMI" title="MAAC Creative League (MCL)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAAC Klick - Nature & Wildlife Photography Expeditions Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/10 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            {/* Left side: MAAC Klick Logo, Title, Description, Button */}
            <div className="text-left">
              {/* MAAC Klick Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 metallic-gold-accent rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">Klick</span>
                  </div>
                  <span className="metallic-gold-text font-bold text-sm">MAAC Klick</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                MAAC Klick - Nature & Wildlife Photography Expeditions
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-md">
                Step outside the classroom and capture breathtaking moments! Travel to stunning locations like Coorg, Ranthambore, and Sariska National Park, and learn the art of professional photography in real-world environments.
              </p>
              
              <a href="/contact" className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors text-sm">
                Read More
              </a>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-3 md:gap-5">
              {/* Large metallic gold arrow */}
              <svg className="w-16 h-16 md:w-20 md:h-20 metallic-gold-text transform rotate-90 lg:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={videoKlickRef} className="relative w-full max-w-xl rounded-2xl shadow-lg overflow-hidden h-64 md:h-72 border border-white/10">
                <VideoFacade youtubeId="ao5k9ZTVbS0" title="MAAC Klick - Nature & Wildlife Photography Expeditions" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section - Same Layout */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/10 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            {/* Left side: Logo, Title, Description, Button */}
            <div className="text-left">
              {/* BTS Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 metallic-gold-accent rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">BTS</span>
                  </div>
                  <span className="metallic-gold-text font-bold text-sm">Behind the Screen</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                BTS: Behind the Screen
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-md">
                Gain exclusive insights from industry legends through our webinars and Masterclasses. Learn about cutting-edge tools, techniques, and career opportunities straight from professionals & our Alumni who have worked on blockbuster movies and AAA games.
              </p>
              
              <a href="/contact" className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors text-sm">
                Read More
              </a>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-3 md:gap-5">
              {/* Large metallic gold arrow */}
              <svg className="w-16 h-16 md:w-20 md:h-20 metallic-gold-text transform rotate-90 lg:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={videoBTSRef} className="relative w-full max-w-xl rounded-2xl shadow-lg overflow-hidden h-64 md:h-72 border border-white/10">
                <VideoFacade youtubeId="Fs6YutaEejc" title="BTS: Behind the Screen" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Attend MAAC Events Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-transparent">
        {/* Subtle wavy pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 0.3 }} />
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
            {/* Item 1 */}
            <div className="relative">
              <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-8 w-full max-w-3xl">
                  {/* Simple number without circle - fixed width for alignment */}
                  <div className="flex-shrink-0 w-12 flex justify-center items-center">
                    <span className="text-4xl md:text-5xl font-bold metallic-gold-text">1</span>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium flex-grow">
                    Animation, VFX and multimedia students - both MAAC students and others.
                  </p>

                  {/* Red checkmark on right */}
                  <svg className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 metallic-gold-text" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative">
              <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-8 w-full max-w-3xl">
                  {/* Simple number without circle - fixed width for alignment */}
                  <div className="flex-shrink-0 w-12 flex justify-center items-center">
                    <span className="text-4xl md:text-5xl font-bold metallic-gold-text">2</span>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium flex-grow">
                    Studios and industry professionals, from India and overseas.
                  </p>

                  {/* Red checkmark on right */}
                  <svg className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 metallic-gold-text" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative">
              <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-8 w-full max-w-3xl">
                  {/* Simple number without circle - fixed width for alignment */}
                  <div className="flex-shrink-0 w-12 flex justify-center items-center">
                    <span className="text-4xl md:text-5xl font-bold metallic-gold-text">3</span>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium flex-grow">
                    Anyone with talent and passion for animation, gaming, VFX, web & graphic designing and media and entertainment.
                  </p>

                  {/* Red checkmark on right */}
                  <svg className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 metallic-gold-text" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* The professional lightbox for the event photos */}
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
