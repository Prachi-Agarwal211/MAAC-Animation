"use client";

import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useRef, useState, useEffect } from "react";
import { MessageSquare, Calendar, Phone } from "lucide-react";
import Link from "next/link";

export default function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (isVisible) {
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "expo.out"
      });
      gsap.fromTo(".mobile-fab-item", 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.2 }
      );
    } else {
      gsap.to(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: "expo.in"
      });
    }
  }, { dependencies: [isVisible] });

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 right-6 z-[1000] lg:hidden opacity-0 translate-y-20 pointer-events-auto"
    >
      <div className="glass rounded-[32px] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center gap-2 border border-white/10 backdrop-blur-3xl">
        <a
          href="https://wa.me/917300001589"
          className="mobile-fab-item flex-1 flex flex-col items-center justify-center py-4 bg-[#25D366]/10 text-[#25D366] rounded-[24px] gap-1.5 transition-all active:scale-95"
        >
          <MessageSquare size={20} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">WhatsApp</span>
        </a>
        
        <Link
          href="/contact"
          className="mobile-fab-item flex-[1.8] flex flex-col items-center justify-center py-4 bg-[#E31837] text-white rounded-[24px] gap-1.5 shadow-xl shadow-[#E31837]/20 transition-all active:scale-95 border border-white/10"
        >
          <Calendar size={20} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Book Free Demo</span>
        </Link>

        <a
          href="tel:+917300001589"
          className="mobile-fab-item flex-1 flex flex-col items-center justify-center py-4 bg-white/5 text-white/60 rounded-[24px] gap-1.5 transition-all active:scale-95"
        >
          <Phone size={20} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Call</span>
        </a>
      </div>
    </div>
  );
}
