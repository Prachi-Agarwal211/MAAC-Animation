"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "main",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
      );
    });

    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
