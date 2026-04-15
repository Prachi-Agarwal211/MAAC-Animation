"use client";

import CourseCategories from "@/components/CourseCategories";

export default function CoursesClient() {
  return (
    <main className="bg-[#080808] min-h-screen">
      <CourseCategories mode="courses-page" />
    </main>
  );
}
