"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitting from "splitting";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: React.ReactNode;
  by?: "chars" | "words" | "lines";
  stagger?: number;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function RevealText({
  children,
  by = "words",
  stagger = 0.04,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    Splitting({ target: ref.current, by });

    const targets =
      by === "chars"
        ? ref.current.querySelectorAll(".char")
        : by === "lines"
        ? ref.current.querySelectorAll(".line")
        : ref.current.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: by === "chars" ? 50 : 30,
        rotateX: by === "chars" ? -30 : 0,
        stagger,
        duration: 0.9,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [by, stagger, delay]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}