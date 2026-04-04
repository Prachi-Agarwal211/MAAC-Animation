# SHINZU.md — Universal Rules for MAAC Prachi Project

## Core Principles

1. **SEO is King** — Every decision must preserve or improve search rankings
2. **Zero Broken Links** — Every old WordPress URL must redirect or serve valid content
3. **Performance First** — Lighthouse scores: Performance 90+, Accessibility 95+, SEO 100
4. **Document Everything** — .qwen/ brain grows richer every session
5. **No Guessing** — Verify APIs via context7, verify URLs via testing

## Project-Specific Rules

- Domain: `maacanimationjaipur.com` (NOT maacjaipur.com)
- All URLs must use HTTPS
- Every page needs unique title, description, OG tags, canonical URL
- Every page needs exactly ONE H1
- Structured data (JSON-LD) on every page
- Redirects take priority over 404s

## Anti-Patterns

- Never use `maacjaipur.com` anywhere
- Never deploy without testing all redirects
- Never leave dead links in footer/nav
- Never add phantom URLs to sitemap
- Never skip structured data
