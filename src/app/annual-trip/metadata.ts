import { Metadata } from "next";
import { clampTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: clampTitle("Annual Trips at MAAC Animation Institute Jaipur"),
  description:
    "Discover the unforgettable annual adventure trips at MAAC Jaipur. Relive the breathtaking journeys, stunning landscapes, and cherished memories from our students and faculty excursions across India's most beautiful destinations.",
  keywords: [
    "MAAC annual trip",
    "MAAC Jaipur excursions",
    "animation institute trips",
    "student adventure trips",
    "MAAC memories",
    "college trips Jaipur",
    "creative institute outings",
  ],
  openGraph: {
    title: "Annual Trips at MAAC | MAAC Animation Jaipur",
    description:
      "Explore the breathtaking annual trips at MAAC Jaipur — adventure, bonding, and unforgettable memories captured in stunning photography.",
    url: "https://www.maacanimationjaipur.com/annual-trip",
    type: "website",
    siteName: "MAAC Animation Jaipur",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MAAC Annual Trip - Adventure and Memories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Annual Trips at MAAC | MAAC Animation Jaipur",
    description:
      "Explore the breathtaking annual trips at MAAC Jaipur — adventure, bonding, and unforgettable memories captured in stunning photography.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/annual-trip",
  },
  robots: {
    index: true,
    follow: true,
  },
};
