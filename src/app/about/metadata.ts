import { Metadata } from "next";
import { clampTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: clampTitle("About MAAC Animation Institute Jaipur | 30+ Years Excellence"),
  description:
    "Learn about MAAC Jaipur — animation institute in C-Scheme since 1998. Expert faculty, NSDC certified courses, dedicated placement support.",
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
      "Learn about MAAC Jaipur — animation institute in C-Scheme since 1998. Expert faculty, NSDC certified courses, dedicated placement support.",
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
    title: "About MAAC Jaipur | Leading Animation Institute in Rajasthan",
    description:
      "Discover MAAC Jaipur — animation, VFX & filmmaking institute in C-Scheme with NSDC certification and placement support.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/about",
  },
};
