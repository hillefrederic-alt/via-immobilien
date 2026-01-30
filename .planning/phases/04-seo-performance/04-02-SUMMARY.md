---
phase: 04-seo-performance
plan: 02
subsystem: seo
tags: [schema.org, json-ld, plausible-analytics, meta-tags, seo-optimization]

# Dependency graph
requires:
  - phase: 04-01
    provides: astro-seo component infrastructure for type-safe meta tags
provides:
  - LocalBusiness (RealEstateAgent) JSON-LD schema for Google rich results
  - Plausible Analytics integration (GDPR-compliant, cookie-free)
  - Unique, keyword-optimized title and description for all 8 public pages
affects: [future-seo, analytics-setup, schema-maintenance]

# Tech tracking
tech-stack:
  added: [plausible-analytics]
  patterns: [schema.org-json-ld, page-specific-seo-metadata]

key-files:
  created: []
  modified:
    - src/layouts/BaseLayout.astro
    - src/pages/index.astro
    - src/pages/ueber-mich.astro
    - src/pages/leistungen.astro
    - src/pages/so-arbeite-ich.astro
    - src/pages/kontakt.astro
    - src/pages/faq.astro
    - src/pages/impressum.astro
    - src/pages/datenschutz.astro

key-decisions:
  - "Used RealEstateAgent schema type instead of generic LocalBusiness for better specificity"
  - "Plausible Analytics chosen for GDPR compliance without cookie consent requirement"
  - "Address fields use PLACEHOLDER_ prefix awaiting real business address"
  - "Homepage title prioritizes primary keyword 'Immobilienmaklerin Frankfurt Rhein-Main'"
  - "All descriptions include regional focus (Rhein-Main) for local SEO"

patterns-established:
  - "JSON-LD schema in BaseLayout head applies to all pages automatically"
  - "Page-specific SEO via title/description props passed to BaseLayout"
  - "Title format: [Page Topic] | Via Immobilien for brand consistency"
  - "Descriptions: 140-160 chars with call-to-action where appropriate"

# Metrics
duration: 3min
completed: 2026-01-30
---

# Phase 04-02: SEO Metadata & Analytics Summary

**RealEstateAgent schema with regional targeting, Plausible Analytics tracking, and unique keyword-optimized metadata for all 8 public pages**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-30T16:43:16Z
- **Completed:** 2026-01-30T16:46:35Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- RealEstateAgent JSON-LD schema with contact info, geo coordinates, and area served (Rhein-Main)
- GDPR-compliant Plausible Analytics integration (no cookie consent needed)
- All 8 public pages have unique, keyword-optimized titles (50-72 chars)
- All 8 public pages have unique, action-oriented descriptions (140-160 chars)
- Regional SEO optimization (Frankfurt, Rhein-Main keywords throughout)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add LocalBusiness schema and Plausible Analytics to BaseLayout** - `85330b3` (feat)
2. **Task 2: Add unique SEO metadata to all pages** - `151b1fe` (feat)

## Files Created/Modified
- `src/layouts/BaseLayout.astro` - Added RealEstateAgent JSON-LD schema and Plausible Analytics script
- `src/pages/index.astro` - Homepage: "Immobilienmaklerin Frankfurt Rhein-Main" title
- `src/pages/ueber-mich.astro` - About page: "Uber mich - Denise Semmel" personal focus
- `src/pages/leistungen.astro` - Services: "Verkauf & Vermietung" emphasis
- `src/pages/so-arbeite-ich.astro` - Process: "4-Schritte-Prozess" highlight
- `src/pages/kontakt.astro` - Contact: phone number in description for quick access
- `src/pages/faq.astro` - FAQ: question-focused title for search intent
- `src/pages/impressum.astro` - Legal: regional context in description
- `src/pages/datenschutz.astro` - Privacy: GDPR-focused description

## Decisions Made

**Schema markup:**
- Used RealEstateAgent type (more specific than LocalBusiness) for better Google rich results
- Included geo coordinates (50.1109, 8.6821) for Frankfurt/Rhein-Main region
- Address fields marked with PLACEHOLDER_ prefix for user to fill with real business address
- Included Instagram link in sameAs array for social profile linking

**Analytics:**
- Plausible Analytics chosen (GDPR-compliant, no cookies, no consent banner needed)
- Script set to defer loading for performance
- Data domain set to via-immobilien.de

**SEO metadata strategy:**
- Homepage title prioritizes primary keyword: "Immobilienmaklerin Frankfurt Rhein-Main"
- All page titles include brand name "Via Immobilien" for consistency
- Descriptions include regional keywords (Frankfurt, Rhein-Main) for local SEO
- Contact page includes phone number in description for SERP visibility
- All titles verified unique (no duplicates across 10 pages)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all tasks completed successfully on first attempt.

## User Setup Required

**Business address configuration needed before launch:**

The RealEstateAgent schema in `src/layouts/BaseLayout.astro` contains placeholder values that must be replaced with real business address:

- `PLACEHOLDER_STREET` - Replace with actual street address
- `PLACEHOLDER_CITY` - Replace with actual city name
- `PLACEHOLDER_ZIP` - Replace with actual postal code

These placeholders are intentionally obvious to prevent accidental deployment with dummy data.

**Plausible Analytics setup:**
- Domain via-immobilien.de must be added to Plausible account
- No code changes needed - script will start collecting data once domain is registered

## Next Phase Readiness

**Ready for next phase:**
- SEO meta tags complete on all pages
- Structured data ready for Google Search Console validation
- Analytics tracking ready for user behavior insights

**Blockers/concerns:**
- Address placeholders must be filled before production deployment
- Default OG image (public/og-default.jpg) not yet created (noted in pending todos)
- Plausible account needs to be set up to start collecting analytics

**Validation recommendations:**
- Test schema markup with Google Rich Results Test after deployment
- Verify Plausible script loads without errors in browser console
- Check meta tag rendering in view-source for all pages
- Run sitemap.xml validation to ensure proper page discovery

---
*Phase: 04-seo-performance*
*Completed: 2026-01-30*
