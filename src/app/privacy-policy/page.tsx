import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | MAAC Jaipur',
  description: 'Privacy Policy for MAAC Animation Jaipur C-Scheme. Learn how we collect, use, and protect your personal information.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.maacanimationjaipur.com/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | MAAC Jaipur',
    description: 'Privacy Policy for MAAC Animation Jaipur C-Scheme. Learn how we collect, use, and protect your personal information.',
    url: 'https://www.maacanimationjaipur.com/privacy-policy',
    siteName: 'MAAC Animation Jaipur',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | MAAC Jaipur',
    description: 'Privacy Policy for MAAC Animation Jaipur C-Scheme. Learn how we collect, use, and protect your personal information.',
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#C4A882] text-xs tracking-[0.2em] uppercase mb-3 font-display">Legal</p>
        <h1 className="text-3xl md:text-4xl mb-2 gradient-text">Privacy Policy</h1>
        <p className="text-white/70 text-sm mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-white/85 leading-relaxed">
          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">1. Information We Collect</h2>
            <p>When you use our website or submit an enquiry, we may collect personal information including your name, email address, phone number, and course interests. This information is collected only when voluntarily provided by you through our forms.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">2. How We Use Your Information</h2>
            <p>We use your information to respond to enquiries, provide information about our courses, contact you about admissions, and improve our website and services. We do not sell or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">3. Data Security</h2>
            <p>We take appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure or destruction. Your form submissions are transmitted securely.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">4. Cookies</h2>
            <p>Our website uses essential cookies to ensure basic functionality. We also use analytics tools (Vercel Analytics) to understand how visitors interact with our site. These analytics are privacy-preserving and do not track individual users across websites.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">5. Third-Party Links</h2>
            <p>Our website may contain links to external websites (social media, Google Maps, YouTube). We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information that we hold. To exercise these rights, please contact us at maacanimationjaipur@gmail.com or call +91-7300001589.</p>
          </section>

          <section className="glass-card p-6 md:p-8">
            <h2 className="text-white font-display font-semibold text-xl mb-3">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact:</p>
            <address className="not-italic mt-3 text-white/80">
              <strong className="text-white">MAAC Animation Jaipur C-Scheme</strong><br />
              711-712, Ambition Tower, 7th Floor, Subhash Marg, C Scheme, Jaipur, Rajasthan 302001<br />
              Email: maacanimationjaipur@gmail.com<br />
              Phone: +91-7300001589
            </address>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-[#C4A882] hover:text-[#C4A882]/80 text-sm transition-colors">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
