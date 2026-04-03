"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", course: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !modalRef.current) { onClose(); return; }
    gsap.to(modalRef.current, { opacity: 0, y: 30, scale: 0.97, duration: 0.35, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, delay: 0.15, ease: "power2.in",
      onComplete: () => { document.body.style.overflow = ""; onClose(); }
    });
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !modalRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "expo.out", delay: 0.1 }
      );
    });

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handleEsc);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleClose]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setSubmitting(false);
    setTimeout(handleClose, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[8000] flex items-center justify-center p-4"
      style={{ background: "rgba(8,8,8,0.88)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1C1410 0%, #111111 60%, #1a0508 100%)",
          border: "1px solid rgba(227,24,55,0.2)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(227,24,55,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#E31837] via-[#FF6B35] to-[#E31837]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 z-10"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="p-7 pt-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#E31837]/15 border border-[#E31837]/30 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-display font-bold text-xl text-[#F0EBE1] mb-2">We&apos;ll be in touch!</h3>
              <p className="text-[#A8A29C] text-sm">Our team will call you within 24 hours.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#E31837]/10 border border-[#E31837]/20 text-[#E31837] text-[10px] font-bold tracking-[0.15em] uppercase mb-3">
                  Free Demo Class
                </span>
                <h2 className="font-display font-bold text-2xl text-[#F0EBE1] leading-tight mb-1">
                  Start Your Creative Journey
                </h2>
                <p className="text-[#A8A29C] text-sm">Book a free demo. No commitment required.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text" placeholder="Your Name *" required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#6B6560] focus:outline-none focus:border-[#E31837]/50 transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "16px" }}
                />
                <div className="flex">
                  <span className="flex items-center px-3 rounded-l-xl text-[#6B6560] text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRight: "none" }}>+91</span>
                  <input
                    type="tel" placeholder="Phone Number *" required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 px-4 py-3 rounded-r-xl text-sm text-white placeholder-[#6B6560] focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "16px" }}
                  />
                </div>
                <select
                  value={formData.course}
                  onChange={e => setFormData({...formData, course: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all appearance-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: formData.course ? "#F0EBE1" : "#6B6560", fontSize: "16px" }}
                >
                  <option value="">Interested In...</option>
                  <option value="animation">3D Animation</option>
                  <option value="vfx">Visual Effects (VFX)</option>
                  <option value="gaming">Game Design</option>
                  <option value="filmmaking">Digital Filmmaking</option>
                  <option value="digital-media">Digital Media & Design</option>
                </select>

                <button
                  type="submit" disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-display font-semibold text-white text-sm tracking-wide transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #E31837, #c4132d)" }}
                >
                  {submitting ? (
                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Booking...</>
                  ) : "Book Free Demo Class →"}
                </button>

                <p className="text-center text-[#6B6560] text-[11px]">
                  🔒 No spam. We respect your privacy.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
