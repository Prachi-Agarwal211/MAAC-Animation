"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { contactInfo } from "@/data/siteData";
import MagneticButton from "@/components/ui/MagneticButton";
import { submitContactForm } from "@/app/actions";
import { Send, Phone, MessageSquare, Mail, ShieldCheck } from "lucide-react";

export default function ApplyNow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", course: "", city: "", message: "",
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
    if (!formData.course) errs.course = "Please select a course";
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
      <section className="relative py-24 md:py-40 overflow-hidden bg-[#0C0C0C]">
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
    `w-full px-6 py-4 rounded-2xl bg-white/5 border ${errors[field] ? "border-red-500" : "border-white/10"} text-white placeholder-[#6B6560] focus:outline-none focus:border-[#E31837]/50 transition-all duration-300 text-base`;

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 overflow-hidden bg-[#0C0C0C]">
      <div className="atmosphere-blob blob-red top-0 left-0 opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div className="an-heading space-y-10">
            <div>
              <p className="text-[#E31837] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#E31837]" />
                Admissions Open
              </p>
              <h2 className="font-display font-bold text-[clamp(1.8rem,4.5vw,3rem)] text-[#F0EBE1] leading-[0.95] tracking-tight">
                Ignite Your <span className="gradient-text">Potential</span>
              </h2>
              <p className="text-[#A8A29C] text-lg md:text-2xl font-medium leading-relaxed mt-8 max-w-lg">
                Join India&apos;s most prestigious academy for digital arts. Your journey to a global creative career starts here.
              </p>
            </div>


            <div className="grid grid-cols-2 gap-4">
              {["NSDC Partner", "MESC Certified", "Skill India", "B.Voc Degree"].map((badge) => (
                <div key={badge} className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/5 text-white/60 text-xs font-bold uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-full bg-[#E31837]/10 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-[#E31837]" />
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
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#E31837]/10 border border-[#E31837]/20 text-[#E31837] text-xs font-bold uppercase tracking-widest hover:bg-[#E31837]/20 transition-all">
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
              className="glass rounded-[40px] p-8 md:p-12 space-y-6 border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E31837] to-[#FF6B35]" />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={`${inputClass("course")} appearance-none`}>
                    <option value="">Select Course *</option>
                    <option value="animation">3D Animation</option>
                    <option value="vfx">Visual Effects (VFX)</option>
                    <option value="gaming">Game Design</option>
                    <option value="filmmaking">Digital Filmmaking</option>
                    <option value="digital-media">Digital Media & Design</option>
                    <option value="architectural">Architectural Design</option>
                  </select>
                  <select value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`${inputClass("city")} appearance-none`}>
                    <option value="">Preferred Center</option>
                    <option value="jaipur-malviya">Jaipur — Malviya Nagar</option>
                    <option value="jaipur-vaishali">Jaipur — Vaishali Nagar</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <textarea placeholder="Tell us about your goals (Optional)" rows={3} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass("message")} resize-none`} />
              </div>

              <MagneticButton>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn btn-primary py-5 rounded-2xl text-base font-bold tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Secure Your Spot'}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </MagneticButton>
              
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
