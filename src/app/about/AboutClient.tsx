"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/structured-data";
import RevealHeading from "@/components/ui/RevealHeading";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

const milestones = [
  { year: "1986", title: "The Genesis", description: "Established as India's first dedicated institute for cinematic excellence." },
  { year: "2000", title: "Global Vision", description: "Pioneered the integration of international VFX workflows into the Indian curriculum." },
  { year: "2015", title: "Studio Synergy", description: "Launched exclusive placement cells with DNEG, Prime Focus, and MPC." },
  { year: "2026", title: "Future Forge", description: "Leading the revolution in AI-driven 3D production and real-time rendering." },
];

const faculty = [
  { name: "Rajesh Kumar", role: "Head of Animation", exp: "15+ Years", bio: "Former Lead Animator at Prime Focus" },
  { name: "Priya Menon", role: "VFX Lead", exp: "12+ Years", bio: "Ex-Compositor at Redchillies VFX" },
  { name: "Amit Sharma", role: "Game Design", exp: "10+ Years", bio: "Expert in Unreal Engine 5" },
  { name: "Sneha Patel", role: "Digital Media", exp: "8+ Years", bio: "Motion Graphics specialist" },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".about-hero-media", { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" });

    gsap.fromTo(".milestone-card", 
      { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50 },
      { 
        opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: "expo.out",
        scrollTrigger: { trigger: ".timeline-section", start: "top 70%" }
      }
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-transparent overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { ...localBusinessSchema },
              breadcrumbSchema([
                { name: "Home", url: "https://www.maacanimationjaipur.com" },
                { name: "About", url: "https://www.maacanimationjaipur.com/about" },
              ])
            ]
          }),
        }}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10" />
          <div className="about-hero-media relative w-full h-full">
             <div className="absolute inset-0 bg-[#1c1c1c] animated-mesh-bg opacity-40" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-display text-white/[0.02] select-none pointer-events-none font-light uppercase leading-[1.1] tracking-[0.1em]">ABOUT</div>
          </div>
        </div>

        <div className="relative z-20 max-w-5xl">
          <span className="inline-block text-[#FFD700] text-xs font-bold tracking-[0.4em] uppercase mb-8">
            Established 1986
          </span>
          <h1 className="mb-10">
            <span className="block text-white font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.85] font-light uppercase leading-[1.1] tracking-[0.1em]">
              <SplitTextReveal>Crafting the</SplitTextReveal>
            </span>
            <span className="block metallic-gold-text font-display text-[clamp(3rem,8vw,7rem)] leading-[0.85] mt-4 font-light uppercase leading-[1.1] tracking-[0.1em]">
              <SplitTextReveal delay={0.2}>Digital Future</SplitTextReveal>
            </span>
          </h1>
          <p className="text-[#A8A29C] text-lg md:text-2xl font-medium leading-relaxed max-w-3xl border-l-2 border-[#FFD700] pl-8">
            Welcome to Maya Academy of Advanced Creativity (MAAC) — Jaipur&apos;s premier hub for VFX, Animation, and Game Design excellence.
          </p>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="relative py-16 md:py-24 bg-[#0C0C0C]">
        <div className="max-w-content mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 md:gap-32">
          <div className="space-y-12">
            <RevealHeading className="text-white text-4xl md:text-6xl tracking-tighter">The Visionary Core</RevealHeading>
            <p className="text-[#A8A29C] text-lg leading-relaxed italic">
              &ldquo;We don&apos;t just teach tools; we forge artists who command the medium. Our vision is to place Jaipur at the heart of the global creative map.&rdquo;
            </p>
          </div>
          <div className="grid gap-8">
            {["Mission", "Vision"].map((type, i) => (
              <div key={type} className="p-10 rounded-[40px] glass border border-white/5 group hover:border-[#FFD700]/30 transition-all duration-700">
                <span className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">0{i+1} · {type}</span>
                <p className="text-white/80 leading-relaxed">
                  {i === 0 
                    ? "To inspire and empower aspiring artists through industry-aligned curriculum and hands-on studio experience."
                    : "To be the global benchmark in digital arts education, producing elite talent for the world's top production houses."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE SECTION ── */}
      <section id="heritage" className="timeline-section relative py-16 md:py-24 scroll-mt-28">
        <div className="max-w-content mx-auto px-6 md:px-12 mb-24">
          <h2 className="font-display text-white text-5xl md:text-8xl font-light uppercase leading-[1.1] tracking-[0.1em]">OUR <span className="text-white/10">ODYSSEY</span></h2>
        </div>
        
        <div className="relative border-t border-white/5">
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <div key={i} className="milestone-card p-10 md:p-12 border-b md:border-b-0 md:border-r border-white/5 hover:bg-[#FFD700]/5 transition-colors duration-700 group">
                <div className="text-[#FFD700] font-display text-5xl mb-8 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 font-light uppercase leading-[1.1] tracking-[0.1em]">{m.year}</div>
                <h3 className="text-white text-xl font-display mb-4 tracking-widest font-light uppercase leading-[1.1] tracking-[0.1em]">{m.title}</h3>
                <p className="text-[#A8A29C] text-sm leading-relaxed group-hover:text-white transition-colors">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACULTY SECTION ── */}
      <section id="faculty" className="py-16 md:py-24 bg-transparent scroll-mt-28">
        <div className="max-w-content mx-auto px-6 md:px-12 text-center mb-24">
          <span className="text-[#FFD700] text-sm font-bold tracking-[0.3em] uppercase mb-6 block">Industry Titans</span>
          <h2 className="text-white font-display text-5xl md:text-8xl font-light uppercase leading-[1.1] tracking-[0.1em]">EXPERIENCED <span className="gradient-text">FACULTY</span></h2>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((f, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-[40px] overflow-hidden bg-[#111111] border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center text-[15rem] font-display text-white/[0.02] group-hover:text-white/[0.05] transition-colors font-light uppercase leading-[1.1] tracking-[0.1em]">{f.name[0]}</div>
              
              <div className="absolute bottom-0 left-0 right-0 p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">{f.role}</span>
                <h3 className="text-white text-2xl font-display mb-2 font-light uppercase leading-[1.1] tracking-[0.1em]">{f.name}</h3>
                <p className="text-[#A8A29C] text-xs font-bold uppercase tracking-widest mb-6">{f.exp} EXPERIENCE</p>
                <p className="text-white/40 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {f.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/5">
        <IndustryPartners />
      </div>

      <div className="border-t border-white/5">
        <ApplyNow />
      </div>
    </main>
  );
}
