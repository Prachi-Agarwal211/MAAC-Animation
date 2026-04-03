import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/hero/CustomCursor";
import FloatingCTA from "@/components/FloatingCTA";
import Navbar from "@/components/Navbar";
import ClientShell from "@/components/ClientShell";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
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
        <AnimatedBackground />
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
            <FloatingCTA whatsapp="+917300001589" phone="+917300001589" />
            <Analytics />
            <SpeedInsights />
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
