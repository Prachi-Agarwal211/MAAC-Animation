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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (typeof document !== "undefined" && document.documentElement.dataset.maacIntroDone === "1") {
      setReveal(true);
      return;
    // Note: contactInfo is stable and immutable
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (typeof document !== "undefined" && document.documentElement.dataset.maacIntroDone === "1") {
    // Note: contactInfo is stable and immutable
      setReveal(true);
    } else {
      const onReveal = () => setReveal(true);
      window.addEventListener("maac:intro_revealed", onReveal, { once: true });
      return () => window.removeEventListener("maac:intro_revealed", onReveal);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const callUrl = `tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`;

  if (!reveal) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed left-4 right-4 z-[900] lg:hidden transition-all duration-500 ease-expo-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{ bottom: "max(24px, calc(24px + env(safe-area-inset-bottom)))" }}
    >
      <div className="bg-[#050000]/80 backdrop-blur-3xl rounded-[32px] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-stretch gap-2 border border-white/10">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-4 bg-[#25D366]/10 text-[#25D366] rounded-[24px] gap-1 active:scale-[0.95] transition-all"
        >
          <MessageSquare size={20} />
          <span className="text-[11px] md:text-[12px] font-black uppercase tracking-wider">WhatsApp</span>
        </a>
        <Link
          href="/contact"
          className="flex-[1.6] flex flex-col items-center justify-center py-4 bg-[#FFD700] text-black rounded-[24px] gap-1 shadow-lg shadow-[#FFD700]/20 active:scale-[0.95] transition-all border border-white/10"
        >
          <Send size={20} strokeWidth={2.5} />
          <span className="text-[11px] md:text-[12px] font-black uppercase tracking-wider">Enquire Now</span>
        </Link>
        <a
          href={callUrl}
          className="flex-1 flex flex-col items-center justify-center py-4 bg-white/5 text-white rounded-[24px] gap-1 active:scale-[0.95] transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[11px] md:text-[12px] font-black uppercase tracking-wider">Call</span>
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
