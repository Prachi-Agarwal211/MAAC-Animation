import type { Metadata } from "next";
import { Poppins, Inter, Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/hero/CustomCursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

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
  metadataBase: new URL("https://maacindia.com"),
  title: {
    default: "MAAC India — Animation, VFX & Multimedia Courses",
    template: "%s | MAAC India",
  },
  description:
    "Join MAAC, India's leading institute for Animation, VFX, Gaming & Multimedia. 30+ years of excellence, 95% placement rate, 100+ centers.",
  keywords: [
    "animation courses india",
    "vfx training",
    "3d animation institute",
    "maac jaipur",
    "game design course",
    "best animation institute india",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://maacindia.com",
    siteName: "MAAC India",
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
    <html lang="en" className="scroll-smooth bg-[#080808]">
      <body
        className={`${poppins.variable} ${inter.variable} ${syne.variable} font-body antialiased bg-[#080808] text-[#f5f0e8]`}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] bg-[#E31837] text-white px-4 py-2 rounded"
        >
          Skip to main content
        </a>

        {/* Premium film grain overlay — fixed, pointer-events-none */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Global custom cursor — auto-hides on touch devices */}
        <CustomCursor />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "MAAC India",
              alternateName: "Maya Academy of Advanced Cinematics",
              url: "https://maacindia.com",
              logo: "https://maacindia.com/logo.png",
              description:
                "India's leading animation, VFX, and multimedia institute",
              address: {
                "@type": "PostalAddress",
                streetAddress: "A-65, MIDC, Marol, Andheri (E)",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra",
                postalCode: "400093",
                addressCountry: "IN",
              },
              telephone: "+91-22-68282300",
              sameAs: [
                "https://www.facebook.com/MAAClndia",
                "https://www.instagram.com/maacindia",
                "https://www.youtube.com/maacindia",
              ],
            }),
          }}
        />

        <LenisProvider>
          <main id="main-content">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}