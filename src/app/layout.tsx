import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { contactInfo, organizationSameAs } from "@/data/siteData";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import MetaPixel from "@/components/MetaPixel";
import Footer from "@/components/Footer";

// Heavy Client Components - Lazy loaded
const DynamicBackground = dynamic(() => import("@/components/ui/DynamicBackground"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/hero/CustomCursor"), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false });
const LenisProvider = dynamic(() => import("@/components/LenisProvider"), { ssr: false });
const ClientShell = dynamic(() => import("@/components/ClientShell"), { ssr: true });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0C0C0C',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maacanimationjaipur.com"),
  title: {
    default: "MAAC Jaipur | Animation, VFX & Game Design",
    template: "%s | MAAC Animation"
  },
  description:
    "MAAC Jaipur C-Scheme offers 3D Animation, VFX, Game Design and Filmmaking courses with industry-focused training, portfolio development and placement support.",
  icons: {
    icon: [
      { url: '/maac-logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/maac-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  keywords: [
    "animation academy",
    "VFX courses in Jaipur",
    "3D animation Jaipur",
    "MAAC Jaipur",
    "animation institute",
    "maac jaipur c scheme",
    "3d animation course jaipur",
    "vfx training jaipur",
    "maac animation jaipur",
    "game design course jaipur",
    "best animation institute rajasthan",
    "animation courses jaipur",
    "graphic design course jaipur",
    "filmmaking course jaipur",
    "b.voc animation jaipur",
    "nsdc certified animation course",
  ],
  verification: {
    google: "dK9O7oyQ38md-k2VNjfTZJ64trKyvyLqSxlVik7Ak3M",
  },
  other: {
    "ai-content-declaration": "public",
    "geo-optimized": "true",
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur, Rajasthan",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.maacanimationjaipur.com",
    siteName: "MAAC Animation Jaipur",
    title: "MAAC Jaipur | Animation, VFX & Game Design",
    description:
      "MAAC Jaipur C-Scheme offers 3D Animation, VFX, Game Design and Filmmaking courses with industry-focused training, portfolio development and placement support.",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur C-Scheme - Leading Animation Institute in Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAAC Jaipur | Animation, VFX & Game Design",
    description:
      "MAAC Jaipur C-Scheme — Animation, VFX & Game Design institute. B.Voc & diploma programs. NSDC certified.",
    images: ["https://www.maacanimationjaipur.com/thumbnail.png"],
    // No twitter:site — @maacjaipurcscheme / MAAClndia handles 404 as of 2026-08-08
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/ai.txt", title: "ai.txt" },
      ],
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.maacanimationjaipur.com/#website",
      "url": "https://www.maacanimationjaipur.com",
      "name": "MAAC Animation Institute Jaipur",
      "description": "Rajasthan's leading animation, VFX and multimedia institute",
      "inLanguage": "en-US",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".speakable-headline", ".speakable-summary", ".metallic-gold-text-sm"]
      },
      "publisher": { "@id": "https://www.maacanimationjaipur.com" }
    },
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": "https://www.maacanimationjaipur.com",
      name: "MAAC Animation Jaipur C-Scheme",
      alternateName: "MAAC Animation Institute Jaipur",
      url: "https://www.maacanimationjaipur.com",
      logo: { "@type": "ImageObject", url: "https://www.maacanimationjaipur.com/maac-logo.png", width: 512, height: 512 },
      image: "https://www.maacanimationjaipur.com/thumbnail.png",
      description:
        "MAAC Jaipur C-Scheme is Rajasthan's leading Animation, VFX and Game Design institute. Offering B.Voc, Diploma and short-term courses. NSDC & MESC certified with 95% placement support.",
      creator: {
        "@type": "Organization",
        name: "Reverbex Technology",
        url: "https://reverbex.in",
        description: "Elite Software Engineering, AI Automations, and Web Systems.",
      },
      foundingDate: "1998",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20 },
      paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Education Loan",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "422", bestRating: "5", worstRating: "1" },
      award: "FICCI BAF Awards 2024 - Leading Animation Institute",
      department: { "@type": "EducationalOrganization", name: "Placement Cell", description: "Dedicated placement assistance with 95% success rate" },
      alumni: { "@type": "AlumniOrganization", name: "MAAC Alumni Network", description: "50,000+ professionals working at top studios worldwide" },
      telephone: contactInfo.phone,
      email: contactInfo.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.9139,
        longitude: 75.7842,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      sameAs: organizationSameAs,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Animation & VFX Courses",
        itemListElement: [
          { "@type": "Course", name: "3D Animation (AD3D Edge)", description: "Advanced 3D Animation course covering modeling, texturing, rigging and character animation using Maya.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Visual Effects (ADVFX)", description: "Master compositing, rotoscopy, matchmoving and CG integration for film and TV.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Game Design & Integration (DGDI)", description: "Learn game art, level design and engine integration with Unity and Unreal Engine.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Digital Media & Design (APDMD)", description: "Advanced program in graphic design, web design, UI/UX and motion graphics.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Design Viz Pro", description: "Architectural visualization and design communication program.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Digital Animation & Film Making (DAFM)", description: "Comprehensive program in filmmaking and animation production.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "VFX Plus", description: "Program in visual effects with focus on compositing and motion graphics.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Maya Pro", description: "Specialized certificate course in Autodesk Maya.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Max Pro", description: "Specialized certificate course in Autodesk 3ds Max.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Graphic Design", description: "Certificate program in graphic design and visual communication.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Composite & Editing Pro", description: "Focused program on video editing and compositing.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Digital Filmmaking (DFM)", description: "Hands-on digital filmmaking from pre to post production.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Gaming Design", description: "Comprehensive game art and design pipeline training.", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var done = localStorage.getItem('maac_intro_done');
                  if (done === '1') {
                    document.documentElement.dataset.maacIntroDone = '1';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload only the hero video — footer video lazy-loads itself (preload="none") */}
        <link rel="preload" as="video" href="/intro.mp4" fetchPriority="high" />

        {/* =====================================================================
            ADVERTISING & ANALYTICS TAGS - Meta + Google Ads
            These load early for accurate ad attribution and conversion tracking.
            Configure IDs in .env (see .env.example for full guide)
        ===================================================================== */}

        {/* Google Ads global site tag (gtag.js) */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-ads"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}');
                `,
              }}
            />
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${syne.variable} font-body antialiased text-[#F0EBE1] bg-[#0C0C0C]`}
      >
        <Suspense fallback={<div className="fixed inset-0 bg-bg-primary" />}>
          <DynamicBackground />
        </Suspense>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] bg-[#C4A882] text-black px-4 py-2 rounded"
        >
          Skip to main content
        </a>

        {/* Server-rendered nav for search engine crawlability (visually hidden, semantic) */}
        <nav aria-label="Site navigation" className="sr-only">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/courses">Courses</a>
          <a href="/courses/3d-animation">3D Animation</a>
          <a href="/courses/vfx">Visual Effects</a>
          <a href="/courses/gaming-design">Game Design</a>
          <a href="/courses/dfm">Filmmaking</a>
          <a href="/courses/skill-enhancement">Bootcamp</a>
          <a href="/student-work">Student Work</a>
          <a href="/events">Events</a>
          <a href="/gallery">Gallery</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact Us</a>
          <a href="/annual-trip">Annual Trip</a>
          <a href="/animation-institute-jaipur">Animation Institute Jaipur</a>
          <a href="/creative-career-assessment">Career Assessment</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </nav>

        <div className="grain-overlay" aria-hidden="true" />

        <Suspense fallback={null}>
          <LenisProvider>
            <ErrorBoundary>
              <Navbar />
              <ClientShell>
                <main id="main-content" tabIndex={-1} className="page-wrapper relative z-10">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </ClientShell>
            </ErrorBoundary>
            <Suspense fallback={null}>
              <FloatingActions />
            </Suspense>
            <Suspense fallback={null}>
              <CustomCursor />
            </Suspense>
            <Suspense fallback={null}>
              <MetaPixel />
            </Suspense>
            <Suspense fallback={null}>
              <CookieConsent />
            </Suspense>
            <Analytics />
            <SpeedInsights />
          </LenisProvider>
        </Suspense>
      </body>
    </html>
  );
}
