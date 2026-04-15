import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Certificate - MAAC Animation Jaipur",
  description: "Verify your MAAC certificate authenticity.",
};

export default function VerifyCertificatePage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Verify Your Certificate</h1>
        <div className="space-y-6 text-[#A8A29C]">
          <p>Verify your MAAC certificate by entering your certificate ID or details.</p>
          <p>Contact us at +91-7300001589 for certificate verification assistance.</p>
          <p className="text-[#E31837] font-bold">Alternatively, you can contact our main office at C-Scheme, Jaipur.</p>
        </div>
      </div>
    </main>
  );
}
