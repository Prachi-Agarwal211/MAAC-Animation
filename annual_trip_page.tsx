"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import Footer from "@/components/Footer";

const tripImages = [
  { title: "A Misty Morning", src: "/annual trip/trip-01.jpeg" },
  { title: "Mountain Views", src: "/annual trip/trip-02.jpeg" },
  { title: "Sunrise Peaks", src: "/annual trip/trip-03.jpeg" },
  { title: "Valley Beauty", src: "/annual trip/trip-04.jpeg" },
  { title: "Forest Trails", src: "/annual trip/trip-05.jpeg" },
  { title: "River Crossing", src: "/annual trip/trip-06.jpeg" },
  { title: "Campsite Vibes", src: "/annual trip/trip-07.jpeg" },
  { title: "Night Sky", src: "/annual trip/trip-08.jpeg" },
  { title: "Morning Dew", src: "/annual trip/trip-09.jpeg" },
  { title: "Highland Views", src: "/annual trip/trip-10.jpeg" },
  { title: "Trail Adventure", src: "/annual trip/trip-11.jpeg" },
  { title: "Lakeside Calm", src: "/annual trip/trip-12.jpeg" },
  { title: "Rocky Paths", src: "/annual trip/trip-13.jpeg" },
  { title: "Golden Hour", src: "/annual trip/trip-14.jpeg" },
  { title: "Dense Forests", src: "/annual trip/trip-15.jpeg" },
  { title: "Scenic Drives", src: "/annual trip/trip-16.jpeg" },
  { title: "Hilltop Camp", src: "/annual trip/trip-17.jpeg" },
  { title: "Pine Valleys", src: "/annual trip/trip-18.jpeg" },
  { title: "Sunset Glow", src: "/annual trip/trip-19.jpeg" },
  { title: "Misty Trails", src: "/annual trip/trip-20.jpeg" },
  { title: "Alpine Meadows", src: "/annual trip/trip-21.jpeg" },
  { title: "Waterfall Magic", src: "/annual trip/trip-22.jpeg" },
  { title: "Cabin Retreat", src: "/annual trip/trip-23.jpeg" },
  { title: "Journey's End", src: "/annual trip/trip-24.jpeg" },
  { title: "Memories Made", src: "/annual trip/trip-25.jpeg" },
];

export default function AnnualTripPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !carouselRef.current) return;

    const cards = gsap.utils.toArray<HTMLDivElement>(".trip-card");
    const totalCards = cards.length;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35;

    gsap.set(cards, (i: number) => {
      const angle = (i / totalCards) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;
      const cos = Math.cos(angle);
      const opacity = 0.3 + 0.7 * Math.max(0, cos);
      const scale = 0.6 + 0.4 * Math.max(0, cos);
      const blur = Math.max(0, (1 - cos) * 6);
      const gray = 1 - cos;

      return {
        x: x,
        z: z,
        opacity: opacity,
        scale: scale,
        filter: `blur(${blur}px) grayscale(${gray})`,
        transformOrigin: "center center",
      };
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: carouselRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const rotate = self.progress * 360;
          gsap.set(cards, (i: number) => {
            const angleOffset = (i / totalCards) * Math.PI * 2;
            const rotateRad = (rotate * Math.PI) / 180;
            const angle = angleOffset - rotateRad;
            const cos = Math.cos(angle);
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius - radius;
            const opacity = 0.3 + 0.7 * Math.max(0, cos);
            const scale = 0.6 + 0.4 * Math.max(0, cos);
            const blur = Math.max(0, (1 - cos) * 6);
            const gray = 1 - cos;

            return {
              x: x,
              z: z,
              opacity: opacity,
              scale: scale,
              filter: `blur(${blur}px) grayscale(${gray})`,
              zIndex: Math.floor(cos * 100),
            };
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [hasMounted]);

  return (
    <div className="min-h-screen bg-[#0C0C0C] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0C0C0C] z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/hero-video-compressed.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center px-6">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Memories to Last Forever
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] text-white mb-6 font-light uppercase tracking-[0.1em]">
            ANNUAL TRIPS AT <span className="metallic-gold-text italic">MAAC</span>
          </h1>
          <p className="text-[#A8A29C] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore the breathtaking journeys and unforgettable memories from our annual adventure trips across the most beautiful destinations.
          </p>
        </div>
      </section>

      {/* Carousel Container */}
      <section
        ref={carouselRef}
        className="relative min-h-screen bg-transparent overflow-hidden"
        style={{ height: `${tripImages.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative" style={{ width: '80vw', height: '80vh', perspective: '1200px' }}>
            {tripImages.map((trip, i) => (
              <div
                key={i}
                className="trip-card absolute top-0 left-0 w-full h-full flex items-center justify-center"
                style={{ willChange: "transform, opacity, filter" }}
              >
                <div className="relative w-[70%] h-[80%] rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl">
                  <Image
                    src={trip.src}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 70vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 md:p-12">
                    <h2 className="font-display text-2xl md:text-4xl text-white font-bold uppercase tracking-[0.1em] leading-tight">
                      {trip.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-white/40 rotate-90 origin-center">
            Scroll
          </span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
