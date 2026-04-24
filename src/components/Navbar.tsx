"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { navLinks, contactInfo, type NavLinkItem } from "@/data/siteData";
import { useUIStore } from "@/lib/store";
import { MessageSquare, ChevronDown, X, Menu, ArrowRight } from "lucide-react";
import ScrollIndicator from "./SideScroller";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [revealNav, setRevealNav] = useState(() => !isHome);

  useEffect(() => {
    if (!isHome) {
      setRevealNav(true);
      return;
    }
    if (typeof document !== "undefined" && (document.documentElement.dataset.maacIntroDone === "1" || localStorage.getItem('maac_intro_done') === '1')) {
      setRevealNav(true);
      return;
    }
    setRevealNav(false);
    const onReveal = () => setRevealNav(true);
    window.addEventListener("maac:intro_revealed", onReveal, { once: true });
    return () => window.removeEventListener("maac:intro_revealed", onReveal);
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;

  const desktopLinks = navLinks.filter((l) => !l.mobileOnly);

  const hasSubmenu = (link: NavLinkItem) =>
    Boolean((link.children && link.children.length > 0) || (link.megaGroups && link.megaGroups.length > 0));

  const renderNavLabel = (link: NavLinkItem) =>
    link.external ? (
      <span className="flex items-center gap-1">
        {link.label}
        <span className="sr-only">(opens in new tab)</span>
      </span>
    ) : (
      link.label
    );

  return (
    <div className={revealNav ? "contents" : "hidden"} aria-hidden={!revealNav}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_15px_50px_rgba(0,0,0,0.5)] py-1"
            : isHome
              ? "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-2"
              : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center h-16 sm:h-20">
          <div className="flex-shrink-0 mr-16">
            <Link href="/" className="flex items-center group" aria-label="MAAC Jaipur - Home">
              <Image
                src="/maac%20logo.png"
                alt="MAAC Animation Jaipur Logo"
                width={240}
                height={240}
                className={`transition-all duration-500 group-hover:scale-[1.02] object-contain ${scrolled ? 'w-24 h-24 sm:w-48 sm:h-48' : 'w-28 h-28 sm:w-56 sm:h-56'}`}
                priority
              />
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-0.5 flex-1">
            <li className="relative group">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              >
                Home
              </Link>
            </li>
            {desktopLinks.map((link) => (
              <li key={link.label} className="relative group">
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-2 text-[13px] text-white/85 hover:text-white transition-colors"
                  >
                    {renderNavLabel(link)}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    {link.label}
                    {hasSubmenu(link) && <ChevronDown size={12} className="opacity-40 shrink-0 transition-transform group-hover:rotate-180" aria-hidden />}
                  </Link>
                )}

                {link.megaGroups && link.megaGroups.length > 0 && (
                  <div
                    className="absolute right-0 top-full z-50 pt-1.5 opacity-0 invisible pointer-events-none translate-y-0.5 transition-[opacity,visibility,transform] duration-150 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 xl:left-0 xl:right-auto"
                    role="menu"
                  >
                    <div className="rounded-xl border border-white/10 bg-black shadow-2xl w-[min(100vw-1.5rem,24rem)] flex flex-col">
                      <div className="p-5">
                        <div className="space-y-1">
                          {link.megaGroups.map((group) => (
                            <div key={group.title} className="relative group/submenu">
                              <Link
                                href="/courses"
                                className="flex items-center justify-between py-2 text-[15px] leading-snug text-white/75 hover:text-white hover:bg-white/5 rounded px-2 -mx-2 transition-colors"
                                role="menuitem"
                              >
                                {group.title}
                                {group.links && group.links.length > 0 && (
                                  <ChevronDown size={12} className="opacity-45 shrink-0 rotate-[-90deg]" />
                                )}
                              </Link>
                              {group.links && group.links.length > 0 && (
                                <div className="absolute left-full top-0 ml-1 opacity-0 invisible pointer-events-none translate-x-[-4px] transition-[opacity,visibility,transform] duration-150 group-hover/submenu:opacity-100 group-hover/submenu:visible group-hover/submenu:pointer-events-auto group-hover/submenu:translate-x-0 z-50">
                                  <div className="rounded-lg border border-white/10 bg-black py-2 min-w-[240px] shadow-xl">
                                    {group.links.map((child) => (
                                      <Link
                                        key={child.label}
                                        href={child.href}
                                        className="block px-4 py-2 text-[15px] text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                                        role="menuitem"
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {link.children && link.children.length > 0 && !link.megaGroups && (
                  <div
                    className="absolute left-0 top-full z-50 pt-1.5 opacity-0 invisible pointer-events-none translate-y-0.5 transition-[opacity,visibility,transform] duration-150 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                    role="menu"
                  >
                    <div className="rounded-lg border border-white/10 bg-[#141414] py-2 min-w-[240px] shadow-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-[13px] text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block flex-shrink-0">
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 hover:border-white transition-all duration-500 ease-out"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">
                Enquire Now
              </span>
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white transition-all duration-500">
                <ArrowRight size={12} className="text-white group-hover:text-black transition-colors" />
              </div>
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-white p-2.5 -mr-2 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <ScrollIndicator />

      <div
        className={`fixed inset-0 z-40 bg-[#0C0C0C] flex flex-col transition-opacity duration-200 pt-14 sm:pt-16 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex-1 overflow-y-auto px-5 py-6 overscroll-contain">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3 px-0.5">MAAC Jaipur · C-Scheme</p>
          <ul className="border-t border-white/10">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-white/10">
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3.5 text-lg font-semibold text-white/90"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className="block py-3.5 text-lg font-semibold text-white/90"
                  >
                    {link.label}
                  </Link>
                )}
                {link.megaGroups && link.megaGroups.length > 0 && (
                  <div className="pb-4 space-y-5">
                    {link.megaGroups.map((group) => (
                      <div key={group.title}>
                        <p className="text-[10px] uppercase tracking-widest metallic-gold-text font-semibold mb-2 pl-3">
                          {group.title}
                        </p>
                        <ul className="pl-3 space-y-0">
                          {group.links.map((child) => (
                            <li key={child.label}>
                              <Link
                                href="/courses"
                                onClick={toggleMobileMenu}
                                className="block py-2 text-[13px] leading-snug text-white/55 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link
                      href="/contact"
                      onClick={toggleMobileMenu}
                      className="block ml-3 py-2 text-[13px] text-[#FFD700] font-medium"
                    >
                      View e-brochure / enquire — Jaipur
                    </Link>
                  </div>
                )}
                {link.children && link.children.length > 0 && !link.megaGroups && (
                  <ul className="pb-4 pl-3 space-y-0">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={toggleMobileMenu}
                          className="block py-2.5 text-[15px] text-white/55 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto w-full">
            <Link
              href="/contact"
              onClick={toggleMobileMenu}
              className="group flex w-full items-center justify-center gap-3 px-6 py-4 rounded-full border border-white/20 hover:border-white hover:bg-white transition-all duration-500 ease-out"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80 group-hover:text-black transition-colors">
                Enquire Now
              </span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/15 text-white py-3 text-sm font-medium rounded-md hover:bg-white/5 transition-colors"
            >
              <MessageSquare size={18} /> WhatsApp us
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
