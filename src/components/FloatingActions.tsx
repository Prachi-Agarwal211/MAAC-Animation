"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useUIStore } from "@/lib/store";
import { contactInfo } from "@/data/siteData";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";

interface FloatingActionsProps {
  variant?: "desktop" | "mobile";
}

function DesktopCTA() {
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

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;
  const callUrl = `tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`;

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

function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 500);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
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

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;
  const callUrl = `tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 right-6 z-[1000] lg:hidden opacity-0 translate-y-20 pointer-events-auto"
    >
      <div className="glass rounded-[32px] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center gap-2 border border-white/10 backdrop-blur-3xl">
        <a
          href={whatsappUrl}
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
          href={callUrl}
          className="mobile-fab-item flex-1 flex flex-col items-center justify-center py-4 bg-white/5 text-white/60 rounded-[24px] gap-1.5 transition-all active:scale-95"
        >
          <Phone size={20} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Call</span>
        </a>
      </div>
    </div>
  );
}

export default function FloatingActions({ variant }: FloatingActionsProps) {
  if (variant === "desktop") return <DesktopCTA />;
  if (variant === "mobile") return <MobileBottomNav />;
  
  return (
    <>
      <DesktopCTA />
      <MobileBottomNav />
    </>
  );
}
