import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getCourseBySlug, getAllCourseSlugs, type Course } from "@/data/courses";
import CourseHero from "@/components/courses/CourseHero";
import CourseOverview from "@/components/courses/CourseOverview";
import CourseCurriculum from "@/components/courses/CourseCurriculum";
import CourseTools from "@/components/courses/CourseTools";
import CourseCareer from "@/components/courses/CourseCareer";
import CourseFAQ from "@/components/courses/CourseFAQ";
import CourseCTA from "@/components/courses/CourseCTA";

// Generate static params for all 19 courses at build time
export function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each course page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found - maacanimationjaipur.com",
      robots: { index: false, follow: false },
    };
  }

  const url = `https://www.maacanimationjaipur.com/courses/${course.slug}`;

  return {
    title: course.fullName,
    description: course.shortDescription,
    keywords: [
      `${course.name} course jaipur`,
      `${course.name} institute jaipur`,
      `maac ${course.name}`,
      `${course.category} course jaipur`,
      `${course.name} training jaipur`,
    ],
    openGraph: {
      type: "article",
      title: course.fullName,
      description: course.shortDescription,
      url,
      siteName: "maacanimationjaipur.com",
      locale: "en_US",
      images: [
        {
          url: course.ogImage,
          width: 1200,
          height: 630,
          alt: course.fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.fullName,
      description: course.shortDescription,
      images: [course.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

// Map course data to the component interface
function mapCourseToComponent(course: Course) {
  return {
    slug: course.slug,
    title: course.fullName,
    fullName: course.fullName,
    description: course.shortDescription,
    fullDescription: course.fullDescription,
    duration: course.duration,
    code: course.code,
    tools: course.tools,
    careers: course.career,
    eligibility: course.eligibility,
    highlights: course.highlights,
    oldUrls: course.oldUrls,
  };
}

// Generate JSON-LD structured data for Course schema
function generateCourseJsonLd(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.fullName,
    description: course.shortDescription,
    provider: {
      "@type": "Organization",
      name: "MAAC Animation Jaipur",
      sameAs: "https://www.maacanimationjaipur.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg",
        addressLocality: "Jaipur",
        postalCode: "302001",
        addressRegion: "RJ",
        addressCountry: "IN",
      },
    },
    educationalCredentialAwarded: course.degree,
    courseMode: "onsite",
    inLanguage: "en",
    url: `https://www.maacanimationjaipur.com/courses/${course.slug}`,
    image: course.ogImage,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: "P" + course.duration,
    },
    offers: {
      "@type": "Offer",
      category: "Educational",
      availability: "https://schema.org/InStock",
      url: `https://www.maacanimationjaipur.com/courses/${course.slug}`,
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const mappedCourse = mapCourseToComponent(course);
  const jsonLd = generateCourseJsonLd(course);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Course Sections */}
      <CourseHero course={mappedCourse} />
      <CourseOverview course={mappedCourse} />
      <CourseCurriculum course={mappedCourse} />
      <CourseTools course={mappedCourse} />
      <CourseCareer course={mappedCourse} />
      <CourseFAQ course={mappedCourse} />
      <CourseCTA />
    </>
  );
}
