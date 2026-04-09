import type { Metadata } from "next";
import DemoClassClient from "./DemoClassClient";

export const metadata: Metadata = {
  title: "Book Free Demo Class - MAAC Animation Jaipur",
  description:
    "Experience MAAC Jaipur's teaching methodology firsthand. Book a free demo class for 3D Animation, VFX, Game Design, or Digital Filmmaking. No commitment required.",
  keywords: [
    "demo class animation jaipur",
    "free demo class maac",
    "animation institute demo",
    "vfx demo class jaipur",
    "game design demo",
  ],
  openGraph: {
    type: "website",
    title: "Book Free Demo Class - MAAC Animation Jaipur",
    description:
      "Experience MAAC Jaipur's teaching methodology firsthand. Book a free demo class for 3D Animation, VFX, Game Design, or Digital Filmmaking.",
    url: "https://www.maacanimationjaipur.com/demo-class",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/3.jpg",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur Demo Class",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/demo-class",
  },
};

export default function DemoClassPage() {
  return <DemoClassClient />;
}
