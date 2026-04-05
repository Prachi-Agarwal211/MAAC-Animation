import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import MagneticButton from "@/components/ui/MagneticButton";
import { contactInfo } from "@/data/siteData";
import { coursesData } from "@/data/courses";

export const metadata: Metadata = {
  title: "Book Free Demo Class - MAAC Animation Jaipur",
  description:
    "Experience MAAC Jaipur's teaching methodology firsthand. Book a free demo class for 3D Animation, VFX, Game Design, or Digital Filmmaking. No commitment required.",
  keywords: [
    "demo class animation jaipur",
    "free demo class maac",
    "animation institute demo",
    "vfx demo class jaipur",
    "game design demo",
  ],
  openGraph: {
    type: "website",
    title: "Book Free Demo Class - MAAC Animation Jaipur",
    description:
      "Experience MAAC Jaipur's teaching methodology firsthand. Book a free demo class for 3D Animation, VFX, Game Design, or Digital Filmmaking.",
    url: "https://www.maacanimationjaipur.com/demo-class",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/3.jpg",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur Demo Class",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/demo-class",
  },
};

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "See Our Teaching Style",
    description: "Experience our hands-on, project-based learning approach firsthand before committing.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Tour Our Facilities",
    description: "Visit our state-of-the-art labs with the latest software and hardware used in the industry.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Meet Our Mentors",
    description: "Interact with industry-experienced faculty who have worked on major studio projects.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Get Course Guidance",
    description: "Receive personalized advice on the right course and career path for your goals.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Learn About EMI Options",
    description: "Understand our flexible payment plans, scholarships, and EMI options with zero hassle.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "No Commitment",
    description: "The demo class is completely free with no obligation. Come explore and decide at your pace.",
  },
];

export default function DemoClassPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="demo-class-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Free Demo Class - MAAC Animation Jaipur",
            description: "Experience MAAC Jaipur's teaching methodology firsthand. Book a free demo class for 3D Animation, VFX, Game Design, or Digital Filmmaking.",
            organizer: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              url: "https://www.maacanimationjaipur.com",
              telephone: contactInfo.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg",
                addressLocality: "Jaipur",
                postalCode: "302001",
                addressRegion: "RJ",
                addressCountry: "IN",
              },
            },
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "MAAC Animation Jaipur",
              address: {
                "@type": "PostalAddress",
                streetAddress: "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg",
                addressLocality: "Jaipur",
                postalCode: "302001",
                addressRegion: "RJ",
                addressCountry: "IN",
              },
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: "https://www.maacanimationjaipur.com/demo-class",
            },
          }),
        }}
      />

      {/* Hero Section */}
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
                <li className="text-[#A8A29C]">Demo Class</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 bg-[#E31837]/10 border border-[#E31837]/30 rounded-full px-4 py-2 mb-6">
              <span className="text-[#E31837] text-xs font-semibold tracking-wider uppercase">100% Free</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] leading-[1.1] mb-6">
              Book Your Free Demo Class
            </h1>
            <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed max-w-2xl">
              Experience our teaching methodology firsthand. Visit our institute, meet our mentors, and see why 50,000+ students chose MAAC Jaipur.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-4 text-center">
            Why Attend a Demo Class?
          </h2>
          <p className="text-[#A8A29C] text-lg text-center mb-16 max-w-2xl mx-auto">
            Get a complete picture of what learning at MAAC Jaipur looks like
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-[#161616] rounded-xl p-6 border border-white/5 hover:border-[#E31837]/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E31837]/10 flex items-center justify-center mb-4 text-[#E31837]">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-semibold text-[#F0EBE1] text-lg mb-2">{benefit.title}</h3>
                <p className="text-[#A8A29C] text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Contact Section */}
      <section
        className="py-20 md:py-28"
        style={{ background: "linear-gradient(180deg, #0C0C0C 0%, #1A0508 50%, #0C0C0C 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div>
              <h2 className="font-display font-bold text-3xl text-[#F0EBE1] mb-4">
                Reserve Your Spot
              </h2>
              <p className="text-[#A8A29C] mb-8">
                Fill in your details and we&apos;ll confirm your demo class schedule.
              </p>

              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#A8A29C] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-[#F0EBE1] placeholder-[#6B6560] focus:outline-none focus:border-[#E31837]/50 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#A8A29C] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-[#F0EBE1] placeholder-[#6B6560] focus:outline-none focus:border-[#E31837]/50 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#A8A29C] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-[#F0EBE1] placeholder-[#6B6560] focus:outline-none focus:border-[#E31837]/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-[#A8A29C] mb-2">
                    Preferred Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-[#F0EBE1] focus:outline-none focus:border-[#E31837]/50 transition-colors appearance-none"
                  >
                    <option value="">Select a course</option>
                    {coursesData.map((course) => (
                      <option key={course.slug} value={course.slug}>
                        {course.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[#A8A29C] mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-[#F0EBE1] focus:outline-none focus:border-[#E31837]/50 transition-colors"
                  />
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#E31837] to-[#C4132D] text-white hover:opacity-90 border border-[#E31837]/50 px-8 py-4 rounded-lg font-semibold shadow-[0_0_20px_rgba(227,24,55,0.3)] transition-opacity cursor-pointer"
                  >
                    Book My Free Demo Class
                  </button>
                </MagneticButton>

                <p className="text-[#6B6560] text-xs text-center">
                  By submitting, you agree to receive communications from MAAC Jaipur. We respect your privacy.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-[#161616] rounded-xl p-8 border border-white/5 h-fit sticky top-24">
                <h3 className="font-display font-semibold text-[#F0EBE1] text-xl mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E31837]/10 flex items-center justify-center flex-shrink-0 text-[#E31837]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Phone</p>
                      <a href={`tel:${contactInfo.phone.replace(/-/g, "")}`} className="text-[#F0EBE1] hover:text-[#E31837] transition-colors">
                        {contactInfo.phone}
                      </a>
                      <br />
                      <a href={`tel:${contactInfo.phoneSecondary.replace(/-/g, "")}`} className="text-[#A8A29C] text-sm hover:text-[#E31837] transition-colors">
                        {contactInfo.phoneSecondary}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E31837]/10 flex items-center justify-center flex-shrink-0 text-[#E31837]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-[#F0EBE1] hover:text-[#E31837] transition-colors text-sm">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E31837]/10 flex items-center justify-center flex-shrink-0 text-[#E31837]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Address</p>
                      <p className="text-[#A8A29C] text-sm leading-relaxed">
                        {contactInfo.address}
                      </p>
                      <a
                        href={contactInfo.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E31837] text-sm mt-2 inline-block hover:underline"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E31837]/10 flex items-center justify-center flex-shrink-0 text-[#E31837]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Working Hours</p>
                      <p className="text-[#A8A29C] text-sm">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo%20class.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
