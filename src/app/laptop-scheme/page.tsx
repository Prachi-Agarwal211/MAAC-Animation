import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laptop Scheme Terms - MAAC Animation Jaipur",
  description: "MAAC Laptop Scheme terms and conditions.",
};

export default function LaptopSchemePage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Laptop Scheme Terms</h1>
        <div className="space-y-6 text-[#A8A29C]">
          <p>Welcome to MAAC Laptop Scheme. Please read the terms carefully before applying.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">Eligibility</h2>
          <p>Eligible students can avail of laptop schemes with special offers. Contact our counselors for details.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">Terms and Conditions</h2>
          <p>Scheme terms are subject to change. Please confirm current terms with our admission office.</p>
          <p className="text-[#E31837] font-bold">For more information, visit our C-Scheme center in Jaipur or call +91-7300001589.</p>
        </div>
      </div>
    </main>
  );
}
