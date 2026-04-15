import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import MagneticButton from "@/components/ui/MagneticButton";
import MAACEvents from "@/components/MAACEvents";

export const metadata: Metadata = {
  title: "Events - MAAC Animation Jaipur",
  description:
    "From national competitions to immersive masterclasses, MAAC events shape the next generation of creative professionals. Discover CREATA, RAIN Awards, Industry Masterclass and more.",
  keywords: [
    "maac events jaipur",
    "animation competition india",
    "creata competition",
    "maac masterclass",
    "rain awards animation",
  ],
  openGraph: {
    type: "website",
    title: "Events - MAAC Animation Jaipur",
    description:
      "From national competitions to immersive masterclasses, MAAC events shape the next generation of creative professionals.",
    url: "https://www.maacanimationjaipur.com/events",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/image.png",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - MAAC Animation Jaipur",
    description:
      "From national competitions to immersive masterclasses, MAAC events shape the next generation of creative professionals.",
    images: ["https://www.maacanimationjaipur.com/image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/events",
  },
};

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
            description:
              "From national competitions to immersive masterclasses, MAAC events shape the next generation of creative professionals.",
            url: "https://www.maacanimationjaipur.com/events",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1A0508 0%, #0C0C0C 50%, #0C0C0C 100%)" }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E31837 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #C4A882 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#6B6560]">
                <li><Link href="/" className="hover:text-[#E31837] transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-[#A8A29C]">Events</li>
              </ol>
            </nav>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] leading-[1.1] mb-6">
              Events at MAAC
            </h1>
            <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed max-w-2xl">
              From national competitions to immersive masterclasses, MAAC events shape the next generation of creative professionals. Showcase your talent, learn from industry legends, and connect with peers.
            </p>
          </div>
        </div>
      </section>

      <MAACEvents />

      <section
        className="py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #2A080C 0%, #170406 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-6">
            Ready to Participate?
          </h2>
          <p className="text-[#A8A29C] text-lg mb-10 max-w-2xl mx-auto">
            Join MAAC Jaipur and compete in our events. Book a free demo class to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Link
                href="/demo-class"
                className="btn bg-gradient-to-r from-[#E31837] to-[#C4132D] text-white hover:opacity-90 border border-[#E31837]/50 px-8 py-4 rounded-lg font-semibold shadow-[0_0_20px_rgba(227,24,55,0.3)]"
              >
                Book Free Demo Class
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/courses"
                className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold"
              >
                Explore Courses
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}