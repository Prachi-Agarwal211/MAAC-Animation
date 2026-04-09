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
    "MAAC Jaipur — Rajasthan's #1 Animation Institute. B.Voc Degree in 3D Animation, VFX & Game Design. 95% Placements. NSDC Certified. Call " + contactInfo.phone + ".",
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
    title: "MAAC Animation Institute Jaipur | Best Animation & VFX Courses",
    description:
      "MAAC Jaipur — Rajasthan's #1 Animation Institute. B.Voc Degree in 3D Animation, VFX & Game Design. 95% Placements. NSDC Certified.",
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
import DemoBar from "@/components/ui/DemoBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#0C0C0C]">
      <head>
        {/* Preload hero videos for instant loading */}
        <link rel="preload" as="video" href="/hero-video-compressed.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/hero-video.webm" type="video/webm" />
        <link rel="preload" as="image" href="/hero-poster.jpg" />
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
