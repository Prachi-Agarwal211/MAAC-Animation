export const MOBILE_BREAKPOINT = 768;

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return true;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};
