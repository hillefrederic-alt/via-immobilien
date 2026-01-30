---
phase: "02"
plan: "04"
subsystem: content-pages
tags: [astro, pages, process, faq, contact, accordion]
dependency-graph:
  requires: [02-01]
  provides: [so-arbeite-ich-page, faq-page, kontakt-page]
  affects: [navigation-links]
tech-stack:
  added: []
  patterns: [process-timeline, accessible-accordion, contact-layout]
key-files:
  created:
    - src/pages/so-arbeite-ich.astro
    - src/pages/faq.astro
    - src/pages/kontakt.astro
  modified: []
decisions:
  - accessible-astro-components Accordion for FAQ (WAI-ARIA compliant)
  - Form placeholder for future backend integration
  - Two-column contact layout (info + form area)
metrics:
  duration: "3 min"
  completed: "2026-01-30"
---

# Phase 2 Plan 4: Content Pages (So arbeite ich, FAQ, Kontakt) Summary

Three trust-building pages created: transparent process timeline, FAQ accordion, and contact page with phone/email links and form placeholder.

## What Was Built

### So arbeite ich Page (/so-arbeite-ich)
- Hero: "So arbeite ich" / "Strukturiert. Transparent. Schritt fur Schritt."
- Intro section explaining transparent approach
- 4-step ProcessStep timeline:
  1. Kennenlernen & ehrliche Einschatzung
  2. Realistische Preisfindung & Vorbereitung
  3. Vermarktung & Organisation
  4. Auswahl & Abstimmung (isLast: true)
- Navy CTA section for contact

### FAQ Page (/faq)
- Hero: "Haufige Fragen" / "Verstehen. Einordnen. Vertrauen."
- Intro paragraph setting expectations
- 4 FAQ items using accessible-astro-components Accordion:
  1. Muss ich meine Immobilie vor dem Verkauf renovieren?
  2. Wie wird der Verkaufspreis festgelegt?
  3. Was kostet mich die Zusammenarbeit mit Ihnen?
  4. Wie lange dauert der Verkauf einer Immobilie?
- Custom styling to match site design tokens (navy headings, gold accents)
- Navy CTA section for additional questions

### Kontakt Page (/kontakt)
- Hero: "Kontakt" / "Unkompliziert. Personlich. Unverbindlich."
- Two-column layout:
  - Left: Phone and email with SVG icons, clickable links
  - Right: Form placeholder for future integration
- Phone: +49 176 33445373 (tel: link)
- Email: denise@via-immobilien.de (mailto: link)
- "Was Sie erwartet" section with 3 trust-building bullet points:
  - Unverbindliches Erstgesprach
  - Ehrliche Einschatzung
  - Kein Druck, keine versteckten Kosten
- Navy CTA section with direct phone call button

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 52d0398 | feat | So arbeite ich page with process timeline |
| 324bae3 | feat | FAQ page with accessible accordion |
| 717a942 | feat | Kontakt page with contact info and form placeholder |

## Technical Decisions

1. **Accordion from accessible-astro-components**: Uses WAI-ARIA compliant Accordion component with proper keyboard navigation and expand/collapse functionality.

2. **Form placeholder approach**: Contact form shows placeholder message ("Kontaktformular wird in Kurze verfugbar sein.") rather than non-functional form, setting proper user expectations.

3. **SVG icons inline**: Phone and email icons are inline SVG for performance and styling control, with aria-hidden for accessibility.

4. **Consistent CTA pattern**: All three pages use navy Section with gold CTA button, creating visual consistency.

## Deviations from Plan

None - plan executed exactly as specified.

## Files Created

- `src/pages/so-arbeite-ich.astro` - Process/working method page
- `src/pages/faq.astro` - FAQ page with accordion
- `src/pages/kontakt.astro` - Contact page with phone/email/form placeholder

## Verification

- All pages build successfully with `npm run build`
- Accordion uses accessible-astro-components
- Phone and email links are clickable (tel: and mailto:)
- All pages follow site design patterns

## Next Phase Readiness

Pages ready. Navigation links should be updated to include these new routes:
- /so-arbeite-ich
- /faq
- /kontakt
