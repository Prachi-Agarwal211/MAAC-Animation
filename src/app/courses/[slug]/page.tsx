import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import FadeIn from "@/components/animations/FadeIn";
import CourseFAQ from "@/components/courses/CourseFAQ";
import { getCourseBySlug, getAllCourseSlugs } from "@/data/courses";
import { getCourseSchema, breadcrumbSchema } from "@/lib/structured-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.name} | MAAC Jaipur`,
    description: course.shortDescription,

    openGraph: {
      title: `${course.name} | MAAC Jaipur`,
      description: course.shortDescription,
      url: `https://www.maacanimationjaipur.com/courses/${course.slug}`,
      type: "website",
      siteName: "maacanimationjaipur.com",
      locale: "en_US",
      images: [
        {
          url: `https://www.maacanimationjaipur.com${course.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${course.name} Course in Jaipur`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.name} | MAAC Jaipur`,
      description: course.shortDescription,
    },
    alternates: {
      canonical: `https://www.maacanimationjaipur.com/courses/${course.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const schema = getCourseSchema(
    `${course.name} Course in Jaipur`,
    course.shortDescription,
    course.duration
  );
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://www.maacanimationjaipur.com" },
    { name: "Courses", url: "https://www.maacanimationjaipur.com/courses" },
    {
      name: course.name,
      url: `https://www.maacanimationjaipur.com/courses/${course.slug}`,
    },
  ]);

  return (
    <>
      <Script
        type="application/ld+json"
        id="course-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [schema, breadcrumbs],
          }),
        }}
      />

      <main className="bg-[#080808] min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808] z-10" />
          </div>
          <div className="relative z-20 text-center px-6 pt-20 max-w-4xl mx-auto">
            <FadeIn>
              <nav className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-white/85">
                <Link href="/" className="hover:text-[#C4A882] transition-colors">
                  Home
                </Link>
                <span className="mx-3">/</span>
                <Link href="/courses" className="hover:text-[#C4A882] transition-colors">
                  Courses
                </Link>
                <span className="mx-3">/</span>
                <span className="text-[#C4A882]">{course.name}</span>
              </nav>
              <p className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                {course.duration}
              </p>
              <h1 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[0.9] text-white mb-6 font-bold uppercase tracking-[0.05em]">
                {`${course.name} Course`.split(" in ")[0]}{" "}
                <span className="metallic-gold-text font-bold italic text-[1.1em]">
                  Jaipur
                </span>
              </h1>
              <p className="text-white/85 text-lg max-w-2xl mx-auto leading-relaxed">
                {course.shortDescription}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Overview */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-6 font-bold uppercase tracking-[0.05em]">
                    About the <span className="metallic-gold-text italic">Program</span>
                  </h2>
                  <p className="text-white/85 text-lg leading-relaxed">
                    {course.fullDescription}
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="font-display text-xl text-[#F0EBE1] font-bold uppercase tracking-wider">
                    Program Highlights
                  </h3>
                  <ul className="space-y-3">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/85">
                        <span className="text-[#C4A882] mt-1">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Software & Careers */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="font-display text-xl text-[#F0EBE1] font-bold uppercase tracking-wider mb-6">
                    Software You&apos;ll Master
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {course.tools.map((sw, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#C4A882] font-medium"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#F0EBE1] font-bold uppercase tracking-wider mb-6">
                    Career Opportunities
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {course.career.map((career, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/85"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-12 font-bold uppercase tracking-[0.05em]">
                Curriculum <span className="metallic-gold-text italic">Overview</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {course.curriculum.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <span className="text-[#C4A882] font-display text-2xl font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/85 text-lg">{m.module}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Enrollment Process */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-12 font-bold uppercase tracking-[0.05em]">
                How to <span className="metallic-gold-text italic">Enroll</span>
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Free Demo Class", desc: "Visit our C-Scheme campus for a free demo class. Experience our teaching methodology, labs, and software before deciding." },
                  { step: "02", title: "Career Counseling", desc: "Meet our academic counselors who will assess your interests, recommend the right course, and explain fee structure and financing options." },
                  { step: "03", title: "Enrollment & Payment", desc: "Complete the enrollment form, submit required documents (10+2 marksheet, ID proof), and choose from EMI, education loan, or upfront payment options." },
                  { step: "04", title: "Start Learning", desc: "Begin classes with our expert faculty. Access industry-standard software, labs, and get assigned a mentor for your learning journey." },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
                    <span className="text-[#C4A882] font-display text-3xl font-bold block mb-3">{item.step}</span>
                    <h3 className="text-[#F0EBE1] font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Duration & Eligibility */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A882] mb-3">
                    Duration
                  </p>
                  <p className="text-2xl font-display font-bold text-white">{course.duration}</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A882] mb-3">
                    Eligibility
                  </p>
                  <p className="text-2xl font-display font-bold text-white">{course.eligibility}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <CourseFAQ course={course} />
        <IndustryPartners />
        <ApplyNow />
      </main>
    </>
  );
}
