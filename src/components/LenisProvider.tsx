"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Initialize Lenis ONCE - let lenis.ts handle all setup
  useEffect(() => {
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  useGSAP(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  // Don't wrap in a div - just render children directly in the document flow
  return <>{children}</>;
}
