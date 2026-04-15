"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { ArrowUpRight, Trophy, Users, Film, Camera, Calendar, Mic, Monitor } from "lucide-react";

const eventsData = [
  {
    id: "creata",
    name: "CREATA",
    description: "India's premier multi-category creative competition. Showcase your skills in Animation, VFX, Gaming, Comics, and Digital Design against the best talent from across the nation.",
    icon: Trophy,
    color: "#E31837",
  },
  {
    id: "rain",
    name: "RAIN Awards",
    description: "India's top animation and VFX award ceremony. Recognition for outstanding creative work by students, celebrating excellence in the field of animation and visual effects.",
    icon: Trophy,
    color: "#FF6B35",
  },
  {
    id: "masterclass",
    name: "Industry Masterclass",
    description: "A 4-day immersive event in Goa/Kutch with industry legends. Learn cutting-edge techniques, get portfolio reviews, and network with top professionals from leading studios.",
    icon: Mic,
    color: "#9B59B6",
  },
  {
    id: "zonal",
    name: "Zonal Events",
    description: "Regional alumni programs and industry interaction sessions. Connect with peers, attend workshops, and participate in zonal-level creative competitions.",
    icon: Users,
    color: "#3498DB",
  },
  {
    id: "100hr-film",
    name: "100 Hour Film Challenge",
    description: "Create a complete short film in just 100 hours. Test your filmmaking skills under pressure — from script to screen. The ultimate test of creativity and teamwork.",
    icon: Film,
    color: "#2ECC71",
  },
  {
    id: "photo-contest",
    name: "Photo & Film Contest",
    description: "Showcase your photography and filmmaking talent. Compete with creative minds across India in categories spanning cinematography, editing, and visual storytelling.",
    icon: Camera,
    color: "#F39C12",
  },
  {
    id: "webinars",
    name: "Webinars & Workshops",
    description: "Live interactive sessions by industry professionals. Stay updated with the latest trends, tools, and techniques in Animation, VFX, Gaming, and Digital Media.",
    icon: Monitor,
    color: "#1ABC9C",
  },
  {
    id: "calendar",
    name: "Events Calendar",
    description: "Stay updated with all upcoming MAAC events, workshops, competitions, and industry sessions. Never miss an opportunity to learn, compete, and grow.",
    icon: Calendar,
    color: "#E74C3C",
  },
];

const EventCard = ({ event, index }: { event: typeof eventsData[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = event.icon;

  return (
    <div
      ref={cardRef}
      className="event-card group relative rounded-[24px] overflow-hidden bg-[#111111] border border-white/5 hover:border-[#E31837]/30 transition-all duration-700 cursor-pointer"
    >
      {/* Icon & Color Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: event.color }} />
      
      <div className="relative p-8 md:p-10 flex flex-col h-full">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110" style={{ backgroundColor: `${event.color}15` }}>
          <Icon size={28} style={{ color: event.color }} />
        </div>

        {/* Content */}
        <h3 className="text-white font-display font-bold text-xl md:text-2xl mb-4 leading-tight">{event.name}</h3>
        <p className="text-[#A8A29C] text-sm leading-relaxed flex-grow mb-8">{event.description}</p>

        {/* CTA */}
        <Link
          href="/demo-class"
          className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] uppercase group/link"
          style={{ color: event.color }}
        >
          Know More
          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/link:scale-110 group-hover/link:rotate-45" style={{ backgroundColor: `${event.color}20` }}>
            <ArrowUpRight size={14} style={{ color: event.color }} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default function MAACEvents() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(".events-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" })
      .fromTo(".event-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, "-=0.6");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="events" className="relative py-24 md:py-40 overflow-hidden bg-[#0C0C0C]">
      {/* Background Accent */}
      <div className="atmosphere-blob blob-red top-20 -right-40 opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Heading */}
        <div className="events-heading text-center mb-20 md:mb-28">
          <p className="text-[#E31837] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#E31837]" />
            Events at MAAC
            <span className="w-6 h-[1px] bg-[#E31837]" />
          </p>
          <h2 className="font-display font-bold text-[clamp(1.6rem,4vw,2.8rem)] text-[#F0EBE1] leading-[0.95] tracking-tight">
            Where <span className="gradient-text">Creativity Meets</span> Competition
          </h2>
          <p className="text-[#A8A29C] text-lg mt-6 max-w-2xl mx-auto">
            From national competitions to immersive masterclasses, MAAC events shape the next generation of creative professionals.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {eventsData.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
