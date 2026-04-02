"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ApplyNow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 60, rotateY: 5 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    alert("Thank you for your enquiry! We will contact you soon.");
    setFormData({ name: "", phone: "", email: "", course: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#080808]"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-accent/8 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div ref={headingRef}>
            <p className="text-[#E31837] text-xs font-ui font-semibold tracking-[0.2em] uppercase mb-4">
              Get Started
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#f5f0e8] leading-[1.05] tracking-tight mb-6">
              Apply <span className="gradient-text">Now</span>
            </h2>
            <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8">
              Take the first step towards your creative career. Fill in the form
              and our team will get in touch with you to discuss the best course
              for your goals.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Free career counseling session",
                "Course fee and scholarship information",
                "Campus tour and demo class",
                "Placement assistance details",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 md:p-10 space-y-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h3 className="font-display font-bold text-xl text-[#f5f0e8] mb-2">
              Enquiry Form
            </h3>

            <div>
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
              />
            </div>

            <div>
              <select
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
              >
                <option value="">Select Course *</option>
                <option value="animation">3D Animation</option>
                <option value="vfx">Visual Effects (VFX)</option>
                <option value="gaming">Game Design</option>
                <option value="filmmaking">Digital Filmmaking</option>
                <option value="digital-media">Digital Media & Design</option>
                <option value="architectural">Architectural Design</option>
              </select>
            </div>

            <div>
              <textarea
                placeholder="Your Message (Optional)"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 text-base font-display"
            >
              Submit Enquiry
            </button>

            <p className="text-gray-500 text-xs text-center">
              By clicking Submit, you allow MAAC to contact you and use your
              personal data as per privacy policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
