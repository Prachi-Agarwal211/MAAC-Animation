import type { Metadata } from "next";
import CareerAssessmentClient from "./CareerAssessmentClient";

export const metadata: Metadata = {
  title: "Creative Career Assessment",
  description: "Take our interactive quiz to discover if a career in Animation, VFX, or Game Design is right for you.",
  openGraph: {
    title: "Creative Career Assessment | MAAC Jaipur",
    description: "Take our interactive quiz to discover if a career in Animation, VFX, or Game Design is right for you.",
    url: "https://www.maacanimationjaipur.com/creative-career-assessment",
    siteName: "MAAC Jaipur",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Career Assessment | MAAC Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Career Assessment | MAAC Jaipur",
    description: "Take our interactive quiz to discover if a career in Animation, VFX, or Game Design is right for you.",
    images: ["https://www.maacanimationjaipur.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/creative-career-assessment",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CareerAssessmentPage() {
  return <CareerAssessmentClient />;
}
