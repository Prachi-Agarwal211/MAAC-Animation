import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Work Gallery | MAAC Animation Jaipur",
  description:
    "Explore MAAC Jaipur's campus photos, student projects, events, and workshops. See our animation labs, VFX studios, and creative work in action.",
  robots: {
    index: false, // Until real gallery images are uploaded
    follow: true,
  },
  openGraph: {
    title: "Student Work Gallery | MAAC Animation Jaipur",
    url: "https://www.maacanimationjaipur.com/gallery",
    type: "article",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/Screenshot-2025-06-25-134820.png",
        width: 1200,
        height: 630,
        alt: "Student Work Gallery | MAAC Animation Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Work Gallery | MAAC Animation Jaipur",
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/gallery",
  },
};
