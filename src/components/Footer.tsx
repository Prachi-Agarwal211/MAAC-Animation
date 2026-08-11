import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/data/siteData";
import { ArrowUpRight, MapPin, Phone, Mail, MessageSquare } from "lucide-react";

const currentYear = new Date().getFullYear();

const SocialIcons = {
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="relative bg-transparent pt-20 md:pt-32 overflow-hidden" style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}>
      {/* ── TOP BANNER ── */}
      <div className="relative z-10 max-w-content mx-auto px-5 md:px-12 mb-16 md:mb-24">
        <div className="relative rounded-3xl md:rounded-[40px] overflow-hidden bg-white/[0.04] border border-white/10 p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="font-display text-[clamp(1.4rem,4vw,2.5rem)] text-white leading-[1] mb-5 font-bold uppercase tracking-[0.05em]">
              Start Your <span className="metallic-gold-text font-bold">Creative Legacy</span>
            </h2>
            <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed">
              Book a free counseling session or demo class with our industry experts today.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center text-[11px] font-bold tracking-[0.2em] uppercase border border-white/20 hover:border-white hover:bg-white text-white hover:text-black rounded-full transition-all duration-500 px-8"
            >
              Book Free Demo
            </Link>
            <a
              href="https://wa.me/917300001589"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-white/20 text-white font-bold tracking-[0.15em] text-[11px] uppercase hover:bg-white/5 hover:border-[#BF953F]/40 transition-all duration-300"
            >
              <MessageSquare size={16} className="text-[#25D366]" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT — 2 columns on mobile, 4 on laptop ── */}
      <div className="relative z-10 max-w-content mx-auto px-5 md:px-12 pb-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex" aria-label="MAAC Jaipur - Home">
              <Image
                src="/maac%20logo.png"
                alt="MAAC Animation Jaipur Logo"
                width={200}
                height={200}
                className="object-contain w-24 h-auto sm:w-32"
                loading="lazy"
              />
            </Link>
            <p className="text-white/95 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of 3D artists and VFX masters with 30+ years of educational excellence.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SocialIcons.Facebook, url: contactInfo.social.facebook, label: "Facebook" },
                { Icon: SocialIcons.Instagram, url: contactInfo.social.instagram, label: "Instagram" },
                { Icon: SocialIcons.Youtube, url: contactInfo.social.youtube, label: "YouTube" },
                { Icon: SocialIcons.Linkedin, url: contactInfo.social.linkedin, label: "LinkedIn" },
              ]
                .filter((social) => Boolean(social.url))
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/85 hover:text-[#C4A882] hover:border-[#C4A882]/40 transition-all duration-300"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.Icon />
                  </a>
                ))}
            </div>
          </div>

          {/* Explore */}
          <div className="col-span-1 lg:col-span-2 space-y-5">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">Explore</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Courses", href: "/courses" },
                { label: "Student Work", href: "/student-work" },
                { label: "Events", href: "/events" },
                { label: "Gallery", href: "/gallery" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/90 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Policies */}
          <div className="col-span-1 lg:col-span-2 space-y-5">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/#faq" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-of-service" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/90 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locate Us */}
          <div className="col-span-2 lg:col-span-4 space-y-5">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">Locate Us</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#C4A882] shrink-0 mt-0.5" />
                <p className="text-white/85 text-xs leading-relaxed">{contactInfo.address}</p>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-[#C4A882] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href={`tel:${contactInfo.phone}`} className="block text-white text-xs font-bold">{contactInfo.phone}</a>
                  <a href={`tel:${contactInfo.phoneSecondary}`} className="block text-white/85 text-xs">{contactInfo.phoneSecondary}</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-[#C4A882] shrink-0 mt-0.5" />
                <a href={`mailto:${contactInfo.email}`} className="text-white/85 text-xs break-all">{contactInfo.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 border-t border-white/5 pt-6 pb-28 lg:pb-6 px-5 md:px-12">
        <div className="max-w-content mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/85 text-[10px] font-medium tracking-wide text-center md:text-left">
            &copy; {currentYear} MAAC Jaipur C-Scheme. All rights reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            <Link href="/privacy-policy" className="text-white/85 hover:text-white text-[10px] font-medium tracking-wide transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-white/85 hover:text-white text-[10px] font-medium tracking-wide transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-white/85 hover:text-white text-[10px] font-medium tracking-wide transition-colors">Sitemap</Link>
            <a href="https://www.maac.in" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-[10px] font-medium tracking-wide transition-colors inline-flex items-center gap-1">
              MAAC India
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
            <a href="https://nsdcindia.org" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-[10px] font-medium tracking-wide transition-colors inline-flex items-center gap-1">
              NSDC Certified
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
            <a href="https://mesc.gov.in" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-[10px] font-medium tracking-wide transition-colors inline-flex items-center gap-1">
              MESC
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>
          <p className="text-white/85 text-[10px] font-medium tracking-wide inline-flex items-center gap-1.5">
            <span>Designed &amp; Engineered by</span>
            <a href="https://reverbex.in" target="_blank" rel="noopener noreferrer" className="text-[#C4A882] hover:text-white font-semibold transition-colors inline-flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/reverbex-logo.png" alt="Reverbex Technology" className="w-4 h-4 rounded object-contain" />
              <span>Reverbex Technology</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
