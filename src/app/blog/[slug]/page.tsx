import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { getPostBySlug, getAllPostSlugs, type BlogPost } from "@/data/blog";

// Generate static params for all blog posts at build time
export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - maacanimationjaipur.com",
      robots: { index: false, follow: false },
    };
  }

  const url = `https://www.maacanimationjaipur.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "maacanimationjaipur.com",
      locale: "en_US",
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
  };
}

// Simple markdown-like content renderer
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = "";

  lines.forEach((line, index) => {
    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={index} className="bg-[#161616] rounded-lg p-4 my-4 overflow-x-auto border border-white/5">
            <code className="text-sm text-[#A8A29C]">{codeContent.trim()}</code>
          </pre>
        );
        codeContent = "";
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      return;
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="font-display font-bold text-2xl text-[#F0EBE1] mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="font-display font-semibold text-xl text-[#F0EBE1] mt-8 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }

    // Bold text
    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={index} className="text-[#F0EBE1] font-semibold my-2">
          {line.replace(/\*\*/g, "")}
        </p>
      );
      return;
    }

    // Empty lines
    if (line.trim() === "") {
      return;
    }

    // Regular paragraphs
    elements.push(
      <p key={index} className="text-[#A8A29C] leading-relaxed my-3">
        {line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#F0EBE1] font-semibold">$1</strong>')}
      </p>
    );
  });

  return elements;
}

// Generate JSON-LD structured data for BlogPosting schema
function generateBlogPostJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://www.maacanimationjaipur.com",
    },
    publisher: {
      "@type": "Organization",
      name: "MAAC Animation Jaipur",
      logo: {
        "@type": "ImageObject",
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/3.jpg",
      },
      url: "https://www.maacanimationjaipur.com",
    },
    url: `https://www.maacanimationjaipur.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.maacanimationjaipur.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    timeRequired: post.readTime,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateBlogPostJsonLd(post);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#6B6560]">
                <li><Link href="/" className="hover:text-[#E31837] transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-[#E31837] transition-colors">Blog</Link></li>
                <li>/</li>
                <li className="text-[#A8A29C]">{post.title}</li>
              </ol>
            </nav>

            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E31837]/10 border border-[#E31837]/30 rounded-full px-4 py-2 mb-6">
              <span className="text-[#E31837] text-xs font-semibold tracking-wider uppercase">{post.category}</span>
              <span className="text-[#6B6560]">&middot;</span>
              <span className="text-[#A8A29C] text-sm">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F0EBE1] leading-[1.1] mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-[#6B6560]">
              <span>{post.author}</span>
              <span>&middot;</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="aspect-video rounded-xl overflow-hidden bg-[#1A1A1A]">
          <img
            src={post.ogImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <article className="py-12 bg-[#0C0C0C]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <h3 className="text-sm font-medium text-[#6B6560] uppercase tracking-wider mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white/5 text-[#A8A29C] text-sm px-3 py-1 rounded-full hover:bg-white/10 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section
        className="py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #2A080C 0%, #170406 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-6">
            Ready to Start Your Creative Career?
          </h2>
          <p className="text-[#A8A29C] text-lg mb-10 max-w-2xl mx-auto">
            Join MAAC Jaipur and learn from industry professionals. Book a free demo class to experience our teaching methodology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo-class"
              className="btn bg-gradient-to-r from-[#E31837] to-[#C4132D] text-white hover:opacity-90 border border-[#E31837]/50 px-8 py-4 rounded-lg font-semibold shadow-[0_0_20px_rgba(227,24,55,0.3)]"
            >
              Book Free Demo Class
            </Link>

            <Link
              href="/courses"
              className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
