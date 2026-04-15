"use client";

import Link from "next/link";
import { courseMegaMenuJaipur } from "@/data/siteData";

export default function CoursesClient() {
  return (
    <main className="bg-[#080808] min-h-screen pt-28 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-10">All Courses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseMegaMenuJaipur.map((group) => (
            <section key={group.title} className="rounded-xl border border-white/10 bg-[#111111] p-6">
              <h2 className="text-[#E31837] text-xs uppercase tracking-[0.18em] font-semibold mb-4">
                {group.title}
              </h2>

              <ul className="space-y-2">
                {group.links.map((course) => (
                  <li key={course.label}>
                    <Link href="/courses" className="text-white/85 hover:text-white text-sm leading-snug">
                      {course.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
