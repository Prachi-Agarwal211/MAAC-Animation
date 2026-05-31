"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Use env var in production. Fallback to current production Pixel ID.
const PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "406621323063792";

// fbq types are declared in src/types/tracking.d.ts

/**
 * Fires a Facebook Pixel event. Safe to call anywhere — gracefully
 * handles cases where the pixel hasn't loaded yet.
 */
export function firePixelEvent(
  event: string,
  params?: Record<string, unknown>,
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

/**
 * Meta Pixel component — loads the pixel script and tracks PageViews
 * on initial load and route changes.
 *
 * Must be wrapped in <Suspense> because it uses useSearchParams().
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track PageView on every route change
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* Official Meta noscript fallback for users with JavaScript disabled.
          This is required for complete ad attribution. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
