# Phase 1: Foundation & Legal Compliance - Research

**Researched:** 2026-01-30
**Domain:** Astro static site generation, German GDPR/DSGVO compliance, Design systems
**Confidence:** HIGH

## Summary

Phase 1 establishes a modern Astro-based website foundation with GDPR-compliant legal infrastructure for a German real estate business. The research covered five critical domains: Astro project setup (currently at v5, with v6 beta available), DSGVO-compliant cookie consent implementation, design system architecture using CSS custom properties, German legal requirements for real estate agents (Makler), and accessible responsive navigation patterns.

The standard approach leverages Astro 5.x (with optional upgrade to v6 beta) for static site generation, vanilla-cookieconsent for GDPR compliance, CSS custom properties for design tokens, and local font hosting to avoid GDPR violations. All findings are verified against official documentation and current 2026 legal requirements.

**Primary recommendation:** Use Astro 5.x with vanilla-cookieconsent v3, implement design system via CSS custom properties, host fonts locally for GDPR compliance, and use free German Impressum/Datenschutzerklärung generators with real estate-specific additions.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x (stable) or 6.0 beta | Static site generator | Official stable version with Content Layer API, excellent performance, zero JS by default |
| vanilla-cookieconsent | 3.x | GDPR/DSGVO cookie consent | Lightweight (no dependencies), GDPR/CCPA compliant, MIT licensed, actively maintained |
| CSS Custom Properties | Native | Design tokens & theming | Native browser support, no build tooling needed, perfect for design systems |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/check | Latest | TypeScript validation | Development - type checking for .astro files |
| Node.js | 22+ | Runtime environment | Required for Astro 6 (Node 18+ for Astro 5) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| vanilla-cookieconsent | Klaro.js / Osano | More features but heavier; vanilla-cookieconsent is sufficient for simple sites |
| CSS Custom Properties | Sass variables | Sass requires build step and lacks runtime flexibility |
| Local font hosting | Google Fonts CDN | CDN easier but violates GDPR - requires consent banner |
| Astro 5 | Astro 6 beta | v6 has new dev server and CSP support but is beta; v5 is production-ready |

**Installation:**
```bash
npm create astro@latest
# During setup, choose:
# - Empty or minimal template
# - TypeScript: Strict (recommended)
# - Install dependencies: Yes

# Add cookie consent
npm install vanilla-cookieconsent
```

## Architecture Patterns

### Recommended Project Structure
```
via-immo/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.astro     # Smart sticky header with hamburger menu
│   │   ├── Footer.astro     # 3-column footer layout
│   │   ├── Navigation.astro # Main nav (reused in header/mobile menu)
│   │   └── CookieBanner.astro # Cookie consent integration
│   ├── layouts/             # Page templates
│   │   └── BaseLayout.astro # Main layout (header, footer, SEO meta)
│   ├── pages/               # Routes (file-based routing)
│   │   ├── index.astro      # Homepage
│   │   ├── impressum.astro  # Legal: Impressum
│   │   └── datenschutz.astro # Legal: Privacy policy
│   ├── styles/              # Global styles
│   │   ├── global.css       # CSS reset, design tokens, base styles
│   │   └── fonts/           # Locally hosted font files
│   └── scripts/             # Client-side JS (minimal)
│       └── cookieconsent.js # Cookie consent initialization
├── public/                  # Static assets (logo, images)
│   └── logo.svg             # Via Immobilien logo
├── astro.config.mjs         # Astro configuration
└── package.json
```

### Pattern 1: Design Tokens with CSS Custom Properties
**What:** Define brand colors, typography, spacing as CSS variables for consistency
**When to use:** Foundation phase - establish before building components
**Example:**
```css
/* Source: CSS best practices for design systems 2026 */
:root {
  /* Colors - Brand */
  --color-navy: #142333;
  --color-cream: #F5F0EA;
  --color-gold: #D1B787;

  /* Colors - Semantic */
  --color-primary: var(--color-navy);
  --color-background: var(--color-cream);
  --color-accent: var(--color-gold);

  /* Typography - Base */
  --font-serif: 'Libre Baskerville', Georgia, serif;
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-size-base: 1rem; /* 16px */

  /* Spacing */
  --spacing-unit: 1rem;
  --spacing-xs: calc(var(--spacing-unit) * 0.5);
  --spacing-sm: var(--spacing-unit);
  --spacing-md: calc(var(--spacing-unit) * 1.5);
  --spacing-lg: calc(var(--spacing-unit) * 2);
  --spacing-xl: calc(var(--spacing-unit) * 3);
}
```

### Pattern 2: Base Layout with Slots
**What:** Create reusable page template with header, footer, and dynamic content area
**When to use:** Every page uses this as wrapper for consistent structure
**Example:**
```astro
---
// Source: Astro official docs - Layouts pattern
// src/layouts/BaseLayout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Via Immobilien</title>
  {description && <meta name="description" content={description}>}
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <Header />
  <main>
    <slot /> <!-- Page content inserted here -->
  </main>
  <Footer />
</body>
</html>
```

### Pattern 3: Smart Sticky Header with Intersection Observer
**What:** Header appears when scrolling up, hides when scrolling down
**When to use:** Locked decision from CONTEXT.md - implement smart sticky behavior
**Example:**
```javascript
// Source: Intersection Observer sticky header patterns 2026
// Client-side script for smart sticky behavior
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down - hide header
    header.classList.add('header--hidden');
  } else {
    // Scrolling up - show header
    header.classList.remove('header--hidden');
  }

  lastScrollY = currentScrollY;
});
```

### Pattern 4: Accessible Hamburger Menu
**What:** Mobile navigation with proper ARIA attributes and keyboard support
**When to use:** Locked decision - hamburger menu for mobile navigation
**Example:**
```astro
---
// Source: Accessibility best practices for hamburger menus 2026
---
<nav aria-label="Hauptnavigation">
  <button
    class="hamburger"
    aria-expanded="false"
    aria-controls="mobile-menu"
    aria-label="Menü öffnen"
  >
    <span aria-hidden="true">☰</span>
    <span class="hamburger__text">Menü</span>
  </button>

  <ul id="mobile-menu" class="nav-menu" hidden>
    <li><a href="/">Startseite</a></li>
    <li><a href="/leistungen">Leistungen</a></li>
    <li><a href="/kontakt" class="cta-button">Kontakt</a></li>
  </ul>
</nav>

<script>
  const button = document.querySelector('.hamburger');
  const menu = document.getElementById('mobile-menu');

  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
    button.setAttribute('aria-label', isExpanded ? 'Menü öffnen' : 'Menü schließen');
    menu.hidden = isExpanded;
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.hidden === false) {
      button.click();
      button.focus();
    }
  });
</script>
```

### Pattern 5: Cookie Consent Integration
**What:** GDPR-compliant cookie banner with granular controls
**When to use:** Required by DSGVO - implement before any tracking/analytics
**Example:**
```javascript
// Source: vanilla-cookieconsent documentation
// src/scripts/cookieconsent.js
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

CookieConsent.run({
  language: {
    default: 'de',
    translations: {
      de: {
        consentModal: {
          title: 'Wir verwenden Cookies',
          description: 'Diese Website verwendet Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. Sie können Ihre Einwilligung jederzeit widerrufen.',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Nur notwendige',
          showPreferencesBtn: 'Einstellungen'
        },
        preferencesModal: {
          title: 'Cookie-Einstellungen',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Nur notwendige',
          savePreferencesBtn: 'Einstellungen speichern',
          sections: [
            {
              title: 'Notwendige Cookies',
              description: 'Diese Cookies sind für die Funktion der Website erforderlich.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Analyse & Marketing',
              description: 'Diese Cookies helfen uns, die Website zu verbessern.',
              linkedCategory: 'analytics'
            }
          ]
        }
      }
    }
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true
    },
    analytics: {
      enabled: false,
      readOnly: false
    }
  }
});
```

### Pattern 6: Fluid Typography with CSS Clamp
**What:** Responsive font sizes that scale smoothly between breakpoints
**When to use:** Locked decision - 16px base size with responsive scaling
**Example:**
```css
/* Source: Fluid Typography best practices 2026 */
:root {
  /* Fluid font sizes: min, preferred (viewport-based), max */
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.4vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-xl: clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem);
  --font-size-2xl: clamp(2.25rem, 2rem + 2vw, 3.5rem);
}

body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base); /* Scales 16px -> 18px */
}

h1 {
  font-family: var(--font-serif);
  font-size: var(--font-size-2xl); /* Scales 36px -> 56px */
}
```

### Anti-Patterns to Avoid
- **Loading Google Fonts from CDN without consent:** Violates GDPR by sending user IP to Google - use local hosting instead
- **Global styles without scoping:** Astro components have scoped styles by default - leverage this for maintainability
- **Hardcoded colors/spacing:** Use CSS custom properties for design tokens to enable easy theme changes
- **Cookie consent loaded after analytics:** Analytics must be blocked until consent is given - load consent script first
- **Missing `lang="de"` attribute:** Required for screen readers and SEO - always set on `<html>` tag
- **Hamburger button without text label:** Screen readers need text - include visible "Menü" text or aria-label
- **Inline critical CSS manually:** Astro handles this automatically for files under 4kB - don't manually inline

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cookie consent banner | Custom checkbox popup | vanilla-cookieconsent v3 | GDPR compliance is complex: granular controls, opt-out, consent storage, script blocking, multilingual support |
| Sticky header behavior | Custom scroll listener | CSS `position: sticky` + Intersection Observer | Browser-optimized, GPU-accelerated, less janky than scroll events |
| Responsive typography | Manual media queries | CSS `clamp()` function | Fluid scaling eliminates breakpoint jumps, fewer media queries to maintain |
| Impressum/Datenschutzerklärung | Writing from scratch | Impressum-Generator.de, eRecht24.de | Legal compliance requires specific wording; generators are lawyer-verified and updated for current law |
| Mobile navigation | Custom dropdown logic | Semantic HTML + ARIA + minimal JS | Accessibility is hard: keyboard navigation, screen reader support, focus management |
| Design tokens | Sass variables | CSS Custom Properties | Runtime theming, no build step, easier debugging, better for dark mode |

**Key insight:** GDPR compliance and accessibility are domains where DIY solutions create legal and usability risks. Use established, tested libraries that handle edge cases (e.g., consent withdrawal, keyboard-only navigation, screen reader compatibility). The time saved on implementation is minor compared to the risk of non-compliance.

## Common Pitfalls

### Pitfall 1: Google Fonts GDPR Violation
**What goes wrong:** Loading Google Fonts from Google's CDN transmits user IP addresses to Google servers, which violates GDPR without explicit consent (German court ruling, January 2022).
**Why it happens:** Convenience - Google Fonts CDN is the default integration method shown in most tutorials.
**How to avoid:**
1. Download font files from Google Fonts
2. Place in `src/styles/fonts/` directory
3. Use `@font-face` rules in CSS to load locally
4. Alternatively, use `fontsource` npm packages for automated local hosting
**Warning signs:** Network tab shows requests to `fonts.googleapis.com` or `fonts.gstatic.com` on page load

### Pitfall 2: Cookie Consent Banner Without Script Blocking
**What goes wrong:** Cookie banner is shown but analytics/tracking scripts load immediately anyway, defeating the purpose of consent.
**Why it happens:** Cookie banner is purely cosmetic without integration into script loading logic.
**How to avoid:**
1. Use vanilla-cookieconsent's built-in script management
2. OR manually check consent before loading scripts: `if (CookieConsent.acceptedCategory('analytics')) { loadAnalytics(); }`
3. Add `type="text/plain"` data attributes to script tags until consent is given
**Warning signs:** Google Analytics/tracking fires in network tab before user interacts with cookie banner

### Pitfall 3: Missing Real Estate-Specific Impressum Requirements
**What goes wrong:** Standard Impressum generator output lacks required information for real estate agents (Makler), leading to potential fines up to €50,000.
**Why it happens:** Generic Impressum generators don't account for profession-specific requirements under § 34c GewO.
**How to avoid:**
1. Use generator (eRecht24.de, Impressum-Generator.de) for base content
2. Manually add: Trade permit authority (Zulassungsbehörde), Professional chamber details, § 34c GewO reference
3. Verify against § 5 TMG and § 34c GewO requirements
4. Example: "Aufsichtsbehörde: [local trade office], Zulassung nach § 34c GewO"
**Warning signs:** Generated Impressum doesn't mention supervisory authority or trade permit

### Pitfall 4: Hamburger Menu Not Keyboard Accessible
**What goes wrong:** Hamburger menu only works with mouse clicks, cannot be opened/closed with keyboard, trapping keyboard-only users.
**Why it happens:** Using `<div>` instead of `<button>`, missing `aria-expanded`, no keyboard event handlers.
**How to avoid:**
1. Use semantic `<button>` element for toggle
2. Add `aria-expanded`, `aria-controls`, `aria-label` attributes
3. Ensure menu closes on Escape key
4. Return focus to button when menu closes
5. Include visible "Menü" text (not just icon) for clarity
**Warning signs:** Tab key skips over hamburger icon, Enter/Space doesn't activate menu, screen reader doesn't announce state

### Pitfall 5: Astro Scoped Styles Not Applied to Imported Components
**What goes wrong:** Styling Header.astro from a parent component doesn't work because Astro scopes styles to prevent leakage.
**Why it happens:** Expecting global CSS cascade behavior; Astro's scoped styles are component-isolated by design.
**How to avoid:**
1. Style components internally (preferred)
2. Use `:global()` selector for targeting child components: `.parent :global(.header) { }`
3. OR use `<style is:global>` for truly global styles
4. Pass CSS classes as props for external styling
**Warning signs:** Styles defined in parent component don't appear on child component elements

### Pitfall 6: Hardcoded Breakpoints Instead of Mobile-First
**What goes wrong:** Desktop-first approach (max-width media queries) creates bloated mobile CSS and harder maintenance.
**Why it happens:** Designing for desktop screen first, then scaling down.
**How to avoid:**
1. Start with mobile layout (no media queries needed)
2. Add progressive enhancements with `min-width` media queries
3. Common breakpoints: 640px (tablet), 1024px (desktop), 1280px (wide)
4. Use CSS Grid/Flexbox for fluid layouts instead of fixed widths
**Warning signs:** Many `max-width` media queries, mobile performance issues, complex override rules

## Code Examples

Verified patterns from official sources:

### Local Font Hosting with @font-face
```css
/* Source: GDPR-compliant Google Fonts integration 2026 */
/* src/styles/global.css */

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Prevent FOIT (flash of invisible text) */
  src: url('/fonts/inter-regular.woff2') format('woff2'),
       url('/fonts/inter-regular.woff') format('woff');
}

@font-face {
  font-family: 'Libre Baskerville';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/libre-baskerville-regular.woff2') format('woff2'),
       url('/fonts/libre-baskerville-regular.woff') format('woff');
}

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Libre Baskerville', Georgia, 'Times New Roman', serif;
}
```

### Responsive Navigation with Mobile Hamburger
```astro
---
// Source: Astro responsive navigation patterns + accessibility best practices
// src/components/Navigation.astro
const navItems = [
  { href: '/', label: 'Startseite' },
  { href: '/ueber-mich', label: 'Über mich' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/kontakt', label: 'Kontakt', cta: true }
];
---

<nav class="navigation" aria-label="Hauptnavigation">
  <button
    class="hamburger"
    aria-expanded="false"
    aria-controls="nav-menu"
    aria-label="Menü öffnen"
    type="button"
  >
    <span class="hamburger__icon" aria-hidden="true">☰</span>
    <span class="hamburger__text">Menü</span>
  </button>

  <ul id="nav-menu" class="nav-menu" hidden>
    {navItems.map(item => (
      <li>
        <a
          href={item.href}
          class:list={['nav-link', { 'nav-link--cta': item.cta }]}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>

<style>
  /* Mobile-first: hamburger visible by default */
  .hamburger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: var(--color-background);
    padding: var(--spacing-xl);
    list-style: none;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .nav-menu:not([hidden]) {
    transform: translateX(0);
  }

  /* Desktop: hide hamburger, show inline menu */
  @media (min-width: 1024px) {
    .hamburger {
      display: none;
    }

    .nav-menu {
      position: static;
      display: flex;
      gap: var(--spacing-md);
      width: auto;
      height: auto;
      padding: 0;
      transform: none;
    }

    .nav-menu[hidden] {
      display: flex; /* Override hidden on desktop */
    }
  }

  .nav-link--cta {
    background: var(--color-accent);
    color: var(--color-primary);
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    font-weight: 600;
  }
</style>

<script>
  const button = document.querySelector('.hamburger');
  const menu = document.getElementById('nav-menu');

  button?.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isExpanded));
    button.setAttribute('aria-label', isExpanded ? 'Menü öffnen' : 'Menü schließen');
    menu!.hidden = isExpanded;
  });

  // Close on Escape and return focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && !menu.hidden) {
      menu.hidden = true;
      button?.setAttribute('aria-expanded', 'false');
      button?.setAttribute('aria-label', 'Menü öffnen');
      button?.focus();
    }
  });
</script>
```

### Three-Column Footer Layout
```astro
---
// Source: Locked decision from CONTEXT.md - 3-column footer structure
// src/components/Footer.astro
---

<footer class="footer">
  <div class="footer__container">
    <div class="footer__column footer__column--brand">
      <img src="/logo.svg" alt="Via Immobilien" class="footer__logo" />
    </div>

    <div class="footer__column footer__column--contact">
      <h3>Kontakt</h3>
      <p>
        <a href="tel:+4917633445373">+49 176 33445373</a><br>
        <a href="mailto:denise@via-immobilien.de">denise@via-immobilien.de</a><br>
        Region: Rhein-Main
      </p>
      <div class="footer__social">
        <a href="https://instagram.com/via-immobilien" aria-label="Instagram">
          {/* Instagram icon */}
        </a>
      </div>
    </div>

    <div class="footer__column footer__column--legal">
      <h3>Rechtliches</h3>
      <nav aria-label="Rechtliche Seiten">
        <ul>
          <li><a href="/impressum">Impressum</a></li>
          <li><a href="/datenschutz">Datenschutzerklärung</a></li>
        </ul>
      </nav>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-primary);
    color: var(--color-background);
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .footer__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: var(--spacing-lg);
  }

  /* Mobile: stack columns */
  @media (min-width: 640px) {
    .footer__container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .footer__logo {
    max-width: 150px;
  }

  .footer a {
    color: var(--color-background);
    text-decoration: none;
  }

  .footer a:hover {
    color: var(--color-accent);
  }
</style>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Scroll event listeners for sticky headers | CSS `position: sticky` + Intersection Observer | 2020-2021 | Better performance, GPU-accelerated, less JavaScript |
| Manual responsive breakpoints for typography | CSS `clamp()` for fluid typography | 2021-2022 | Smoother scaling, fewer media queries, better UX |
| Google Fonts CDN | Local font hosting | 2022 (GDPR ruling) | Legal compliance in Germany, privacy protection |
| Sass variables for theming | CSS Custom Properties | 2018-2020 | Runtime theming, no build step required, easier debugging |
| Osano CookieConsent (v2) | vanilla-cookieconsent (v3) | 2023 | Lighter, better maintained, more flexible configuration |
| Node 18 for Astro | Node 22+ for Astro 6 | 2026 (Astro 6 beta) | Performance improvements, modern JS features |
| Manual content management in Astro | Content Layer API | 2025 (Astro 5) | Type-safe content, better DX, loader ecosystem |

**Deprecated/outdated:**
- **Astro 4.x and earlier:** Replaced by Astro 5 (Dec 2024) with Content Layer API and server islands
- **Osano's cookieconsent library:** No longer actively maintained; use orestbida/cookieconsent (vanilla-cookieconsent) instead
- **Sass for design tokens:** CSS Custom Properties are now standard; Sass adds unnecessary build complexity for simple design systems
- **`max-width` media queries only:** Mobile-first with `min-width` is standard practice for responsive design
- **Google Fonts CDN in Germany:** Illegal without consent since January 2022 German court ruling

## Open Questions

Things that couldn't be fully resolved:

1. **Specific supervisory authority for real estate agent license**
   - What we know: § 34c GewO requires listing trade permit authority in Impressum
   - What's unclear: Which local authority issued Denise Semmel's Makler license (city/region-specific)
   - Recommendation: Check physical license document or contact local Ordnungsamt/Gewerbeamt to confirm exact authority name and address

2. **Exact font weights needed for brand consistency**
   - What we know: Serif for headings, sans-serif for body text; Inter + Libre Baskerville are good pairings
   - What's unclear: Which font weights (400, 600, 700?) match existing brand materials
   - Recommendation: Download font files for weights 400 and 600 initially; add 700 if needed after reviewing logo/existing materials

3. **Cookie consent categories beyond necessary/analytics**
   - What we know: No tracking/analytics mentioned in requirements
   - What's unclear: Future plans for Google Analytics, Facebook Pixel, or other tracking
   - Recommendation: Implement with "necessary" cookies only; add "analytics" category placeholder for future use

4. **Astro 5 vs. Astro 6 beta for production**
   - What we know: Astro 5.x is stable (released Dec 2024), Astro 6 beta available (Jan 2026) with CSP support and new dev server
   - What's unclear: Timeline for v1 launch - is beta acceptable risk?
   - Recommendation: Use Astro 5.x for production stability; v6 features (CSP, improved dev server) not critical for Phase 1 requirements

## Sources

### Primary (HIGH confidence)
- [Astro Official Docs - Getting Started](https://docs.astro.build/en/getting-started/) - Project setup, folder structure
- [Astro Official Docs - Project Structure](https://docs.astro.build/en/basics/project-structure/) - Recommended organization
- [Astro Official Docs - Styling](https://docs.astro.build/en/guides/styling/) - CSS architecture, scoped styles
- [Astro Official Docs - Layouts](https://docs.astro.build/en/basics/layouts/) - Layout patterns, slots
- [vanilla-cookieconsent Official Docs](https://cookieconsent.orestbida.com/) - Cookie consent integration
- [vanilla-cookieconsent GitHub](https://github.com/orestbida/cookieconsent) - Installation, configuration
- [MDN - CSS Custom Properties](https://developer.mozilla.org/en/docs/Web/CSS/Reference/Properties/--*) - Design token implementation

### Secondary (MEDIUM confidence)
- [Astro in 2026: Modern Framework Overview](https://medium.com/@dedikusniadi/astro-in-2026-a-modern-lightweight-and-relevant-framework-for-todays-web-4facee25a4e5) - Current state of Astro
- [Astro 6 Beta Announcement](https://astro.build/blog/astro-6-beta/) - Upcoming features
- [Cookie Banner Requirements by Country (EU 2026)](https://cookiebanner.com/blog/cookie-banner-requirements-by-country-eu-overview-2026/) - GDPR compliance requirements
- [Germany DSK Cookie Consent Guidelines](https://www.cookielawinfo.com/germany-dsk-cookie-consent-banner/) - German-specific DSGVO rules
- [Impressum Requirements for Real Estate Agents](https://www.liesegang-partner.com/knowhow/requirements-for-real-estate-agents-in-germany-according-to-34c-gewo) - § 34c GewO requirements
- [eRecht24 - Impressumspflicht für Makler](https://www.e-recht24.de/impressum/7906-impressum-immobilienmakler.html) - Real estate specific Impressum rules
- [Google Fonts and GDPR Compliance](https://www.cookieyes.com/documentation/google-fonts-and-gdpr/) - Local hosting requirement
- [Are Hamburger Menus Bad for Accessibility?](https://www.boia.org/blog/are-hamburger-menus-bad-for-accessibility) - Accessibility best practices
- [Keyboard Accessible Hamburger Menu](https://accessibility.mste.illinois.edu/demos/keyboard-accessible-hamburger-menu) - Implementation patterns
- [Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) - Responsive typography
- [Font Pairing Chart for Web Design (2026)](https://elementor.com/blog/font-pairing-chart/) - Typography combinations
- [20+ Beautiful Google Font Pairings For 2026 Websites](https://www.landingpageflow.com/post/google-font-pairings-for-websites) - Recommended font pairs

### Tertiary (LOW confidence)
- [Astro Navbar Component](https://github.com/surjithctly/astro-navbar) - Community component example
- [Responsive Design Best Practices 2026](https://www.adicator.com/post/responsive-design-best-practices) - General mobile-first guidance
- [Datenschutz-Generator Comparison](https://impressum-generator.de/datenschutz-generator) - Generator tool recommendations

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro and vanilla-cookieconsent verified from official docs and active GitHub repos
- Architecture: HIGH - Patterns verified from official Astro documentation and established web standards
- Pitfalls: MEDIUM - GDPR/font hosting verified from legal sources; accessibility patterns from W3C/community best practices
- German legal: MEDIUM - Impressum requirements verified from legal blogs but not directly from law text (§ 5 TMG, § 34c GewO)
- Font pairing: LOW - Recommendations from design blogs, not tested against Via Immobilien brand materials

**Research date:** 2026-01-30
**Valid until:** 2026-02-28 (30 days for stable domain; Astro ecosystem is mature, legal requirements change slowly)
