import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact MAAC Jaipur — Book Free Demo Class",
  description: "Get in touch with MAAC Jaipur. Call +91-7300001589, email maacanimationjaipur@gmail.com, or visit us at Subhash Marg. Book your free demo class today.",
  openGraph: {
    title: "Contact MAAC Jaipur",
    description: "Get in touch with Rajasthan's leading animation institute",
    url: "https://maacjaipur.com/contact",
  },
  alternates: {
    canonical: "https://maacjaipur.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
