"use client";

import { useState, useEffect } from "react";
import { X, CalendarClock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

export default function DemoBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("demo-bar-visible");
    } else {
      document.body.classList.remove("demo-bar-visible");
    }
    return () => {
      document.body.classList.remove("demo-bar-visible");
    };
  }, [isVisible]);

  useGSAP(() => {
    if (isVisible) {
      gsap.fromTo(".demo-bar-content", 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 1.5 }
      );
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="demo-bar relative z-[2000] bg-[#FFD700] overflow-hidden">
      <div className="demo-bar-content flex items-center justify-center px-6 py-2 gap-4">
        <CalendarClock size={14} className="text-white" />
        <p className="text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
          Admissions Open for 2026 Batch · <span className="hidden sm:inline">Secure Your Professional Portfolio Today</span>
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="demo-bar__dismiss hover:scale-110 transition-transform"
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
      
      {/* Glint effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
    </div>
  );
}
