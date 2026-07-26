---
name: deep-review
description: Multi-dimension parallel audit of Next.js + GSAP websites before push. Spawns explore subagents for CSS design system, animation patterns, SEO, performance, accessibility, and code quality.
---

# Deep Review: Parallel Multi-Dimension Website Audit

Structured pre-push audit that spawns parallel explore subagents, each examining a specific dimension of a Next.js + GSAP website. Produces a consolidated report with issues ranked by severity.

## When to Use

- Before pushing a large batch of changes
- After completing a multi-file feature or redesign
- When the user asks "review everything" or "audit the site"
- At natural checkpoints in long sessions

## Procedure

### Step 1: Gather Context

```bash
git status
git diff --stat
git log --oneline -5
```

Identify which files changed and what the overall scope is.

### Step 2: Dispatch Parallel Explore Subagents

Spawn explore subagents in parallel, each with a focused audit prompt. Use the `actor` tool with mode `explore`. Adapt the set of dimensions to what actually changed — don't audit SEO if only CSS files changed.

#### Standard Audit Dimensions

**1. CSS Design System Audit**
```
Audit the CSS design system for consistency. Check:
- Color usage: Is red (#E31837) reserved for CTAs only per 60-30-10 rule?
- Typography: Are fonts consistent with the type scale? No generic fallbacks?
- Border radius: Does it follow the 3-tier scale (sm: 12px, md: 24px, lg: 48px)?
- Shadows: Are components using --shadow-elevation-* tokens instead of hardcoded values?
- Spacing: Is there rhythm (not uniform padding)?
- Glass morphism: Are card backgrounds using --bg-glass consistently?
Report each violation with file:line references.
```

**2. GSAP Animation Audit**
```
Audit GSAP animation patterns for correctness. Check:
- Spring physics: Are animations using spring-based easing (back.out, elastic.out) instead of expo.out/power2.out?
- Cleanup: Is gsap.context() + .revert() used in all useEffect returns?
- ScrollTrigger: Is once: true used where appropriate? Are toggleActions correct?
- Reduced motion: Does every animated component check prefers-reduced-motion?
- Touch: Are animations disabled or simplified on mobile?
- Ticker: Are GSAP ticker callbacks using named function references for cleanup?
Report each issue with file:line references.
```

**3. SEO Audit**
```
Audit SEO implementation. Check:
- Meta tags: Are title, description, OG tags present on all pages?
- Schema.org: Is structured data (Organization, Service, FAQPage, Article) present and valid?
- Semantic HTML: Are headings hierarchical (h1 > h2 > h3)? Are landmarks used?
- Links: Are there any broken internal links?
- Images: Do all images have alt text?
Report each issue with file:line references.
```

**4. Performance Audit**
```
Audit performance patterns. Check:
- Dynamic imports: Are heavy components (Three.js, WebGL, GSAP) dynamically imported?
- Layout animation: Are any animations on layout properties (width, height, top, left)?
- Image optimization: Are images using AVIF/WebP? Are they properly sized?
- Font loading: Are fonts loaded with display: swap? Max 3 font families?
- Bundle: Are there unnecessary large dependencies?
Report each issue with file:line references.
```

**5. Accessibility Audit**
```
Audit accessibility. Check:
- prefers-reduced-motion: Is it respected in all animations?
- Contrast: Do text elements meet 4.5:1 contrast ratio?
- Touch targets: Are interactive elements at least 48px on mobile?
- Semantic HTML: Are buttons vs links used correctly? Are forms properly labeled?
- Keyboard: Can all interactive elements be reached via keyboard?
Report each issue with file:line references.
```

**6. Code Quality Audit**
```
Audit code quality. Check:
- DRY: Are there duplicated components or patterns?
- Dead code: Are there unused imports, variables, or components?
- Consistency: Do components follow the same patterns (props, state, effects)?
- Error handling: Are async operations properly error-handled?
- TypeScript: Are there any `any` types or missing type annotations?
Report each issue with file:line references.
```

**7. Mobile Audit** (if mobile-relevant files changed)
```
Audit mobile experience. Check:
- Viewport: Is dvh used instead of vh? Are safe-area-insets respected?
- Touch: Are touch targets 48px+? Is there haptic feedback where appropriate?
- Performance: Are heavy effects (WebGL, backdrop-filter) reduced on mobile?
- Navigation: Is the mobile nav usable? Are there any overflow issues?
Report each issue with file:line references.
```

**8. Content Audit** (if content-heavy pages changed)
```
Audit page content. Check:
- Consistency: Do all pages follow the same tone and structure?
- Accuracy: Are stats, facts, and claims current?
- Completeness: Are there any placeholder texts or lorem ipsum?
- CTAs: Are calls-to-action clear and prominent?
Report each issue with file:line references.
```

### Step 3: Collect Results

Wait for all subagents to complete. Each returns a structured report with issues ranked by severity.

### Step 4: Consolidate Report

Merge all subagent reports into a single consolidated report:

```markdown
# Deep Review Report

## Summary
- X critical issues, Y important issues, Z minor issues
- Overall assessment: [Ready to push | Needs fixes | Blocked]

## Critical Issues (Must Fix Before Push)
1. [issue] — [file:line]

## Important Issues (Should Fix)
1. [issue] — [file:line]

## Minor Issues (Nice to Have)
1. [issue] — [file:line]

## By Dimension
### CSS Design System
[findings...]

### GSAP Animations
[findings...]

### SEO
[findings...]

[etc.]

## Strengths
[What was done well across all dimensions]
```

### Step 5: Act on Findings

- Fix Critical issues immediately
- Fix Important issues before pushing
- Note Minor issues for later
- Update MEMORY.md if new durable patterns emerge

## Adaptation Rules

- **Skip dimensions** that don't apply to the changed files (e.g., skip SEO audit if only CSS changed)
- **Add project-specific checks** from MEMORY.md rules (e.g., MAAC has specific color, typography, and motion rules)
- **Scale depth** to change size: small CSS tweak → CSS audit only; large feature → full 8-dimension audit
- **Reuse the builtin `review` skill** for pure code-quality reviews (no design system concerns)

## Integration

- This skill complements the builtin `compose:review` skill — use `deep-review` for design-system-aware audits, `compose:review` for code-quality-only reviews
- Results should be captured in the session checkpoint for continuity
- New durable findings should be promoted to MEMORY.md `## Discovered durable knowledge`
