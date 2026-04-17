"use client";

import { useRef, useState, useEffect } from "react";
import { contactInfo } from "@/data/siteData";
import { MessageSquare, Send } from "lucide-react";
import Link from "next/link";

interface FloatingActionsProps {
  variant?: "desktop" | "mobile";
}

function DesktopCTA() {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.documentElement.dataset.maacIntroDone === "1") {
      setReveal(true);
      return;
    }
    const onReveal = () => setReveal(true);
    window.addEventListener("maac:intro_revealed", onReveal, { once: true });
    return () => window.removeEventListener("maac:intro_revealed", onReveal);
  }, []);

  if (!reveal) return null;

  return (
    <div
      className="fixed right-6 md:right-10 z-[60] hidden lg:flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700"
      style={{ bottom: "max(32px, calc(32px + env(safe-area-inset-bottom)))" }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageSquare size={24} fill="currentColor" />
      </a>
      <Link
        href="/contact"
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E31837] text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="Enquire now"
      >
        <Send size={22} strokeWidth={2.25} />
      </Link>
    </div>
  );
}

function MobileBottomNav() {
  const [visible, setVisible] = useState(false);
  const [reveal, setReveal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.documentElement.dataset.maacIntroDone === "1") {
      setReveal(true);
    } else {
      const onReveal = () => setReveal(true);
      window.addEventListener("maac:intro_revealed", onReveal, { once: true });
      return () => window.removeEventListener("maac:intro_revealed", onReveal);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 420);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;

  if (!reveal) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed left-4 right-4 z-[60] lg:hidden transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ bottom: "max(16px, calc(16px + env(safe-area-inset-bottom)))" }}
    >
      <div className="glass rounded-2xl p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-stretch gap-2 border border-white/10 backdrop-blur-3xl">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3.5 bg-[#25D366]/10 text-[#25D366] rounded-xl gap-1 active:scale-[0.98] transition-transform"
        >
          <MessageSquare size={20} />
          <span className="text-[8px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        <Link
          href="/contact"
          className="flex-[1.4] flex flex-col items-center justify-center py-3.5 bg-[#E31837] text-white rounded-xl gap-1 shadow-lg shadow-[#E31837]/20 active:scale-[0.98] transition-transform border border-white/10"
        >
          <Send size={20} strokeWidth={2.25} />
          <span className="text-[8px] font-bold uppercase tracking-wider">Enquire</span>
        </Link>
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
