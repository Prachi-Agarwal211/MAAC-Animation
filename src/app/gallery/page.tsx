import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Student Gallery — MAAC Jaipur Animation & VFX Work",
  description: "Explore incredible student work from MAAC Jaipur's animation, VFX, gaming, and design programs. See the creative projects created by our talented students.",
  openGraph: {
    title: "Student Gallery | MAAC Jaipur",
    description: "Incredible student work in animation, VFX, gaming, and design",
    url: "https://maacjaipur.com/gallery",
  },
  alternates: {
    canonical: "https://maacjaipur.com/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
