---
phase: 01-foundation-legal-compliance
plan: 03
subsystem: legal
tags: [legal, impressum, datenschutz, gdpr, dsgvo, cookie-consent, vanilla-cookieconsent]

# Dependency graph
requires:
  - phase: 01-01
    provides: Astro project structure, design system CSS with brand tokens
  - phase: 01-02
    provides: BaseLayout with Header and Footer components
provides:
  - Impressum page with TMG SS 5 and GewO SS 34c requirements
  - Datenschutzerklarung with complete DSGVO sections
  - GDPR-compliant cookie consent banner
  - Cookie preferences management via footer link
affects: [02-content, 03-polish]

# Tech tracking
tech-stack:
  added: [vanilla-cookieconsent@3]
  patterns: [gdpr-consent-management, legal-page-structure]

key-files:
  created:
    - src/pages/impressum.astro
    - src/pages/datenschutz.astro
    - src/components/CookieBanner.astro
    - src/scripts/cookieconsent.ts
  modified:
    - src/layouts/BaseLayout.astro
    - src/components/Footer.astro
    - package.json
    - package-lock.json

key-decisions:
  - "vanilla-cookieconsent v3 for cookie management (lightweight, GDPR compliant)"
  - "Equal-effort opt-in/opt-out buttons as GDPR requirement"
  - "German language configuration for consent modal"
  - "Address and supervisory authority marked as PLACEHOLDER for user input"
  - "Cookie-Einstellungen button in footer for easy preference changes"

patterns-established:
  - "Legal page structure: semantic HTML with h1/h2/h3, max 70ch line width"
  - "Table of contents with anchor navigation for long legal pages"
  - "Brand-consistent cookie consent styling via CSS custom properties"

# Metrics
duration: 4min
completed: 2026-01-30
---

# Phase 1 Plan 03: Legal Pages and Cookie Consent Summary

**German-compliant Impressum with SS 34c GewO real estate licensing, DSGVO Datenschutzerklarung with all required sections, and vanilla-cookieconsent v3 integration with equal-effort opt-in/opt-out**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-30T12:44:40Z
- **Completed:** 2026-01-30T12:48:48Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- Impressum page at /impressum with all TMG SS 5 required information
- SS 34c GewO real estate agent licensing section with placeholder for authority
- Datenschutzerklarung at /datenschutz with complete DSGVO sections
- Table of contents with anchor navigation in privacy policy
- All 7 DSGVO data subject rights documented (Art. 15-21)
- Cookie consent banner using vanilla-cookieconsent v3
- German language consent modal with equal-effort buttons
- Cookie-Einstellungen button in footer for preference changes
- Brand-consistent styling matching Via Immobilien design tokens

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Impressum page** - `99f636d` (feat)
2. **Task 2: Create Datenschutzerklarung page** - `c44255d` (feat)
3. **Task 3: Implement cookie consent banner** - `671a6b1` (feat)

## Files Created/Modified

- `src/pages/impressum.astro` - Legal Impressum with SS 5 TMG and SS 34c GewO
- `src/pages/datenschutz.astro` - DSGVO privacy policy with all sections
- `src/components/CookieBanner.astro` - Cookie consent component with brand styling
- `src/scripts/cookieconsent.ts` - Consent configuration in German
- `src/layouts/BaseLayout.astro` - Added CookieBanner integration
- `src/components/Footer.astro` - Added Cookie-Einstellungen button
- `package.json` - Added vanilla-cookieconsent dependency

## Legal Compliance Details

**Impressum (SS 5 TMG):**
- Company name and owner
- Contact information (phone, email, website)
- SS 34c GewO real estate licensing reference
- EU Online Dispute Resolution link
- Liability disclaimers (content, links, copyright)
- PLACEHOLDER markers for address and supervisory authority

**Datenschutzerklarung (DSGVO):**
- Controller information (Verantwortlicher)
- Data subject rights (Art. 15-21)
- Server log files documentation
- Cookie policy with consent reference
- Contact form placeholder
- SSL encryption notice
- Last updated date

**Cookie Consent:**
- Two categories: necessary (always on), analytics (opt-in placeholder)
- Modal text in German
- Equal weight buttons for accept all / necessary only
- Preferences modal for granular control
- Consent stored in cc_cookie for 365 days

## Decisions Made

- **vanilla-cookieconsent v3:** Modern, lightweight, and well-maintained library
- **Equal-effort buttons:** Both "Alle akzeptieren" and "Nur notwendige" have same visual prominence (GDPR requirement)
- **Placeholder approach:** Address and supervisory authority marked with [PLACEHOLDER] comments for user to fill in
- **Footer integration:** Cookie-Einstellungen button added to legal column for easy access
- **Brand styling:** Cookie consent modal styled with Via Immobilien colors (navy, cream, gold)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all pages compiled and built successfully.

## User Setup Required

**IMPORTANT - Placeholders to fill in:**

1. **Impressum - Business Address:**
   - Replace `[PLACEHOLDER - Strasse und Hausnummer]` with actual street address
   - Replace `[PLACEHOLDER - PLZ und Ort]` with postal code and city

2. **Impressum - Supervisory Authority:**
   - Replace `[PLACEHOLDER - Zustandiges Ordnungsamt/Gewerbeamt eintragen]` with the local trade office name
   - Replace `[PLACEHOLDER - Adresse der Aufsichtsbehorde]` with their address

3. **Datenschutz - Controller Address:**
   - Same address placeholders as Impressum

## Phase 1 Completion Status

With Plan 03 complete, Phase 1 success criteria are achieved:

- [x] Impressum with Immobilienmakler licensing details (SS 34c GewO)
- [x] Datenschutzerklarung with GDPR-compliant privacy policy
- [x] Cookie consent banner with equal-effort opt-in/opt-out
- [x] Navigation header/footer on all pages (via BaseLayout)
- [x] Responsive design foundation (CSS from Plan 01)
- [x] Both legal pages accessible in one click from every page (footer links)
- [ ] SSL encryption (handled by hosting provider)
- [ ] Logo in header (placeholder until file provided)

## Next Phase Readiness

- Legal foundation complete for Phase 2 (Content Pages)
- Cookie consent ready for future analytics integration
- Footer and navigation prepared for additional pages
- All legal requirements met for German real estate website

---
*Phase: 01-foundation-legal-compliance*
*Completed: 2026-01-30*
