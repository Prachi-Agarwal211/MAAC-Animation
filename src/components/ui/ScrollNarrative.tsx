"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { scrollToTarget } from "@/lib/lenis";

const sections = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "placements", label: "Stats" },
  { id: "courses", label: "Courses" },
  { id: "intro", label: "About" },
  { id: "pathways", label: "Pathways" },
  { id: "partners", label: "Partners" },
  { id: "showcase", label: "Showcase" },
  { id: "success-stories", label: "Stories" },
  { id: "apply", label: "Apply" },
  { id: "faq", label: "FAQ" },
];

export default function ScrollNarrative() {
  const [active, setActive] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        let current = 0;
        for (let i = 0; i < sections.length; i++) {
          const el = document.getElementById(sections[i].id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top < vh * 0.4) {
            current = i;
          }
        }
        setActive(current);
        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    scrollToTarget(`#${id}`);
  }, []);

  return (
    <div className="scroll-narrative" role="navigation" aria-label="Section navigation">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`scroll-narrative-dot relative ${i === active ? "active" : ""}`}
          aria-label={`Go to ${s.label}`}
        >
          <span className="dot-label">{s.label}</span>
        </button>
      ))}
    </div>
  );
}
