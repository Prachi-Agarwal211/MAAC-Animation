"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    setIsVisible(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Cursor follows instantly
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      // Follower follows with lag
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "expo.out",
      });
    };

    // Hover handlers for interactive elements
    const onMouseEnter = () => {
      gsap.to(follower, {
        scale: 2.5,
        duration: 0.3,
        ease: "expo.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: "expo.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
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

  if (!isVisible) return null;

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="custom-cursor__dot fixed top-0 left-0 w-2 h-2 bg-tiger-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
      
      {/* Cursor follower (ring) */}
      <div
        ref={followerRef}
        className="custom-cursor__follower fixed top-0 left-0 w-8 h-8 border border-tiger-accent/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ 
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
