"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { navLinks, contactInfo, type NavLinkItem } from "@/data/siteData";
import { useUIStore } from "@/lib/store";
import { MessageSquare, ChevronDown, X, Menu } from "lucide-react";

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
    if (typeof document !== "undefined" && document.documentElement.dataset.maacIntroDone === "1") {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled || mobileMenuOpen
            ? "bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/10"
            : isHome
              ? "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
              : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="MAAC Jaipur C-Scheme - Home">
              <Image
                src="/image.png"
                alt="MAAC Animation Jaipur Logo"
                width={48}
                height={48}
                className="rounded sm:w-14 sm:h-14 transition-transform duration-200 group-hover:scale-[1.02]"
                priority
              />
              <div className="hidden sm:flex flex-col leading-none min-w-0">
                <span className="font-syne font-bold text-white text-[15px] sm:text-[17px] tracking-wide truncate">
                  MAAC Jaipur
                </span>
                <span className="text-red-500 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-semibold">
                  C-Scheme
                </span>
              </div>
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-0.5">
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
                    className="flex items-center gap-1 px-2.5 py-2 text-[13px] text-white/85 hover:text-white transition-colors"
                  >
                    {link.label}
                    {hasSubmenu(link) && <ChevronDown size={13} className="opacity-45 shrink-0" aria-hidden />}
                  </Link>
                )}

                {link.megaGroups && link.megaGroups.length > 0 && (
                  <div
                    className="absolute right-0 top-full z-50 pt-1.5 opacity-0 invisible pointer-events-none translate-y-0.5 transition-[opacity,visibility,transform] duration-150 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 xl:left-0 xl:right-auto"
                    role="menu"
                  >
                    <div className="rounded-xl border border-white/10 bg-[#121212] shadow-2xl w-[min(100vw-1.5rem,52rem)] max-h-[min(78vh,32rem)] flex flex-col">
                      <p className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#E31837] font-semibold border-b border-white/5">
                        Courses at MAAC Jaipur (same programs as MAAC India)
                      </p>
                      <div className="overflow-y-auto p-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                          {link.megaGroups.map((group) => (
                            <div key={group.title}>
                              <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-semibold mb-2">
                                {group.title}
                              </p>
                              <ul className="space-y-0.5">
                                {group.links.map((child) => (
                                  <li key={child.label}>
                                    <Link
                                      href="/courses"
                                      className="block py-1.5 text-[12px] leading-snug text-white/75 hover:text-white hover:bg-white/5 rounded px-1 -mx-1 transition-colors"
                                      role="menuitem"
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-white/10 px-5 py-3 flex flex-wrap items-center justify-between gap-2 bg-black/20">
                        <Link
                          href="/contact"
                          className="text-[11px] font-semibold uppercase tracking-wider text-[#E31837] hover:text-red-400"
                        >
                          View e-brochure / enquire — Jaipur centre
                        </Link>
                        <Link href="/courses" className="text-[11px] uppercase tracking-wider text-white/50 hover:text-white">
                          All courses →
                        </Link>
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
              className="inline-flex items-center justify-center bg-[#E31837] hover:bg-[#c41431] text-white text-xs font-semibold px-5 py-2.5 rounded-md tracking-wide uppercase transition-colors"
            >
              Enquire Now
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-white p-2 -mr-2 rounded-md hover:bg-white/5 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

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
                        <p className="text-[10px] uppercase tracking-widest text-[#E31837] font-semibold mb-2 pl-3">
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
                      className="block ml-3 py-2 text-[13px] text-[#E31837] font-medium"
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

          <div className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
            <Link
              href="/contact"
              onClick={toggleMobileMenu}
              className="flex items-center justify-center bg-[#E31837] hover:bg-[#c41431] text-white py-3.5 text-sm font-semibold uppercase tracking-wide rounded-md transition-colors"
            >
              Enquire Now
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
