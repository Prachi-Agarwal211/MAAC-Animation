import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - MAAC Animation Jaipur",
  description: "MAAC Jaipur - Privacy policy and terms of use for our website.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Disclaimer</h1>
        <div className="space-y-6 text-[#A8A29C]">
          <p>Welcome to the disclaimer page of MAAC Animation Jaipur.</p>
          <p>All the information on this website is published in good faith and for general information purpose only. Any action you take upon the information you find on this website is strictly at your own risk. MAAC Animation Jaipur will not be liable for any losses and/or damages in connection with the use of our website.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">Our Disclaimer</h2>
          <p>1. This website is for informational purposes only.</p>
          <p>2. We make no representations about the completeness, reliability, accuracy, or validity of any information on this site.</p>
          <p>3. All logos and trademarks on this site are the property of their respective owners.</p>
        </div>
      </div>
    </main>
  );
}
