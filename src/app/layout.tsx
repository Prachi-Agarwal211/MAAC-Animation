import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/hero/CustomCursor";
import FloatingCTA from "@/components/FloatingCTA";
import Navbar from "@/components/Navbar";

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
    default: "MAAC Jaipur — Best Animation, VFX & Multimedia Institute",
    template: "%s | MAAC Jaipur",
  },
  description:
    "Join MAAC Jaipur, Rajasthan's leading institute for Animation, VFX, Gaming & Multimedia. 30+ years of excellence, 95% placement rate, NSDC certified B.Voc degree.",
  keywords: [
    "animation courses jaipur",
    "vfx training jaipur",
    "3d animation institute",
    "maac jaipur",
    "game design course jaipur",
    "best animation institute rajasthan",
    "b.voc animation vfx",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://maacjaipur.com",
    siteName: "MAAC Jaipur",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
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
              name: "MAAC Jaipur",
              alternateName: "Maya Academy of Advanced Cinematics - Jaipur",
              url: "https://maacjaipur.com",
              logo: "https://maacjaipur.com/logo.png",
              description:
                "Rajasthan's leading animation, VFX, and multimedia institute",
              address: {
                "@type": "PostalAddress",
                streetAddress: "C-44, Malviya Nagar Industrial Area",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                postalCode: "302017",
                addressCountry: "IN",
              },
              telephone: "+91-141-4035604",
              sameAs: [
                "https://www.facebook.com/MAAClndia",
                "https://www.instagram.com/maacindia",
                "https://www.youtube.com/maacindia",
              ],
            }),
          }}
        />

        <LenisProvider>
          <Navbar />
          <main id="main-content" className="page-wrapper">{children}</main>
          <FloatingCTA whatsapp="+911414035604" phone="+911414035604" />
        </LenisProvider>
      </body>
    </html>
  );
}
