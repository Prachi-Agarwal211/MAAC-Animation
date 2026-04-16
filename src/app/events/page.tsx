import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Events - MAAC Animation Jaipur",
  description: "MAAC Events - At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations, bringing together students, alumni, and faculty.",
  keywords: [
    "maac events jaipur",
    "animation events",
    "maac competitions",
    "student events",
  ],
  openGraph: {
    type: "website",
    title: "Events - MAAC Animation Jaipur",
    description: "MAAC Events - At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations.",
    url: "https://www.maacanimationjaipur.com/events",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - MAAC Animation Jaipur",
    description: "MAAC Events - At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/events",
  },
};

export default function EventsPage() {
  return (
    <>
      <Script
        id="events-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Events - MAAC Animation Jaipur",
            description: "MAAC Events - At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations.",
            url: "https://www.maacanimationjaipur.com/events",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Black background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Abstract decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-4000" />
        
        {/* Additional abstract shapes */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-md" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-lg" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/8 rounded-full blur-sm" />

        {/* Main content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            MAAC EVENTS!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            At MAAC, our dedicated team works tirelessly throughout the year to organize exciting events across various locations, bringing together students, alumni, and faculty.
          </p>
        </div>

        {/* Ask Me button in bottom right */}
        <div className="absolute bottom-8 right-8 z-20">
          <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-2 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ask Me
          </button>
        </div>
      </section>

      {/* Why Attend MAAC Events Section */}
      <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: "#8B2635" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two column layout: Left heading, Right cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side: Heading and description */}
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-6 leading-tight">
                Why Attend<br />MAAC Events?
              </h2>
              <p className="text-sm md:text-base text-white leading-relaxed max-w-lg">
                At MAAC, we don't just teach - we transform careers. Whether you aspire to be an animator, VFX artist, game designer, filmmaker, or digital creator, we equip you with the skills, tools, and global opportunities to succeed.
              </p>
              <button className="mt-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                <span className="font-semibold">Learn More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
            </div>

            {/* Right side: Four feature cards in 2x2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Card 1: Hands-on Learning */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Hands-on Learning</h3>
                <p className="text-white text-sm leading-relaxed">
                  Gain industry insights through live projects, competitions, and expert-led sessions.
                </p>
              </div>

              {/* Card 2: Showcase Your Talent */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Showcase Your Talent</h3>
                <p className="text-white text-sm leading-relaxed">
                  Showcase your talent in national competitions and get noticed by top studios.
                </p>
              </div>

              {/* Card 3: Network with the Best */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Network with the Best</h3>
                <p className="text-white text-sm leading-relaxed">
                  Connect with alumni, faculty, and industry professionals worldwide.
                </p>
              </div>

              {/* Card 4: Get Job-Ready */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Get Job-Ready</h3>
                <p className="text-white text-sm leading-relaxed">
                  Access job placements and internships with leading animation studios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature MAAC Events Section */}
      <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: "#1a1a1a" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-16 leading-tight text-center">
            Signature MAAC Events You Can Be a Part Of!
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: 24FPS International Animation Awards content */}
            <div className="text-left">
              <div className="mb-6">
                <div className="w-32 h-32 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">24FPS</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                24FPS International Animation Awards
              </h3>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                A globally recognized event where students compete with the best in the animation and VFX industry. This is your chance to impress industry leaders and make a mark in the creative world!
              </p>
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors">
                Read More
              </button>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-8">
              {/* Large yellow arrow */}
              <svg className="w-20 h-20 text-yellow-400 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-center justify-center min-h-[400px] border-2 border-dashed border-gray-600 w-full max-w-md">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p className="text-white/70 text-lg">Video will be embedded here</p>
                  <p className="text-white/50 text-sm mt-2">Add your video link later</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100 Hours - The Ultimate Creative Marathon Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/30 mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Logo, Heading, Description, Button */}
            <div className="text-left">
              {/* 100 Race Against Time Logo */}
              <div className="mb-6">
                <div className="w-32 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-black">100 RACE</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                100 Hours - The Ultimate<br />Creative Marathon
              </h3>
              <p className="text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                Push your limits! Create a 3D-animated short film or a 1-minute mobile film in just 100 hours! Work non-stop, collaborate with teammates, and experience the thrill of filmmaking under real-world deadlines.
              </p>
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Right side: Arrow and Image Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-8">
              {/* Large yellow arrow */}
              <svg className="w-20 h-20 text-yellow-400 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Video embed placeholder - you can replace this with actual video embed */}
                <div className="h-64 bg-black flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-white/70 text-lg">Video will be embedded here</p>
                    <p className="text-white/50 text-sm mt-2">Add your video link later</p>
                  </div>
                </div>
                
                {/* Categories overlay */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs text-white/70 font-semibold">CATEGORIES</span>
                  <p className="text-sm text-white font-bold">3D ANIMATION FILM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Event Section - Same Layout */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top white line */}
          <div className="border-t border-white/30 mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Logo, Heading, Description, Button */}
            <div className="text-left">
              {/* Logo placeholder */}
              <div className="mb-6">
                <div className="w-32 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-black">MAAC</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                MAAC Manifest
              </h3>
              <p className="text-base text-white/90 leading-relaxed mb-8 max-w-lg">
                We celebrate YOU! MAAC Manifest is where we honor our students and alumni for their outstanding contributions to the animation and VFX industry. Get recognized for your talent and be inspired by industry leaders.
              </p>
              <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
                Read More
              </button>
            </div>

            {/* Right side: Arrow and Video Card */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-end gap-8">
              {/* Large yellow arrow */}
              <svg className="w-20 h-20 text-yellow-400 transform rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>

              {/* Video Card */}
              <div className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Video embed placeholder - you can replace this with actual video embed */}
                <div className="h-64 bg-black flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-white/70 text-lg">Video will be embedded here</p>
                    <p className="text-white/50 text-sm mt-2">Add your video link later</p>
                  </div>
                </div>
                
                {/* Categories overlay */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs text-white/70 font-semibold">CATEGORIES</span>
                  <p className="text-sm text-white font-bold">WORKSHOPS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}