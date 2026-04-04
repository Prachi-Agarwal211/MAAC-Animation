import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog - MAAC Animation Jaipur",
  description:
    "Insights, tips, and career guidance from MAAC Animation Jaipur. Learn about animation, VFX, game design, and the creative industry.",
  keywords: [
    "animation blog jaipur",
    "vfx career tips",
    "game design career advice",
    "maac jaipur blog",
    "animation industry insights",
  ],
  openGraph: {
    type: "website",
    title: "Blog - MAAC Animation Jaipur",
    description:
      "Insights, tips, and career guidance from MAAC Animation Jaipur.",
    url: "https://www.maacanimationjaipur.com/blog/",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/3.jpg",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/blog/",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog - MAAC Animation Jaipur",
            description: "Insights, tips, and career guidance from MAAC Animation Jaipur.",
            url: "https://www.maacanimationjaipur.com/blog/",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1A0508 0%, #0C0C0C 50%, #0C0C0C 100%)" }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E31837 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#6B6560]">
                <li><Link href="/" className="hover:text-[#E31837] transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-[#A8A29C]">Blog</li>
              </ol>
            </nav>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] leading-[1.1] mb-6">
              Blog & Insights
            </h1>
            <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed max-w-2xl">
              Industry insights, career guidance, and creative inspiration from MAAC Animation Jaipur.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 md:py-28 bg-[#0C0C0C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-[#161616] rounded-xl overflow-hidden border border-white/5 hover:border-[#E31837]/30 transition-all duration-300"
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={post.ogImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#E31837]/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-[#6B6560] mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-display font-semibold text-[#F0EBE1] text-xl mb-3 group-hover:text-[#E31837] transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-[#A8A29C] text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/5 text-[#6B6560] px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#E31837] text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
