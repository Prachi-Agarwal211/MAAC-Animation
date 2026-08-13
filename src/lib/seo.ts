import type { Metadata } from "next";

const SITE_NAME = "MAAC Animation";
/** Root layout title template appends " | {SITE_NAME}" (16 chars) to every title. */
const TITLE_MAX = 60;
const TITLE_SUFFIX = ` | ${SITE_NAME}`;
/** Space left for the page-specific part after the layout template suffix. */
export const TITLE_BUDGET = TITLE_MAX - TITLE_SUFFIX.length;

/** Clamp a page title so the layout template suffix keeps the final <title> ≤60. */
export function clampTitle(title: string, max = TITLE_BUDGET): string {
  const t = title.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const atSpace = cut.lastIndexOf(" ");
  return (atSpace > 20 ? cut.slice(0, atSpace) : cut).trimEnd() + "…";
}

/** Clamp descriptions to ≤160 rendered chars at a word boundary. */
export function clampDescription(description: string, max = 160): string {
  const clean = description.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const atSpace = cut.lastIndexOf(" ");
  const base = (atSpace > 80 ? cut.slice(0, atSpace) : cut).trimEnd();
  return base.length <= max - 1 ? base + "…" : base.slice(0, max - 1) + "…";
}

export function ogMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const url = `https://www.maacanimationjaipur.com${path}`;
  const ogImage = image ?? "https://www.maacanimationjaipur.com/og-image.jpg";
  const ogTitle = clampTitle(`${title} | ${SITE_NAME}`, TITLE_MAX);
  return {
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}