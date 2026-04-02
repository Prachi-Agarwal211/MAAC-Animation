# GSAP Cleanup Patterns

## Overview

Proper cleanup of GSAP animations is critical to prevent memory leaks in React applications. This document outlines the standard patterns used in the MAAC Jaipur website.

---

## Core Pattern: useEffect with gsap.context()

Always wrap GSAP animations in a context and provide comprehensive cleanup:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
    gsap.fromTo(".element", { opacity: 0 }, { opacity: 1 });
    
    // ScrollTriggers
    gsap.fromTo(".scroll-element", 
      { y: 50 }, 
      { 
        y: 0, 
        scrollTrigger: { trigger: ".scroll-element", start: "top 80%" } 
      }
    );
  }, scopeRef); // Pass the ref to scope the context

  return () => {
    ctx.revert(); // Revert all GSAP changes
    ScrollTrigger.getAll().forEach((st) => st.kill()); // Kill all ScrollTriggers
  };
}, [dependencies]);
```

---

## Cleanup Checklist

Every GSAP useEffect should clean up:

| Resource | Cleanup Method | When Needed |
|----------|---------------|-------------|
| GSAP Context | `ctx.revert()` | Always (when using gsap.context) |
| ScrollTriggers | `ScrollTrigger.getAll().forEach(st => st.kill())` | When using ScrollTrigger |
| Tweens | `gsap.killTweensOf(selector)` | For dynamic elements |
| Global Timeline | `gsap.globalTimeline.clear()` | When using global timeline |
| Timelines | `tl.kill()` | For manually created timelines |
| Event Listeners | `element.removeEventListener()` | When adding custom listeners |
| Intervals | `clearInterval(intervalId)` | When using setInterval |
| Observers | `observer.disconnect()` | When using IntersectionObserver |

---

## Common Patterns

### 1. Basic ScrollTrigger Cleanup

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".element", {
      y: 50,
      scrollTrigger: {
        trigger: ".element",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, sectionRef);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);
```

### 2. Multiple ScrollTriggers

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Create multiple ScrollTriggers
    elements.forEach((el) => {
      gsap.from(el, {
        y: 50,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    });
  }, containerRef);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);
```

### 3. Horizontal Scroll with Pin

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    const totalScroll = track.scrollWidth - window.innerWidth;
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${totalScroll}`,
      pin: true,
      scrub: 1,
    });

    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
      },
    });
  }, containerRef);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);
```

### 4. Text Reveal Animation (No Splitting.js)

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    const headings = gsap.utils.toArray<HTMLElement>("[data-splitting]");
    
    headings.forEach((heading) => {
      // Simple word splitting without external library
      const text = heading.textContent;
      heading.innerHTML = text
        ?.split(" ")
        .map((word) => `<span class="word" style="display:inline-block;">${word}</span>`)
        .join(" ") || "";

      const words = heading.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, containerRef);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf("[data-splitting]");
    gsap.killTweensOf(".word");
  };
}, []);
```

### 5. IntersectionObserver with Cleanup

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          video.preload = "auto";
        }
      });
    },
    { rootMargin: "500px" }
  );

  videoRefs.current.forEach((v) => v && observer.observe(v));

  return () => observer.disconnect(); // ✅ Critical cleanup
}, []);
```

### 6. Interval with Cleanup

```typescript
useEffect(() => {
  if (!preloaderDone || isPaused) return;

  const interval = setInterval(goToNextVideo, VIDEO_INTERVAL);
  
  return () => clearInterval(interval); // ✅ Critical cleanup
}, [preloaderDone, goToNextVideo, isPaused]);
```

---

## Anti-Patterns to Avoid

### ❌ Missing Cleanup

```typescript
// BAD: No cleanup
useEffect(() => {
  gsap.from(".element", { y: 50 });
}, []);
```

### ❌ Only Partial Cleanup

```typescript
// BAD: Only reverts context, doesn't kill ScrollTriggers
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".element", {
      y: 50,
      scrollTrigger: { trigger: ".element" },
    });
  }, ref);

  return () => ctx.revert(); // ❌ Missing ScrollTrigger cleanup
}, []);
```

### ❌ Creating ScrollTriggers Outside Context

```typescript
// BAD: ScrollTrigger created outside context
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations
  }, ref);

  ScrollTrigger.create({ // ❌ This won't be cleaned up!
    trigger: ref.current,
    start: "top top",
  });

  return () => ctx.revert();
}, []);
```

---

## Testing for Memory Leaks

### Chrome DevTools Memory Tab

1. Open DevTools > Memory tab
2. Take a heap snapshot (baseline)
3. Navigate to component page
4. Navigate away
5. Take another heap snapshot
6. Compare snapshots - look for:
   - Detached DOM trees
   - Accumulating event listeners
   - GSAP objects not being garbage collected

### Performance Monitor

1. Open DevTools > More tools > Performance monitor
2. Watch DOM Nodes and Event Listeners counts
3. Navigate between pages
4. Counts should return to baseline after navigation

---

## Related Patterns

- `.qwen/patterns/intersection-observer.md` - IntersectionObserver best practices
- `.qwen/patterns/video-optimization.md` - Video lazy loading patterns
- `.qwen/bugs/fixed.md` - History of fixed memory leaks
