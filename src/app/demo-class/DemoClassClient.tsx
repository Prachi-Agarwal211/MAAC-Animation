"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { contactInfo } from "@/data/siteData";
import { coursesData } from "@/data/courses";
import { submitContactForm } from "@/app/actions";
import { CheckCircle2, Calendar, Phone, MessageSquare, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import RevealHeading from "@/components/ui/RevealHeading";
import Footer from "@/components/Footer";

const benefits = [
  { icon: <CheckCircle2 size={24} />, title: "Hands-on Experience", desc: "Test-drive the actual software used in major Hollywood productions." },
  { icon: <CheckCircle2 size={24} />, title: "Studio Tour", desc: "Explore our state-of-the-art production labs and rendering farms." },
  { icon: <CheckCircle2 size={24} />, title: "Mentor Access", desc: "One-on-one session with instructors who've worked on real movies." },
  { icon: <CheckCircle2 size={24} />, title: "Portfolio Audit", desc: "Get professional feedback on your existing creative work." },
  { icon: <CheckCircle2 size={24} />, title: "Career Roadmap", desc: "Detailed breakdown of salary packages and placement trends." },
  { icon: <CheckCircle2 size={24} />, title: "Zero Cost", desc: "100% free session with no strings attached. Pure learning." },
];

export default function DemoClassClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".dc-hero-content > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out" });
    
    gsap.fromTo(".benefit-card", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".benefits-grid", start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("source", "demo_class_page");

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
    <main ref={containerRef} className="bg-[#080808] overflow-hidden pt-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="max-w-[1800px] mx-auto w-full dc-hero-content relative z-10">
          <span className="inline-block text-[#E31837] text-xs font-bold tracking-[0.4em] uppercase mb-8">Limited Seats · Batch 2026</span>
          <h1 className="font-display font-black text-[clamp(3rem,10vw,8rem)] text-white leading-[0.85] tracking-tighter mb-12">
            EXPERIENCE THE <br /> <span className="gradient-text">FUTURE OF ART</span>
          </h1>
          <p className="text-[#A8A29C] text-lg md:text-2xl font-medium leading-relaxed max-w-3xl italic border-l-2 border-[#E31837] pl-8">
            Step into our studios for a 100% free demo session. Meet the masters, touch the tech, and see why MAAC Jaipur is Rajasthan&apos;s highest-rated academy.
          </p>
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      <section className="relative py-24 md:py-40 bg-[#0C0C0C] px-6 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
             <div className="max-w-2xl">
                <span className="text-[#E31837] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The MAAC Advantage</span>
                <h2 className="text-white font-display font-black text-4xl md:text-7xl tracking-tighter uppercase">Why Attend?</h2>
             </div>
             <p className="text-[#6B6560] text-sm font-bold uppercase tracking-widest max-w-xs">A single session can redefine your entire career trajectory.</p>
          </div>

          <div className="benefits-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card p-10 rounded-[40px] glass border border-white/5 group hover:border-[#E31837]/30 transition-all duration-700">
                <div className="w-14 h-14 rounded-2xl bg-[#E31837]/10 flex items-center justify-center text-[#E31837] mb-8 group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <h3 className="text-white font-display font-bold text-xl md:text-2xl mb-4">{b.title}</h3>
                <p className="text-[#A8A29C] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING PORTAL ── */}
      <section className="relative py-24 md:py-40 px-6 lg:px-24">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-16 md:gap-32">
          
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-10 md:p-16 rounded-[48px] glass border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E31837] to-[#FF6B35]" />
              <h2 className="text-white font-display font-black text-3xl md:text-5xl tracking-tighter mb-12 uppercase">Reserve Your <span className="text-[#E31837]">Spot</span></h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input type="text" name="name" placeholder="FULL NAME" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase" />
                <input type="email" name="email" placeholder="EMAIL ADDRESS" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input type="tel" name="phone" placeholder="MOBILE NUMBER" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase" />
                <input type="text" name="message" placeholder="ADDITIONAL MESSAGE OR NOTE" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-8">
                <MagneticButton>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary px-12 py-6 rounded-2xl text-xs font-bold tracking-[0.4em] flex items-center gap-4">
                    {isSubmitting ? "PROCESSING..." : "CONFIRM BOOKING"} <ArrowRight size={18} />
                  </button>
                </MagneticButton>
                <p className="flex items-center gap-3 text-[#6B6560] text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-[#25D366]" /> 100% Free Session
                </p>
              </div>

              {submitSuccess && (
                <div className="mt-8 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-bold uppercase tracking-widest text-center animate-pulse">
                  Booking Confirmed. See you at the studio!
                </div>
              )}
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-10">
               {[
                { i: <Phone />, t: "Admissions Hub", v: contactInfo.phone, l: `tel:${contactInfo.phone}` },
                { i: <MessageSquare />, t: "Quick WhatsApp", v: "Chat with Experts", l: `https://wa.me/917300001589` },
                { i: <MapPin />, t: "Studio HQ", v: contactInfo.address },
                { i: <Clock />, t: "Working Hours", v: contactInfo.hours }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#E31837] group-hover:border-[#E31837]/30 transition-all duration-500">
                      {item.i}
                    </div>
                    <div>
                      <h4 className="text-[#6B6560] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{item.t}</h4>
                      {item.l ? (
                        <a href={item.l} className="text-white text-lg font-bold hover:text-[#E31837] transition-colors">{item.v}</a>
                      ) : (
                        <p className="text-white text-lg font-bold leading-relaxed">{item.v}</p>
                      )}
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#1c1c1c] to-[#080808] border border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[#E31837]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <h4 className="relative z-10 text-white font-display font-bold text-xl mb-4">Can&apos;t Visit?</h4>
               <p className="relative z-10 text-[#A8A29C] text-sm leading-relaxed mb-8">We offer online demo sessions for students outside Jaipur. Contact us to schedule a virtual tour.</p>
               <Link href="/demo-class" className="relative z-10 inline-flex items-center gap-3 text-[#E31837] text-[10px] font-bold tracking-widest uppercase">
                 Inquire Online <ArrowRight size={14} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
