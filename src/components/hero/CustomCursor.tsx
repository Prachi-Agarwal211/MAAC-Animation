"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useGSAP(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      // Small dot follows instantly
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 });
      // Main ring follows with lag
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
    };

    const handleHover = () => {
      gsap.to(cursor, {
        scale: 3,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.4,
        ease: "expo.out"
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    };

    const handleLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#FFD700",
        duration: 0.4,
        ease: "expo.out"
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Event delegation: handle hover effects for current and future elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, .cursor-hover") || target.closest("a, button, .cursor-hover")) {
        handleHover();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, .cursor-hover") || target.closest("a, button, .cursor-hover")) {
        handleLeave();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, { dependencies: [isMobile] });

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#FFD700] pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[border-color,background-color] duration-300"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#FFD700] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
