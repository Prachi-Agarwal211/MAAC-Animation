"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import gsap from "gsap";

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });

    // Page transition animation
    gsap.fromTo(
      "main",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
    );
  }, [pathname]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsWrapper>{children}</AnalyticsWrapper>
    </Suspense>
  );
}
