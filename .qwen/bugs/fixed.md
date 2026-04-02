# Fixed Bugs

## Date: 2026-04-03

### Summary
Fixed hydration mismatch errors causing "Failed to execute 'insertBefore' on 'Node'" and related React hydration issues.

---

## 1. Hydration Mismatch - LenisProvider.tsx DOM Manipulation

**Root Cause:**
- The `LenisProvider` component was using `heading.innerHTML = ...` to split text into word spans for GSAP animations
- This DOM manipulation happened during/after hydration, causing React to detect a mismatch between server HTML and client DOM
- The error manifested as: `Failed to execute 'insertBefore' on 'Node': the node before which to insert is not a child of this node`

**Solution:**
- Replaced `innerHTML` assignment with safe DOM manipulation using `document.createElement()` and `appendChild()`
- Added `initializedRef` to prevent double-initialization in React Strict Mode
- The text splitting now happens entirely outside React's render cycle using native DOM APIs

**Files Changed:**
- `src/components/LenisProvider.tsx`

**Key Changes:**
```typescript
// BEFORE (causes hydration mismatch):
heading.innerHTML = text?.split(" ").map((word) => `<span class="word">...</span>`).join(" ") || "";

// AFTER (safe DOM manipulation):
heading.textContent = "";
const words = text.split(" ");
words.forEach((word, index) => {
  const span = document.createElement("span");
  span.className = "word";
  span.textContent = word;
  heading.appendChild(span);
  if (index < words.length - 1) {
    heading.appendChild(document.createTextNode(" "));
  }
});
```

---

## 2. Hydration Mismatch - PopularCourses.tsx Mobile Detection

**Root Cause:**
- The component used `useState<boolean>(true)` for `isMobile` state
- Server rendered with `isMobile = true`, but client detected `isMobile = false` on desktop after hydration
- This caused different HTML structures (different widths, classes, and styles) between server and client
- The mismatch triggered hydration warnings and potential UI flickering

**Solution:**
- Changed initial state to `useState<boolean | null>(null)` to represent "not yet mounted"
- Added `hasMounted` state to track client-side mount status
- Render a skeleton loader during SSR/initial mount
- Only render the full component after mobile detection completes on client

**Files Changed:**
- `src/components/PopularCourses.tsx`

**Key Changes:**
```typescript
// BEFORE (causes hydration mismatch):
const [isMobile, setIsMobile] = useState<boolean>(true);

// AFTER (safe SSR):
const [isMobile, setIsMobile] = useState<boolean | null>(null);
const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {
  setHasMounted(true);
}, []);

// Render skeleton during SSR
if (!hasMounted || isMobile === null) {
  return <SkeletonLoader />;
}
```

---

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
