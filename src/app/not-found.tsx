import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { coursesData, courseCategories } from "@/data/courses";
import { contactInfo, statsData } from "@/data/siteData";
import { Frown, Home, BookOpen, Users, Calendar, Phone, MapPin, Mail, ChevronRight, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found (404) - MAAC Animation Jaipur",
  description: "The page you're looking for doesn't exist at MAAC Animation Jaipur. Explore our animation, VFX, and game design courses, or contact us for assistance.",
  robots: {
    index: false,
    follow: false,
  },
};

const popularCourses = [...coursesData]
  .sort((a, b) => a.priority - b.priority)
  .slice(0, 6);

const quickLinks = [
  { label: "All Courses", href: "/courses", icon: BookOpen },
  { label: "Student Work", href: "/student-work", icon: Users },
  { label: "Events & Campus", href: "/events", icon: Calendar },
  { label: "Free Demo Class", href: "/contact", icon: Phone },
  { label: "Blog & Insights", href: "/blog", icon: Search },
  { label: "About MAAC", href: "/about", icon: Users },
];

export default function NotFound() {
  return (
    <>
      {/* Structured Data for 404 page */}
      <Script
        id="404-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.maacanimationjaipur.com" },
                  { "@type": "ListItem", "position": 2, "name": "Page Not Found", "item": "https://www.maacanimationjaipur.com" },
                ],
              },
              {
                "@type": "WebPage",
                "name": "404 - Page Not Found - MAAC Animation Jaipur",
                "description": "The requested page could not be found. Explore MAAC Animation Jaipur courses, admissions, and campus life.",
                "url": "https://www.maacanimationjaipur.com",
                "mainEntity": {
                  "@type": "EducationalOrganization",
                  "name": "MAAC Animation Jaipur",
                  "url": "https://www.maacanimationjaipur.com",
                  "telephone": contactInfo.phone,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "711-712, Ambition Tower, 7th Floor, Subhash Marg, C Scheme",
                    "addressLocality": "Jaipur",
                    "addressRegion": "Rajasthan",
                    "postalCode": "302001",
                    "addressCountry": "IN"
                  }
                }
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen flex flex-col pt-20 md:pt-28">
        <section className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1A0508 0%, #0C0C0C 50%, #0C0C0C 100%)" }} />
          <div className="absolute top-20 right-10 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #C4A882 0%, transparent 70%)" }} />
          <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #E31837 0%, transparent 70%)" }} />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* ── Hero ── */}
            <div className="text-center mb-16">
              {/* 404 Number with gradient */}
              <div className="mb-4 relative">
                <span
                  className="font-display text-[8rem] md:text-[14rem] font-bold leading-[0.85] tracking-[-0.04em]"
                  style={{
                    background: "linear-gradient(135deg, #C4A882 0%, #FCF6BA 30%, #B38728 60%, #AA771C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  404
                </span>
              </div>

              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6">
                <Frown size={14} className="text-[#C4A882]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/85">PAGE NOT FOUND</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl text-[#F0EBE1] mb-4 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                Looks Like You&apos;ve Taken a Wrong Turn
              </h1>
              <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                The page you&apos;re looking for doesn&apos;t exist at MAAC Animation Jaipur. But don&apos;t worry — there&apos;s plenty more to explore. Check out our courses, student work, or reach out for a free demo class.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#BF953F] to-[#C4132D] text-white hover:opacity-90 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(227,24,55,0.3)] hover:shadow-[0_0_50px_rgba(227,24,55,0.5)] transition-all duration-300"
                >
                  <Home size={16} />
                  Go to Homepage
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300"
                >
                  <BookOpen size={16} />
                  Explore Courses
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#C4A882]/10 text-[#C4A882] border border-[#C4A882]/30 hover:bg-[#C4A882]/20 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300"
                >
                  <Phone size={16} />
                  Free Demo Class
                </Link>
              </div>
            </div>

            {/* ── Quick Links Grid ── */}
            <div className="mb-16">
              <h2 className="font-display text-xl text-[#F0EBE1] mb-6 font-bold uppercase tracking-[0.1em] text-center">
                Navigate to <span className="metallic-gold-text italic">Key Pages</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex flex-col items-center gap-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.06] hover:border-[#C4A882]/30 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#C4A882]/10 group-hover:scale-110 transition-all duration-300">
                        <Icon size={18} className="text-[#C4A882]" />
                      </div>
                      <span className="text-white/85 text-xs font-bold uppercase tracking-wider text-center group-hover:text-[#C4A882] transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── Course Categories ── */}
            <div className="mb-16">
              <h2 className="font-display text-xl text-[#F0EBE1] mb-6 font-bold uppercase tracking-[0.1em] text-center">
                Browse by <span className="metallic-gold-text italic">Category</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {courseCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/courses`}
                    className="group relative bg-white/[0.03] border border-white/5 rounded-2xl p-5 overflow-hidden hover:border-[#C4A882]/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(135deg, rgba(196,168,130,0.05) 0%, transparent 50%)" }}
                    />
                    <div className="relative z-10">
                      <span className="text-[#C4A882] text-xs font-bold uppercase tracking-wider">{cat.title}</span>
                      <p className="text-white/50 text-[10px] mt-1">{cat.count} courses</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Popular Courses ── */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-[#F0EBE1] font-bold uppercase tracking-[0.1em]">
                  Popular <span className="metallic-gold-text italic">Courses</span>
                </h2>
                <Link href="/courses" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A882] hover:text-white transition-colors flex items-center gap-1">
                  View All <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCourses.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="group bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.06] hover:border-[#C4A882]/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A882]">{course.code}</span>
                      <span className="text-[10px] text-white/50">{course.duration}</span>
                    </div>
                    <h3 className="text-[#F0EBE1] font-bold text-sm mb-2 group-hover:text-[#C4A882] transition-colors leading-snug">
                      {course.fullName}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                      {course.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#C4A882] group-hover:gap-3 transition-all">
                      Learn More <ChevronRight size={10} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Stats Ticker ── */}
            <div className="mb-16 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statsData.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="metallic-gold-text font-display text-3xl md:text-4xl font-bold">
                      {stat.number}{stat.suffix}
                    </span>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Contact CTA ── */}
            <div className="text-center bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-3xl p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl text-[#F0EBE1] mb-4 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                Still Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8">
                Our admissions team is ready to help you find the perfect course and answer all your questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-3 bg-[#E31837] text-white px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#B8132C] transition-all shadow-[0_0_20px_rgba(227,24,55,0.3)]"
                >
                  <Phone size={14} />
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/20 transition-all"
                >
                  <Mail size={14} />
                  Email Us
                </a>
                <a
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all"
                >
                  <MapPin size={14} />
                  Visit Campus
                </a>
              </div>
              <p className="text-white/50 text-xs mt-6">
                {contactInfo.address} &middot; Mon–Sat 9:00 AM – 7:00 PM
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
