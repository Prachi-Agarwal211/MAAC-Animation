# MAAC Jaipur C-Scheme — HAVE vs WEBSITE (entity + data)
**Date:** 2026-08-08  
**Domain:** https://www.maacanimationjaipur.com  
**Codebase:** `maac prachi/`

---

## Real presence (probed live)

| Asset | Real URL / fact | Live? |
|-------|-----------------|-------|
| Website | maacanimationjaipur.com | Yes |
| GMB / Maps | cid=`10289291929379673702` | Yes |
| Instagram | https://www.instagram.com/maacjaipurcscheme | Yes |
| Facebook | https://www.facebook.com/MAACJAIPURCSCHEME (title: MAAC Jaipur) | Yes |
| YouTube | https://www.youtube.com/@maacjaipur · channel `UCRjdWiuUvWu4mc6D9smmHQQ` | Yes (page live; videos tab empty/private in probe) |
| LinkedIn company | No public company URL found under old slug | **Unknown / not public under site slug** |
| X/Twitter | @maacjaipurcscheme, MAAClndia | **404** |
| Phone | +91-7300001589 (+ secondary/tertiary) | On site |
| Address | 711-712 Ambition Tower, C-Scheme | On site |

---

## Wrong or dead on website BEFORE fix

| What site had | Problem | Real / correct |
|---------------|---------|----------------|
| YouTube `@maac-jaipur-cscheme` | **404** | `@maacjaipur` + channel ID above |
| LinkedIn `/company/maac-jaipur-cscheme` | **404** | Do not invent; add only when you paste real company URL |
| Facebook `MAAClndia` in siteData | **National brand + typo** | Local `MAACJAIPURCSCHEME` |
| Facebook lowercase `maacjaipurcscheme` in schema | Works as alias path but canonical is `MAACJAIPURCSCHEME` | Use canonical |
| `twitter:site` `@maacjaipurcscheme` | Handle **404** | Removed |
| Twitter `MAAClndia` in siteData | **404** + national | Cleared |
| Wikidata `Q140635643` in structured-data sameAs | Unverified / risk | Removed from sameAs |
| llms.txt overclaims (#1, 95%+, studio name-drop) | Trust risk | Softened + real socials listed |

---

## They HAVE offline / in real world — NOT on website (or incomplete)

| They have | Website gap |
|-----------|-------------|
| Real YouTube channel | Was wrong handle → **fixed in code** (deploy needed) |
| Real Facebook page | Was national MAAClndia → **fixed** |
| Real Instagram | Was mostly correct; tracking params cleaned |
| GMB profile | Linked by CID; still need dashboard: services, posts, photos, review velocity |
| Placement marketing / recruiters story | **No `/placements` page** (404); only homepage section |
| Campus / labs / demos | Gallery + events exist; not fully mirrored as proof-rich landing pages |
| LinkedIn (if personal or private company) | **Not on site** until public company URL confirmed |
| Multi-phone | On contact; schema used primary only (OK) |
| Student reels / YT content | Channel exists but content may be thin — fill channel, then embed on site |

---

## Website has — but should not / soft risk

| On site | Issue |
|---------|-------|
| “Rajasthan’s #1”, “95% placements” in many pages | Still in blogs/meta copies; OG/twitter home softened; full content audit later |
| foundingDate 1998 + “30+ years” + “50,000+ alumni” | National-brand history mixed with centre — clarify centre vs brand |
| aggregateRating 4.9 / 422 in schema | Must match **real GBP**; if mismatch, Google can ignore schema |
| FICCI BAF award in schema | Only keep if this centre truly holds it |
| `/placement` `/placements` expected by old docs | **404** — either build page or stop promising in docs |

---

## Sitemap status

**Generator:** `src/app/sitemap.ts`  
**Live count:** 46 URLs (home, courses list + 20 course slugs, contact, about, student-work, gallery, annual-trip, events, animation-institute-jaipur, career assessment, privacy, terms, blog + 13 posts)

| Included | Missing / not in sitemap |
|----------|---------------------------|
| Core marketing pages | `/placements` (page does not exist) |
| All `getAllCourseSlugs()` | Student-work **per project** deep URLs (if only client filters) |
| Blog posts by slug | `/metrics` correctly **out** |
| | Individual portfolio piece URLs if not separate routes |

No sitemap bug for socials (socials are not sitemap URLs).  
After deploy: resubmit sitemap in GSC.

---

## Code fixes applied this session (local repo)

| File | Change |
|------|--------|
| `src/data/siteData.ts` | Canonical socials + `organizationSameAs`; empty linkedin/twitter until real |
| `src/app/layout.tsx` | sameAs from `organizationSameAs`; remove dead twitter:site; softer OG/twitter desc |
| `src/lib/structured-data.ts` | Live sameAs only |
| `src/components/Footer.tsx` | Skip empty social URLs (no blank LinkedIn icon) |
| `src/app/llms.txt/route.ts` | Entity + live socials + do-not-use dead handles |

**Deploy** these to Vercel before live HTML changes.

---

## What you must still send (HITL)

1. **Exact LinkedIn company URL** if it exists (paste from browser when logged in / public)  
2. Confirm YouTube channel owner is **this** C-Scheme centre (not another Jaipur branch)  
3. Confirm Facebook `MAACJAIPURCSCHEME` is the page you manage  
4. GBP dashboard: review count, rating, primary category, website field  
5. Whether to **build `/placements`** next (recommended)

Until LinkedIn URL is confirmed, site correctly **omits** LinkedIn (better than 404 sameAs).

---

## Decision matrix

| Item | Action |
|------|--------|
| Instagram | Keep |
| Facebook local | Keep `MAACJAIPURCSCHEME` |
| YouTube | Keep `@maacjaipur` |
| LinkedIn | Wait for real URL |
| X | Do not add |
| GMB | Optimize, don’t rebuild |
| Placements page | Build |
| National MAAClndia / maacindia socials | Never as this centre’s sameAs |
| Dead invent handles | Never |

---

## Bottom line

They **do** have Instagram, Facebook, YouTube, GMB.  
The website was **wrong** on YouTube + Facebook + LinkedIn + Twitter, not “missing everything”.  
LinkedIn company slug on the site was **fake/dead** — if you truly have LinkedIn, give the **real public URL** and we wire it in one line.  
Sitemap is structurally fine for existing routes; biggest **content** gap is still **no placements URL** and proof/soft claims.
