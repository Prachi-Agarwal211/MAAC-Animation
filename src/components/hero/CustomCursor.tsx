"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Start hidden to avoid flash

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(isTouchDevice);
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Cursor follows instantly
      gsap.to(cursor, { x: clientX, y: clientY, duration: 0 });
      // Follower follows with lag
      gsap.to(follower, { x: clientX, y: clientY, duration: 0.18, ease: "expo.out" });
    };

    // Hover handlers for interactive elements
    const onMouseEnter = () => {
      gsap.to(follower, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: "expo.out" });
    };
    const onMouseLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: "expo.out" });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add hover listeners to interactive elements (re-scan on each mount)
    const interactiveElements = document.querySelectorAll("a, button, [data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  // Don't render any DOM elements on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Cursor dot — MAAC red */}
      <div
        ref={cursorRef}
        className="custom-cursor__dot fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#E31837] pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)", mixBlendMode: "normal" }}
        aria-hidden="true"
      />
      {/* Cursor follower (ring) — MAAC red */}
      <div
        ref={followerRef}
        className="custom-cursor__ring fixed top-0 left-0 w-8 h-8 rounded-full border border-[#E31837]/50 pointer-events-none z-[9998]"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />
    </>
  );
}