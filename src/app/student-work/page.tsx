"use client";

import Script from "next/script";
import Footer from "@/components/Footer";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import StudentWorkGallery from "./StudentWorkGallery";
import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { studentFilms } from "@/data/portfolio";

export default function StudentWorkPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="student-work-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Student Work - MAAC Animation Jaipur",
            description:
              "Explore incredible projects from MAAC Jaipur students. Portfolio-ready work in 3D Animation, VFX, and Game Design.",
            url: "https://www.maacanimationjaipur.com/student-work",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      <main className="bg-transparent min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808] z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
            >
              <source src="/hero-video-compressed.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-20 text-center px-6 pt-20">
            <p className="animate-in metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] metallic-gold-accent" />
              Excellence in Motion
              <span className="w-8 h-[1px] metallic-gold-accent" />
            </p>
            <h1 className="animate-in font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] text-white mb-6 font-light uppercase leading-[1.1] tracking-[0.1em]">
              Student <span className="metallic-gold-text italic text-[1.1em]">Work</span>
            </h1>
            <p className="animate-in text-[#A8A29C] text-lg max-w-2xl mx-auto leading-relaxed">
              At MAAC Animation Institute, we&apos;re committed to empowering aspiring artists to unleash their creative potential and build professional portfolios.
            </p>
          </div>
        </section>

        {/* Gallery Section (still image portfolios) */}
        <section className="py-24 md:py-32 bg-transparent relative">
          <div className="atmosphere-blob blob-orange top-0 left-0 opacity-5" />
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <StudentWorkGallery />
          </div>
        </section>

        {/* Video / Motion Reels Section — the 4 student films from public/student-work/ (compressed versions).
          Previously, these were ONLY on the homepage teaser (StudentShowcase) and completely absent
          from the /student-work page (which was image-only). Now the dedicated student work section
          properly features "all these 4 things" with playable videos.
        */}
        <section className="py-16 md:py-24 border-t border-white/5 bg-[#0C0C0C] relative">
          <div className="atmosphere-blob blob-red top-1/3 right-0 opacity-10" />
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-[1px] metallic-gold-accent" />
                In Motion
                <span className="w-8 h-[1px] metallic-gold-accent" />
              </p>
              <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] text-white font-bold uppercase tracking-wide">
                Featured Student <span className="metallic-gold-text italic">Films</span>
              </h2>
              <p className="text-[#A8A29C] mt-4 max-w-xl mx-auto">
                Full student-produced short films and VFX/animation reels. Click play to watch the compressed masters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {studentFilms.map((film, idx) => (
                <div
                  key={idx}
                  className="group relative bg-[#111111] rounded-3xl overflow-hidden border border-white/5 shadow-xl"
                >
                  <div className="relative aspect-video bg-black">
                    <video
                      src={film.video}
                      poster={film.poster}
                      className="w-full h-full object-cover"
                      controls
                      muted
                      playsInline
                      loop
                    />
                    {/* Subtle label overlay */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 text-[10px] font-bold tracking-widest text-[#FFD700] border border-white/10">
                      {film.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-white text-lg font-bold uppercase tracking-tight group-hover:text-[#FFD700] transition-colors">
                          {film.title}
                        </h3>
                        <p className="text-[#6B6560] text-xs mt-0.5">{film.category}</p>
                      </div>
                    </div>
                    <p className="text-[#A8A29C] text-sm mt-3 leading-relaxed line-clamp-2">
                      {film.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 text-[#6B6560] text-xs">
              All reels are student work produced during the program. Use the controls to play, scrub, or unmute.
            </div>
          </div>
        </section>

        <div className="border-t border-white/5">
          <IndustryPartners />
        </div>

        <div className="border-t border-white/5">
          <ApplyNow />
        </div>

        <Footer />
      </main>
    </>
  );
}
