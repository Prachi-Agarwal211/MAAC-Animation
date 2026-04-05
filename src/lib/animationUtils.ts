// src/lib/animationUtils.ts
// Utilities to conditionally enable/disable animations based on device capabilities

export const shouldAnimate = (): boolean => {
  if (typeof window === "undefined") return false;
  // No heavy GSAP animations on mobile
  if (window.innerWidth < 768) return false;
  // Respect user's reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
};
