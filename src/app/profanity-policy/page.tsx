import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profanity Policy - MAAC Animation Jaipur",
  description: "MAAC's profanity policy and community guidelines.",
};

export default function ProfanityPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Profanity Policy</h1>
        <div className="space-y-6 text-[#A8A29C]">
          <p>MAAC Animation Jaipur maintains a professional and respectful environment.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">Code of Conduct</h2>
          <p>We expect all students, faculty, and visitors to communicate respectfully and professionally.</p>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">Consequences</h2>
          <p>Any form of profanity or inappropriate language may result in disciplinary action.</p>
        </div>
      </div>
    </main>
  );
}
