import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MAAC Animation Institute Jaipur | 30+ Years Excellence",
  description:
    "Learn about MAAC Jaipur — Rajasthan's leading animation institute with 30+ years of excellence. Expert faculty, NSDC certified courses, 95% placement record.",
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
  openGraph: {
    title: "About MAAC Animation Institute Jaipur | 30+ Years Excellence",
    description:
      "Learn about MAAC Jaipur — Rajasthan's leading animation institute with 30+ years of excellence. Expert faculty, NSDC certified courses, 95% placement record.",
    url: "https://www.maacanimationjaipur.com/about",
    type: "website",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "About MAAC Animation Institute Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "About MAAC Jaipur | Best Animation Institute in Rajasthan",
    description:
      "Discover MAAC Jaipur – Rajasthan's #1 animation, VFX & digital filmmaking institute with 30+ years of legacy, 5000+ alumni, and placement assistance.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/about",
  },
};
