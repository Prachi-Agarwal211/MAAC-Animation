import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About MAAC Jaipur — 30+ Years of Excellence in Animation Education",
  description: "Learn about MAAC Jaipur's 30+ year legacy, expert faculty, industry partnerships, and commitment to excellence in animation, VFX, and gaming education.",
  openGraph: {
    title: "About MAAC Jaipur",
    description: "30+ years of excellence in animation education with 95% placement rate",
    url: "https://maacjaipur.com/about",
  },
  alternates: {
    canonical: "https://maacjaipur.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
