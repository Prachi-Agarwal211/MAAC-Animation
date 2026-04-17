"use client";

import Script from "next/script";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

export default function EventsPage() {
  const video24FPSRef = useRef<HTMLDivElement>(null);
  const video100HoursRef = useRef<HTMLDivElement>(null);
  const videoManifestRef = useRef<HTMLDivElement>(null);
  const videoNSMRef = useRef<HTMLDivElement>(null);
  const videoMCLRef = useRef<HTMLDivElement>(null);
  const videoKlickRef = useRef<HTMLDivElement>(null);
  const videoBTSRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoRefs = [
      video24FPSRef,
      video100HoursRef,
      videoManifestRef,
      videoNSMRef,
      videoMCLRef,
      videoKlickRef,
      videoBTSRef,
    ];

    videoRefs.forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            scale: 1.1,
            opacity: 0.8,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Script
        id="events-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Events - MAAC Animation Jaipur",
            description: "MAAC Events - At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations.",
            url: "https://www.maacanimationjaipur.com/events",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Black background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Abstract decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-4000" />
        
        {/* Additional abstract shapes */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-md" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-lg" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/8 rounded-full blur-sm" />

        {/* Main content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            MAAC EVENTS!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations, bringing together students, alumni, and faculty.
          </p>
        </div>

        {/* Ask Me button in bottom right */}
        <div className="absolute bottom-8 right-8 z-20">
          <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-2 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ask Me
          </button>
        </div>
      </section>

      {/* Why Attend MAAC Events Section */}
      <section className="relative py-8 md:py-12 overflow-hidden" style={{ background: "#8B2635" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two column layout: Left heading, Right cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side: Heading and description */}
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-6 leading-tight">
                Why Attend<br />MAAC Events?
              </h2>
              <p className="text-sm md:text-base text-white leading-relaxed max-w-lg">
                At MAAC, we don't just teach - we transform careers. Whether you aspire to be an animator, VFX artist, game designer, filmmaker, or digital creator, we equip you with the skills, tools, and global opportunities to succeed.
              </p>
              <button className="mt-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                <span className="font-semibold">Learn More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
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
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Hands-on Learning</h3>
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
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Showcase Your Talent</h3>
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
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Network with the Best</h3>
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
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Get Job-Ready</h3>
                <p className="text-white text-sm leading-relaxed">
                  Access job placements and internships with leading animation studios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature MAAC Events Section */}
      <section className="relative py-8 md:py-12 overflow-hidden" style={{ background: "#1a1a1a" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-16 leading-tight text-center">
            Signature MAAC Events You Can Be a Part Of!
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: 24FPS International Animation Awards content */}
            <div className="text-left">
              <div className="mb-6">
                <div className="w-32 h-32 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">24FPS</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                24FPS International Animation Awards
              </h3>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                A globally recognized event where students compete with the best in the animation and VFX industry. This is your chance to impress industry leaders and make a mark in the creative world!
              </p>
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors">
                Read More
              </button>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-8">
              {/* Large yellow arrow */}
              <svg className="w-20 h-20 text-yellow-400 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={video24FPSRef} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-md">
                <iframe
                  className="w-full h-64"
                  src="https://www.youtube.com/embed/C2ix6uKTaAQ"
                  title="24FPS International Animation Awards"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100 Hours - The Ultimate Creative Marathon Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/30 mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Logo, Heading, Description, Button */}
            <div className="text-left">
              {/* 100 Race Against Time Logo */}
              <div className="mb-6">
                <div className="w-32 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-black">100 RACE</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                100 Hours - The Ultimate<br />Creative Marathon
              </h3>
              <p className="text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                Push your limits! Create a 3D-animated short film or a 1-minute mobile film in just 100 hours! Work non-stop, collaborate with teammates, and experience the thrill of filmmaking under real-world deadlines.
              </p>
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Right side: Arrow and Image Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-8">
              {/* Large yellow arrow */}
              <svg className="w-20 h-20 text-yellow-400 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={video100HoursRef} className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <iframe
                  className="w-full h-64"
                  src="https://www.youtube.com/embed/3BuVrYHjIq4"
                  title="100 Hours - The Ultimate Creative Marathon"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Event Section - Same Layout */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/30 mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Logo, Heading, Description, Button */}
            <div className="text-left">
              {/* Logo placeholder */}
              <div className="mb-6">
                <div className="w-32 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-black">MAAC</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                MAAC Manifest
              </h3>
              <p className="text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                We celebrate YOU! MAAC Manifest is where we honor our students and alumni for their outstanding contributions to the animation and VFX industry. Get recognized for your talent and be inspired by industry leaders.
              </p>
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-8">
              {/* Large yellow arrow */}
              <svg className="w-20 h-20 text-yellow-400 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div ref={videoManifestRef} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-md">
                <iframe
                  className="w-full h-64"
                  src="https://www.youtube.com/embed/RaQivBSoEak"
                  title="MAAC Manifest"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NSM - National Students' Meet Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left side: NSM Logo, Title, Description, Button */}
            <div className="text-left lg:pr-8">
              {/* NSM Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">NSM</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">National Students' Meet</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                National Students' Meet (NSM)
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                A dream event for every MAAC student! Meet like-minded artists from across India, participate in creative workshops, panel discussions, and exclusive hands-on training sessions with industry pros.
              </p>
              
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Center: Large Golden Arrow */}
            <div className="flex justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>

            {/* Right side: Video Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div ref={videoNSMRef} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    className="w-full h-56"
                    src="https://www.youtube.com/embed/FPgueLMvlMI"
                    title="National Students' Meet (NSM)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCL - MAAC Creative League Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left side: MCL Logo, Title, Description, Button */}
            <div className="text-left lg:pr-8">
              {/* MCL Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">MCL</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">MAAC Creative League</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                MAAC Creative League (MCL)
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                Compete in one of the most exciting design and animation challenges at MAAC! Unleash your creativity, showcase your talent, and win exciting prizes as you go head-to-head with the best in the field.
              </p>
              
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Center: Large Golden Arrow */}
            <div className="flex justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>

            {/* Right side: Video Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div ref={videoMCLRef} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    className="w-full h-56"
                    src="https://www.youtube.com/embed/FPgueLMvlMI"
                    title="MAAC Creative League (MCL)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAAC Klick - Nature & Wildlife Photography Expeditions Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left side: MAAC Klick Logo, Title, Description, Button */}
            <div className="text-left lg:pr-8">
              {/* MAAC Klick Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">Klick</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">MAAC Klick</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                MAAC Klick - Nature & Wildlife Photography Expeditions
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                Step outside the classroom and capture breathtaking moments! Travel to stunning locations like Coorg, Ranthambore, and Sariska National Park, and learn the art of professional photography in real-world environments.
              </p>
              
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Center: Large Golden Arrow */}
            <div className="flex justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>

            {/* Right side: Video Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div ref={videoKlickRef} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    className="w-full h-56"
                    src="https://www.youtube.com/embed/ao5k9ZTVbS0"
                    title="MAAC Klick - Nature & Wildlife Photography Expeditions"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section - Same Layout */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left side: Logo, Title, Description, Button */}
            <div className="text-left lg:pr-8">
              {/* BTS Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">BTS</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">Behind the Screen</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                BTS: Behind the Screen
              </h3>
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                Gain exclusive insights from industry legends through our webinars and Masterclasses. Learn about cutting-edge tools, techniques, and career opportunities straight from professionals & our Alumni who have worked on blockbuster movies and AAA games.
              </p>
              
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Center: Large Golden Arrow */}
            <div className="flex justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>

            {/* Right side: Video Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div ref={videoBTSRef} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    className="w-full h-56"
                    src="https://www.youtube.com/embed/Fs6YutaEejc"
                    title="BTS: Behind the Screen"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Attend MAAC Events Section */}
      <section className="relative py-8 md:py-12 overflow-hidden" style={{ background: "#2D1F1F" }}>
        {/* Subtle wavy pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#E31837", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "#8B2635", stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 V600 H0 Z" fill="url(#wave-gradient)" />
            <path d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200 V600 H0 Z" fill="url(#wave-gradient)" opacity="0.5" />
            <path d="M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300 V600 H0 Z" fill="url(#wave-gradient)" opacity="0.3" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-left" style={{ color: "#FFD700" }}>
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
                    <span className="text-4xl md:text-5xl font-bold" style={{ WebkitTextStroke: '2px #E31837', color: 'transparent' }}>1</span>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium flex-grow">
                    Animation, VFX and multimedia students - both MAAC students and others.
                  </p>

                  {/* Red checkmark on right */}
                  <svg className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0" fill="#E31837" viewBox="0 0 24 24">
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
                    <span className="text-4xl md:text-5xl font-bold" style={{ WebkitTextStroke: '2px #E31837', color: 'transparent' }}>2</span>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium flex-grow">
                    Studios and industry professionals, from India and overseas.
                  </p>

                  {/* Red checkmark on right */}
                  <svg className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0" fill="#E31837" viewBox="0 0 24 24">
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
                    <span className="text-4xl md:text-5xl font-bold" style={{ WebkitTextStroke: '2px #E31837', color: 'transparent' }}>3</span>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-medium flex-grow">
                    Anyone with talent and passion for animation, gaming, VFX, web & graphic designing and media and entertainment.
                  </p>

                  {/* Red checkmark on right */}
                  <svg className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0" fill="#E31837" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ask Me button with camera icon and speech bubble in bottom right */}
        <div className="absolute bottom-8 right-8 z-20">
          <button className="relative flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-lg">
            {/* Camera icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            
            {/* Speech bubble */}
            <div className="relative">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            
            <span className="font-semibold">Ask Me</span>
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}