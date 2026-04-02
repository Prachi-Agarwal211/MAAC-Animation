"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { breadcrumbSchema } from "@/lib/structured-data";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  "/": [{ label: "Home", href: "/" }],
  "/about": [{ label: "Home", href: "/" }, { label: "About", href: "/about" }],
  "/courses": [{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }],
  "/placements": [{ label: "Home", href: "/" }, { label: "Placements", href: "/placements" }],
  "/gallery": [{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery" }],
  "/contact": [{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }],
};

function BreadcrumbContent() {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbMap[pathname] || breadcrumbMap["/"];

  // Don't show on homepage
  if (pathname === "/") return null;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(breadcrumbs.map((b) => ({ name: b.label, url: `https://maacjaipur.com${b.href}` })))
          ),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-[#0C0C0C]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 py-3 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-[#6b6b6b]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    index === breadcrumbs.length - 1
                      ? "text-[#E31837] font-semibold"
                      : "text-[#6b6b6b] hover:text-[#F0EBE1]"
                  }`}
                  aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}

export default function Breadcrumbs() {
  return (
    <Suspense fallback={null}>
      <BreadcrumbContent />
    </Suspense>
  );
}
