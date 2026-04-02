# Fixed Memory Leaks

## Date: 2026-04-02

### Summary
Fixed memory leaks across multiple components related to GSAP animations, IntersectionObservers, and event listeners.

---

## 1. LenisProvider.tsx - GSAP Cleanup & Splitting.js Removal

**Root Cause:**
- The `useEffect` hook was not cleaning up GSAP ScrollTriggers and animations on unmount
- Dynamic import of Splitting.js was causing SSR issues and memory leaks
- No cleanup for GSAP tweens created for text reveals

**Solution:**
- Added comprehensive cleanup in the `return` function:
  - `lenis?.destroy()` - Clean up Lenis smooth scroll
  - `ScrollTrigger.getAll().forEach((trigger) => trigger.kill())` - Kill all ScrollTriggers
  - `gsap.globalTimeline.clear()` - Clear global timeline
  - `gsap.killTweensOf("[data-splitting]")` and `gsap.killTweensOf(".word")` - Kill pending tweens
- Replaced Splitting.js dynamic import with simple GSAP-based text splitting
- Now uses inline span wrapping for word-by-word animations

**Files Changed:**
- `src/components/LenisProvider.tsx`

---

## 2. MAACXHero.tsx - GSAP Context Cleanup

**Root Cause:**
- GSAP context in the main animation useEffect was not killing ScrollTriggers on cleanup
- This caused ScrollTrigger instances to accumulate on component remount

**Solution:**
- Enhanced the cleanup function to also kill all ScrollTriggers:
  ```typescript
  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
  ```

**Files Changed:**
- `src/components/hero/MAACXHero.tsx`

**Note:** The following already had proper cleanup:
- Auto-rotate interval: `return () => clearInterval(interval);` ✅
- IntersectionObserver: `return () => observer.disconnect();` ✅
- GSAP context for video transitions: `return () => ctx.revert();` ✅

---

## 3. StudentWork.tsx - GSAP ScrollTrigger Cleanup

**Root Cause:**
- GSAP context cleanup was only calling `ctx.revert()` without killing ScrollTriggers
- ScrollTriggers created inside the context were not being properly cleaned up

**Solution:**
- Added `ScrollTrigger.getAll().forEach((st) => st.kill())` to the cleanup function

**Files Changed:**
- `src/components/StudentWork.tsx`

**Note:** IntersectionObserver already had proper cleanup:
- `return () => observerRef.disconnect();` ✅

---

## 4. VerticalCardGallery.tsx - GSAP ScrollTrigger Cleanup

**Root Cause:**
- GSAP context cleanup was only calling `ctx.revert()` without killing ScrollTriggers
- Desktop horizontal scroll creates multiple ScrollTriggers that need explicit cleanup

**Solution:**
- Added `ScrollTrigger.getAll().forEach((st) => st.kill())` to the cleanup function

**Files Changed:**
- `src/components/VerticalCardGallery.tsx`

---

## 5. PopularCourses.tsx - Already Had Proper Cleanup ✅

**Status:** No changes needed

The component already had proper cleanup:
```typescript
return () => {
  ctx.revert();
  ScrollTrigger.getAll().forEach((st) => st.kill());
};
```

---

## Verification Steps

1. Run the development server: `npm run dev`
2. Navigate between pages multiple times
3. Check Chrome DevTools Memory tab for heap snapshots
4. Verify no accumulating event listeners or DOM nodes
5. Test GSAP animations still work correctly on all pages

---

## Prevention Guidelines

When working with GSAP and React:

1. **Always use `gsap.context()`** for grouping animations
2. **Always call `ctx.revert()`** in cleanup
3. **Always kill ScrollTriggers** explicitly: `ScrollTrigger.getAll().forEach((st) => st.kill())`
4. **Always clear intervals** with `clearInterval()`
5. **Always disconnect observers** with `observer.disconnect()`
6. **Kill tweens** for dynamically created elements: `gsap.killTweensOf(selector)`
7. **Clear global timeline** if using global animations: `gsap.globalTimeline.clear()`

---

## Related Files

- `.qwen/patterns/gsap-cleanup.md` - GSAP cleanup patterns (to be created)
- `.qwen/patterns/intersection-observer.md` - IntersectionObserver patterns (to be created)
