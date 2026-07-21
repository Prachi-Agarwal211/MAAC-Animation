import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — MAAC Animation Jaipur",
  description:
    "Terms and conditions for using MAAC Animation Jaipur website. Read our policies regarding content, intellectual property, and user responsibilities.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/terms-of-service",
  },
  openGraph: {
    title: "Terms & Conditions — MAAC Animation Jaipur",
    description: "Terms and conditions for using MAAC Animation Jaipur website.",
    url: "https://www.maacanimationjaipur.com/terms-of-service",
    type: "website",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#C4A882] text-xs tracking-[0.2em] uppercase mb-3 font-display">Legal</p>
        <h1 className="text-3xl md:text-4xl mb-8 gradient-text">Terms &amp; Conditions</h1>

        <div className="space-y-6 text-white/70 leading-relaxed">
          <section className="glass-card p-6 md:p-8">
            <p className="mb-6">Welcome to MAAC Jaipur. By using our website, you agree to these terms and conditions.</p>
            <h2 className="text-white font-display font-semibold text-xl mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on MAAC Jaipur&apos;s website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">3. Intellectual Property</h2>
            <p>The materials on MAAC Jaipur&apos;s website are protected by copyright laws.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
