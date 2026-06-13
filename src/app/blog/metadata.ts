import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | MAAC Animation Jaipur",
  description:
    "Industry trends, career guidance, and expert tips from the masters at MAAC Animation Jaipur. Learn about animation, VFX, game design, and creative careers.",
  keywords: [
    "animation blog",
    "VFX career tips",
    "animation course guidance",
    "MAAC blog",
    "creative career advice",
    "game design tips",
    "animation industry trends",
  ],
  openGraph: {
    title: "Blog & Insights | MAAC Animation Jaipur",
    description:
      "Industry trends, career guidance, and expert tips from the masters at MAAC Animation Jaipur.",
    url: "https://www.maacanimationjaipur.com/blog",
    type: "website",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog & Insights | MAAC Animation Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | MAAC Animation Jaipur",
    description:
      "Industry trends, career guidance, and expert tips from the masters at MAAC Animation Jaipur.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};
