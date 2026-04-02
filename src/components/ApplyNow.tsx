"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactInfo } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function ApplyNow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", course: "", city: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".an-heading", { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      if (formRef.current) {
        gsap.fromTo(formRef.current, { opacity: 0, x: 60 }, {
          opacity: 1, x: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) errs.phone = "Valid 10-digit phone required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Valid email required";
    if (!formData.course) errs.course = "Please select a course";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-section">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="font-display font-bold text-3xl text-[#F0EBE1] mb-4">Thank You!</h2>
          <p className="text-[#A8A29C] text-lg">We&apos;ve received your enquiry. Our team will contact you within 24 hours.</p>
        </div>
      </section>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-5 py-4 rounded-xl bg-white/5 border ${errors[field] ? "border-red-500" : "border-white/10"} text-white placeholder-[#6B6560] focus:outline-none focus:border-[#E31837]/50 focus:ring-1 focus:ring-[#E31837]/30 transition-all duration-300 text-base`;

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-gradient-section">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="an-heading order-2 lg:order-1">
            <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Get Started</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.05] tracking-tight mb-6">
              Apply <span className="gradient-text">Now</span>
            </h2>
            <p className="text-[#A8A29C] text-lg leading-relaxed mb-8">
              Take the first step towards your creative career. Fill in the form and our team will get in touch.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["NSDC Partner", "MESC Certified", "Skill India"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#A8A29C] text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {badge}
                </span>
              ))}
            </div>

            {/* Direct contact */}
            <p className="text-[#6B6560] text-sm mb-3">Or reach us directly:</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href={contactInfo.whatsapp ? `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}` : "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm hover:bg-[#25D366]/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                WhatsApp
              </a>
              <a href={`tel:${contactInfo.phone}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E31837]/10 border border-[#E31837]/20 text-[#E31837] text-sm hover:bg-[#E31837]/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call
              </a>
              <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#A8A29C] text-sm hover:bg-white/10 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
              </a>
            </div>

            <p className="text-[#A8A29C] text-sm">Free career counseling — No obligation</p>
            <p className="text-[#6B6560] text-xs mt-1">Join 500+ students who enrolled this year</p>
          </div>

          {/* Right — Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="order-1 lg:order-2 glass rounded-3xl p-6 md:p-8 space-y-4"
          >
            <h3 className="font-display font-bold text-xl text-[#F0EBE1] mb-2">Enquiry Form</h3>

            <div>
              <input type="text" placeholder="Your Name *" required value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass("name")} style={{ fontSize: "16px" }} />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <div className="flex">
                <span className="flex items-center px-4 rounded-l-xl bg-white/5 border border-r-0 border-white/10 text-[#6B6560] text-sm">+91</span>
                <input type="tel" placeholder="Phone Number *" required value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`${inputClass("phone")} rounded-l-none`} style={{ fontSize: "16px" }} />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <input type="email" placeholder="Email Address *" required value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass("email")} style={{ fontSize: "16px" }} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <select value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className={`${inputClass("course")} appearance-none`} style={{ fontSize: "16px" }}>
                <option value="">Select Course *</option>
                <option value="animation">3D Animation</option>
                <option value="vfx">Visual Effects (VFX)</option>
                <option value="gaming">Game Design</option>
                <option value="filmmaking">Digital Filmmaking</option>
                <option value="digital-media">Digital Media & Design</option>
                <option value="architectural">Architectural Design</option>
              </select>
              {errors.course && <p className="text-red-400 text-xs mt-1">{errors.course}</p>}
            </div>

            <div>
              <select value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`${inputClass("city")} appearance-none`} style={{ fontSize: "16px" }}>
                <option value="">Select City / Center</option>
                <option value="jaipur-malviya">Jaipur — Malviya Nagar</option>
                <option value="jaipur-vaishali">Jaipur — Vaishali Nagar</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <textarea placeholder="Your Message (Optional)" rows={3} value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass("message")} resize-none`} style={{ fontSize: "16px" }} />
            </div>

            <button type="submit" className="w-full btn btn-primary py-4 text-base font-display">
              Submit Enquiry
            </button>

            <p className="text-[#6B6560] text-xs text-center flex items-center justify-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Your data is 100% secure. No spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
