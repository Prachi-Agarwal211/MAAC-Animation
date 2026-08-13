# MAAC Animation Jaipur — Deep Website + Online Presence Audit
**Date:** 2026-08-08  
**Domain:** https://www.maacanimationjaipur.com  
**Scope:** Website issues + GMB + Instagram / Facebook / YouTube / LinkedIn / X(Twitter) + directories  
**Tools installed for Hermes:** Agent-Reach v1.5.0 (+ yt-dlp, gh, Exa/mcporter, skill linked)

---

## A. Agent-Reach / Hermes install (done)

| Item | Status |
|------|--------|
| Package | **agent-reach 1.5.0** (Panniantong) in `~/.agent-reach-venv` |
| CLI | `~/.local/bin/agent-reach` on PATH |
| yt-dlp | Linked to PATH — YouTube channel ✅ |
| gh CLI | v2.74.0 on PATH — needs `gh auth login` for full GitHub |
| Exa search | Configured via mcporter — semantic search ✅ |
| doctor | **6/13 channels available** (web, YT, RSS, Exa, V2EX, Bilibili search) |
| Skill | `/home/anu15/.agents/skills/agent-reach` + symlink `~/.hermes/skills/devops/agent-reach` |
| Optional not installed | Twitter/Reddit/LinkedIn scrape channels (need login/cookies) |

**Use:** `agent-reach doctor` · research web via Jina/Exa · YT transcripts via yt-dlp.

---

## B. Website technical snapshot (live)

| Check | Result |
|-------|--------|
| Homepage | **200** (~224KB) |
| robots.txt | **200** — AI bots allowed |
| sitemap.xml | **200** — **46 URLs** |
| llms.txt | **200** |
| ai.txt | **200** |
| about / contact / courses / student-work / gallery / blog | **200** |
| `/placement` `/placements` | **404** (homepage has placements *section* only) |
| Canonical | `https://www.maacanimationjaipur.com` |
| Host | Vercel, apex→www redirect |
| OG image | `/opengraph-image` **200** |
| thumbnail.png | **200** (~3MB — heavy for social) |
| JSON-LD | EducationalOrganization + LocalBusiness + WebSite graph present |
| Geo meta | `IN-RJ`, Jaipur |
| Phone | **+91-7300001589** (primary), also **+91-9829294037** in schema |
| Email | maacanimationjaipur@gmail.com |
| Address in schema | Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg, C-Scheme |
| Maps CID | `10289291929379673702` (g/11b5qssb8h) — **profile exists** |
| Coords | ~26.9139, 75.7842 |

---

## C. CRITICAL — Social / entity mismatches (highest impact)

### C1. sameAs / footer points to **dead or wrong** profiles

| Platform | URL in site schema / siteData | Live probe | Verdict |
|----------|-------------------------------|------------|---------|
| **Instagram** | `instagram.com/maacjaipurcscheme` | **200** (exists; login wall for scrapers) | **OK — primary local** |
| **Facebook (footer/schema mix)** | Layout/schema: `facebook.com/maacjaipurcscheme` | Hard to verify without login (400/login wall) | Likely local page — **verify in browser logged-out** |
| **Facebook (siteData contactInfo)** | `facebook.com/MAAClndia` | National brand path | **WRONG for Jaipur entity** (also typo **lndia** vs India) |
| **YouTube** | `youtube.com/@maac-jaipur-cscheme` | **404** | **DEAD — remove or create channel** |
| **LinkedIn** | `linkedin.com/company/maac-jaipur-cscheme` | **404** | **DEAD — create company page or fix slug** |
| **X/Twitter site** | meta `twitter:site` = `@maacjaipurcscheme` | **404** on x.com/maacjaipurcscheme | **DEAD handle** |
| **X/Twitter siteData** | `twitter.com/MAAClndia` | **404** | **DEAD + national typo** |
| **National Instagram** | maacindia (not on Jaipur sameAs) | **200** | National brand — do not claim as Jaipur |
| **JustDial** | category URLs only | Soft redirects | **No confirmed claimed listing from URL alone** |
| **Sulekha** | guessed URL | **404** | Missing / wrong |

**Google/AI impact:** sameAs to 404s **hurts Knowledge Graph / entity trust**. Footer icons that 404 train users you are incomplete.

### C2. Brand dilution: national vs Jaipur centre

| Signal | Problem |
|--------|---------|
| Facebook `MAAClndia` in `siteData.ts` | Points students to **national** brand, not C-Scheme |
| Claims “Rajasthan’s #1 / 95% placements” everywhere | Competitors + Google distrust unsourced superlatives |
| About timeline “Established 1998” + “30+ years” | National MAAC history mixed with **Jaipur centre** story — clarify **centre open year** vs brand year |
| llms.txt “95%+ placement… DNEG, Technicolor…” | Same claim without named, dated proof |

### C3. Missing conversion page

| Expected | Status |
|----------|--------|
| `/placements` dedicated page | **404** (docs/migration still mention it) |
| Homepage `#placements` section | Exists (company logos component) |
| Named alumni / salary table page | Not as crawlable dedicated URL |

Frameboxx-class competitors win with **Placement** in main nav.

---

## D. GMB / Google Maps (you said profile exists — confirmed)

| Fact | Evidence |
|------|----------|
| Maps CID live | `cid=10289291929379673702` returns Maps content |
| Place graph id | `/g/11b5qssb8h` |
| Category signal | training_center |
| Website linkage | Site embeds Maps CID + address query |
| SERP scrape | Blocked this session (Jina/Google 403) — **use GSC + GBP dashboard for reviews/rank** |

### GMB — DO THIS (even if “already set up”)

1. **Primary category:** Animation Institute / Educational Institution / Training Centre — one primary, rest secondary  
2. **Name consistency:** exact match site + schema (“MAAC Animation Jaipur C-Scheme” vs “MAAC Animation Institute Jaipur”) — pick **one**  
3. **Website field:** only `https://www.maacanimationjaipur.com`  
4. **Phone:** primary **7300001589** only (or list secondary in description, not conflicting primary)  
5. **Hours:** Mon–Sat 9–7 as site claims — match exactly  
6. **Photos:** exterior Ambition Tower, classroom, lab, student work weekly  
7. **Posts:** weekly demo class / event (GBP posts)  
8. **Q&A:** seed real Qs (fees range, demo, courses) — answer as owner  
9. **Reviews:** systematic ask after demo/admission (never fake)  
10. **Products/Services:** list AD3D, VFX, Game Design, B.Voc as GBP services  
11. **Utm:** website buttons `?utm_source=google&utm_medium=organic&utm_campaign=gbp`  
12. **Verify NAP** on JustDial / India education dirs matches GBP exactly  

---

## E. Platform-by-platform presence scorecard

| Platform | Local Jaipur presence | Quality | Action |
|----------|----------------------|---------|--------|
| **Website** | Strong craft, 46 URLs | High craft / medium proof | Fix social sameAs, placements page, claims |
| **GMB** | Exists (CID live) | Unknown review velocity (need dashboard) | Optimize posts/photos/NAP/services |
| **Instagram** | `@maacjaipurcscheme` **exists** | Unknown content cadence (login wall) | Bio link → site; weekly reels; student work |
| **Facebook** | Local page claimed in schema; siteData uses **national MAAClndia** | Broken entity | **Unify to one local FB**; fix typo; update siteData |
| **YouTube** | `@maac-jaipur-cscheme` **404** | Missing | Create channel OR remove from sameAs; upload campus/demo/showreels |
| **LinkedIn** | company slug **404** | Missing | Create `MAAC Jaipur C-Scheme` company page; link site |
| **X/Twitter** | `@maacjaipurcscheme` & `MAAClndia` **404** | Missing | Create or **remove twitter:site meta** |
| **JustDial / Sulekha** | Unclear claim | Weak | Claim + NAP sync |
| **MAAC India national** | Strong | Competes for brand queries | Win **Jaipur** modifiers, not national brand war |

---

## F. Website issue list (prioritized)

### P0 — Fix this week (entity + trust)

| # | Issue | Where | Fix |
|---|--------|-------|-----|
| 1 | YouTube sameAs **404** | layout schema, siteData, footer | Create channel or remove URL |
| 2 | LinkedIn company **404** | same | Create page or remove |
| 3 | Twitter handle **404** but `twitter:site` set | layout meta | Remove meta or create handle |
| 4 | Facebook **MAAClndia** in siteData | `src/data/siteData.ts` | Use only `maacjaipurcscheme` (verify live) |
| 5 | No `/placements` URL | routes | Build placements page + sitemap + nav |
| 6 | Unsourced **95% / #1 Rajasthan** | meta, llms, blogs, schema | Soften or attach year + methodology |
| 7 | Dual phone story | schema array vs marketing | Document primary vs secondary |

### P1 — SEO / content

| # | Issue | Fix |
|---|--------|-----|
| 8 | Placement only as homepage section | Dedicated page with recruiters, process, anonymized outcomes |
| 9 | Blog cluster exists (good) | Refresh 2025 titles → 2026; internal link to courses |
| 10 | Privacy/terms in sitemap | Consider noindex legal if thin |
| 11 | Heavy thumbnail.png (~3MB) | Compress OG assets |
| 12 | Speakable CSS selectors may not match real classes | Align selectors or drop speakable |
| 13 | Founding / 30+ years / 50k alumni claims | Align about, schema, llms to **one** fact sheet |
| 14 | GSC not verified in this audit | Verify property + submit sitemap |

### P2 — Conversion / ops

| # | Issue | Fix |
|---|--------|-----|
| 15 | Lead paths WhatsApp-heavy | Keep + form to CRM/Lead OS |
| 16 | Meta Pixel present | Confirm events (Lead, Contact) in Events Manager |
| 17 | Student work strong | Each project: student first name, tools, year, course |
| 18 | Hindi landing missing | Optional later for Jaipur parents |

---

## G. What is already GOOD (don’t break)

- Next.js craft (GSAP/Three/Lenis) above local institute average  
- Course tree + student-work + events + career assessment  
- robots AI allow + llms.txt + ai.txt  
- LocalBusiness + EducationalOrganization schema  
- Real address + multi-phone + Maps CID wired  
- Blog SEO posts targeting Jaipur intents  
- Reverbex engineering attribution in llms  

---

## H. Competitor presence gap (why they still win searches)

| Competitor play | MAAC Jaipur gap |
|-----------------|-----------------|
| Frameboxx: Placement nav + social header full | Dead YT/LI/X; no placements URL |
| Arena/MAAC India: huge social + stats | National brand gravity; you must win **local** |
| Local institutes: JustDial + aggressive calls | Directory claim unclear |

---

## I. 30-day action plan (MAAC only)

### Week 1 — Entity cleanup
1. Open every social URL in a normal browser; screenshot  
2. Fix `siteData.ts` + layout `sameAs` to **only live local URLs**  
3. Create missing: YouTube, LinkedIn company (or delete links)  
4. Remove dead `twitter:site` until handle exists  
5. Fix Facebook to single local page  

### Week 2 — GMB + NAP
6. GBP audit checklist (section D)  
7. JustDial + one more directory claim  
8. NAP sheet: name, address, phone, hours, website — identical everywhere  

### Week 3 — Proof pages
9. Ship `/placements` with real process + logos (permission)  
10. Soften 95%/#1 or add footnote  
11. 5 student-work case pages  

### Week 4 — Content + measure
12. GSC: top queries for animation institute Jaipur  
13. 4 GBP posts + 8 IG posts (campus/demo)  
14. 1 YouTube campus tour  
15. Monthly: reviews count, GSC clicks, IG reach  

---

## J. Single source of truth (recommended lock)

| Field | Canonical value |
|-------|-----------------|
| Brand | MAAC Animation Jaipur C-Scheme |
| Site | https://www.maacanimationjaipur.com |
| Phone | +91-7300001589 |
| WhatsApp | 917300001589 |
| Email | maacanimationjaipur@gmail.com |
| Address | Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg, C-Scheme, Jaipur |
| Maps | cid=10289291929379673702 |
| Instagram | https://www.instagram.com/maacjaipurcscheme |
| Facebook | https://www.facebook.com/maacjaipurcscheme *(verify)* |
| YouTube | *create then set* |
| LinkedIn | *create then set* |
| X | *none until real* |

---

## K. Bottom line

**Website craft is strong. Online entity graph is broken.**

- GMB/Maps **exists** and is linked — optimize, don’t rebuild from zero.  
- Instagram local **exists**.  
- YouTube handle, LinkedIn company, X handles in code are **404**.  
- siteData still points Facebook/Twitter toward **national MAAClndia** (typo + wrong entity).  
- **No `/placements` page** while marketing 95% placement.  

Rankings and AI citations will improve faster from **entity cleanup + GMB + proof pages** than from more homepage animation.

---

## L. Hermes usage after this install

```bash
export PATH="$HOME/.local/bin:$PATH"
agent-reach doctor
# web research
curl -sL "https://r.jina.ai/https://www.maacanimationjaipur.com/"
# YT when channel exists
yt-dlp --list-subs "URL"
```

Optional next installs (say when needed): `agent-reach install --channels=twitter,reddit` (login), full OpenCLI.
