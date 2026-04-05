"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface SplitTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function SplitTextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  as: Tag = "span",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    // NO char splitting on mobile — use simple fade instead
    if (window.innerWidth < 768) {
      const el = containerRef.current as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;

      // Simple intersection observer fade
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          io.disconnect();
        }
      }, { threshold: 0.3 });
      io.observe(el);
      return () => io.disconnect();
    }

    // Ensure animations respect user accessibility preferences
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll(".char");
      if (!chars || chars.length === 0) return;

      // Premium Awwwards style: Characters rotate up from an invisible bounding box
      gsap.fromTo(
        chars,
        {
          yPercent: 110,
          rotateZ: 6,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, stagger]);

  // Recursively or directly parses text to break into spans capable of overflow clipping
  const parseText = (text: string) => {
    return text.split(/(\s+)/).map((wordOrSpace, i) => {
      // Preserve exact space structures for styling
      if (wordOrSpace.trim() === "") {
        return <span key={i} className="inline-block whitespace-pre">{wordOrSpace}</span>;
      }
      return (
        <span key={i} className="inline-flex overflow-hidden align-bottom">
          {wordOrSpace.split("").map((char, j) => (
            <span key={j} className="char inline-block will-change-transform origin-bottom-left">
              {char}
            </span>
          ))}
        </span>
      );
    });
  };

  const renderContent = () => {
    if (typeof children === "string") {
      return parseText(children);
    }
    return children;
  };

  const Component = Tag as any;

  return (
    <Component ref={containerRef} className={`${className} maac-split-text`}>
      {renderContent()}
    </Component>
  );
}
