import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/hero/CustomCursor";
import FloatingCTA from "@/components/FloatingCTA";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://maacjaipur.com"),
  title: {
    default: "MAAC Jaipur — Best Animation & VFX Institute in Rajasthan",
    template: "%s | MAAC Jaipur",
  },
  description:
    "Join MAAC Jaipur, Rajasthan's #1 Animation & VFX institute. 30+ years, 95% placement, NSDC certified B.Voc degree. Courses in 3D Animation, VFX, Gaming, Filmmaking. Free demo class available.",
  keywords: [
    "animation courses jaipur",
    "vfx training jaipur",
    "3d animation institute",
    "maac jaipur",
    "game design course jaipur",
    "best animation institute rajasthan",
    "b.voc animation vfx",
    "animation institute jaipur",
    "vfx courses jaipur",
    "3d animation jaipur",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://maacjaipur.com",
    siteName: "MAAC Jaipur",
    title: "Best Animation Institute in Jaipur | MAAC",
    description: "Rajasthan's leading Animation, VFX and Multimedia institute with 30+ years of excellence",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MAAC Jaipur Animation Institute" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MAAClndia",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#0C0C0C]">
      <body
        className={`${inter.variable} ${syne.variable} font-body antialiased bg-[#0C0C0C] text-[#F0EBE1]`}
      >
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] bg-[#E31837] text-white px-4 py-2 rounded"
          >
            Skip to main content
          </a>

          <div className="grain-overlay" aria-hidden="true" />

          <CustomCursor />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name: "MAAC Jaipur — Maya Academy of Advanced Cinematics",
                alternateName: "Maya Academy of Advanced Cinematics - Jaipur",
                url: "https://maacjaipur.com",
                logo: "https://maacjaipur.com/logo.png",
                description: "Rajasthan's leading animation, VFX, and multimedia institute with 30+ years of excellence",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle",
                  addressLocality: "Jaipur",
                  addressRegion: "Rajasthan",
                  postalCode: "302001",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 26.8466,
                  longitude: 75.8069,
                },
                telephone: "+91-7300001589",
                email: "maacanimationjaipur@gmail.com",
                openingHours: "Mo-Sa 09:00-19:00",
                priceRange: "₹₹",
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Animation & VFX Courses",
                  itemListElement: [
                    { "@type": "Course", "name": "3D Animation", "description": "Advanced 3D animation training with industry-standard tools" },
                    { "@type": "Course", "name": "VFX", "description": "Visual effects for film and TV using compositing and motion tracking" },
                    { "@type": "Course", "name": "Game Design", "description": "Game design and development for next-gen gaming platforms" },
                    { "@type": "Course", "name": "Digital Filmmaking", "description": "Complete filmmaking program from pre-production to post-production" },
                    { "@type": "Course", "name": "Digital Media & Design", "description": "Graphic design, web design, UI/UX, and motion graphics" },
                  ],
                },
                sameAs: [
                  "https://www.facebook.com/MAAClndia",
                  "https://www.instagram.com/maacjaipurcscheme",
                  "https://www.youtube.com/@maac-jaipur-cscheme",
                  "https://www.linkedin.com/company/maac-jaipur-cscheme",
                ],
              }),
            }}
          />

          <LenisProvider>
            <Navbar />
            <main id="main-content" className="page-wrapper">{children}</main>
            <FloatingCTA whatsapp="+917300001589" phone="+917300001589" />
            <Analytics />
            <SpeedInsights />
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
