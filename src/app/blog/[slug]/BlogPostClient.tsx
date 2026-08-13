"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { type BlogPost } from "@/data/blog";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = "";

  function parseInlineText(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    // Process images: ![alt](url)
    const imgRegex = /!\[([^\]]*)\]\(([^)\s]+)\)/;
    // Process links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)\s]+)\)/;
    // Process bold: **text**
    const boldRegex = /\*\*(.*?)\*\*/;

    let remaining = text;

    while (remaining.length > 0) {
      // Check for image
      const imgMatch = remaining.match(imgRegex);
      // Check for link
      const linkMatch = !imgMatch ? remaining.match(linkRegex) : null;
      // Check for bold
      const boldMatch = !imgMatch && !linkMatch ? remaining.match(boldRegex) : null;

      // Find the earliest match
      let match: RegExpMatchArray | null = null;
      let matchType = '';
      let matchIdx = -1;

      if (imgMatch) { match = imgMatch; matchType = 'img'; matchIdx = match.index ?? -1; }
      if (linkMatch && (linkMatch.index ?? -1) < (match?.index ?? Infinity)) { match = linkMatch; matchType = 'link'; matchIdx = match.index ?? -1; }
      if (boldMatch && (boldMatch.index ?? -1) < (match?.index ?? Infinity)) { match = boldMatch; matchType = 'bold'; matchIdx = match.index ?? -1; }

      if (!match) {
        // No more matches — push remaining text as-is
        parts.push(remaining);
        break;
      }

      // Text before match
      if (matchIdx > 0) {
        parts.push(remaining.slice(0, matchIdx));
      }

      if (matchType === 'img') {
        const stableKey = `img-${match.index}-${match[2]}`;
        parts.push(
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={stableKey}
            src={match[2]}
            alt={match[1]}
            className="w-full rounded-xl my-6 border border-white/10"
            loading="lazy"
          />
        );
      } else if (matchType === 'link') {
        const stableKey = `link-${match.index}-${match[2]}`;
        parts.push(
          <a
            key={stableKey}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C4A882] underline underline-offset-4 decoration-[#C4A882]/30 hover:decoration-[#C4A882] transition-all hover:brightness-110"
          >
            {match[1]}
          </a>
        );
      } else if (matchType === 'bold') {
        const stableKey = `bold-${match.index}`;
        parts.push(
          <strong key={stableKey} className="text-[#F0EBE1] font-semibold">
            {match[1]}
          </strong>
        );
      }

      remaining = remaining.slice((match.index ?? 0) + match[0].length);
    }

    return parts.length > 0 ? parts : [text];
  }

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={index} className="bg-[#161616] rounded-lg p-4 my-4 overflow-x-auto border border-white/5">
            <code className="text-sm text-white/85">{codeContent.trim()}</code>
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

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="font-display text-2xl text-[#F0EBE1] mt-10 mb-4 font-light uppercase leading-[1.1] tracking-[0.1em]">
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="font-display text-xl text-[#F0EBE1] mt-8 mb-3 font-light uppercase leading-[1.1] tracking-[0.1em]">
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={index} className="text-[#F0EBE1] font-semibold my-2">
          {line.replace(/\*\*/g, "")}
        </p>
      );
      return;
    }

    if (line.trim() === "") {
      return;
    }

    const parsed = parseInlineText(line);
    elements.push(
      <p key={index} className="text-white/85 leading-relaxed my-3">
        {parsed}
      </p>
    );
  });

  return elements;
}

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
        url: "https://www.maacanimationjaipur.com/maac-logo.png",
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

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  const jsonLd = generateBlogPostJsonLd(post);

  return (
    <>
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[#080808] min-h-screen">
        <section
          ref={heroRef}
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#080808] z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="w-full h-full object-cover hero-video-fade"
              style={{ '--video-target-opacity': '0.3' } as React.CSSProperties}
            >
              <source src="/hero-video-compressed.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-20 text-center px-6 pt-20 max-w-4xl mx-auto">
            <div className="animate-in inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="metallic-gold-text text-[10px] font-bold tracking-[0.2em] uppercase">{post.category}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="text-white/85 text-[10px] font-bold uppercase tracking-[0.2em]">{post.readTime}</span>
            </div>

            <h1 className="animate-in font-display text-[clamp(2rem,6vw,4rem)] leading-[1] text-white mb-8 font-light uppercase leading-[1.1] tracking-[0.1em]">
              {post.title}
            </h1>

            <div className="animate-in flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85">
              <div className="flex items-center gap-2">
                <span className="text-white/40">By</span>
                <span className="text-white">{post.author}</span>
              </div>
              <span className="w-1 h-1 bg-[#C4A882] rounded-full" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-20 relative z-30 mb-20">
          <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#1A1A1A]">
            <Image
              src={post.ogImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </div>

        <article className="py-12 bg-transparent relative">
          <div className="atmosphere-blob blob-orange top-1/4 -left-20 opacity-5" />
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings: prose-headings: font-light uppercase leading-[1.1] tracking-[0.1em]">
              {renderContent(post.content)}
            </div>

            <div className="mt-20 pt-10 border-t border-white/5">
              <h3 className="text-[10px] font-bold text-white/85 uppercase tracking-[0.3em] mb-6">Topics Covered</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/5 text-white/85 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/5 hover:border-[#C4A882]/30 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-20 text-center">
              <Link href="/blog" className="inline-flex items-center gap-4 text-white text-[11px] font-bold tracking-[0.3em] uppercase group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>

        <IndustryPartners />

        <ApplyNow />
      </main>
    </>
  );
}
