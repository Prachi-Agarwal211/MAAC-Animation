import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Footer from "@/components/Footer";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import FadeIn from "@/components/animations/FadeIn";
import { getCourseBySlug, getAllCourseSlugs } from "@/data/courseDetails";
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
    title: `${course.title} | MAAC Animation Jaipur`,
    description: course.description,
    keywords: course.keywords,
    openGraph: {
      title: `${course.title} | MAAC Animation Jaipur`,
      description: course.description,
      url: `https://www.maacanimationjaipur.com/courses/${course.slug}`,
      type: "website",
      siteName: "maacanimationjaipur.com",
      locale: "en_US",
      images: [
        {
          url: `https://www.maacanimationjaipur.com${course.image}`,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | MAAC Animation Jaipur`,
      description: course.description,
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
    course.title,
    course.description,
    course.duration
  );
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://www.maacanimationjaipur.com" },
    { name: "Courses", url: "https://www.maacanimationjaipur.com/courses" },
    {
      name: course.shortTitle,
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
              <nav className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-[#A8A29C]">
                <Link href="/" className="hover:text-[#FFD700] transition-colors">
                  Home
                </Link>
                <span className="mx-3">/</span>
                <Link href="/courses" className="hover:text-[#FFD700] transition-colors">
                  Courses
                </Link>
                <span className="mx-3">/</span>
                <span className="text-[#FFD700]">{course.shortTitle}</span>
              </nav>
              <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                {course.duration} • {course.fee}
              </p>
              <h1 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[0.9] text-white mb-6 font-bold uppercase tracking-[0.05em]">
                {course.title.split(" in ")[0]}{" "}
                <span className="metallic-gold-text italic text-[1.1em]">
                  {course.title.split(" in ")[1] || ""}
                </span>
              </h1>
              <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto leading-relaxed">
                {course.description}
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
                  <p className="text-[#A8A29C] text-lg leading-relaxed">
                    {course.longDescription}
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="font-display text-xl text-[#F0EBE1] font-bold uppercase tracking-wider">
                    Program Highlights
                  </h3>
                  <ul className="space-y-3">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#A8A29C]">
                        <span className="text-[#FFD700] mt-1">✓</span>
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
                    {course.software.map((sw, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#FFD700] font-medium"
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
                    {course.careers.map((career, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#A8A29C]"
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
                {course.curriculum.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <span className="text-[#FFD700] font-display text-2xl font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#A8A29C] text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Eligibility & Fees */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <FadeIn>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
                    Duration
                  </p>
                  <p className="text-2xl font-display font-bold text-white">{course.duration}</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
                    Course Fee
                  </p>
                  <p className="text-2xl font-display font-bold text-white">{course.fee}</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
                    Eligibility
                  </p>
                  <p className="text-2xl font-display font-bold text-white">{course.eligibility}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <IndustryPartners />
        <ApplyNow />
        <Footer />
      </main>
    </>
  );
}
