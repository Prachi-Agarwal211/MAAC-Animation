"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

interface LiquidRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function LiquidReveal({ children, className = "" }: LiquidRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !innerRef.current) return;

    gsap.fromTo(innerRef.current,
      {
        clipPath: "circle(0% at 50% 50%)",
      },
      {
        clipPath: "circle(100% at 50% 50%)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`${className} relative overflow-hidden`}>
      <div ref={innerRef} className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}
