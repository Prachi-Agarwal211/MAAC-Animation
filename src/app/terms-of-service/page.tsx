import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - MAAC Animation Jaipur",
  description: "Terms and conditions for using MAAC Jaipur website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms & Conditions</h1>
        <div className="space-y-6 text-[#A8A29C]">
          <p>Welcome to MAAC Jaipur. By using our website, you agree to these terms and conditions.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on MAAC Jaipur&apos;s website for personal, non-commercial transitory viewing only.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">3. Intellectual Property</h2>
          <p>The materials on MAAC Jaipur&apos;s website are protected by copyright laws.</p>
        </div>
      </div>
    </main>
  );
}
