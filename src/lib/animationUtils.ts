// src/lib/animationUtils.ts
// Utilities for animation state and preferences

export const shouldAnimate = (): boolean => {
  if (typeof window === "undefined") return false;
  
  // Respect user's reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  
  return true;
};
