import type { Metadata } from "next";
import Link from "next/link";
import { coursesData } from "@/data/courses";

export const metadata: Metadata = {
  title: "Page Not Found - MAAC Animation Jaipur",
  description: "The page you're looking for doesn't exist. Explore our courses, contact us, or return to the homepage.",
  robots: {
    index: false,
    follow: false,
  },
};

const popularCourses = coursesData
  .sort((a, b) => a.priority - b.priority)
  .slice(0, 6);

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col pt-32 md:pt-40">
      {/* 404 Hero */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1A0508 0%, #0C0C0C 50%, #0C0C0C 100%)" }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E31837 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #C4A882 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <span
              className="font-display font-bold text-[10rem] md:text-[14rem] leading-none"
              style={{
                background: "linear-gradient(135deg, #E31837 0%, #C4A882 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              404
            </span>
          </div>

          {/* Message */}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            The page you&apos;re looking for might have been moved, deleted, or never existed. Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="btn bg-gradient-to-r from-[#E31837] to-[#C4132D] text-white hover:opacity-90 border border-[#E31837]/50 px-8 py-4 rounded-lg font-semibold shadow-[0_0_20px_rgba(227,24,55,0.3)]"
            >
              Go to Homepage
            </Link>
            <Link
              href="/"
              className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
            <Link href="/courses" className="bg-[#161616] rounded-lg p-4 border border-white/5 hover:border-[#E31837]/30 transition-colors text-center">
              <span className="text-[#F0EBE1] font-medium text-sm">All Courses</span>
            </Link>
            <Link href="/student-work" className="bg-[#161616] rounded-lg p-4 border border-white/5 hover:border-[#E31837]/30 transition-colors text-center">
              <span className="text-[#F0EBE1] font-medium text-sm">Student Work</span>
            </Link>
            <Link href="/contact" className="bg-[#161616] rounded-lg p-4 border border-white/5 hover:border-[#E31837]/30 transition-colors text-center">
              <span className="text-[#F0EBE1] font-medium text-sm">Free Demo</span>
            </Link>
          </div>

          {/* Popular Courses */}
          <div>
            <h2 className="font-display font-semibold text-xl text-[#F0EBE1] mb-6">
              Popular Courses
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {popularCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group bg-[#161616] rounded-lg p-4 border border-white/5 hover:border-[#E31837]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#E31837] text-xs font-semibold uppercase">{course.code}</span>
                    <span className="text-[#6B6560] text-xs">&middot;</span>
                    <span className="text-[#6B6560] text-xs">{course.duration}</span>
                  </div>
                  <h3 className="text-[#F0EBE1] font-medium text-sm group-hover:text-[#E31837] transition-colors">
                    {course.fullName}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
