import type { Metadata } from "next";
import PlacementsClient from "./PlacementsClient";

export const metadata: Metadata = {
  title: "Placements — MAAC Jaipur 95% Placement Record",
  description: "MAAC Jaipur's 95% placement rate with 500+ hiring partners including DNEG, Prime Focus, Redchillies VFX, MPC, Technicolor, Ubisoft, EA Games, and Rockstar Games.",
  openGraph: {
    title: "Placements | MAAC Jaipur",
    description: "95% placement rate with 500+ hiring partners",
    url: "https://maacjaipur.com/placements",
  },
  alternates: {
    canonical: "https://maacjaipur.com/placements",
  },
};

export default function PlacementsPage() {
  return <PlacementsClient />;
}
