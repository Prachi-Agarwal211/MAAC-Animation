"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { contactInfo } from "@/data/siteData";
import MagneticButton from "@/components/ui/MagneticButton";
import { submitContactForm } from "@/app/actions";
import { Send, Phone, MessageSquare, Mail, ShieldCheck } from "lucide-react";
import SmokyButton from "@/components/ui/SmokyButton";

export default function ApplyNow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".an-heading", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out" })
      .fromTo(".an-form-card", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out" }, "-=0.8");
  }, { scope: sectionRef });

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
      const result = await submitContactForm(data);
      if (result.success) setSubmitted(true);
      else setSubmitError(result.message);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="relative py-24 md:py-40 overflow-hidden bg-transparent">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-8">
            <Send size={32} className="text-[#25D366]" />
          </div>
          <h2 className="font-display font-bold text-4xl text-white mb-6">Success!</h2>
          <p className="text-[#A8A29C] text-xl leading-relaxed">Our admissions team will contact you within 24 hours to guide you through the process.</p>
        </div>
      </section>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-6 py-4 rounded-2xl bg-white/[0.03] border ${errors[field] ? "border-[#FFD700]" : "border-white/5"} text-white placeholder-[#555] focus:outline-none focus:border-[#FFD700]/30 transition-all duration-300 text-base focus:ring-1 focus:ring-[#FFD700]/20`;

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 overflow-hidden bg-transparent">
      <div className="atmosphere-blob blob-red top-0 left-0 opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div className="an-heading space-y-10">
            <div>
              <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] metallic-gold-accent" />
                Admissions Open
              </p>
              <h2 className="font-display font-black text-[clamp(2.2rem,5.5vw,3.5rem)] leading-[0.8] tracking-tighter text-white uppercase">
                IGNITE YOUR <span className="metallic-gold-text italic">POTENTIAL</span>
              </h2>
              <p className="text-[#A8A29C] text-lg md:text-2xl font-medium leading-relaxed mt-8 max-w-lg">
                Join India&apos;s most prestigious academy for digital arts. Your journey to a global creative career starts here.
              </p>
            </div>


            <div className="grid grid-cols-2 gap-4">
              {["NSDC Partner", "MESC Certified", "Skill India", "B.Voc Degree"].map((badge) => (
                <div key={badge} className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/5 text-[#F0EBE1] text-xs font-bold uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-[#FFD700]" />
                  </div>
                  {badge}
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
              <p className="text-[#6B6560] text-xs font-bold uppercase tracking-[0.2em]">Contact Us Directly</p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <a href={contactInfo.whatsapp ? `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}` : "#"} className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-bold uppercase tracking-widest hover:bg-[#25D366]/20 transition-all">
                    <MessageSquare size={16} /> WhatsApp
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 text-[#BF953F] text-xs font-bold uppercase tracking-widest hover:bg-[#BF953F]/20 transition-all">
                    <Phone size={16} /> Call Now
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="an-form-card">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-[2.5rem] p-8 md:p-12 space-y-6 border-white/5 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#BF953F] to-transparent" />
              <h3 className="font-display font-bold text-2xl text-white mb-4">Express Interest</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name *" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass("name")} />
                  <input type="email" placeholder="Email Address *" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass("email")} />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <input type="tel" placeholder="Phone Number *" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass("phone")} />
                  </div>
                </div>

                <textarea placeholder="Additional Message or Note" rows={3} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass("message")} resize-none`} />
              </div>

              <div className="pt-2">
                <SmokyButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full min-h-[56px] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span className="text-[12px] font-bold tracking-[0.2em]">
                    {isSubmitting ? 'Sending...' : 'Secure Your Spot'}
                  </span>
                  {!isSubmitting && <Send size={15} className="mt-[-2px]" />}
                </SmokyButton>
              </div>
              
              {submitError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {submitError}
                </div>
              )}

              <p className="text-[#6B6560] text-[10px] text-center uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck size={12} className="text-[#25D366]" />
                Strict Privacy Policy • No Spam Guaranteed
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
