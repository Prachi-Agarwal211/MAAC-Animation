"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { submitContactForm } from "@/app/actions";
import { getUtmParams } from "@/lib/utm";
import { trackLead, fireGoogleAdsConversion } from "@/lib/tracking";
import { GOOGLE_ADS_CONVERSIONS } from "@/lib/google-ads";
import { saveLead, trackSectionClick } from "@/lib/metrics-store";

export default function ApplyNowForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const utmRef = useRef<ReturnType<typeof getUtmParams>>({});
  const loadTimeRef = useRef<number>(Date.now());

  // Capture UTM params on mount
  useEffect(() => {
    utmRef.current = getUtmParams();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) errs.phone = "Valid 10-digit phone required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Valid email required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.set(k, v));
      data.set("_hp", "");
      data.set("_ts", String(loadTimeRef.current));
      const utm = utmRef.current;
      if (utm.utm_source) data.set("utm_source", utm.utm_source);
      if (utm.utm_medium) data.set("utm_medium", utm.utm_medium);
      if (utm.utm_campaign) data.set("utm_campaign", utm.utm_campaign);
      if (utm.utm_content) data.set("utm_content", utm.utm_content);
      if (utm.fbclid) data.set("fbclid", utm.fbclid);
      const result = await submitContactForm(data);
      if (result.success) {
        setSubmitted(true);
        try {
          saveLead({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            product: "Apply Now Form Submission",
            message: formData.message,
            sourcePage: window.location.pathname || "/"
          });
          trackSectionClick("sec-2", "Apply Now Section");
        } catch {}
        // Fire Lead event to Meta + Google Ads (unified)
        trackLead({
          content_name: "Apply Now Form",
          content_category: "Enquiry",
          value: 1,
          currency: "INR",
        });
        fireGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS.leadForm);
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="glass rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-8">
          <Send size={32} className="text-[#25D366]" />
        </div>
        <h2 className="font-display text-3xl text-white mb-6 font-bold uppercase leading-[1.1] tracking-[0.1em]">Success!</h2>
        <p className="text-white/85 text-lg leading-relaxed">Our admissions team will contact you within 24 hours to guide you through the process.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = (field: string) =>
    `w-full px-6 py-4 rounded-2xl bg-white/[0.03] border ${errors[field] ? "border-[#C4A882]" : "border-white/5"} text-white placeholder-[#888] focus:outline-none focus:border-[#C4A882]/30 transition-all duration-300 focus:ring-1 focus:ring-[#C4A882]/20`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="glass rounded-[2.5rem] p-8 md:p-12 space-y-6 border border-white/5 relative overflow-hidden shadow-2xl"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#BF953F]/40 shadow-[0_0_10px_rgba(191,149,63,0.2)]" />
      <h3 className="font-display text-xl text-white mb-4 font-bold uppercase leading-[1.1] tracking-[0.1em]">Express Interest</h3>

      <div className="space-y-4">
        {/* Honeypot + timestamp for bot protection */}
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0" style={{ position: 'absolute', left: '-9999px' }} />
        <input type="hidden" name="_ts" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name *" required value={formData.name}
            onChange={handleChange}
            aria-label="Full Name"
            className={inputClass("name")} />
          <input type="email" name="email" placeholder="Email Address *" required value={formData.email}
            onChange={handleChange}
            aria-label="Email Address"
            className={inputClass("email")} />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone}
              onChange={handleChange}
              aria-label="Phone Number"
              className={inputClass("phone")} />
          </div>
        </div>

        <textarea name="message" placeholder="Additional Message or Note" rows={3} value={formData.message}
          onChange={handleChange}
          aria-label="Additional Message or Note"
          className={`${inputClass("message")} resize-none`} />
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full min-h-[56px] flex items-center justify-center gap-3 disabled:opacity-50 border border-white/20 hover:bg-white hover:text-black transition-colors duration-500 rounded-full text-white bg-transparent group"
        >
          <span className="text-[12px] font-bold tracking-[0.2em] group-hover:text-black">
            {isSubmitting ? 'Sending...' : 'Secure Your Spot'}
          </span>
          {!isSubmitting && <Send size={15} className="mt-[-2px] group-hover:text-black" />}
        </button>
      </div>
      
      {submitError && (
        <div role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {submitError}
        </div>
      )}

      <p className="text-white/85 text-[12px] text-center uppercase tracking-widest flex items-center justify-center gap-2">
        <ShieldCheck size={12} className="text-[#25D366]" />
        Strict Privacy Policy • No Spam Guaranteed
      </p>
    </form>
  );
}
