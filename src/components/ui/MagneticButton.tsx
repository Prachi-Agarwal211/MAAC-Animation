"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { isTouchDevice } from "@/lib/constants";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || isTouchDevice()) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = wrapper.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;
      gsap.to(wrapper, { x, y, duration: 0.4, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      gsap.to(wrapper, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    wrapper.addEventListener("mousemove", onMouseMove);
    wrapper.addEventListener("mouseleave", onMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", onMouseMove);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { dependencies: [strength] });

  return (
    <div ref={wrapperRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
