import type { Metadata } from "next";
import Script from "next/script";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import EventsInteractive from "./EventsInteractive";
import { clampTitle } from "@/lib/seo";

const OG_EVENTS = clampTitle("Events & Campus Life | MAAC Animation Jaipur", 60);

export const metadata: Metadata = {
  title: clampTitle("Events & Campus Life | MAAC Animation Jaipur"),
  description:
    "Experience the vibrant life at MAAC Jaipur. From national competitions like CREATA & RAIN Awards to 100-hour film marathons, masterclasses, and campus moments.",
  openGraph: {
    title: OG_EVENTS,
    description:
      "India's premier animation institute events: national competitions, industry masterclasses, student meets, photography expeditions.",
    url: "https://www.maacanimationjaipur.com/events",
    siteName: "MAAC Animation Jaipur",
    images: [{ url: "https://www.maacanimationjaipur.com/events/event-015.jpeg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: OG_EVENTS },
  alternates: { canonical: "https://www.maacanimationjaipur.com/events" },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.maacanimationjaipur.com" },
    { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://www.maacanimationjaipur.com/events" },
  ],
}

export default function EventsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Script
        id="events-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                name: "Events - MAAC Animation Jaipur",
                description: "MAAC Events - At MAAC Animation Jaipur, our dedicated team works tirelessly throughout the year to organize exciting events across various locations.",
                url: "https://www.maacanimationjaipur.com/events",
                publisher: {
                  "@type": "Organization",
                  name: "MAAC Animation Jaipur",
                  sameAs: "https://www.maacanimationjaipur.com",
                },
              },
              {
                "@type": "Event",
                "name": "CREATA & RAIN Awards - National Animation Competition",
                "description": "National-level animation and creativity competition organized by MAAC Animation Jaipur for students across India.",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "startDate": "2025-09-15",
                "endDate": "2025-09-30",
                "location": {
                  "@type": "Place",
                  "name": "MAAC Animation Jaipur",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "711-712, Ambition Tower, 7th Floor, Subhash Marg, C Scheme",
                    "addressLocality": "Jaipur",
                    "addressRegion": "Rajasthan",
                    "postalCode": "302001",
                    "addressCountry": "IN"
                  }
                },
                "organizer": {
                  "@type": "EducationalOrganization",
                  "name": "MAAC Animation Jaipur",
                  "url": "https://www.maacanimationjaipur.com"
                }
              },
              {
                "@type": "Event",
                "name": "100-Hour Film Marathon - MAAC Jaipur",
                "description": "Annual filmmaking marathon where students create short films in 100 hours, organized by MAAC Animation Jaipur.",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "startDate": "2025-10-10",
                "endDate": "2025-10-14",
                "location": {
                  "@type": "Place",
                  "name": "MAAC Animation Jaipur",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "711-712, Ambition Tower, 7th Floor, Subhash Marg, C Scheme",
                    "addressLocality": "Jaipur",
                    "addressRegion": "Rajasthan",
                    "postalCode": "302001",
                    "addressCountry": "IN"
                  }
                },
                "organizer": {
                  "@type": "EducationalOrganization",
                  "name": "MAAC Animation Jaipur",
                  "url": "https://www.maacanimationjaipur.com"
                }
              },
              {
                "@type": "Event",
                "name": "Industry Masterclass Series - MAAC Jaipur",
                "description": "Regular masterclasses by industry professionals from DNEG, MPC, Prime Focus, and Ubisoft organized by MAAC Animation Jaipur.",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "startDate": "2025-09-05",
                "endDate": "2025-12-20",
                "location": {
                  "@type": "Place",
                  "name": "MAAC Animation Jaipur",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "711-712, Ambition Tower, 7th Floor, Subhash Marg, C Scheme",
                    "addressLocality": "Jaipur",
                    "addressRegion": "Rajasthan",
                    "postalCode": "302001",
                    "addressCountry": "IN"
                  }
                },
                "organizer": {
                  "@type": "EducationalOrganization",
                  "name": "MAAC Animation Jaipur",
                  "url": "https://www.maacanimationjaipur.com"
                }
              }
            ]
          }),
        }}
      />

      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden isolate">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center hero-video-fade-full"
          style={{ '--video-target-opacity': '1' } as React.CSSProperties}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="auto"
        >
          <source src="/event-compressed.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45" />

        <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-16">
          <p className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.35em] mb-4">EXPERIENCES THAT DEFINE US</p>
          <h1 className="font-display text-[clamp(2.6rem,7.8vw,5.8rem)] leading-[0.88] font-bold tracking-[-0.01em] text-white mb-6">
            <span className="title-layer">
              <span className="title-layer-glow" aria-hidden="true">MAAC</span>
              <span className="relative z-10">MAAC</span>
            </span>{' '}
            <span className="title-layer">
              <span className="title-layer-glow" aria-hidden="true">EVENTS</span>
              <span className="relative z-10 metallic-gold-text font-bold italic">EVENTS</span>
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/85 leading-snug mb-8">
            At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations, bringing together students, alumni, and faculty.
          </p>
          <a href="#moments" className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] border-b border-[#C4A882]/50 pb-1 text-[#F0EBE1] hover:text-white hover:border-[#C4A882] transition-colors">
            SEE THE MOMENTS ↓
          </a>
        </div>
      </section>

      <EventsInteractive />

      <IndustryPartners />

      <ApplyNow />
    </>
  );
}
