import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAAC Jaipur Gallery — Campus, Events & Student Work",
  description: "Explore MAAC Jaipur's state-of-the-art campus, student projects, events, and workshops. See our animation labs, VFX studios, and student showreels.",
  keywords: [
    "maac jaipur campus photos",
    "animation student work jaipur",
    "vfx projects maac",
    "maac jaipur infrastructure",
    "student showreel maac",
  ],
  openGraph: {
    title: "MAAC Jaipur Gallery | Campus & Student Work",
    description: "Tour our world-class campus, view student projects, and see our animation labs in action",
    url: "https://maacjaipur.com/gallery",
    type: "website",
    images: [
      {
        url: "/og-gallery.jpg",
        width: 1200,
        height: 630,
        alt: "MAAC Jaipur Campus Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAAC Jaipur Gallery | Campus & Student Work",
    description: "Tour our world-class campus, view student projects, and see our animation labs in action",
  },
  alternates: {
    canonical: "https://maacjaipur.com/gallery",
  },
};
