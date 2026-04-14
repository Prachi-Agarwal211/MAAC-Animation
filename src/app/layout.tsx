import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/hero/CustomCursor";
import FloatingActions from "@/components/FloatingActions";
import Navbar from "@/components/Navbar";
import ClientShell from "@/components/ClientShell";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { contactInfo } from "@/data/siteData";
import DemoBar from "@/components/ui/DemoBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    default: "MAAC Animation Institute Jaipur | Best Animation & VFX Courses",
    template: "%s | MAAC Jaipur",
  },
  description:
    "MAAC Jaipur C-Scheme — Rajasthan's #1 Animation Institute. B.Voc Degree in 3D Animation, VFX & Game Design. 95% Placements. NSDC Certified. Call " + contactInfo.phone + ".",
  icons: {
    icon: [
      { url: '/image.png', type: 'image/png' },
    ],
    apple: [
      { url: '/image.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  keywords: [
    "animation institute jaipur",
    "maac jaipur c scheme",
    "3d animation course jaipur",
    "vfx training jaipur",
    "maac animation jaipur",
    "game design course jaipur",
    "best animation institute rajasthan",
    "animation courses jaipur",
    "vfx courses jaipur",
    "graphic design course jaipur",
    "filmmaking course jaipur",
    "b.voc animation jaipur",
    "nsdc certified animation course",
  ],
  verification: {
    google: "dK9O7oyQ38md-k2VNjfTZJ64trKyvyLqSxlVik7Ak3M",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.maacanimationjaipur.com",
    siteName: "MAAC Animation Jaipur",
    title: "MAAC Animation Institute Jaipur C-Scheme | Best Animation & VFX Courses",
    description:
      "MAAC Jaipur C-Scheme — Rajasthan's #1 Animation Institute. B.Voc Degree in 3D Animation, VFX & Game Design. 95% Placements. NSDC Certified.",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur C-Scheme - Best Animation Institute in Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAAC Animation Jaipur C-Scheme | Best Animation & VFX Courses",
    description:
      "MAAC Jaipur C-Scheme — Rajasthan's #1 Animation Institute. B.Voc Degree in 3D Animation, VFX & Game Design. 95% Placements.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
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
  },
};

// JSON-LD LocalBusiness + EducationalOrganization structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": "https://www.maacanimationjaipur.com",
      name: "MAAC Animation Jaipur C-Scheme",
      alternateName: "MAAC Jaipur",
      url: "https://www.maacanimationjaipur.com",
      logo: "https://www.maacanimationjaipur.com/image.png",
      image: "https://www.maacanimationjaipur.com/og-image.jpg",
      description:
        "MAAC Jaipur C-Scheme is Rajasthan's leading Animation, VFX and Game Design institute. Offering B.Voc, Diploma and short-term courses. NSDC & MESC certified with 95% placement support.",
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
        latitude: 26.9124,
        longitude: 75.7873,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      sameAs: [
        contactInfo.social.facebook,
        contactInfo.social.instagram,
        contactInfo.social.youtube,
        contactInfo.social.linkedin,
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Animation & VFX Courses",
        itemListElement: [
          { "@type": "Course", name: "Advanced Program in Visual Effects (ADVFX)", description: "Master compositing, rotoscopy, matchmoving and CG integration", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Advanced Program in 3D Animation (AD3D Edge)", description: "Comprehensive training in modeling, texturing, rigging and character animation using Maya", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Program in Game Design & Integration (DGDI)", description: "Learn game art, game design, level design and game engine integration", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
          { "@type": "Course", name: "Advanced Program in Digital Media & Design (APDMD)", description: "Master graphic design, web design, UI/UX, motion graphics and digital marketing", provider: { "@type": "Organization", name: "MAAC Jaipur" } },
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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${syne.variable}`}>
      <head>
        {/* Preload hero videos for instant loading */}
        <link rel="preload" as="video" href="/hero-video.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/intro.mp4" type="video/mp4" />
        <link rel="preload" as="image" href="/hero-poster.jpg" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} font-body antialiased bg-[#0C0C0C] text-[#F0EBE1]`}
      >
        <DemoBar />
        <div className="animated-bg" aria-hidden="true" />

        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] bg-[#E31837] text-white px-4 py-2 rounded"
          >
            Skip to main content
          </a>

          <div className="grain-overlay" aria-hidden="true" />

          <CustomCursor />

          <LenisProvider>
            <Navbar />
            <ClientShell>
              <main id="main-content" tabIndex={-1} className="page-wrapper">{children}</main>
            </ClientShell>
            <FloatingActions />
            <Analytics />
            <SpeedInsights />
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
