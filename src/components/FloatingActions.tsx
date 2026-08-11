"use client";

import { useRef, useState, useEffect } from "react";
import { contactInfo } from "@/data/siteData";
import Link from "next/link";
import { fireGoogleAdsConversion } from "@/lib/tracking";

interface FloatingActionsProps {
  variant?: "desktop" | "mobile";
}

/* ── WhatsApp: official brand logo ── */
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Enquiry: chat bubble with question mark ── */
function EnquiryIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      <path d="M9.5 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" fill="currentColor" stroke="none" />
      <path d="M13 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" fill="currentColor" stroke="none" />
      <path d="M16.5 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Phone: official phone handset ── */
function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function DesktopCTA() {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed right-6 md:right-10 z-[100] hidden lg:flex flex-col gap-3"
      style={{
        bottom: "max(32px, calc(32px + env(safe-area-inset-bottom)))",
      }}
    >
      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() =>
          fireGoogleAdsConversion("AW-827036079/oHxaCInpqO8CEK-jrooD")
        }
        className="group flex items-center justify-end gap-3"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#25D366] opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
          WhatsApp
        </span>
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(37,211,102,0.45)] group-hover:rounded-xl">
          <WhatsAppIcon size={26} />
        </div>
      </a>

      {/* Enquire */}
      <Link
        href="/contact"
        aria-label="Enquire now"
        className="group flex items-center justify-end gap-3"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4A882] opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
          Enquire
        </span>
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E31837] text-white shadow-[0_4px_20px_rgba(227,24,55,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(227,24,55,0.45)] group-hover:rounded-xl">
          <EnquiryIcon size={24} />
        </div>
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
          setVisible(window.scrollY > window.innerHeight * 0.6);
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
      className={`fixed left-4 right-4 z-[1000] lg:hidden transition-all duration-500 ease-expo-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{ bottom: "max(24px, calc(24px + env(safe-area-inset-bottom)))" }}
    >
      <div className="bg-[#050000]/80 backdrop-blur-3xl rounded-[32px] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-stretch gap-2 border border-white/10">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            fireGoogleAdsConversion("AW-827036079/oHxaCInpqO8CEK-jrooD")
          }
          className="flex-1 flex flex-col items-center justify-center py-4 bg-[#25D366]/10 text-[#25D366] rounded-[24px] gap-1 active:scale-[0.95] transition-all"
        >
          <WhatsAppIcon size={20} />
          <span className="text-[11px] md:text-[12px] font-black uppercase tracking-wider">WhatsApp</span>
        </a>
        <Link
          href="/contact"
          className="flex-[1.6] flex flex-col items-center justify-center py-4 bg-[#C4A882] text-black rounded-[24px] gap-1 shadow-lg shadow-[#BF953F]/20 active:scale-[0.95] transition-all border border-white/10"
        >
          <EnquiryIcon size={18} />
          <span className="text-[11px] md:text-[12px] font-black uppercase tracking-wider">Enquire Now</span>
        </Link>
        <a
          href={callUrl}
          className="flex-1 flex flex-col items-center justify-center py-4 bg-white/5 text-white rounded-[24px] gap-1 active:scale-[0.95] transition-all"
        >
          <PhoneIcon size={20} />
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
