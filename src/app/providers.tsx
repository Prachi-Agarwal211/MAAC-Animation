"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
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
