"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Send, ShieldCheck, Globe } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { submitContactForm } from "@/app/actions";

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitSuccess(true);
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
    <main ref={containerRef} className="bg-[#080808] overflow-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto contact-hero-content">
          <span className="inline-block text-[#E31837] text-xs font-bold tracking-[0.4em] uppercase mb-8">Connect with Elite</span>
          <h1 className="font-display font-black text-[clamp(3.5rem,10vw,8.5rem)] text-white leading-[0.85] tracking-tighter mb-12">
            START THE <br /> <span className="gradient-text">DIALOGUE</span>
          </h1>
          <p className="text-[#A8A29C] text-lg md:text-2xl font-medium leading-relaxed max-w-3xl italic border-l-2 border-[#E31837] pl-8">
            Have questions about our world-class curriculum? Our advisors are ready to guide your creative evolution.
          </p>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 contact-grid">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="contact-card p-10 rounded-[40px] glass border border-white/5 space-y-8 group hover:border-[#E31837]/30 transition-all duration-700">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#E31837]/10 flex items-center justify-center text-[#E31837]">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-white font-display font-bold text-xl uppercase tracking-widest">HQ Location</h3>
               </div>
               <p className="text-[#A8A29C] leading-relaxed">
                 711-712, Ambition Tower, 7th Floor, Agrasain Circle, Subhash Marg, Jaipur, 302001
               </p>
               <a href="https://maps.google.com" className="inline-flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest group/link">
                 Get Directions <Globe size={14} className="group-hover/link:rotate-12 transition-transform" />
               </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
               <div className="contact-card p-8 rounded-[32px] glass border border-white/5 space-y-4 hover:border-[#E31837]/30 transition-all">
                  <Phone size={20} className="text-[#E31837]" />
                  <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest">Phone</h4>
                  <a href="tel:+917300001589" className="block text-[#A8A29C] text-sm hover:text-white transition-colors">+91 73000 01589</a>
               </div>
               <div className="contact-card p-8 rounded-[32px] glass border border-white/5 space-y-4 hover:border-[#E31837]/30 transition-all">
                  <Mail size={20} className="text-[#E31837]" />
                  <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest">Email</h4>
                  <a href="mailto:contact@maacjaipur.com" className="block text-[#A8A29C] text-sm hover:text-white transition-colors break-all">contact@maacjaipur.com</a>
               </div>
            </div>

            <div className="contact-card rounded-[40px] overflow-hidden grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 border border-white/5 h-80">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8442087935854!2d75.78418831488203!3d26.91389298309897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b8d7e0b5e07%3A0x5d2c1b9f8e5a4e3c!2sMAAC%20Animation%2C%20711-712%20Ambition%20Tower%2C%20Subhash%20Marg%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1712000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location"
               />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="contact-card p-10 md:p-16 rounded-[48px] glass border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E31837] to-[#FF6B35]" />
              <h2 className="text-white font-display font-black text-3xl md:text-5xl tracking-tighter mb-12 uppercase">Express <span className="text-[#E31837]">Interest</span></h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="FULL NAME" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase placeholder:text-white/10" />
                  <input type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase placeholder:text-white/10" />
                </div>
                <input type="tel" placeholder="MOBILE NUMBER" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase placeholder:text-white/10" />
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white/40 focus:outline-none focus:border-[#E31837]/50 transition-all uppercase appearance-none">
                  <option value="">SELECT SPECIALIZATION</option>
                  <option value="vfx">Visual Effects</option>
                  <option value="animation">3D Animation</option>
                  <option value="game">Game Design</option>
                </select>
                <textarea placeholder="HOW CAN WE HELP?" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase placeholder:text-white/10 resize-none" />
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
                <MagneticButton>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary px-12 py-6 rounded-2xl text-xs font-bold tracking-[0.4em] flex items-center gap-4">
                    {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"} <Send size={18} />
                  </button>
                </MagneticButton>
                <p className="flex items-center gap-3 text-[#6B6560] text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-[#25D366]" /> Secure Data Transmission
                </p>
              </div>

              {submitSuccess && (
                <div className="mt-8 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-bold uppercase tracking-widest text-center animate-pulse">
                  Transmission Successful. Our team will contact you.
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
