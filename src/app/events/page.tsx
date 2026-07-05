import Script from "next/script";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import EventsInteractive from "./EventsInteractive";

export default function EventsPage() {
  return (
    <>
      <Script
        id="events-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Events - MAAC Animation Jaipur",
            description: "MAAC Events - At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations.",
            url: "https://www.maacanimationjaipur.com/events",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden isolate">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/event-compressed.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45" />

        <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-16">
          <p className="metallic-gold-text text-xs font-bold tracking-[0.35em] mb-4">EXPERIENCES THAT DEFINE US</p>
          <h1 className="font-display text-[clamp(2.6rem,7.8vw,5.8rem)] leading-[0.88] font-bold tracking-[-0.01em] text-white mb-6">
            MAAC <span className="metallic-gold-text italic">EVENTS</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#A8A29C] leading-snug mb-8">
            At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations, bringing together students, alumni, and faculty.
          </p>
          <a href="#moments" className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] border-b border-[#FFD700]/50 pb-1 text-[#F0EBE1] hover:text-white hover:border-[#FFD700] transition-colors">
            SEE THE MOMENTS ↓
          </a>
        </div>
      </section>

      <EventsInteractive />

      <div className="border-t border-white/5">
        <IndustryPartners />
      </div>

      <div className="border-t border-white/5">
        <ApplyNow />
      </div>
    </>
  );
}
