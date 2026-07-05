import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | MAAC Animation Jaipur",
  description:
    "Explore MAAC Jaipur's campus photos, student projects, events, and workshops. See our animation labs, VFX studios, and creative work in action.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Photo Gallery | MAAC Animation Jaipur",
    description: "Explore MAAC Jaipur's campus photos, student projects, events, and workshops.",
    url: "https://www.maacanimationjaipur.com/gallery",
    type: "website",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Photo Gallery | MAAC Animation Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | MAAC Animation Jaipur",
    description: "Explore MAAC Jaipur's campus photos, student projects, events, and workshops.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/gallery",
  },
};
