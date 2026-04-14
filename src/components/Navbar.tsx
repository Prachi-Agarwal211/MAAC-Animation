"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { navLinks, contactInfo } from "@/data/siteData";
import { useUIStore } from "@/lib/store";
import { Phone, MessageSquare, ChevronDown, X, Menu } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScroll";

export default function Navbar() {
  const { mobileMenuOpen, megaMenuOpen, toggleMobileMenu, setMegaMenu, isScrolled } = useUIStore();
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Use centralized scroll progress hook
  const _scrollProgress = useScrollProgress();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setTimeout(() => setIsVisible(true), 300);
    window.addEventListener("maac:intro_revealed", handler, { once: true });
    return () => window.removeEventListener("maac:intro_revealed", handler);
  }, []);

  // Track scroll for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    // Magnetic Logo - desktop only
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

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
      {/* ── MAIN NAV ── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent"
        } ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">

          {/* ── BRAND LOCKUP ── */}
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group" aria-label="MAAC Jaipur C-Scheme - Home">
              <Image
                src="/image.png"
                alt="MAAC Animation Jaipur Logo"
                width={56}
                height={56}
                className="rounded transition-transform group-hover:scale-105 drop-shadow-lg"
                priority
              />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-syne font-bold text-white text-[17px] tracking-wide drop-shadow-md">MAAC Jaipur</span>
                <span className="text-red-500 text-[10px] tracking-[0.2em] uppercase font-semibold drop-shadow-sm">C-Scheme</span>
              </div>
            </Link>
          </div>

          {/* ── DESKTOP NAV ── */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative nav-link-magnetic"
                onMouseEnter={() => link.children && setMegaMenu(link.label)}
                onMouseLeave={() => setMegaMenu(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-white/80 hover:text-white transition-colors tracking-wide uppercase font-medium"
                >
                  {link.label}
                  {link.children && <ChevronDown size={12} className="opacity-60" />}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.children && megaMenuOpen === link.label && (
                  <div className="absolute top-full left-0 mt-1 bg-[#161616] border border-white/10 rounded p-4 min-w-[200px] shadow-2xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ── DESKTOP ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
              aria-label="Call MAAC Jaipur"
            >
              <Phone size={14} />
              <span className="hidden xl:inline">{contactInfo.phone}</span>
            </a>
            <Link
              href="/demo-class"
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 tracking-wider uppercase transition-colors"
            >
              Book Demo
            </Link>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <div className="flex lg:hidden items-center gap-3">
            <a href={`tel:${contactInfo.phone}`} className="text-white/70 hover:text-white" aria-label="Call">
              <Phone size={18} />
            </a>
            <button
              onClick={toggleMobileMenu}
              className="text-white p-1"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`fixed inset-0 z-40 bg-[#0C0C0C] flex flex-col transition-all duration-300 pt-16 md:pt-18 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className="mobile-nav-link block py-4 text-2xl font-syne font-bold text-white/80 hover:text-white border-b border-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/20 text-white py-3 text-sm font-semibold uppercase tracking-widest"
            >
              <MessageSquare size={16} /> WhatsApp
            </a>
            <Link
              href="/demo-class"
              onClick={toggleMobileMenu}
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold uppercase tracking-widest transition-colors"
            >
              Book Free Demo
            </Link>
          </div>
        </nav>

        <div className="px-6 py-4 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs">MAAC Jaipur C-Scheme &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
}
