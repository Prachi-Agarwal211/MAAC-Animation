import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - maacanimationjaipur.com",
  description: "Explore MAAC Jaipur's campus photos, student projects, events, and workshops. See our animation labs, VFX studios, and creative work in action.",
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
    title: "Gallery - maacanimationjaipur.com",
    url: "https://www.maacanimationjaipur.com/gallery/",
    type: "article",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/Screenshot-2025-06-25-134820.png",
        width: 1200,
        height: 630,
        alt: "Gallery - maacanimationjaipur.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery - maacanimationjaipur.com",
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/gallery/",
  },
};
