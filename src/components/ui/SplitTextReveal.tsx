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

    const triggerElement = containerRef.current.closest('h1, h2, h3, h4, h5, h6, .split-parent') || containerRef.current;
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
            trigger: triggerElement,
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
          trigger: triggerElement,
          start: "top 85%",
        },
        onComplete: () => {
          gsap.set(chars, { clearProps: "transform,opacity" });
        }
      }
    );
  }, { dependencies: [delay, duration, stagger], scope: containerRef });

  const renderContent = () => {
    if (typeof children !== "string") return children;

    return children.split(" ").map((word, i) => (
      <span key={i} className="inline-block whitespace-nowrap overflow-hidden align-bottom mr-[0.2em] last:mr-0 pb-[0.2em] -mb-[0.2em] pt-[0.2em] -mt-[0.2em] pl-[0.1em] -ml-[0.1em] pr-[0.1em] -mr-[0.1em]">
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
