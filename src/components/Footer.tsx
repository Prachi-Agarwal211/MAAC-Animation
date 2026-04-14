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
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
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
    <footer ref={footerRef} className="relative bg-[#080808] pt-24 md:pt-40 overflow-hidden">
      <div className="atmosphere-blob blob-red -bottom-20 -right-20 opacity-10" />

      {/* ── TOP BANNER ── */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-24">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c] border border-white/5 p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 group">
          <div className="absolute inset-0 bg-[#E31837]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="font-display font-bold text-[clamp(1.8rem,4.5vw,3rem)] text-white leading-[0.9] tracking-tighter mb-8">
              Start Your <span className="gradient-text">Creative Legacy</span>
            </h2>
            <p className="text-[#A8A29C] text-lg md:text-xl font-medium leading-relaxed">
              Book a free counseling session or demo class with our industry experts today.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-6">
            <MagneticButton>
              <Link href="/demo-class" className="btn btn-primary px-10 py-5 rounded-2xl text-base font-bold tracking-widest shadow-2xl">
                Book Free Demo
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="https://wa.me/917300001589" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-10 py-5 rounded-2xl glass border border-white/10 text-white font-bold tracking-widest text-sm hover:bg-white/5 transition-all">
                WhatsApp Us
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 pb-20">

        {/* Brand Col */}
        <div className="footer-reveal lg:col-span-4 space-y-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:border-[#E31837]/50">
              <Image src="/image.png" alt="MAAC" width={48} height={48} className="rounded" />
            </div>
            <div>
              <span className="block text-white font-display font-black text-2xl tracking-tighter">MAAC</span>
              <span className="block text-[#E31837] text-xs font-bold tracking-[0.3em] uppercase">JAIPUR</span>
            </div>
          </Link>
          <p className="text-[#A8A29C] text-lg leading-relaxed max-w-sm">
            Empowering the next generation of 3D artists and VFX masters with 30+ years of educational excellence.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: SocialIcons.Facebook, url: contactInfo.social.facebook },
              { Icon: SocialIcons.Instagram, url: contactInfo.social.instagram },
              { Icon: SocialIcons.Youtube, url: contactInfo.social.youtube },
              { Icon: SocialIcons.Linkedin, url: contactInfo.social.linkedin }
            ].map((social, i) => (
              <a key={i} href={social.url} className="w-12 h-12 rounded-full glass border border-white/5 flex items-center justify-center text-white/40 hover:text-[#E31837] hover:border-[#E31837]/30 transition-all duration-500">
                <social.Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="footer-reveal lg:col-span-2 space-y-8">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Explore</h4>
          <ul className="space-y-4">
            {["Home", "About Us", "Courses", "Placements", "Gallery"].map(link => (
              <li key={link}>
                <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-[#6B6560] hover:text-white transition-colors flex items-center justify-between group">
                  {link}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="footer-reveal lg:col-span-3 space-y-8">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Specializations</h4>
          <ul className="space-y-4">
            {["3D Animation", "Visual Effects", "Game Design", "Filmmaking", "Digital Media"].map(link => (
              <li key={link}>
                <Link href="/courses" className="text-[#6B6560] hover:text-white transition-colors flex items-center justify-between group">
                  {link}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Col */}
        <div className="footer-reveal lg:col-span-3 space-y-8">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Locate Us</h4>
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin size={20} className="text-[#E31837] shrink-0" />
              <p className="text-[#A8A29C] text-sm leading-relaxed">{contactInfo.address}</p>
            </div>
            <div className="flex gap-4">
              <Phone size={20} className="text-[#E31837] shrink-0" />
              <div className="space-y-1">
                <a href={`tel:${contactInfo.phone}`} className="block text-white font-bold">{contactInfo.phone}</a>
                <a href={`tel:${contactInfo.phoneSecondary}`} className="block text-[#6B6560] text-sm">{contactInfo.phoneSecondary}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail size={20} className="text-[#E31837] shrink-0" />
              <a href={`mailto:${contactInfo.email}`} className="text-white font-bold break-all">{contactInfo.email}</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/5 py-10 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[#6B6560] text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} MAAC India · Crafting Digital Futures
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Sitemap"].map(link => (
              <a key={link} href="#" className="text-[#6B6560] hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
