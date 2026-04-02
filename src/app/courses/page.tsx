import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses at MAAC Jaipur — 3D Animation, VFX, Gaming, Filmmaking",
  description: "Explore MAAC Jaipur's industry-leading courses in 3D Animation, VFX, Game Design, Digital Filmmaking, and Digital Media. B.Voc degrees and diploma programs available.",
  openGraph: {
    title: "Courses at MAAC Jaipur",
    description: "Industry-leading animation, VFX, and gaming courses",
    url: "https://maacjaipur.com/courses",
  },
  alternates: {
    canonical: "https://maacjaipur.com/courses",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
