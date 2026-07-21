import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getPostBySlug, getAllPostSlugs } from "@/data/blog";
import BlogPostClient from "./BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.maacanimationjaipur.com/blog/${post.slug}`,
      type: "article",
      siteName: "maacanimationjaipur.com",
      locale: "en_US",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
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
    alternates: {
      canonical: `https://www.maacanimationjaipur.com/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": post.author },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "MAAC Animation Jaipur",
      "sameAs": "https://www.maacanimationjaipur.com"
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.maacanimationjaipur.com/blog/${post.slug}` },
    "image": post.ogImage.startsWith("http") ? post.ogImage : `https://www.maacanimationjaipur.com${post.ogImage}`,
  };

  return (
    <>
      <h1 className="sr-only">{post.title}</h1>
      <Script id="blogpost-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPostClient post={post} />
    </>
  );
}
