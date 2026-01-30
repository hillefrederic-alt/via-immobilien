# Roadmap: Via Immobilien Website

## Overview

Delivering a professional, GDPR-compliant business card website for Via Immobilien that establishes credibility and enables contact. The roadmap prioritizes legal compliance first (German law requirement), followed by core content delivery, contact functionality, and performance optimization. Built with Astro + Tailwind CSS for sub-3-second loads and 100% requirement coverage.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Legal Compliance** - Project setup, legal pages, design system ✓
- [x] **Phase 2: Core Content Pages** - All 6 main pages with trust elements ✓
- [x] **Phase 3: Contact & Interactivity** - Contact form, maps, click-to-call ✓
- [ ] **Phase 4: SEO & Performance** - Optimization, analytics, local search

## Phase Details

### Phase 1: Foundation & Legal Compliance
**Goal**: Create legally compliant foundation with Astro project, design system, and required legal pages

**Depends on**: Nothing (first phase)

**Requirements**: LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04, DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-04, PAGE-07, PAGE-08

**Success Criteria** (what must be TRUE):
  1. Impressum page exists with complete Immobilienmakler licensing details and is accessible in one click from every page
  2. Datenschutzerklärung page exists with GDPR-compliant privacy policy and is accessible in one click from every page
  3. Site runs on HTTPS with SSL certificate (enforced)
  4. Cookie consent banner displays with equal-effort opt-in/opt-out (if cookies used)
  5. Navigation header and footer appear consistently across all pages with correct branding (Navy Blue #142333, Cream #F5F0EA, Soft Gold #D1B787)
  6. Site displays correctly on mobile, tablet, and desktop devices
  7. Logo appears in header with correct styling and links to homepage

**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md - Astro project setup and design system foundation ✓
- [x] 01-02-PLAN.md - Base layout, Header, and Footer components ✓
- [x] 01-03-PLAN.md - Legal pages (Impressum, Datenschutz) and cookie consent ✓

### Phase 2: Core Content Pages
**Goal**: Deliver all 6 main content pages with complete text, images, and trust elements

**Depends on**: Phase 1

**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, TRUST-01, TRUST-02, DESIGN-05

**Success Criteria** (what must be TRUE):
  1. Visitor can navigate to all 6 pages (Startseite, Über mich, Leistungen, So arbeite ich, Kontakt, FAQ) from header navigation
  2. Homepage displays hero section with value proposition and clear call-to-action
  3. Über mich page shows professional photo of Denise and personal story
  4. Leistungen page presents Verkauf and Vermietung services as separate, clear sections
  5. So arbeite ich page visualizes the 4-step process with clear step indicators
  6. FAQ page displays common questions in easy-to-scan format (accordion or list)
  7. Testimonials section displays customer reviews/social proof
  8. Social media links (Instagram) appear in footer and are clickable
  9. Scroll animations reveal elements as user scrolls down pages

**Plans**: 6 plans

Plans:
- [x] 02-01-PLAN.md - Foundation: AOS setup and reusable UI components ✓
- [x] 02-02-PLAN.md - Homepage with Hero, value sections, testimonials ✓
- [x] 02-03-PLAN.md - Ueber mich and Leistungen pages ✓
- [x] 02-04-PLAN.md - So arbeite ich, FAQ, and Kontakt pages ✓
- [x] 02-05-PLAN.md - Footer social media links (Instagram) ✓
- [x] 02-06-PLAN.md - Visual verification checkpoint ✓

### Phase 3: Contact & Interactivity
**Goal**: Enable contact via form, phone, and email with GDPR-compliant map integration

**Depends on**: Phase 2

**Requirements**: CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04

**Success Criteria** (what must be TRUE):
  1. Contact form accepts Name, E-Mail, Nachricht, and Anliegen with real-time validation
  2. Form displays validation errors immediately when user enters invalid data
  3. Form submission succeeds and user receives confirmation message
  4. Form includes GDPR privacy checkbox that must be checked to submit
  5. Phone number (+49 176 33445373) is clickable on mobile devices and triggers phone call
  6. E-Mail address (denise@via-immobilien.de) is clickable and opens default email client
  7. Map displays Rhein-Main region either with two-click consent (Google Maps) or directly (OpenStreetMap)

**Plans**: 4 plans

Plans:
- [x] 03-01-PLAN.md — Contact form component with validation and Web3Forms ✓
- [x] 03-02-PLAN.md — OpenStreetMap component with Leaflet.js ✓
- [x] 03-03-PLAN.md — Integrate form/map into kontakt.astro + create danke.astro ✓
- [x] 03-04-PLAN.md — Visual verification checkpoint ✓

### Phase 4: SEO & Performance
**Goal**: Optimize for local search, measure traffic, and achieve Lighthouse 90+ scores

**Depends on**: Phase 3

**Requirements**: PERF-01, PERF-02, SEO-01, SEO-02, SEO-03

**Success Criteria** (what must be TRUE):
  1. Page load time is under 3 seconds on 3G connection (measured via PageSpeed Insights)
  2. Lighthouse score is at least 90 across all categories (Performance, Accessibility, Best Practices, SEO)
  3. All pages have unique meta title and description tags relevant to content
  4. Open Graph tags enable proper preview when shared on social media
  5. LocalBusiness schema markup exists with business name, address, phone, and service area
  6. Plausible Analytics tracks page views without requiring cookie consent

**Plans**: TBD

Plans:
- [ ] 04-01: TBD during planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Legal Compliance | 3/3 | Complete ✓ | 2026-01-30 |
| 2. Core Content Pages | 6/6 | Complete ✓ | 2026-01-30 |
| 3. Contact & Interactivity | 4/4 | Complete ✓ | 2026-01-30 |
| 4. SEO & Performance | 0/0 | Not started | - |

---
*Roadmap created: 2026-01-30*
*Last updated: 2026-01-30*
