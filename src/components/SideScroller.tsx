"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollIndicator() {

  const [showBackToTop, setShowBackToTop] = useState(false);
  const rafRef = useRef<number>(0);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    setShowBackToTop(scrollTop > window.innerHeight * 0.4);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateScrollProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed w-14 h-14 rounded-full glass border border-white/10 bg-[#0C0C0C]/90 backdrop-blur-md flex items-center justify-center text-white hover:text-white hover:border-[#BF953F]/30 hover:bg-[#BF953F]/10 transition-all duration-300 z-40"
          style={{ bottom: "max(2rem, env(safe-area-inset-bottom))", right: "max(2rem, env(safe-area-inset-right))" }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}
