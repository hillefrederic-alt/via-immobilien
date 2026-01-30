---
phase: 04-seo-performance
plan: 03
subsystem: performance
tags: [performance, fonts, preload, core-web-vitals, lcp]
status: complete
duration: 65s
completed: 2026-01-30

# Dependencies
requires:
  - 04-01: "astro-seo component and sitemap"
  - 04-02: "schema.org structured data and Plausible Analytics"
  - 01-02: "typography and font files"
provides:
  - Font preloading infrastructure
  - Optimized resource loading strategy
affects:
  - 04-04: "May need additional image optimization in other components"

# Technical details
tech-stack:
  added: []
  patterns:
    - Resource hints (preload)
    - Critical font loading optimization
    - LCP optimization strategy

# File tracking
key-files:
  created: []
  modified:
    - src/layouts/BaseLayout.astro: "Added font preload links"

# Decisions
decisions:
  - id: font-preload-strategy
    decision: "Preload only 2 critical fonts (Libre Baskerville + Inter Regular)"
    rationale: "Headings use Libre Baskerville (LCP impact), body text uses Inter Regular (most used). Inter Semibold is secondary weight, less critical."
    alternatives: ["Preload all 3 fonts (increases initial payload)", "No preloading (slower font rendering)"]
    impact: "Faster LCP for text content, reduced FOIT/FOUT"

  - id: crossorigin-attribute
    decision: "Include crossorigin attribute on all font preloads"
    rationale: "Required for CORS even with self-hosted fonts, prevents double-fetch"
    alternatives: ["Omit crossorigin (causes browser warning and double fetch)"]
    impact: "Proper font loading, no browser warnings"

  - id: hero-image-strategy
    decision: "No image optimization needed for Hero component"
    rationale: "Hero is text-only with background-color, already optimal for performance"
    alternatives: ["Add hero background image (would require optimization)"]
    impact: "Zero image bytes for hero = fast LCP"

# Metrics
metrics:
  duration: 65s
  tasks-completed: 2
  files-modified: 1
  commits: 1
---

# Phase 4 Plan 3: Font Preloading & Image Optimization Summary

**One-liner:** Critical font preloading with crossorigin attribute for LCP optimization; text-only Hero confirmed performant.

## What Was Delivered

### Font Preloading Infrastructure
- Added preload links for 2 critical fonts in BaseLayout.astro
- Libre Baskerville Regular (heading font, LCP impact)
- Inter Regular (primary body font)
- Positioned early in `<head>` before SEO component
- Included required `crossorigin` attribute on both preload links

### Hero Component Audit
- Confirmed Hero component is text-only (no images)
- No background images in CSS
- Uses only `background-color: var(--color-cream)`
- Already optimal for performance - no optimization needed

## Implementation Details

### Font Preload Strategy
**Location:** `src/layouts/BaseLayout.astro` (lines 43-57)

```astro
<!-- Preload critical fonts for LCP optimization -->
<link
  rel="preload"
  href="/fonts/libre-baskerville-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/inter-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Why these fonts:**
- **Libre Baskerville:** Used for h1, h2 headings (affects LCP text)
- **Inter Regular:** Primary body font (most used weight)
- **NOT Inter Semibold:** Secondary weight, less critical for initial render

**Critical attributes:**
- `crossorigin`: Required for fonts (even self-hosted) to prevent CORS double-fetch
- `type="font/woff2"`: Helps browser prioritize correctly
- Positioned before CSS/SEO: Early discovery = faster loading

### Hero Component Status
**Location:** `src/components/Hero.astro`

**Finding:** Text-only hero section
- No `<img>` or `<Image>` components
- No CSS background-image
- Only background-color (instant render)
- Already optimal for LCP

**Performance characteristics:**
- Zero image bytes
- No layout shift risk (text-based)
- Fast text rendering with preloaded fonts
- AOS fade-up animation doesn't block LCP

## Verification Results

✅ **Font Preload Links:**
- Preload links present in BaseLayout
- crossorigin attribute on both links
- Positioned early in `<head>`
- font-display: swap already in global.css

✅ **Hero Image Status:**
- No images to optimize (text-only)
- No background images in CSS
- Already performant for LCP

✅ **Resource Loading Strategy:**
- Critical fonts load early (preload)
- Non-critical font (Semibold) loads on-demand
- Hero section renders instantly (no images)

## Decisions Made

### Font Preload Selection
**Decision:** Preload only Libre Baskerville Regular and Inter Regular

**Rationale:**
- These 2 fonts have highest LCP impact (headings + body)
- Inter Semibold is used sparingly (buttons, labels)
- Preloading too many fonts increases initial payload
- Better to preload critical fonts than all fonts

**Alternative considered:**
- Preload all 3 fonts → Rejected (unnecessary bytes in critical path)

**Impact:**
- Faster LCP for hero headline and body text
- Reduced FOIT (Flash of Invisible Text)
- Reduced FOUT (Flash of Unstyled Text)

### crossorigin Attribute
**Decision:** Include crossorigin attribute on all font preloads

**Rationale:**
- Required by browsers for CORS (even for self-hosted fonts)
- Without it, browser fetches font twice (once for preload, once for use)
- Prevents console warning: "preload found but not used"

**Alternative considered:**
- Omit crossorigin → Rejected (causes performance regression)

**Impact:**
- Proper font loading (no double-fetch)
- Clean browser console (no warnings)
- Better Lighthouse score

### Hero Image Strategy
**Decision:** No image optimization needed for Hero component

**Rationale:**
- Hero is text-only with background-color
- Already optimal for performance
- Zero image bytes = instant render
- Adding image would require optimization and increase LCP

**Alternative considered:**
- Add hero background image → Deferred (not in current design)

**Impact:**
- Fastest possible hero render
- No CLS risk from image loading
- Text-based LCP is easier to optimize

## Performance Impact

### Core Web Vitals Improvements

**LCP (Largest Contentful Paint):**
- Font preloading reduces text render delay
- Text-only hero = no image loading delay
- Expected improvement: 200-500ms faster LCP

**CLS (Cumulative Layout Shift):**
- No images = no layout shift from image loading
- font-display: swap prevents invisible text flash
- Expected: CLS remains 0

**FID (First Input Delay):**
- No JavaScript in critical path
- Lightweight preload hints don't block interactivity
- Expected: No impact (already fast)

### Resource Loading Timeline
**Before optimization:**
1. HTML loads
2. CSS loads → discovers fonts
3. Fonts start loading (delayed)
4. Text renders when fonts arrive

**After optimization:**
1. HTML loads → discovers font preload hints
2. Browser starts fetching fonts immediately (parallel with CSS)
3. CSS loads
4. Fonts already arriving/arrived
5. Text renders faster

**Estimated improvement:** 300-500ms faster font rendering

## Next Phase Readiness

### Performance Optimization Status
✅ **Font loading:** Optimized
✅ **Hero section:** Optimized (text-only)
⚠️ **Other images:** Not yet audited (potential for 04-04)

### Remaining Performance Work
1. Audit other page components for images:
   - ServiceCard components (Leistungen page)
   - Testimonial components (if using photos)
   - About page profile photo (if exists)
   - Partner logos (if any)

2. Apply image optimization attributes where needed:
   - Above-fold: `loading="eager"` + `fetchpriority="high"`
   - Below-fold: `loading="lazy"`
   - All: explicit `width` and `height` for CLS prevention

3. Consider additional optimizations:
   - CSS critical path optimization
   - JavaScript code splitting (if adding interactivity)
   - Third-party script optimization (Plausible already lightweight)

### Blockers
None.

### Concerns
None. Current implementation follows best practices for font and resource loading optimization.

## Deviations from Plan

None - plan executed exactly as written.

## Testing Notes

### Manual Verification
**To verify font preloading works:**
1. Open site in browser
2. Open DevTools → Network tab
3. Filter by "Font"
4. Refresh page
5. Check Initiator column shows "preload" for critical fonts
6. Verify no console warnings about unused preloads

**To verify no CLS:**
1. Open DevTools → Performance tab
2. Record page load
3. Check Layout Shift events (should be none)
4. Verify text renders quickly without flashing

### Lighthouse Testing
**Expected improvements:**
- Performance score: Should reach 90+
- Best Practices: Should remain 100
- SEO: Should remain 100
- Accessibility: Should remain 100

**Key metrics to watch:**
- LCP: Target < 2.5s (should easily achieve on text-only hero)
- CLS: Target < 0.1 (should be 0)
- FID: Target < 100ms (should be < 50ms)

### Browser Compatibility
- Font preload with crossorigin: Supported all modern browsers
- font-display: swap: Supported all modern browsers
- No polyfills needed

## Commits

| Commit | Message | Files Changed |
|--------|---------|---------------|
| 1ea36f2 | perf(04-03): add font preloading to BaseLayout | src/layouts/BaseLayout.astro |

**Total commits:** 1
**Total files modified:** 1

## Related Files

### Modified
- `src/layouts/BaseLayout.astro`: Added font preload links in `<head>`

### Referenced (no changes needed)
- `src/components/Hero.astro`: Verified text-only (already optimal)
- `src/styles/global.css`: Verified font-display: swap already configured
- `public/fonts/libre-baskerville-regular.woff2`: Preloaded
- `public/fonts/inter-regular.woff2`: Preloaded
- `public/fonts/inter-semibold.woff2`: Not preloaded (on-demand)

## Knowledge for Future Phases

### Font Loading Best Practices
1. **Preload only critical fonts** (1-2 fonts max)
2. **Always include crossorigin** on font preload links
3. **Use font-display: swap** to prevent FOIT
4. **Position preload early** in `<head>` for fastest discovery
5. **Don't preload all fonts** - increases initial payload

### Image Loading Strategy
1. **Above-fold images:** `loading="eager"` + `fetchpriority="high"`
2. **Below-fold images:** `loading="lazy"`
3. **All images:** Explicit `width` and `height` for CLS prevention
4. **LCP images:** Should be discoverable in initial HTML (not CSS)
5. **Text-only sections:** Already optimal (like Hero component)

### LCP Optimization Patterns
- **Text-based LCP:** Preload critical fonts
- **Image-based LCP:** Use fetchpriority="high" + eager loading
- **Background images:** Consider converting to `<img>` for better optimization
- **Above-fold content:** Minimize render-blocking resources

### Performance Monitoring
- Use Lighthouse CI for automated performance tracking
- Monitor Core Web Vitals in production (Plausible doesn't track, may need separate tool)
- Watch for font loading regressions (check Network tab periodically)
- Verify preload hints still used after code changes

---

**Completed:** 2026-01-30
**Duration:** 65 seconds
**Phase 4 progress:** 3/4 plans complete
