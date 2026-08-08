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
  { year: "1998", title: "The Genesis", description: "MAAC (Maya Academy of Advanced Creativity) is established, bringing world-class animation and VFX education to India." },
  { year: "2000", title: "Global Vision", description: "Pioneered the integration of international VFX workflows into the Indian curriculum." },
  { year: "2015", title: "Studio Synergy", description: "Launched exclusive placement cells with DNEG, Prime Focus, and MPC." },
  { year: "2026", title: "Future Forge", description: "Leading the revolution in AI-driven 3D production and real-time rendering." },
];

const faculty = [
  { name: "Anurag Tiwari", role: "Head of Department", exp: "12+ Years", bio: "Leads the academic vision and curriculum with industry-aligned training." },
  { name: "Yogesh Sharma", role: "VFX Lead", exp: "10+ Years", bio: "VFX compositing and CG integration expert with studio production experience." },
  { name: "Sameer Khan", role: "Graphics & Animation", exp: "10+ Years", bio: "Specialist in 3D animation, motion graphics, and visual storytelling." },
  { name: "Mehul Patel", role: "Game Design Lead", exp: "8+ Years", bio: "Game art, level design and real-time engine expert — Unity & Unreal." },
  { name: "Shivani Gupta", role: "Pre-Production", exp: "8+ Years", bio: "Storyboarding, scriptwriting and pre-visualization specialist." },
  { name: "P. Dixit", role: "Communication Design", exp: "10+ Years", bio: "Visual communication, typography and brand design expert." },
  { name: "Kaushal Kumar", role: "UI/UX Design", exp: "9+ Years", bio: "User experience design, interface design and design thinking mentor." },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Individual null-checked animations — no global try-catch
    const heroMedia = container.querySelector(".about-hero-media");
    if (heroMedia) {
      const tl = gsap.timeline();
      tl.fromTo(heroMedia, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" });
    }

    // ── Timeline scroll reveals (DesignxHand inspired) ──
    const timelineItems = container.querySelectorAll(".timeline-item");
    if (timelineItems.length) {
      timelineItems.forEach((item, i) => {
        const dot = item.querySelector(".timeline-dot");
        const date = item.querySelector(".timeline-date");
        const card = item.querySelector(".timeline-card");
        const connector = item.querySelector(".timeline-connector");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Dot pops in with elastic bounce
        if (dot) {
          tl.fromTo(dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.6,
              ease: "back.out(2)",
              onComplete: () => dot.classList.add("revealed"),
            },
            0
          );
        }

        // Date badge slides in from above
        if (date) {
          tl.fromTo(date,
            { opacity: 0, y: -10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "expo.out",
              onComplete: () => date.classList.add("revealed"),
            },
            "-=0.3"
          );
        }

        // Connector line draws down
        if (connector) {
          tl.fromTo(connector,
            { scaleY: 0, opacity: 0 },
            {
              scaleY: 1,
              opacity: 1,
              duration: 0.6,
              ease: "expo.out",
              transformOrigin: "top",
              onComplete: () => connector.classList.add("revealed"),
            },
            "-=0.2"
          );
        }

        // Card slides in from right
        if (card) {
          tl.fromTo(card,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "expo.out",
              onComplete: () => card.classList.add("revealed"),
            },
            "-=0.3"
          );
        }

        // Stagger based on index
        tl.delay(i * 0.15);
      });
    }
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

        <div className="relative z-20 w-full max-w-7xl">
          <span className="inline-block metallic-gold-text-sm text-[10px] font-bold tracking-[0.4em] uppercase mb-8">
            Established 1998
          </span>
          <h1 className="mb-10">
            <span className="block text-white font-display text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-light uppercase tracking-[0.1em]">
              <SplitTextReveal>Crafting the</SplitTextReveal>
            </span>
            <span className="block metallic-gold-text font-display text-[clamp(3rem,8vw,7rem)] leading-[0.85] mt-4 font-light uppercase tracking-[0.1em]">
              <SplitTextReveal delay={0.2}>Digital Future</SplitTextReveal>
            </span>
          </h1>
          <p className="text-white/85 text-lg md:text-2xl font-medium leading-relaxed max-w-3xl border-l-2 border-[#BF953F] pl-8">
            Welcome to Maya Academy of Advanced Creativity (MAAC) — Jaipur&apos;s premier hub for VFX, Animation, and Game Design excellence.
          </p>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="relative py-16 md:py-24 bg-[#0C0C0C]">
        <div className="max-w-content mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 md:gap-32">
          <div className="space-y-12">
            <RevealHeading className="text-white text-4xl md:text-6xl tracking-tighter">The Visionary Core</RevealHeading>
            <p className="text-white/85 text-lg leading-relaxed italic">
              &ldquo;We don&apos;t just teach tools; we forge artists who command the medium. Our vision is to place Jaipur at the heart of the global creative map.&rdquo;
            </p>
          </div>
          <div className="grid gap-8">
            {["Mission", "Vision"].map((type, i) => (
              <div key={type} className="p-10 rounded-[40px] glass border border-white/5 group hover:border-[#C4A882]/30 transition-all duration-700">
                <span className="text-[#C4A882] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">0{i+1} · {type}</span>
                <p className="text-white/90 leading-relaxed">
                  {i === 0 
                    ? "To inspire and empower aspiring artists through industry-aligned curriculum and hands-on studio experience."
                    : "To be the global benchmark in digital arts education, producing elite talent for the world's top production houses."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE SECTION — DesignxHand inspired vertical timeline ── */}
      <section id="heritage" className="timeline-section section-fade relative py-16 md:py-24 scroll-mt-28">
        <div className="max-w-content mx-auto px-6 md:px-12 mb-24">
          <h2 className="font-display text-white text-5xl md:text-8xl font-bold uppercase leading-[1.1] tracking-[0.1em]">
                <span className="title-layer">
                  <span className="title-layer-glow" aria-hidden="true">OUR</span>
                  <span className="relative z-10">OUR</span>
                </span>{' '}
                <span className="title-layer">
                  <span className="title-layer-glow" aria-hidden="true">ODYSSEY</span>
                  <span className="relative z-10">ODYSSEY</span>
                </span>
              </h2>
        </div>
        
        <div className="event-timeline max-w-4xl mx-auto px-6 md:px-12">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-item">
              {/* Glowing dot */}
              <div className="timeline-dot" />
              
              {/* Connector line */}
              {i < milestones.length - 1 && (
                <div className="timeline-connector" />
              )}
              
              {/* Date badge — year shown */}
              <div className="timeline-date">
                <span className="date-day">{m.year}</span>
              </div>

              {/* Content card */}
              <div className="timeline-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.2em] uppercase">
                    Chapter {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-6 h-[1px] bg-[#C4A882]/30" />
                </div>
                <h3 className="font-display text-white text-2xl md:text-3xl mb-3 font-bold uppercase leading-[1.1] tracking-[0.05em]">
                  {m.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FACULTY SECTION ── */}
      <section id="faculty" className="py-16 md:py-24 bg-transparent scroll-mt-28">
        <div className="max-w-content mx-auto px-6 md:px-12 text-center mb-24">
          <span className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.3em] uppercase mb-6 block">Industry Titans</span>
          <h2 className="text-white font-display text-5xl md:text-8xl font-bold uppercase leading-[1.1] tracking-[0.1em]">EXPERIENCED <span className="gradient-text">FACULTY</span></h2>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8">
          {faculty.map((f, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-[40px] overflow-hidden bg-[#111111] border border-white/5 hover:border-[#BF953F]/40 transition-colors duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-[#BF953F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className={`absolute inset-0 opacity-[0.03] bg-gradient-to-br ${
                ['from-[#BF953F]', 'from-[#E31837]', 'from-[#FF6B35]', 'from-[#BF953F]', 'from-[#BF953F]', 'from-[#E31837]', 'from-[#FF6B35]'][i]
              } to-transparent`} />
              <div className="absolute inset-0 flex items-center justify-center text-[12rem] md:text-[15rem] font-display text-white/[0.03] group-hover:text-white/[0.06] transition-all duration-700 font-black uppercase leading-[1] tracking-[0.1em] select-none">{f.name[0]}</div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BF953F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div className="w-8 h-[2px] bg-[#BF953F]/50 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-[#BF953F] text-[9px] font-bold uppercase tracking-[0.3em] mb-2 block opacity-80 group-hover:opacity-100 transition-opacity">{f.role}</span>
                <h3 className="text-white text-xl md:text-2xl font-display mb-1 font-bold leading-[1.1]">{f.name}</h3>
                <p className="text-white/85 text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">{f.exp} EXPERIENCE</p>
                <p className="text-white/85 text-xs md:text-sm leading-relaxed line-clamp-3">
                  {f.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <IndustryPartners />

      <ApplyNow />
    </main>
  );
}
