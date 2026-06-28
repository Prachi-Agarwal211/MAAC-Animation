"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { MapPin, Phone, Mail, Send, ShieldCheck, Globe } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { submitContactForm } from "@/app/actions";
import { getUtmParams } from "@/lib/utm";
import { trackLead } from "@/lib/tracking";

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Store UTM params on mount
  const utmRef = useRef<ReturnType<typeof getUtmParams>>({});

  useEffect(() => {
    utmRef.current = getUtmParams();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".contact-hero-content > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out" });

    gsap.fromTo(".contact-card",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("source", "contact_page");

    const utm = utmRef.current;
    if (utm.utm_source) formData.set("utm_source", utm.utm_source);
    if (utm.utm_medium) formData.set("utm_medium", utm.utm_medium);
    if (utm.utm_campaign) formData.set("utm_campaign", utm.utm_campaign);
    if (utm.utm_content) formData.set("utm_content", utm.utm_content);
    if (utm.fbclid) formData.set("fbclid", utm.fbclid);

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitSuccess(true);
        // Fire Lead event to Meta + Google Ads (unified)
        trackLead({
          content_name: "Contact Page Form",
          content_category: "Enquiry",
          value: 1,
          currency: "INR",
        });
        form.reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={containerRef} className="bg-transparent overflow-hidden">

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto contact-hero-content">
          <span className="inline-block text-[#FFD700] text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Connect with Elite</span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.9] mb-8 font-light uppercase leading-[1.1] tracking-[0.1em]">
            START THE <br /> <span className="gradient-text">DIALOGUE</span>
          </h1>
          <p className="text-[#A8A29C] text-base md:text-lg font-medium leading-relaxed max-w-2xl italic border-l-2 border-[#FFD700] pl-6">
            Have questions about our world-class curriculum? Our advisors are ready to guide your creative evolution.
          </p>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="relative py-12 md:py-20 px-6 md:px-12 lg:px-24 contact-grid">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-12 md:gap-16">

          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="contact-card p-8 rounded-3xl glass border border-white/5 space-y-6 group hover:border-[#FFD700]/30 transition-all duration-700">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-white font-display text-base tracking-wider font-light uppercase leading-[1.1] tracking-[0.1em]">HQ Location</h3>
               </div>
               <p className="text-[#A8A29C] leading-relaxed text-sm">
                 711-712, Ambition Tower, 7th Floor, Agrasain Circle, Subhash Marg, Jaipur, 302001
               </p>
               <a href="https://maps.google.com" className="inline-flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-wider group/link">
                 Get Directions <Globe size={12} className="group-hover/link:rotate-12 transition-transform" />
               </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
               <div className="contact-card p-6 rounded-2xl glass border border-white/5 space-y-3 hover:border-[#FFD700]/30 transition-all">
                  <Phone size={16} className="text-[#FFD700]" />
                  <h4 className="text-white font-display text-xs tracking-wider font-light uppercase leading-[1.1] tracking-[0.1em]">Phone</h4>
                  <a href="tel:+917300001589" className="block text-[#A8A29C] text-xs hover:text-white transition-colors">+91 73000 01589</a>
               </div>
               <div className="contact-card p-6 rounded-2xl glass border border-white/5 space-y-3 hover:border-[#FFD700]/30 transition-all">
                  <Mail size={16} className="text-[#FFD700]" />
                  <h4 className="text-white font-display text-xs tracking-wider font-light uppercase leading-[1.1] tracking-[0.1em]">Email</h4>
                  <a href="mailto:maacanimationjaipur@gmail.com" className="block text-[#A8A29C] text-xs hover:text-white transition-colors break-all">maacanimationjaipur@gmail.com</a>
               </div>
            </div>

            <div className="contact-card rounded-2xl overflow-hidden grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 border border-white/5 h-64">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8442087935854!2d75.78418831488203!3d26.91389298309897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b8d7e0b5e07%3A0x5d2c1b9f8e5a4e3c!2sMAAC%20Animation%2C%20711-712%20Ambition%20Tower%2C%20Subhash%20Marg%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1712000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location"
               />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="contact-card p-8 md:p-12 rounded-3xl glass border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] to-[#FF6B35]" />
              <h2 className="text-white font-display text-2xl md:text-3xl mb-8 font-light uppercase leading-[1.1] tracking-[0.1em]">Express <span className="text-[#FFD700]">Interest</span></h2>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input type="text" name="name" placeholder="FULL NAME" required aria-label="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-all uppercase placeholder:text-white/10" />
                   <input type="email" name="email" placeholder="EMAIL ADDRESS" required aria-label="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-all uppercase placeholder:text-white/10" />
                </div>
                <input type="tel" name="phone" placeholder="MOBILE NUMBER" required aria-label="Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-all uppercase placeholder:text-white/10" />
                 <textarea name="message" placeholder="ADDITIONAL MESSAGE OR NOTE" rows={4} aria-label="Additional Message or Note" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-all uppercase placeholder:text-white/10 resize-none" />
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <MagneticButton>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary px-10 py-4 rounded-xl text-[10px] font-bold tracking-widest flex items-center gap-3">
                    {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"} <Send size={14} />
                  </button>
                </MagneticButton>
                <p className="flex items-center gap-2 text-[#A8A29C] text-[10px] font-bold uppercase tracking-wider">
                   <ShieldCheck size={12} className="text-[#25D366]" /> Secure Data Transmission
                </p>
              </div>

              {submitSuccess && (
                <div role="status" aria-live="polite" className="mt-6 p-5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-[10px] font-bold uppercase tracking-wider text-center animate-pulse">
                  Transmission Successful. Our team will contact you.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
