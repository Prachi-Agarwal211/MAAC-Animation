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
  metadataBase: new URL("https://www.maacanimationjaipur.com"),
  title: {
    default: "Home animation institute in jaipur",
    template: "%s - maacanimationjaipur.com",
  },
  description:
    "MAAC is the high-end 3D Animation & VFX education brand of Aptech. Through its wide network of centres, MAAC has prepared thousands students",
  keywords: [
    "animation institute jaipur",
    "3d animation course jaipur",
    "vfx training jaipur",
    "maac animation jaipur",
    "game design course jaipur",
    "best animation institute rajasthan",
    "animation courses jaipur",
    "vfx courses jaipur",
    "graphic design course jaipur",
    "filmmaking course jaipur",
  ],
  verification: {
    google: "dK9O7oyQ38md-k2VNjfTZJ64trKyvyLqSxlVik7Ak3M",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.maacanimationjaipur.com",
    siteName: "maacanimationjaipur.com",
    title: "Home animation institute in jaipur",
    description:
      "MAAC is the high-end 3D Animation & VFX education brand of Aptech. Through its wide network of centres, MAAC has prepared thousands students",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2021/09/v-toy-sl-3.png",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
    canonical: "/",
  },
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
