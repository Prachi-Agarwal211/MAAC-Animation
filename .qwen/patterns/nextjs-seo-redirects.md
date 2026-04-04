# Pattern: Next.js SEO Redirects at Scale

## Problem
Migrating from WordPress (55+ URLs) to Next.js with zero SEO loss.

## Solution
Use `async redirects()` in `next.config.mjs` for explicit 301 redirects.

## Code Pattern

```javascript
async redirects() {
  return [
    // Exact match redirects
    {
      source: "/old-wordpress-path",
      destination: "/new-nextjs-path",
      permanent: true,
    },
    // With trailing slash variant
    {
      source: "/old-wordpress-path/",
      destination: "/new-nextjs-path",
      permanent: true,
    },
    // Wildcard pattern (e.g., all portfolio sub-pages)
    {
      source: "/portfolio/:path*",
      destination: "/gallery",
      permanent: true,
    },
  ];
}
```

## Alternative: Middleware
For complex wildcard logic or dynamic redirects, use `src/middleware.ts`:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = { ... };

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (REDIRECTS[pathname]) {
    return NextResponse.redirect(new URL(REDIRECTS[pathname], request.url), 301);
  }
  // Wildcard checks...
  return NextResponse.next();
}
```

## Source
Derived from maacanimationjaipur.com WordPress → Next.js migration, April 2026.

## Usage
Apply this pattern whenever migrating from CMS to Next.js to preserve SEO rankings.
