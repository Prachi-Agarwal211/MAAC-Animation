import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animation Course in Malviya Nagar, Jaipur | MAAC Institute",
  description: "Looking for animation courses in Malviya Nagar, Jaipur? MAAC offers B.Voc, diploma in 3D Animation, VFX, Game Design. 95% placement. Free demo class. Call +91-7300001589",
  keywords: [
    "animation course malviya nagar jaipur",
    "vfx training malviya nagar",
    "3d animation institute near me",
    "best animation college in malviya nagar",
    "game design course malviya nagar jaipur",
    "maac jaipur malviya nagar",
    "animation classes near malviya nagar",
  ],
  openGraph: {
    title: "Animation Courses in Malviya Nagar | MAAC Jaipur",
    description: "Premium animation & VFX training in Malviya Nagar, Jaipur. B.Voc degree, 95% placement",
    url: "https://www.maacanimationjaipur.com/locations/malviya-nagar",
    type: "website",
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/locations/malviya-nagar",
  },
};

export default function MalviyaNagarPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] pt-32 pb-20">
      {/* Structured Data - LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "MAAC Jaipur - Malviya Nagar Center",
            "url": "https://www.maacanimationjaipur.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "711-712, Ambition Tower, 7th Floor, Malviya Nagar",
              "addressLocality": "Jaipur",
              "addressRegion": "Rajasthan",
              "postalCode": "302017",
              "addressCountry": "IN",
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 26.8466,
              "longitude": 75.8069,
            },
            "telephone": "+91-7300001589",
            "openingHours": "Mo-Sa 09:00-19:00",
            "areaServed": {
              "@type": "Place",
              "name": "Malviya Nagar, Jaipur",
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Nearest to You
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#F0EBE1] mb-6">
            Animation Courses in Malviya Nagar, Jaipur
          </h1>
          <p className="text-[#6b6b6b] text-lg max-w-3xl">
            Looking for the best animation institute near Malviya Nagar? MAAC Jaipur offers industry-leading courses in 3D Animation, VFX, Game Design, and Digital Filmmaking with 95% placement record.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h2 className="font-display font-bold text-2xl text-[#F0EBE1] mb-4">
              Why Choose MAAC in Malviya Nagar?
            </h2>
            <ul className="space-y-3 text-[#A8A29C]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E31837] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Prime location in Malviya Nagar, easily accessible from all parts of Jaipur</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E31837] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>State-of-the-art computer labs with latest animation software</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E31837] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Expert faculty from top studios like DNEG, Prime Focus</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E31837] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Flexible batch timings - regular, weekend, and evening classes</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E31837] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free demo classes and career counseling sessions</span>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-[#E31837]/10 border border-[#E31837]/20 rounded-2xl">
              <h3 className="font-display font-bold text-xl text-[#F0EBE1] mb-2">
                📍 Serving Nearby Areas
              </h3>
              <p className="text-[#A8A29C] text-sm">
                Students from C-Scheme, Vaishali Nagar, Jagatpura, Mansarovar, and all across Jaipur commute to our Malviya Nagar center for quality animation education.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="font-display font-bold text-2xl text-[#F0EBE1] mb-6">
              Visit Our Center
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#6b6b6b] text-sm mb-1">Address</p>
                <p className="text-[#F0EBE1]">
                  711-712, Ambition Tower, 7th Floor<br />
                  Malviya Nagar, Jaipur<br />
                  Rajasthan 302017
                </p>
              </div>

              <div>
                <p className="text-[#6b6b6b] text-sm mb-1">Phone</p>
                <a href="tel:+917300001589" className="text-[#E31837] hover:underline">
                  +91-7300001589
                </a>
              </div>

              <div>
                <p className="text-[#6b6b6b] text-sm mb-1">Hours</p>
                <p className="text-[#F0EBE1]">Monday - Saturday: 9 AM - 7 PM</p>
              </div>

              <a
                href="/contact"
                className="btn btn-primary w-full justify-center mt-6"
              >
                Book Free Demo Class
              </a>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-20">
          <h2 className="font-display font-bold text-3xl text-[#F0EBE1] mb-8 text-center">
            Courses Offered at Malviya Nagar
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "3D Animation",
                duration: "18-24 Months",
                degree: "Diploma / B.Voc",
              },
              {
                name: "Visual Effects (VFX)",
                duration: "18-24 Months",
                degree: "Diploma / B.Voc",
              },
              {
                name: "Game Design",
                duration: "18-24 Months",
                degree: "Diploma / B.Voc",
              },
            ].map((course) => (
              <div key={course.name} className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-bold text-xl text-[#F0EBE1] mb-2">
                  {course.name}
                </h3>
                <p className="text-[#6b6b6b] text-sm mb-4">{course.duration}</p>
                <p className="text-[#E31837] text-sm font-semibold">{course.degree}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
