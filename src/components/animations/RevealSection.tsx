"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealSectionProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  className?: string;
}

export default function RevealSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    const from = {
      up:    { opacity: 0, y: 50 },
      left:  { opacity: 0, x: -50 },
      right: { opacity: 0, x: 50 },
      none:  { opacity: 0 },
    }[direction];

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...from,
        duration: 1,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}