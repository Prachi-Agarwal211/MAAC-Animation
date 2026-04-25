"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  className?: string;
  threshold?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 1,
  y = 30,
  stagger = 0,
  className = "",
  threshold = 0.1,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;
    
    gsap.fromTo(
      items,
      { 
        y: y, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${100 - (threshold * 100)}%`,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
