"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { initLenis, destroyLenis, scrollToTarget } from "@/lib/lenis";
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

  // Scroll to top on route change (instant — Lenis immediate so ScrollTrigger stays in sync)
  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, [pathname]);

  useGSAP(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  // Don't wrap in a div - just render children directly in the document flow
  return <>{children}</>;
}
