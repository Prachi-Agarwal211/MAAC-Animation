"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/structured-data";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "1986", title: "Foundation", description: "MAAC was established as a premier animation education brand under Aptech." },
  { year: "2000s", title: "Expansion", description: "Expanded to 100+ centers across India, becoming the largest animation institute network." },
  { year: "2010s", title: "Industry Integration", description: "Established partnerships with leading studios like DNEG, Prime Focus, and MPC." },
  { year: "Present", title: "Innovation", description: "Continuously updating curriculum with cutting-edge technologies including AI, VR, and real-time rendering." },
];

const faculty = [
  { name: "Rajesh Kumar", role: "Head of Animation", experience: "15+ Years" },
  { name: "Priya Menon", role: "VFX Lead", experience: "12+ Years" },
  { name: "Amit Sharma", role: "Game Design Mentor", experience: "10+ Years" },
  { name: "Sneha Patel", role: "Digital Media Lead", experience: "8+ Years" },
];

export default function AboutClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".about-hero-content",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: prefersReduced ? 0.3 : 1, ease: "power3.out" }
      );

      // Timeline items
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: prefersReduced ? 0.3 : 0.6,
          stagger: prefersReduced ? 0 : 0.15,
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Faculty cards
      gsap.fromTo(
        ".faculty-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: prefersReduced ? 0.3 : 0.6,
          stagger: prefersReduced ? 0 : 0.1,
          ease: prefersReduced ? "none" : "back.out(1.3)",
          scrollTrigger: {
            trigger: ".faculty-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, pageRef);

    return () => {
      ctx.revert();
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...localBusinessSchema,
            breadcrumb: breadcrumbSchema([
              { name: "Home", url: "https://maacjaipur.com" },
              { name: "About", url: "https://maacjaipur.com/about" },
            ]),
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 about-hero-content">
          <p className="text-[#E31837] text-xs font-inter font-semibold tracking-[0.2em] uppercase mb-4">
            About MAAC
          </p>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e8] leading-[1.05] tracking-tight mb-6">
            About <span className="gradient-text">MAAC</span>
          </h1>
          <p className="text-[#6b6b6b] text-lg md:text-xl max-w-3xl leading-relaxed">
            Welcome to Maya Academy of Advanced Cinematics, the premier
            destination for aspiring animators and visual effects artists. Established
            with a vision to nurture creative talents and provide world-class
            education in animation and multimedia.
          </p>

          {/* Image placeholder */}
          <div className="image-placeholder aspect-video max-w-4xl rounded-3xl mt-10">
            <div className="text-center">
              <div className="text-5xl mb-2">🎬</div>
              <span className="text-sm">Add About Us Banner Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl mb-6">
                🎯
              </div>
              <h3 className="font-display font-bold text-2xl text-[#f5f0e8] mb-4">
                Our Mission
              </h3>
              <p className="text-[#6b6b6b] leading-relaxed">
                To inspire, educate, and empower aspiring artists to unleash
                their creativity and achieve their dreams. We strive to provide a
                conducive learning environment where students can experiment,
                collaborate, and push the boundaries of their imagination.
              </p>
            </div>
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl mb-6">
                🌟
              </div>
              <h3 className="font-display font-bold text-2xl text-[#f5f0e8] mb-4">
                Our Vision
              </h3>
              <p className="text-[#6b6b6b] leading-relaxed">
                To be the global leader in animation and VFX education, setting
                benchmarks for creative excellence and producing industry-ready
                professionals who shape the future of entertainment, media, and
                digital content creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section relative py-24 bg-[#0f0f0f]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#f5f0e8] mb-4">
              Our <span className="gradient-text">History</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 via-accent/30 to-primary/50 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  className={`timeline-item flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-card rounded-2xl p-6 inline-block">
                      <span className="text-[#E31837] font-display font-bold text-lg">
                        {item.year}
                      </span>
                      <h3 className="text-[#f5f0e8] font-display font-semibold text-xl mt-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#6b6b6b] text-sm">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-dark relative z-10 hidden md:block">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="faculty-section relative py-24">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#E31837] text-xs font-inter font-semibold tracking-[0.2em] uppercase mb-4">
              Our Team
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#f5f0e8] mb-4">
              Experienced <span className="gradient-text">Faculty</span>
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Learn from industry professionals with years of experience in top
              animation studios and production houses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member) => (
              <div
                key={member.name}
                className="faculty-card glass-card rounded-3xl p-6 text-center group"
              >
                {/* Avatar placeholder */}
                <div className="image-placeholder w-28 h-28 mx-auto rounded-full mb-4">
                  <span className="text-2xl opacity-50">👤</span>
                </div>
                <h3 className="font-display font-semibold text-[#f5f0e8] group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#E31837] text-sm mb-1">{member.role}</p>
                <p className="text-[#6b6b6b] text-xs">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
