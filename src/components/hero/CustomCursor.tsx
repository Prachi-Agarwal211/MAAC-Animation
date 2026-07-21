"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { isTouchDevice } from "@/lib/constants";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const cursorTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  useGSAP(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      // ponytail: gsap.set for instant dot, reuse single tween for cursor ring
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      if (cursorTweenRef.current) cursorTweenRef.current.kill();
      cursorTweenRef.current = gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleHover = () => {
      gsap.to(cursor, {
        scale: 3,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    };

    const handleLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#C4A882",
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

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
      cursorTweenRef.current?.kill();
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
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#C4A882] pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#C4A882] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
