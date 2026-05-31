"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { submitContactForm } from "@/app/actions";
import { getUtmParams } from "@/lib/utm";
import { trackLead } from "@/lib/tracking";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const utmRef = useRef<ReturnType<typeof getUtmParams>>({});

  // Capture UTM params on mount
  useEffect(() => {
    utmRef.current = getUtmParams();
  }, []);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !modalRef.current) {
      onClose();
      return;
    }
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.97,
      duration: 0.35,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      delay: 0.15,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        onClose();
      },
    });
  }, [onClose]);

  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return;

    if (!isOpen) {
      // Ensure closed state instantly (no flicker on next open)
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, y: 60, scale: 0.95 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "expo.out",
          delay: 0.05,
        }
      );
    });

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleClose]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      errs.phone = "Valid 10-digit number required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Valid email required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});
    
    try {
      const data = new FormData();
      const utm = utmRef.current;

      data.set("name", formData.name);
      data.set("phone", formData.phone);
      data.set("email", formData.email);
      data.set("message", formData.message);
      if (utm.utm_source) data.set("utm_source", utm.utm_source);
      if (utm.utm_medium) data.set("utm_medium", utm.utm_medium);
      if (utm.utm_campaign) data.set("utm_campaign", utm.utm_campaign);
      if (utm.utm_content) data.set("utm_content", utm.utm_content);
      if (utm.fbclid) data.set("fbclid", utm.fbclid);

      const result = await submitContactForm(data);

      if (result.success) {
        setSubmitted(true);
        // Fire Lead event to Meta + Google Ads (unified)
        trackLead({
          content_name: "Free Demo Class",
          content_category: "Enquiry",
          value: 1,
          currency: "INR",
        });
        setTimeout(handleClose, 3000);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  };

  // Always render (prevents mount/unmount flicker + late load). Visibility controlled via GSAP + styles.
  // Mobile detection via state to avoid hydration mismatch and render-time window access.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[8000] flex items-center justify-center p-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ 
        background: "rgba(8,8,8,0.88)", 
        backdropFilter: isMobile ? 'none' : 'blur(12px)',
        transform: 'translateZ(0)',
        willChange: isOpen ? 'opacity' : 'auto',
        opacity: isOpen ? 1 : 0
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && isOpen) handleClose();
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 60%, rgba(30,5,5,0.95) 100%)",
          backdropFilter: isMobile ? 'none' : 'blur(25px)',
          border: "1px solid rgba(227,24,55,0.15)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
          // Prevent flicker on open + GPU layer
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Top accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 z-10"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-7 pt-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 flex items-center justify-center mx-auto mb-4 text-[#FFD700]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[#F0EBE1] mb-2 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                Transmission Successful!
              </h3>
              <p className="text-[#A8A29C] text-sm">
                Our career advisor will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold tracking-[0.15em] uppercase mb-3">
                  Free Demo Class
                </span>
                <h2 className="font-display text-[#F0EBE1] text-xl mb-1 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                  Start Your Creative Journey
                </h2>
                <p className="text-[#A8A29C] text-sm">
                  Book a free demo. No commitment required.
                </p>
              </div>

              {errors.submit && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl text-sm text-white placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#E31837]/50 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${errors.name ? "#FFD700" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                      fontSize: "16px",
                    }}
                  />
                  {errors.name && (
                    <p className="text-[#FFD700] text-[10px] mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="flex">
                    <span
                      className="flex items-center px-3 rounded-l-xl text-[#6B6560] text-sm"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRight: "none",
                      }}
                    >
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="flex-1 px-5 py-4 rounded-r-xl text-sm text-white placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#E31837]/50 transition-all"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid ${errors.phone ? "#FFD700" : "rgba(255,255,255,0.1)"}`,
                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[#FFD700] text-[10px] mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl text-sm text-white placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#E31837]/50 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${errors.email ? "#FFD700" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                      fontSize: "16px",
                    }}
                  />
                  {errors.email && (
                    <p className="text-[#FFD700] text-[10px] mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    placeholder="Additional Message or Note"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl text-sm text-white placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#E31837]/50 transition-all min-h-[100px] resize-none"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                      fontSize: "16px",
                    }}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full min-h-[56px] flex items-center justify-center text-[12px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#E31837] to-[#FF6B35] text-white rounded-xl shadow-[0_4px_14px_0_rgba(227,24,55,0.39)] hover:shadow-[0_6px_20px_rgba(227,24,55,0.23)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? "Processing..." : "Book Free Demo"}
                  </button>
                </div>

                <p className="text-center text-[#6B6560] text-[11px]">
                  🔒 Your information is secure and private.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}



