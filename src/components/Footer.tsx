"use client";

import { useState } from "react";
import Link from "next/link";

import { contactInfo } from "@/data/siteData";
import MagneticButton from "@/components/ui/MagneticButton";

const SocialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    facebook: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
    instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    youtube: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>,
    linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
    twitter: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  };
  return icons[type] || null;
};

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-[#F0EBE1] font-display font-semibold">{title}</span>
        <svg className={`w-4 h-4 text-[#6B6560] transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div className={`accordion-content ${open ? "open" : ""}`}>
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-white/5">
      {/* CTA Banner */}
      <div className="bg-[#E31837] py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">
            Ready to Start? Book a Free Demo Class Today
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link href="/contact" className="btn bg-white text-[#E31837] hover:bg-gray-100 text-sm">
                Book Free Demo
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="https://wa.me/917300001589" target="_blank" rel="noopener noreferrer" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 text-sm">
                WhatsApp Us
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                <svg width="18" height="22" viewBox="0 0 22 26" fill="none"><path d="M2 2L8 24H12L18 2M5 14H17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h3 className="text-[#F0EBE1] font-display font-bold text-lg leading-none">MAAC</h3>
                <p className="text-[#6B6560] text-[10px] tracking-[0.15em] uppercase">Jaipur</p>
              </div>
            </div>
            <p className="text-[#A8A29C] text-sm leading-relaxed mb-6">
              MAAC is India&apos;s leading Animation, VFX, and Multimedia education brand with 30+ years of excellence.
            </p>
            <div className="flex items-center gap-3">
              {[
                { name: "facebook", url: contactInfo.social.facebook },
                { name: "instagram", url: contactInfo.social.instagram },
                { name: "youtube", url: contactInfo.social.youtube },
                { name: "linkedin", url: contactInfo.social.linkedin },
                { name: "twitter", url: contactInfo.social.twitter },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#A8A29C] hover:text-[#E31837] hover:border-[#E31837]/30 transition-all duration-300"
                  title={social.name}
                >
                  <SocialIcon type={social.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F0EBE1] font-display font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" }, { label: "About Us", href: "/about" },
                { label: "Courses", href: "/courses" }, { label: "Placements", href: "/placements" },
                { label: "Gallery", href: "/gallery" }, { label: "Contact Us", href: "/contact" },
                { label: "Malviya Nagar", href: "/locations/malviya-nagar" },
                { label: "Vaishali Nagar", href: "/locations/vaishali-nagar" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#A8A29C] text-sm hover:text-[#E31837] transition-colors duration-300 py-1 inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-[#F0EBE1] font-display font-semibold mb-6">Our Courses</h4>
            <ul className="space-y-3">
              {[
                { label: "3D Animation", href: "/courses/animation" },
                { label: "Visual Effects", href: "/courses/vfx" },
                { label: "Game Design", href: "/courses/gaming" },
                { label: "Digital Filmmaking", href: "/courses/filmmaking" },
                { label: "Digital Media", href: "/courses/digital-media" },
                { label: "Architectural Design", href: "/courses/architectural" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#A8A29C] text-sm hover:text-[#E31837] transition-colors duration-300 py-1 inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F0EBE1] font-display font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E31837]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <p className="text-[#A8A29C] text-sm leading-relaxed">711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg, Jaipur, 302001</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E31837]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div className="flex flex-col">
                  <a href={`tel:${contactInfo.phone}`} className="text-[#A8A29C] text-sm hover:text-[#E31837] transition-colors">{contactInfo.phone}</a>
                  {contactInfo.phoneSecondary && (
                    <a href={`tel:${contactInfo.phoneSecondary}`} className="text-[#6B6560] text-xs hover:text-[#E31837] transition-colors">{contactInfo.phoneSecondary}</a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E31837]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <a href={`mailto:${contactInfo.email}`} className="text-[#A8A29C] text-sm hover:text-[#E31837] transition-colors">{contactInfo.email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
              <svg width="18" height="22" viewBox="0 0 22 26" fill="none"><path d="M2 2L8 24H12L18 2M5 14H17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <h3 className="text-[#F0EBE1] font-display font-bold text-lg leading-none">MAAC</h3>
              <p className="text-[#6B6560] text-[10px] tracking-[0.15em] uppercase">Jaipur</p>
            </div>
          </div>

          <AccordionSection title="Quick Links">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Courses", href: "/courses" },
              { label: "Placements", href: "/placements" },
              { label: "Gallery", href: "/gallery" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="block py-2 text-[#A8A29C] text-sm">{link.label}</Link>
            ))}
          </AccordionSection>

          <AccordionSection title="Our Courses">
            {["3D Animation", "Visual Effects", "Game Design", "Digital Filmmaking", "Digital Media"].map((l) => (
              <Link key={l} href="/courses" className="block py-2 text-[#A8A29C] text-sm">{l}</Link>
            ))}
          </AccordionSection>

          <AccordionSection title="Contact Us">
            <div className="space-y-3">
              <p className="text-[#A8A29C] text-sm">{contactInfo.address}</p>
              <div className="flex flex-col">
                <a href={`tel:${contactInfo.phone}`} className="block text-[#E31837] text-sm">{contactInfo.phone}</a>
                {contactInfo.phoneSecondary && (
                  <a href={`tel:${contactInfo.phoneSecondary}`} className="block text-[#6B6560] text-xs">{contactInfo.phoneSecondary}</a>
                )}
              </div>
              <a href={`mailto:${contactInfo.email}`} className="block text-[#A8A29C] text-sm">{contactInfo.email}</a>
            </div>
          </AccordionSection>

          {/* Social — always visible */}
          <div className="flex items-center gap-3 pt-6">
            {[
              { name: "facebook", url: contactInfo.social.facebook },
              { name: "instagram", url: contactInfo.social.instagram },
              { name: "youtube", url: contactInfo.social.youtube },
              { name: "linkedin", url: contactInfo.social.linkedin },
              { name: "twitter", url: contactInfo.social.twitter },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#A8A29C] hover:text-[#E31837] transition-all duration-300"
              >
                <SocialIcon type={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6560] text-sm">
            Made with <span className="text-[#E31837]">❤</span> in India · Copyright &copy; {new Date().getFullYear()} MAAC India
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
              <a key={link} href="#" className="text-[#6B6560] text-sm hover:text-[#E31837] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
