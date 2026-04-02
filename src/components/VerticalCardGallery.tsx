"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureCards = [
  { 
    title: "Transformative Educational Events",
    desc: "Industry workshops, masterclasses, and live projects that prepare you for real studio environments.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <line x1="20" y1="8" x2="20" y2="56" />
        <line x1="44" y1="8" x2="44" y2="56" />
        <line x1="8" y1="32" x2="56" y2="32" />
      </svg>
    )
  },
  { 
    title: "Learn from Industry Game Changers",
    desc: "Mentorship from professionals who have worked on blockbuster films, AAA games, and award-winning animations.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
        <circle cx="32" cy="20" r="8" />
        <path d="M16 56v-4a16 16 0 0 1 32 0v4" />
        <path d="M8 56v-2a10 10 0 0 1 10-10" />
        <path d="M56 56v-2a10 10 0 0 0-10-10" />
      </svg>
    )
  },
  { 
    title: "Exclusive Industry Exposure",
    desc: "Studio visits, live briefs, and internship opportunities with top animation and VFX companies.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
        <circle cx="32" cy="32" r="24" />
        <path d="M32 8v48M8 32h48" />
        <circle cx="32" cy="32" r="8" strokeDasharray="4 2" />
      </svg>
    )
  },
  { 
    title: "Portfolio That Speaks Volumes",
    desc: "Graduate with a professional showreel and portfolio that showcases your skills to potential employers.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
        <rect x="12" y="16" width="40" height="32" rx="2" />
        <circle cx="32" cy="32" r="6" />
        <path d="M20 16V12a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4" />
      </svg>
    )
  },
  { 
    title: "Industry-Grade Facilities",
    desc: "State-of-the-art labs, rendering farms, and production suites equipped with latest software and hardware.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <circle cx="32" cy="32" r="12" />
        <path d="M32 20v24M20 32h24" />
      </svg>
    )
  },
  { 
    title: "Courses Built For Future",
    desc: "Curriculum updated regularly with emerging technologies like AI, VR, AR, and real-time rendering.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
        <path d="M32 8l6 12h12l-10 8 4 12-12-8-12 8 4-12-10-8h12z" />
        <circle cx="32" cy="32" r="6" strokeDasharray="4 2" />
      </svg>
    )
  },
  { 
    title: "Creative Careers That Click",
    desc: "Placement support, career counseling, and alumni network that helps you land your dream job.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
        <path d="M32 8C18 8 8 18 8 32s10 24 24 24 24-10 24-24S46 8 32 8z" />
        <path d="M24 32l6 6 10-10" />
      </svg>
    )
  },
];

export default function VerticalCardGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: simple staggered fade-up
      const ctx = gsap.context(() => {
        gsap.fromTo(".feature-card-mobile",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".feature-list-mobile",
              start: "top 75%",
            }
          }
        );
      }, wrapperRef);
      return () => ctx.revert();
    }

    // Desktop: pinned scroll with GSAP
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
      const heading = headingRef.current;
      
      // Timeline for card reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stickyRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Parallax effect for heading
      if (heading) {
        gsap.to(heading, {
          yPercent: 30,
          opacity: 0.5,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        });
      }

      // Cards fly in from right sequentially
      cards.forEach((card, i) => {
        tl.fromTo(card,
          { x: "120%", opacity: 0, rotation: 8 },
          { 
            x: 0, 
            opacity: 1, 
            rotation: 0, 
            duration: 1, 
            ease: "power2.out" 
          },
          i * 0.5
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Desktop: Pinned scroll section */}
      <div ref={wrapperRef} className="vcg-wrapper relative h-[400vh] hidden md:block">
        <div ref={stickyRef} className="vcg-sticky sticky top-0 h-screen overflow-hidden bg-[#0C0C0C]">
          {/* Atmospheric blob */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(227,24,55,0.06)_0%,transparent_70%)]" />
          </div>

          <div className="relative max-w-[1600px] mx-auto px-12 lg:px-20 h-full flex">
            {/* Left: Fixed heading */}
            <div ref={headingRef} className="w-2/5 flex flex-col justify-center pt-20">
              <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-6">
                Empower Your Future
              </p>
              <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-tight text-[#F0EBE1] mb-4">
                Creative Careers That Click
              </h2>
              <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-tight text-[#E31837] mb-6">
                Think MAAC
              </h2>
              <p className="text-[#A8A29C] text-base leading-relaxed max-w-lg">
                Train in animation, VFX, gaming, and digital content creation with expert-led courses that prepare you for real industry success.
              </p>
            </div>

            {/* Right: Card stack */}
            <div className="w-3/5 flex items-center justify-center relative">
              {featureCards.map((card, i) => (
                <div
                  key={i}
                  className="feature-card absolute w-full max-w-xl p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
                  style={{ 
                    borderLeft: '3px solid #E31837',
                    willChange: 'transform, opacity'
                  }}
                >
                  <div className="text-[#E31837] mb-6">{card.icon}</div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">{card.title}</h3>
                  <p className="text-[#A8A29C] text-base leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Simple vertical list */}
      <div className="md:hidden bg-[#0C0C0C] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-6 text-center">
            Empower Your Future
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tight text-[#F0EBE1] mb-4 text-center">
            Creative Careers That Click
          </h2>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tight text-[#E31837] mb-6 text-center">
            Think MAAC
          </h2>
          <p className="text-[#A8A29C] text-base leading-relaxed max-w-lg mx-auto mb-12 text-center">
            Train in animation, VFX, gaming, and digital content creation with expert-led courses that prepare you for real industry success.
          </p>

          <div className="feature-list-mobile space-y-6">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="feature-card-mobile p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08]"
                style={{ borderLeft: '3px solid #E31837' }}
              >
                <div className="text-[#E31837] mb-4">{card.icon}</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{card.title}</h3>
                <p className="text-[#A8A29C] text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
