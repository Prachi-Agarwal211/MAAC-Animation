"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { navLinks, contactInfo } from "@/data/siteData";
import { useUIStore } from "@/lib/store";
import { Phone, MessageSquare, ChevronDown } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScroll";

export default function Navbar() {
  const { mobileMenuOpen, megaMenuOpen, toggleMobileMenu, setMegaMenu, isScrolled } = useUIStore();
  const [isVisible, setIsVisible] = useState(false);
  
  // Use centralized scroll progress hook
  const _scrollProgress = useScrollProgress();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setTimeout(() => setIsVisible(true), 300);
    window.addEventListener("maac:intro_revealed", handler, { once: true });
    return () => window.removeEventListener("maac:intro_revealed", handler);
  }, []);

  useGSAP(() => {
    // Magnetic Logo
    const logo = logoRef.current;
    const cleanupLogo = () => {
      if (logo) {
        logo.removeEventListener("mousemove", onLogoMove);
        logo.removeEventListener("mouseleave", onLogoLeave);
      }
    };

    const onLogoMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = logo!.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.3;
      const y = (clientY - (top + height / 2)) * 0.3;
      gsap.to(logo, { x, y, duration: 0.4, ease: "power2.out" });
    };
    const onLogoLeave = () => {
      gsap.to(logo, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    if (logo) {
      logo.addEventListener("mousemove", onLogoMove);
      logo.addEventListener("mouseleave", onLogoLeave);
    }

    // Magnetic Nav Links
    const links = document.querySelectorAll(".nav-link-magnetic");
    const linkHandlers: Array<{ el: Element; move: any; leave: any }> = [];

    links.forEach((link) => {
      const onMove = (e: any) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = link.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.4;
        const y = (clientY - (top + height / 2)) * 0.4;
        gsap.to(link, { x, y, duration: 0.4, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: "power4.out" });
      };
      link.addEventListener("mousemove", onMove);
      link.addEventListener("mouseleave", onLeave);
      linkHandlers.push({ el: link, move: onMove, leave: onLeave });
    });

    return () => {
      cleanupLogo();
      linkHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, { scope: navRef });

  useGSAP(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(".mobile-nav-link", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
    }
  }, [mobileMenuOpen]);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;

  return (
    <>
      <header
        ref={navRef}
        className={`fixed left-0 right-0 z-[1000] transition-all duration-1000 ease-expo-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${isScrolled ? "top-0" : "top-[var(--navbar-top,0px)]"}`}
        style={{ 
          "--navbar-top": "var(--demo-bar-height, 0px)" 
        } as React.CSSProperties}
      >
        <div className={`transition-all duration-500 py-4 md:py-6 ${isScrolled ? "bg-[#0C0C0C]/80 backdrop-blur-2xl border-b border-white/5 py-3 md:py-4" : "bg-transparent"}`}>
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="relative z-[1001] flex items-center gap-4 group">
              <div ref={logoRef} className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-colors group-hover:border-[#E31837]/50 shadow-2xl">
                <Image src="/image.png" alt="MAAC" width={40} height={40} className="object-contain" priority />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-2">
              {navLinks.map((link) => (
                <div 
                  key={link.label} 
                  className="relative px-2 py-1 nav-item-wrapper" 
                  onMouseEnter={() => setMegaMenu(link.label)} 
                  onMouseLeave={() => setMegaMenu(null)}
                >
                  <Link 
                    href={link.href} 
                    className="nav-link-magnetic text-white/60 hover:text-white text-xs font-bold tracking-[0.15em] uppercase transition-colors flex items-center gap-2 py-2"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={12} className={`transition-transform duration-300 ${megaMenuOpen === link.label ? 'rotate-180' : ''}`} />}
                  </Link>
                  <div className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#E31837] transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100 ${megaMenuOpen === link.label ? 'scale-x-100' : ''}`} />
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <a href={`tel:${contactInfo.phone}`} className="hidden sm:flex items-center gap-2.5 text-white/60 hover:text-white transition-colors group">
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E31837]/50 transition-colors">
                  <Phone size={14} />
                </div>
                <span className="text-[11px] font-bold tracking-widest">{contactInfo.phone}</span>
              </a>
              
              <Link href="/contact" className="hidden md:flex btn btn-primary px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.15em]">
                Apply Now
              </Link>

              {/* Mobile Toggle */}
              <button onClick={toggleMobileMenu} className="relative z-[1001] w-12 h-12 flex items-center justify-center rounded-full glass border border-white/5 group">
                <div className="flex flex-col gap-1.5 w-6">
                  <span className={`block h-0.5 bg-white transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-2 w-full' : 'w-full'}`} />
                  <span className={`block h-0.5 bg-white transition-all duration-500 ${mobileMenuOpen ? 'opacity-0' : 'w-2/3 group-hover:w-full'}`} />
                  <span className={`block h-0.5 bg-white transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 w-full' : 'w-full'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div className={`fixed inset-0 z-[999] bg-[#0C0C0C] transition-all duration-700 ease-expo-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="h-full flex flex-col pt-[calc(var(--demo-bar-height,40px)+8rem)] px-10 pb-12 overflow-y-auto">
          <nav className="flex-1 space-y-8">
            {navLinks.map((link) => (
              <div key={link.label} className="mobile-nav-link">
                <Link href={link.href} onClick={toggleMobileMenu} className="block text-4xl md:text-6xl font-display font-bold text-white/40 hover:text-white transition-colors tracking-tighter">
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="mobile-nav-link pt-12 border-t border-white/5 space-y-8">
            <div className="flex flex-col gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] text-white rounded-2xl font-bold uppercase tracking-widest text-xs">
                <MessageSquare size={18} /> WhatsApp
              </a>
              <Link href="/contact" onClick={toggleMobileMenu} className="flex items-center justify-center w-full py-5 glass border border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-xs">
                Book Free Demo
              </Link>
            </div>
            
            <div className="flex justify-between items-center text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
              <span>MAAC JAIPUR</span>
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
