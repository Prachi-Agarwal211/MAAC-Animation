"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { MOBILE_BREAKPOINT } from "@/lib/constants";

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
  duration = 1.2,
  stagger = 0.015,
  as: Tag = "span",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReduced) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          }
        }
      );
      return;
    }

    const chars = containerRef.current.querySelectorAll(".char");
    if (!chars.length) return;

    gsap.fromTo(chars,
      {
        yPercent: 100,
        rotateX: -90,
        opacity: 0,
      },
      {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, { dependencies: [delay, duration, stagger], scope: containerRef });

  const renderContent = () => {
    if (typeof children !== "string") return children;

    return children.split(" ").map((word, i) => (
      <span key={i} className="inline-block whitespace-nowrap overflow-hidden align-bottom mr-[0.2em] last:mr-0">
        {word.split("").map((char, j) => (
          <span key={j} className="char inline-block origin-bottom">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const Component = Tag as React.ElementType;

  return (
    <Component ref={containerRef} className={`${className} inline-block perspective-1000`}>
      {renderContent()}
    </Component>
  );
}
