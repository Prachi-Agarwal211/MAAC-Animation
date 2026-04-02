"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { navLinks, contactInfo } from "@/data/siteData";
import { useUIStore } from "@/lib/store";

export default function Navbar() {
  const { 
    mobileMenuOpen, 
    megaMenuOpen, 
    toggleMobileMenu, 
    setMegaMenu,
    closeAllMenus 
  } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection — threshold at 85% viewport height
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.85;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileMenuOpen) {
      const links = mobileMenuRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(
        links,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "expo.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Always restore on unmount
    };
  }, [mobileMenuOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllMenus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeAllMenus]);

  const whatsappNumber = contactInfo.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20MAAC%20Jaipur`;

  // Nav link color: white when at top (transparent bg), muted when scrolled (dark bg)
  const linkColor = isScrolled
    ? "text-[#A8A29C] hover:text-white"
    : "text-white hover:text-white";

  const megaMenuData = [
    { name: "Animation", desc: "3D Animation & VFX", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 2v20M17 2v20M2 12h20" /></svg>) },
    { name: "Digital Content", desc: "Content Creation & Filmmaking", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18v-6M9 15l3-3 3 3" /></svg>) },
    { name: "Gaming", desc: "Game Design & Development", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="2" y="6" width="20" height="12" rx="3" /><path d="M6 12h4M8 10v4M15 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM18 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg>) },
    { name: "VFX", desc: "Visual Effects & Compositing", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" /></svg>) },
    { name: "Motion Graphics", desc: "Broadcast Design & UI/UX", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 3" /></svg>) },
    { name: "Skill Enhancement", desc: "Short-term Professional Courses", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><circle cx="12" cy="8" r="5" /><path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" /></svg>) },
  ];

  return (
    <>
      {/* ═══════ SINGLE HEADER ELEMENT ═══════ */}
      <header ref={navRef} className="fixed left-0 right-0 z-[1000]">
        {/* ── Main Nav Bar ── */}
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? "bg-[#0C0C0C]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#E31837] to-[#B8132C] flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor">
                    <path d="M6 6v36l8-4V18l10 14 10-14v20l8 4V6L24 30 6 6z" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-white font-display font-bold text-lg leading-none">MAAC</h1>
                  <p className="text-[#A8A29C] text-[9px] tracking-[0.12em] uppercase">Jaipur</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.children && setMegaMenu(link.label)}
                    onMouseLeave={() => setMegaMenu(null)}
                  >
                    <Link
                      href={link.href}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative group ${linkColor}`}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E31837] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    {link.children && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-[#0C0C0C]/98 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-200 ${
                          megaMenuOpen === link.label
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 translate-y-2 invisible"
                        }`}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {megaMenuData.map((item) => (
                            <Link
                              key={item.name}
                              href="/#courses"
                              className="group/card p-4 rounded-xl hover:bg-white/5 transition-all duration-200"
                            >
                              <div className="text-[#E31837] mb-3 group-hover/card:scale-110 transition-transform duration-200">{item.icon}</div>
                              <h3 className="text-white font-display font-bold text-sm mb-1">{item.name}</h3>
                              <p className="text-[#6B6560] text-xs leading-relaxed">{item.desc}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-4">
                <a href={`tel:${contactInfo.phone}`} className={`text-sm font-medium transition-colors ${linkColor}`}>
                  {contactInfo.phone}
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-105 transition-transform" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382C17.119 14.205 15.397 13.351 15.073 13.234C14.749 13.117 14.514 13.058 14.279 13.409C14.044 13.76 13.367 14.555 13.161 14.789C12.956 15.023 12.751 15.052 12.398 14.876C12.045 14.7 10.917 14.328 9.57399 13.131C8.51599 12.188 7.80599 11.028 7.60099 10.677C7.39599 10.326 7.58699 10.138 7.76499 9.961C7.92299 9.803 8.11999 9.549 8.29799 9.343C8.47599 9.137 8.53499 8.989 8.65299 8.754C8.77099 8.519 8.71199 8.314 8.62299 8.137C8.53399 7.96 7.82199 6.216 7.52799 5.514C7.23999 4.834 6.94499 4.929 6.72199 4.929C6.52499 4.929 6.28999 4.928 6.05499 4.928C5.81999 4.928 5.43799 5.016 5.11399 5.369C4.78999 5.722 3.84699 6.607 3.84699 8.439C3.84699 10.271 5.17299 12.044 5.37799 12.307C5.58299 12.57 7.94499 16.345 11.659 17.843C14.836 19.123 15.219 18.987 15.661 18.945C16.522 18.863 18.344 17.917 18.726 16.845C19.108 15.773 19.108 14.885 18.99 14.679C18.872 14.473 18.637 14.414 18.284 14.238H17.472V14.382Z" /></svg>
                </a>
                <Link href="/contact" className="btn btn-primary h-10 px-6">Apply Now</Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={toggleMobileMenu} className="lg:hidden relative w-11 h-11 flex items-center justify-center" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen}>
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu ── */}
      <div ref={mobileMenuRef} className={`fixed inset-0 z-[5000] lg:hidden bg-[#0C0C0C]/98 backdrop-blur-xl transition-all duration-500 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link href={link.href} onClick={toggleMobileMenu} className="mobile-link block py-4 text-2xl font-display font-bold text-white hover:text-[#E31837] transition-colors">{link.label}</Link>
                {link.children && (
                  <div className="mobile-link ml-4 space-y-2 mt-2">
                    {link.children.map((child) => (
                      <Link key={child.label} href={child.href} onClick={toggleMobileMenu} className="block py-2 text-base text-[#A8A29C] hover:text-white transition-colors">{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mobile-link space-y-4 pt-6 border-t border-white/10">
            <a href={`tel:${contactInfo.phone}`} className="flex items-center justify-center gap-2 w-full py-4 bg-[#E31837] text-white rounded-xl font-bold">Call Now</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold">WhatsApp</a>
            <Link href="/contact" onClick={toggleMobileMenu} className="mobile-link block text-center py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors">Book Free Demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
