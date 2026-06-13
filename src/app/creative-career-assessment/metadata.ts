import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Career Assessment | Find Your Path in Animation & VFX",
  description:
    "Discover your perfect career in Animation, VFX, Game Design, or Motion Graphics. Take our free 2-minute creative career assessment at MAAC Jaipur.",
  keywords: [
    "creative career assessment",
    "animation career quiz",
    "vfx career test",
    "which animation course is right for me",
    "creative career path",
    "game design career quiz",
  ],
  openGraph: {
    title: "Creative Career Assessment | MAAC Animation Jaipur",
    description:
      "Take our free 2-minute creative career assessment. Discover if you're meant for Animation, VFX, Game Design, or Motion Graphics.",
    url: "https://www.maacanimationjaipur.com/creative-career-assessment",
    type: "website",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Career Assessment — MAAC Animation Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Career Assessment | MAAC Animation Jaipur",
    description:
      "Take our free 2-minute creative career assessment. Discover if you're meant for Animation, VFX, Game Design, or Motion Graphics.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical:
      "https://www.maacanimationjaipur.com/creative-career-assessment",
  },
  robots: {
    index: true,
    follow: true,
  },
};
