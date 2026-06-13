import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Work Gallery | MAAC Animation Jaipur",
  description:
    "Explore outstanding student projects from MAAC Jaipur — 3D animations, VFX breakdowns, game art, motion graphics, and short films crafted by our talented students.",
  keywords: [
    "MAAC student work",
    "animation student projects",
    "VFX showreel",
    "game design portfolio",
    "motion graphics projects",
    "student films MAAC",
    "animation institute student work",
  ],
  openGraph: {
    title: "Student Work Gallery | MAAC Animation Jaipur",
    description:
      "Explore outstanding student projects from MAAC Jaipur — 3D animations, VFX breakdowns, game art, motion graphics, and short films.",
    url: "https://www.maacanimationjaipur.com/student-work",
    type: "website",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Student Work Gallery | MAAC Animation Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Work Gallery | MAAC Animation Jaipur",
    description:
      "Explore outstanding student projects from MAAC Jaipur — 3D animations, VFX breakdowns, game art, motion graphics, and short films.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/student-work",
  },
  robots: {
    index: true,
    follow: true,
  },
};
