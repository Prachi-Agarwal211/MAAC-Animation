"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Footer from "@/components/Footer";

export default function ContactClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", phone: "", email: "", course: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        console.error("Form submission failed:", data.error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={pageRef} className="overflow-hidden">

      {/* Hero */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] to-[#0a0a0a]" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#E31837]/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 contact-hero">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
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
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E31837]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="contact-info space-y-6">
              <div className="glass-card rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E31837]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h3 className="text-[#f5f0e8] font-display font-semibold mb-1">
                    Address
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">
                    MAAC Jaipur (Maya Academy of Advanced Cinematics)
                    <br />
                    711-712, Ambition Tower, 7th Floor
                    <br />
                    D-46B, Malan Ka Chauraha, Agrasain Circle
                    <br />
                    Subhash Marg, Jaipur, Rajasthan 302001
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E31837]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <h3 className="text-[#f5f0e8] font-display font-semibold mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+917300001589"
                    className="text-[#6b6b6b] text-sm hover:text-[#E31837] transition-colors"
                  >
                    +91-7300001589
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E31837]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h3 className="text-[#f5f0e8] font-display font-semibold mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:maacanimationjaipur@gmail.com"
                    className="text-[#6b6b6b] text-sm hover:text-[#E31837] transition-colors"
                  >
                    maacanimationjaipur@gmail.com
                  </a>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8442087935854!2d75.78418831488203!3d26.91389298309897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3bce9e2b4a3%3A0x5d2c1b9f8e5a4e3c!2sMAAC%20Animation%20Jaipur!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MAAC Animation Jaipur Location"
                  className="rounded-2xl"
                />
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary py-4 text-base font-display disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitSuccess && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                  Thank you! We&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
