import { Star, TrendingUp } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const successStories = [
  {
    name: "Priya Sharma",
    role: "3D Animator",
    company: "DNEG",
    salary: "8.5",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    quote: "MAAC transformed my passion for animation into a rewarding career at DNEG. The industry-ready curriculum made all the difference.",
  },
  {
    name: "Rahul Verma",
    role: "VFX Compositor",
    company: "MPC",
    salary: "7.2",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    quote: "The hands-on VFX training and mentorship at MAAC prepared me for real studio environments from day one.",
  },
  {
    name: "Ananya Patel",
    role: "Game Artist",
    company: "Ubisoft",
    salary: "9.0",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    quote: "From learning game art fundamentals to landing my dream role at Ubisoft — MAAC was the catalyst for everything.",
  },
  {
    name: "Karan Mehta",
    role: "Motion Graphics Artist",
    company: "Redchillies VFX",
    salary: "6.8",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    quote: "MAAC's broadcast design program gave me the skills to thrive in the fast-paced world of motion graphics.",
  },
  {
    name: "Sneha Kapoor",
    role: "UI/UX Designer",
    company: "Google",
    salary: "12.0",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    quote: "The digital content creation course at MAAC opened doors I never imagined. Now I design experiences at Google.",
  },
  {
    name: "Aarav Singh",
    role: "Film Editor",
    company: "Freelance",
    salary: "10.5",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    quote: "MAAC's filmmaking program taught me the complete post-production workflow. I now work with top OTT platforms.",
  },
];

export default function StudentSuccessStories() {
  return (
    <section id="success-stories" className="relative py-16 md:py-24 overflow-hidden bg-transparent">
      {/* Background Accent */}
      <div className="atmosphere-blob blob-purple bottom-0 -left-40 opacity-5" />

      <div className="relative max-w-content mx-auto px-6 lg:px-8 z-10">
        {/* Heading */}
        <FadeIn className="text-center mb-16 md:mb-24">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Inspiring Journeys
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h2 className="font-display text-[clamp(1.6rem,6vw,3.5rem)] leading-[0.85] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
            REAL <span className="metallic-gold-text italic">PLACEMENTS</span>, REAL SALARIES
          </h2>
          <p className="text-[#A8A29C] text-sm md:text-white/80 mt-6 max-w-2xl mx-auto">
            Our students don&apos;t just learn — they launch thriving careers. Here&apos;s what MAAC alumni are earning and where they&apos;re working.
          </p>
        </FadeIn>

        {/* Stats Bar */}
        <FadeIn delay={0.2} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 p-8 rounded-[24px] glass-card border border-white/5">
          {[
            { label: "Average Starting Salary", value: "6-9 LPA", icon: TrendingUp },
            { label: "Highest Package", value: "12+ LPA", icon: Star },
            { label: "Placement Rate", value: "95%", icon: Star },
            { label: "Partner Companies", value: "500+", icon: Star },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">
                  <Icon size={20} className="metallic-gold-text" />
                </div>
                <div className="text-white font-bold text-xl md:text-3xl mb-1">{stat.value}</div>
                <div className="text-[#A8A29C] text-xs uppercase tracking-[0.15em]">{stat.label}</div>
              </div>
            );
          })}
        </FadeIn>

        {/* Stories Grid */}
        <FadeIn delay={0.4} stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="success-card glass-card group relative overflow-hidden transition-all duration-700"
            >
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BF953F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-8">
                {/* Avatar & Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#BF953F]/30 flex-shrink-0 relative">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{story.name}</h3>
                    <p className="metallic-gold-text text-sm font-bold">{story.role}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-[#A8A29C] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Company & Salary */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <div className="text-[#6B6560] text-[10px] uppercase tracking-[0.2em] mb-1">Company</div>
                    <div className="text-white font-bold text-sm">{story.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#6B6560] text-[10px] uppercase tracking-[0.2em] mb-1">Package</div>
                    <div className="text-[#BF953F] font-bold text-lg">{story.salary} LPA</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

