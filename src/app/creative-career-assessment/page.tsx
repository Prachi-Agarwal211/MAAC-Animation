import type { Metadata } from "next";
import CareerAssessmentClient from "./CareerAssessmentClient";

export const metadata: Metadata = {
  title: "Creative Career Assessment",
  description: "Take our interactive quiz to discover if a career in Animation, VFX, or Game Design is right for you.",
  openGraph: {
    title: "Creative Career Assessment | MAAC Jaipur",
    description: "Take our interactive quiz to discover if a career in Animation, VFX, or Game Design is right for you.",
  },
};

export default function CareerAssessmentPage() {
  return <CareerAssessmentClient />;
}
