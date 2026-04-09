"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useUIStore } from "@/lib/store";
import { Phone, MessageSquare } from "lucide-react";

interface FloatingCTAProps {
  whatsapp: string;
  phone: string;
}

export default function FloatingCTA({ whatsapp, phone }: FloatingCTAProps) {
  const { mobileMenuOpen, isScrolled: isVisible } = useUIStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isVisible && !mobileMenuOpen) {
      gsap.fromTo(containerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }
      );
      gsap.fromTo(".fab-item",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.2 }
      );
    } else {
      gsap.to(containerRef.current, { x: 100, opacity: 0, duration: 0.5, ease: "expo.in" });
    }
  }, { dependencies: [isVisible, mobileMenuOpen] });

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;
  const callUrl = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <div
      ref={containerRef}
      className="fixed right-6 md:right-10 z-[999] hidden lg:flex flex-col gap-4 opacity-0 pointer-events-none"
      style={{ bottom: "max(32px, calc(32px + env(safe-area-inset-bottom)))" }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-item relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-6 group"
        aria-label="WhatsApp"
      >
        <MessageSquare size={24} fill="currentColor" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Quick Chat
        </span>
      </a>

      <a
        href={callUrl}
        className="fab-item relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E31837] text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:-rotate-6 group"
        aria-label="Call Now"
      >
        <Phone size={24} fill="currentColor" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Call Admissions
        </span>
      </a>
    </div>
  );
}
