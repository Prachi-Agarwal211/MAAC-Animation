import { Metadata } from "next";
import { clampTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: clampTitle("Events & Campus Life | MAAC Animation Jaipur"),
  description:
    "Experience the vibrant life at MAAC Jaipur. From national competitions like CREATA & RAIN Awards to 100-hour film marathons, masterclasses, and unforgettable campus moments from our events.",
  openGraph: {
    title: "Events & Campus Life | MAAC Animation Jaipur",
    description:
      "India's premier animation institute events: national competitions, industry masterclasses, student meets, photography expeditions, and the unforgettable moments that shape creative careers.",
    url: "https://www.maacanimationjaipur.com/events",
    type: "website",
    siteName: "MAAC Animation Jaipur",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/events/event-015.jpeg",
        width: 1200,
        height: 630,
        alt: "MAAC Jaipur Events - Captured Moments from Campus Celebrations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Campus Life | MAAC Animation Jaipur",
    description:
      "National competitions, masterclasses, 100hr challenges & unforgettable moments from MAAC Jaipur's vibrant campus life.",
    images: ["https://www.maacanimationjaipur.com/events/event-015.jpeg"],
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/events",
  },
  keywords: [
    "MAAC events Jaipur",
    "animation competitions India",
    "RAIN Awards",
    "CREATA competition",
    "100 hour film challenge",
    "MAAC National Students Meet",
    "animation institute events",
    "MAAC Jaipur campus life",
    "VFX masterclasses",
    "student film festivals",
  ],
};
