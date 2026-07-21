export const MOBILE_BREAKPOINT = 768;

/**
 * General touch-device detection (phones, tablets, touch laptops).
 * Used by Navbar (click‑to‑open menus on touch), animationConfig (performance), etc.
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return true;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

/**
 * True only for phones (< 768px touchscreens).
 * Used by Lenis: tablets (≥ 768px) and touch‑enabled laptops keep smooth scroll.
 */
export const isPhoneDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
  if (!hasTouch) return false;
  return window.innerWidth < 768;
};

/**
 * Check if the user has a slow connection or data saver enabled.
 * Used to disable heavy autoplay videos or animations.
 */
export const isDataSaverMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  const nav = navigator as any;
  if (nav.connection) {
    if (nav.connection.saveData) return true;
    if (nav.connection.effectiveType === 'slow-2g' || nav.connection.effectiveType === '2g') return true;
  }
  return false;
};
