"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".contact-info",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", phone: "", email: "", course: "", message: "" });
  };

  return (
    <main ref={pageRef} className="overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 contact-hero">
          <p className="text-[#E31837] text-xs font-ui font-semibold tracking-[0.2em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e8] leading-[1.05] tracking-tight mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-[#6b6b6b] text-lg max-w-2xl">
            Have questions about our courses? Want to schedule a campus visit?
            Reach out to us and we&apos;ll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative py-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="contact-info space-y-6">
              <div className="glass-card rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-xl">
                  📍
                </div>
                <div>
                  <h3 className="text-[#f5f0e8] font-display font-semibold mb-1">
                    Address
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">
                    MAAC India (Maya Academy of Advanced Cinematics)
                    <br />
                    Aptech House, A-65, MIDC, Marol, Andheri (E)
                    <br />
                    Mumbai, Maharashtra 400093
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-xl">
                  📞
                </div>
                <div>
                  <h3 className="text-[#f5f0e8] font-display font-semibold mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+912268282300"
                    className="text-[#6b6b6b] text-sm hover:text-primary transition-colors"
                  >
                    +91-22-68282300
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-xl">
                  ✉️
                </div>
                <div>
                  <h3 className="text-[#f5f0e8] font-display font-semibold mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:info@maacindia.com"
                    className="text-[#6b6b6b] text-sm hover:text-primary transition-colors"
                  >
                    info@maacindia.com
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="image-placeholder h-64 rounded-2xl">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <span className="text-sm">Add Google Map Embed</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="contact-form glass rounded-3xl p-8 md:p-10 space-y-5"
            >
              <h3 className="font-display font-bold text-xl text-[#f5f0e8] mb-2">
                Send us a Message
              </h3>

              <input
                type="text"
                placeholder="Your Name *"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />

              <input
                type="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />

              <select
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              >
                <option value="">Select Course Interested In *</option>
                <option value="animation">3D Animation</option>
                <option value="vfx">Visual Effects (VFX)</option>
                <option value="gaming">Game Design</option>
                <option value="filmmaking">Digital Filmmaking</option>
                <option value="digital-media">Digital Media & Design</option>
                <option value="architectural">Architectural Design</option>
              </select>

              <textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
              />

              <button type="submit" className="w-full btn-primary py-4 text-base font-display">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
