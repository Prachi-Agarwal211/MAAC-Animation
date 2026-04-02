"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-dark border-t border-white/5">
      {/* CTA Banner */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
        <div className="absolute inset-0 bg-dark/80" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#f5f0e8] mb-4">
            Think <span className="gradient-text">MAAC</span>. Think{" "}
            <span className="gradient-text">Creative Career</span>.
          </h2>
          <p className="text-[#6b6b6b] text-lg mb-8">
            Join thousands of successful alumni who transformed their creative
            passion into rewarding careers.
          </p>
          <Link href="/contact" className="btn-primary text-base px-12 py-4">
            Start Your Journey
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-[#f5f0e8] font-extrabold text-lg font-display">
                  M
                </span>
              </div>
              <div>
                <h3 className="text-[#f5f0e8] font-display font-bold text-lg leading-none">
                  MAAC
                </h3>
                <p className="text-[#6b6b6b] text-[10px] tracking-[0.2em] uppercase">
                  India
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              MAAC is the high-end 3D Animation & VFX education brand of
              Aptech. Through its wide network of centres, MAAC has prepared
              thousands of students for careers in Animation, VFX, Filmmaking,
              Gaming, Web and Graphics Design.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {["Facebook", "Instagram", "YouTube", "LinkedIn", "Twitter"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-300"
                    title={social}
                  >
                    <span className="text-xs font-bold">
                      {social.charAt(0)}
                    </span>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#f5f0e8] font-display font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Courses", href: "/courses" },
                { label: "Placements", href: "/placements" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-[#f5f0e8] font-display font-semibold mb-6">
              Our Courses
            </h4>
            <ul className="space-y-3">
              {[
                { label: "3D Animation", href: "/courses/animation" },
                { label: "Visual Effects", href: "/courses/vfx" },
                { label: "Game Design", href: "/courses/gaming" },
                { label: "Digital Filmmaking", href: "/courses/filmmaking" },
                { label: "Digital Media", href: "/courses/digital-media" },
                {
                  label: "Architectural Design",
                  href: "/courses/architectural",
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#f5f0e8] font-display font-semibold mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">📍</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Aptech House, A-65, MIDC, Marol, Andheri (E), Mumbai,
                  Maharashtra 400093
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📞</span>
                </div>
                <a
                  href="tel:+912268282300"
                  className="text-gray-400 text-sm hover:text-primary transition-colors"
                >
                  +91-22-68282300
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">✉️</span>
                </div>
                <a
                  href="mailto:info@maacindia.com"
                  className="text-gray-400 text-sm hover:text-primary transition-colors"
                >
                  info@maacindia.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Copyright &copy; 2025 MAAC India. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 text-sm hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 text-sm hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
