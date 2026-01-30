---
phase: 01-foundation-legal-compliance
plan: 02
subsystem: ui
tags: [astro, layout, header, footer, navigation, responsive, accessibility]

# Dependency graph
requires:
  - phase: 01-01
    provides: Astro project structure, design system CSS with brand tokens, local fonts
provides:
  - BaseLayout template with Header and Footer
  - Smart sticky header with hide-on-scroll-down behavior
  - Accessible hamburger menu for mobile
  - 3-column responsive footer with legal links
  - Navigation component with all site links
affects: [01-03, 02-content, 03-polish]

# Tech tracking
tech-stack:
  added: []
  patterns: [component-composition, smart-sticky-scroll, mobile-first-responsive]

key-files:
  created:
    - src/layouts/BaseLayout.astro
    - src/components/Header.astro
    - src/components/Footer.astro
    - src/components/Navigation.astro
  modified:
    - src/pages/index.astro

key-decisions:
  - "Smart sticky header using CSS transform and JavaScript scroll listener"
  - "Hamburger menu with overlay, closes on Escape key and link click"
  - "Footer with Navy background for visual separation from content"
  - "Navigation as separate component for reuse in desktop and mobile contexts"

patterns-established:
  - "Layout composition: BaseLayout wraps Header + slot + Footer"
  - "Accessible navigation: ARIA attributes, keyboard support, visible focus states"
  - "Responsive breakpoints: 640px for tablet, 1024px for desktop"
  - "Component scoped styles with BEM-like naming"

# Metrics
duration: 3min
completed: 2026-01-30
---

# Phase 1 Plan 02: BaseLayout, Header, and Footer Summary

**Smart sticky header with hamburger menu, 3-column responsive footer with legal links, and BaseLayout template ensuring consistent page structure**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-30T12:40:04Z
- **Completed:** 2026-01-30T12:43:01Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments

- Smart sticky header that hides on scroll down, shows on scroll up (after 100px threshold)
- Accessible hamburger menu on mobile (<1024px) with proper ARIA, Escape to close
- 3-column responsive footer: brand, contact info with icons, legal links
- BaseLayout template as single source of page structure with Header/Footer
- Gold CTA button for Kontakt standing out in navigation

## Task Commits

Each task was committed atomically:

1. **Task 1: Header and Navigation components** - `f9d1586` (feat)
2. **Task 2: Footer component** - `dbc72a0` (feat)
3. **Task 3: BaseLayout and wire up** - `9b01d59` (feat)

## Files Created/Modified

- `src/layouts/BaseLayout.astro` - Main page template with Header, Footer, slot
- `src/components/Header.astro` - Smart sticky header with hamburger menu
- `src/components/Footer.astro` - 3-column footer with contact and legal links
- `src/components/Navigation.astro` - Reusable nav links for desktop/mobile
- `src/pages/index.astro` - Updated to use BaseLayout

## Design Patterns Implemented

**Smart Sticky Header:**
- Fixed position with CSS transform for smooth hide/show
- JavaScript scroll listener with 100px threshold
- Doesn't hide when mobile menu is open
- Uses `header--hidden` class for transform: translateY(-100%)

**Mobile Navigation:**
- Hamburger button visible below 1024px
- Full-screen overlay with navy background
- ARIA: aria-expanded, aria-controls, aria-hidden
- Closes on: Escape key, link click, window resize to desktop

**Footer Structure:**
- CSS Grid: 1 column mobile, 3 columns at 640px+
- Navy background (#142333) with cream text (#F5F0EA)
- Gold accent (#D1B787) for headings and hover states
- Contact icons inline with text

## Decisions Made

- **Smart sticky approach:** Used scroll direction detection with 100px threshold before hiding
- **Menu text alongside hamburger:** Added visible "Menu" text for clarity
- **Footer icons:** Used inline SVG icons for phone, email, location, Instagram
- **Navigation separation:** Created Navigation.astro component for reuse in desktop nav and mobile overlay

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all components compiled and built successfully on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Layout foundation complete, ready for content pages
- Legal pages (Impressum, Datenschutz) can use BaseLayout
- Navigation links already point to all future page routes
- Footer legal links ready for Plan 03

---
*Phase: 01-foundation-legal-compliance*
*Completed: 2026-01-30*
