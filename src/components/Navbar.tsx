"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { navLinks, contactInfo } from "@/data/siteData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showInfoBar, setShowInfoBar] = useState(true);
  
  const navRef = useRef<HTMLElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection for navbar state and info bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 100);
      
      // Info bar: hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setShowInfoBar(false);
      } else {
        setShowInfoBar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Logo entrance animation
  useEffect(() => {
    const logo = document.getElementById("navbar-logo");
    if (logo) {
      gsap.fromTo(
        logo,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "expo.out" }
      );
    }
  }, []);

  // Info bar animation
  useEffect(() => {
    if (infoBarRef.current) {
      gsap.to(infoBarRef.current, {
        y: showInfoBar ? 0 : -40,
        opacity: showInfoBar ? 1 : 0,
        duration: 0.4,
        ease: "expo.out",
      });
    }
  }, [showInfoBar]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileOpen) {
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
    }
  }, [mobileOpen]);

  // Close mobile menu on popstate (back/forward button)
  useEffect(() => {
    const handlePopState = () => setMobileOpen(false);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaMenuOpen(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const whatsappNumber = contactInfo.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20MAAC%20Jaipur`;

  const megaMenuData = [
    { 
      name: "Animation", 
      desc: "3D Animation & VFX",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <rect x="2" y="2" width="20" height="20" rx="3" />
          <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5" />
        </svg>
      )
    },
    { 
      name: "Digital Content", 
      desc: "Content Creation & Filmmaking",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18v-6M9 15l3-3 3 3" />
        </svg>
      )
    },
    { 
      name: "Gaming", 
      desc: "Game Design & Development",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <path d="M6 12h4M8 10v4M15 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM18 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      )
    },
    { 
      name: "VFX", 
      desc: "Visual Effects & Compositing",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
        </svg>
      )
    },
    { 
      name: "Motion Graphics", 
      desc: "Broadcast Design & UI/UX",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9z" />
          <path d="M12 8v4l3 3" />
        </svg>
      )
    },
    { 
      name: "Skill Enhancement", 
      desc: "Short-term Professional Courses",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <circle cx="12" cy="8" r="5" />
          <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div
        ref={infoBarRef}
        className="fixed top-0 left-0 right-0 h-9 bg-[#E31837] z-[9999] flex items-center justify-center text-white text-sm font-medium tracking-wide"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between w-full">
          <span className="hidden sm:inline">
            📍 Jaipur
          </span>
          <a href={`tel:${contactInfo.phone}`} className="hover:underline">
            ☎ {contactInfo.phone}
          </a>
          <Link href="/contact" className="hover:underline">
            Free Demo Class → Book Now
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? "bg-[#0C0C0C]/92 backdrop-blur-xl border-b border-white/7 shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
        style={{ top: showInfoBar && isScrolled ? 0 : 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <div id="navbar-logo">
              <Link href="/" className="flex items-center gap-3 group">
                {/* SVG Logo Mark */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#E31837] to-[#B8132C] flex items-center justify-center shadow-lg group-hover:shadow-[#E31837]/30 transition-shadow duration-300">
                  <svg
                    viewBox="0 0 48 48"
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="currentColor"
                  >
                    <path d="M6 6v36l8-4V18l10 14 10-14v20l8 4V6L24 30 6 6z" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-white font-display font-bold text-lg leading-none">
                    MAAC
                  </h1>
                  <p className="text-[#A8A29C] text-[9px] tracking-[0.15em] uppercase">
                    Animation Institute
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setMegaMenuOpen(link.label)}
                  onMouseLeave={() => setMegaMenuOpen(null)}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-[#A8A29C] hover:text-white transition-colors duration-300 relative group"
                  >
                    {link.label}
                    {/* Active page indicator */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E31837] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  {/* Mega Menu */}
                  {link.children && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-[#0C0C0C]/98 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 transition-all duration-200 ${
                        megaMenuOpen === link.label
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 translate-y-2 invisible"
                      }`}
                    >
                      <div className="grid grid-cols-3 gap-4">
                        {megaMenuData.map((item) => (
                          <Link
                            key={item.name}
                            href="/courses"
                            className="group/card p-4 rounded-xl hover:bg-white/5 transition-all duration-200"
                          >
                            <div className="text-[#E31837] mb-3 group-hover/card:scale-110 transition-transform duration-200">
                              {item.icon}
                            </div>
                            <h3 className="text-white font-display font-bold text-sm mb-1">
                              {item.name}
                            </h3>
                            <p className="text-[#6B6560] text-xs leading-relaxed">
                              {item.desc}
                            </p>
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
              {/* Phone */}
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-sm font-medium text-[#A8A29C] hover:text-white transition-colors"
              >
                {contactInfo.phone}
              </a>
              
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-105 transition-transform"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382C17.119 14.205 15.397 13.351 15.073 13.234C14.749 13.117 14.514 13.058 14.279 13.409C14.044 13.76 13.367 14.555 13.161 14.789C12.956 15.023 12.751 15.052 12.398 14.876C12.045 14.7 10.917 14.328 9.57399 13.131C8.51599 12.188 7.80599 11.028 7.60099 10.677C7.39599 10.326 7.58699 10.138 7.76499 9.961C7.92299 9.803 8.11999 9.549 8.29799 9.343C8.47599 9.137 8.53499 8.989 8.65299 8.754C8.77099 8.519 8.71199 8.314 8.62299 8.137C8.53399 7.96 7.82199 6.216 7.52799 5.514C7.23999 4.834 6.94499 4.929 6.72199 4.929C6.52499 4.929 6.28999 4.928 6.05499 4.928C5.81999 4.928 5.43799 5.016 5.11399 5.369C4.78999 5.722 3.84699 6.607 3.84699 8.439C3.84699 10.271 5.17299 12.044 5.37799 12.307C5.58299 12.57 7.94499 16.345 11.659 17.843C14.836 19.123 15.219 18.987 15.661 18.945C16.522 18.863 18.344 17.917 18.726 16.845C19.108 15.773 19.108 14.885 18.99 14.679C18.872 14.473 18.637 14.414 18.284 14.238H17.472V14.382ZM12.045 20.929C12.045 20.929 12.044 20.929 12.043 20.929C12.043 20.929 12.042 20.929 12.041 20.929C12.041 20.929 12.04 20.929 12.039 20.929C11.952 20.929 11.865 20.928 11.778 20.926C9.84999 20.878 7.98899 20.251 6.31899 19.126C4.72599 18.052 3.40899 16.593 2.47299 14.885C1.56299 13.225 1.08999 11.366 1.08999 9.44999C1.09099 7.53399 1.56499 5.67499 2.47699 4.01499C3.41399 2.30699 4.73199 0.847992 6.32599 -0.226992C7.99699 -1.35299 9.85899 -1.98099 11.787 -2.02899C11.874 -2.03099 11.961 -2.03199 12.048 -2.03199C12.135 -2.03199 12.222 -2.03099 12.309 -2.02899C14.237 -1.98099 16.099 -1.35299 17.77 -0.226992C19.364 0.847992 20.682 2.30699 21.619 4.01499C22.531 5.67499 23.005 7.53399 23.006 9.44999C23.006 11.366 22.532 13.225 21.621 14.885C20.685 16.593 19.368 18.052 17.775 19.126C16.105 20.251 14.244 20.878 12.316 20.926C12.229 20.928 12.142 20.929 12.055 20.929H12.045V20.929Z" />
                </svg>
              </a>

              {/* Apply Now */}
              <Link
                href="/contact"
                className="btn-primary h-10 px-6"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-11 h-11 flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[5000] lg:hidden bg-[#0C0C0C]/98 backdrop-blur-xl transition-all duration-500 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="mobile-link block py-4 text-2xl font-display font-bold text-white hover:text-[#E31837] transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mobile-link ml-4 space-y-2 mt-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-base text-[#A8A29C] hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile CTAs */}
          <div className="mobile-link space-y-4 pt-6 border-t border-white/10">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#E31837] text-white rounded-xl font-bold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3511 21.4038C21.1449 21.5939 20.9003 21.7414 20.6319 21.8378C20.3634 21.9342 20.0767 21.9775 19.79 21.965C16.7428 21.6407 13.8319 20.5924 11.29 18.905C8.91239 17.3259 6.91999 15.3335 5.34099 12.956C3.65197 10.4116 2.60361 7.49859 2.27999 4.45C2.26876 4.16375 2.31269 3.8773 2.40903 3.60915C2.50536 3.34101 2.65204 3.09689 2.84075 2.8906C3.02946 2.68431 3.25656 2.52004 3.50904 2.40718C3.76151 2.29432 4.03432 2.23513 4.31 2.233H7.31C7.80433 2.23086 8.28251 2.40573 8.65621 2.72565C9.02992 3.04557 9.27424 3.48926 9.34 3.98C9.43716 4.72089 9.62368 5.44915 9.89599 6.146C10.0528 6.53901 10.0007 6.98599 9.75699 7.336L8.36999 8.723C9.74875 11.1374 11.7626 13.1512 14.177 14.53L15.564 13.143C15.9141 12.8993 16.3611 12.8472 16.754 13.004C17.4509 13.2763 18.1791 13.4628 18.92 13.56C19.4146 13.629 19.8613 13.8777 20.1809 14.2563C20.5005 14.6349 20.6729 15.1184 20.67 15.616V16.92Z" />
              </svg>
              Call Now
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382C17.119 14.205 15.397 13.351 15.073 13.234C14.749 13.117 14.514 13.058 14.279 13.409C14.044 13.76 13.367 14.555 13.161 14.789C12.956 15.023 12.751 15.052 12.398 14.876C12.045 14.7 10.917 14.328 9.57399 13.131C8.51599 12.188 7.80599 11.028 7.60099 10.677C7.39599 10.326 7.58699 10.138 7.76499 9.961C7.92299 9.803 8.11999 9.549 8.29799 9.343C8.47599 9.137 8.53499 8.989 8.65299 8.754C8.77099 8.519 8.71199 8.314 8.62299 8.137C8.53399 7.96 7.82199 6.216 7.52799 5.514C7.23999 4.834 6.94499 4.929 6.72199 4.929C6.52499 4.929 6.28999 4.928 6.05499 4.928C5.81999 4.928 5.43799 5.016 5.11399 5.369C4.78999 5.722 3.84699 6.607 3.84699 8.439C3.84699 10.271 5.17299 12.044 5.37799 12.307C5.58299 12.57 7.94499 16.345 11.659 17.843C14.836 19.123 15.219 18.987 15.661 18.945C16.522 18.863 18.344 17.917 18.726 16.845C19.108 15.773 19.108 14.885 18.99 14.679C18.872 14.473 18.637 14.414 18.284 14.238H17.472V14.382ZM12.045 20.929C12.045 20.929 12.044 20.929 12.043 20.929C12.043 20.929 12.042 20.929 12.041 20.929C12.041 20.929 12.04 20.929 12.039 20.929C11.952 20.929 11.865 20.928 11.778 20.926C9.84999 20.878 7.98899 20.251 6.31899 19.126C4.72599 18.052 3.40899 16.593 2.47299 14.885C1.56299 13.225 1.08999 11.366 1.08999 9.44999C1.09099 7.53399 1.56499 5.67499 2.47699 4.01499C3.41399 2.30699 4.73199 0.847992 6.32599 -0.226992C7.99699 -1.35299 9.85899 -1.98099 11.787 -2.02899C11.874 -2.03099 11.961 -2.03199 12.048 -2.03199C12.135 -2.03199 12.222 -2.03099 12.309 -2.02899C14.237 -1.98099 16.099 -1.35299 17.77 -0.226992C19.364 0.847992 20.682 2.30699 21.619 4.01499C22.531 5.67499 23.005 7.53399 23.006 9.44999C23.006 11.366 22.532 13.225 21.621 14.885C20.685 16.593 19.368 18.052 17.775 19.126C16.105 20.251 14.244 20.878 12.316 20.926C12.229 20.928 12.142 20.929 12.055 20.929H12.045V20.929Z" />
              </svg>
              WhatsApp
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mobile-link block text-center py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
