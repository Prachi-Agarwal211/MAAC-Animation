"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { contactInfo } from "@/data/siteData";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

const SocialIcons = {
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Youtube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2C5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
};

// ── Footer link map with correct routes ──
const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Placements", href: "/placements" },
  { label: "Gallery", href: "/gallery" },
];

const specializationLinks = [
  { label: "3D Animation", href: "/courses" },
  { label: "Visual Effects", href: "/courses" },
  { label: "Game Design", href: "/courses" },
  { label: "Filmmaking", href: "/courses" },
  { label: "Digital Media", href: "/courses" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      }
    });
    tl.fromTo(".footer-reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-[#0C0C0C] border-t border-white/10 text-white">

      {/* ── TOP BANNER ── */}
      <div className="border-b border-white/10 px-6 md:px-12 py-12 md:py-16 footer-reveal">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-red-500 uppercase mb-2">Admissions Open 2026</p>
            <h2 className="text-3xl md:text-4xl font-bold font-syne">
              Start Your <br />
              <span className="text-red-500">Creative Legacy</span>
            </h2>
            <p className="text-white/60 mt-3 max-w-md text-sm">
              Book a free counseling session or demo class with our industry experts today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/demo-class"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-colors"
            >
              Book Free Demo <ArrowUpRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/60 text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Col */}
          <div className="footer-reveal lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/image.png" alt="MAAC Jaipur C-Scheme" width={60} height={60} className="rounded" />
            </Link>
            <p className="font-syne font-bold text-lg leading-tight mb-1">MAAC Jaipur</p>
            <p className="text-red-500 text-xs tracking-widest uppercase mb-4">C-Scheme</p>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Empowering the next generation of 3D artists and VFX masters with 30+ years of educational excellence.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SocialIcons.Facebook, url: contactInfo.social.facebook, label: "Facebook" },
                { Icon: SocialIcons.Instagram, url: contactInfo.social.instagram, label: "Instagram" },
                { Icon: SocialIcons.Youtube, url: contactInfo.social.youtube, label: "YouTube" },
                { Icon: SocialIcons.Linkedin, url: contactInfo.social.linkedin, label: "LinkedIn" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 border border-white/20 hover:border-red-500 hover:text-red-500 flex items-center justify-center transition-colors"
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div className="footer-reveal">
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/demo-class" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Demo Class
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div className="footer-reveal">
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5">Specializations</h4>
            <ul className="space-y-3">
              {specializationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-reveal">
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5">Locate Us</h4>
            <address className="not-italic space-y-4 text-sm">
              <div className="flex gap-3 text-white/60">
                <MapPin size={16} className="shrink-0 mt-0.5 text-red-500" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="shrink-0 text-red-500" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${contactInfo.phone}`} className="text-white/70 hover:text-white transition-colors">{contactInfo.phone}</a>
                  <a href={`tel:${contactInfo.phoneSecondary}`} className="text-white/70 hover:text-white transition-colors">{contactInfo.phoneSecondary}</a>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={16} className="shrink-0 text-red-500" />
                <a href={`mailto:${contactInfo.email}`} className="text-white/70 hover:text-white transition-colors break-all">{contactInfo.email}</a>
              </div>
            </address>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10 px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} MAAC India &middot; Crafting Digital Futures</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
