"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Placements", href: "/placements" },
  { label: "Student Work", href: "/student-work" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function SideScroller() {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft < scrollWidth - clientWidth - 1);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2">
      {isLeftVisible && (
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 rounded-full glass border border-white/10 bg-[#0C0C0C]/90 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-[#E31837]/30 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {isRightVisible && (
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 rounded-full glass border border-white/10 bg-[#0C0C0C]/90 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-[#E31837]/30 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
