# Architecture Patterns

**Domain:** Small Business Website (Real Estate Agent)
**Researched:** 2026-01-30
**Confidence:** HIGH

## Recommended Architecture

A 6-page real estate agent business website built with Astro follows a **component-based static site architecture** with clear separation between layout, reusable components, page routes, and static assets. This architecture leverages Astro's file-system routing and zero-JavaScript-by-default approach.

```
┌─────────────────────────────────────────────────┐
│              Static Site (Astro)                │
├─────────────────────────────────────────────────┤
│  Layouts (Header/Footer/Nav wrapper)            │
│  ↓                                              │
│  Pages (File-based routing)                     │
│  ↓                                              │
│  Components (Reusable UI elements)              │
│  ↓                                              │
│  Assets (Images, styles, fonts)                 │
└─────────────────────────────────────────────────┘
         ↓
    Build Process
         ↓
┌─────────────────────────────────────────────────┐
│         Static HTML/CSS/JS Output               │
│  (Deployable to any static host)                │
└─────────────────────────────────────────────────┘

External Dependencies:
  - Google Maps API (embedded iframe)
  - Form endpoint service (e.g., Web3Forms, Formsubmit)
```

### Directory Structure

Based on [Astro's official documentation](https://docs.astro.build/en/basics/project-structure/), the recommended structure is:

```
via-immobilien/
├── src/
│   ├── pages/               # REQUIRED - File-based routing
│   │   ├── index.astro      # Startseite (/)
│   │   ├── ueber-mich.astro # Über mich (/ueber-mich)
│   │   ├── leistungen.astro # Leistungen (/leistungen)
│   │   ├── so-arbeite-ich.astro  # So arbeite ich (/so-arbeite-ich)
│   │   ├── kontakt.astro    # Kontakt (/kontakt)
│   │   └── faq.astro        # FAQ (/faq)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro # Main wrapper with header/nav/footer
│   │
│   ├── components/
│   │   ├── Header.astro     # Logo + navigation
│   │   ├── Footer.astro     # Contact info + legal links
│   │   ├── Hero.astro       # Homepage hero section
│   │   ├── ContactForm.astro # Contact form with validation
│   │   ├── ProcessSteps.astro # 4-step process visualization
│   │   ├── ServiceCard.astro  # Reusable service display
│   │   └── FAQItem.astro    # Accordion/list item for FAQ
│   │
│   ├── styles/
│   │   ├── global.css       # Global styles, CSS variables for brand colors
│   │   └── components/      # Optional: Component-specific styles
│   │
│   └── assets/
│       ├── images/
│       │   ├── logo.svg     # Via Immobilien logo
│       │   └── denise.jpg   # Profile photo
│       └── fonts/           # Optional: Custom fonts if needed
│
├── public/                  # Unprocessed static assets
│   ├── favicon.ico
│   └── robots.txt
│
├── astro.config.mjs         # Astro configuration
├── package.json
└── tsconfig.json            # TypeScript config (even for JS projects)
```

**Rationale:**
- `src/pages/` is the only mandatory directory - Astro uses it for file-based routing
- German slugs (ueber-mich, so-arbeite-ich) match user expectations
- `layouts/` provides shared structure (DRY principle)
- `components/` organized by function, not by page
- `styles/` uses CSS custom properties for brand colors (Navy Blue, Cream, Soft Gold)
- `public/` for assets that shouldn't be processed (favicon, robots.txt)

## Component Boundaries

| Component | Responsibility | Communicates With | Props/Data |
|-----------|---------------|-------------------|------------|
| **BaseLayout** | Wraps all pages with header, nav, footer | Header, Footer | `title`, `description` (for SEO) |
| **Header** | Logo, navigation menu | BaseLayout | None (static links) |
| **Footer** | Contact info, legal links, brand consistency | BaseLayout | None (static data) |
| **Hero** | Homepage value proposition, CTA | index.astro | `headline`, `subline`, `ctaText`, `ctaLink` |
| **ContactForm** | Collect user info, validate, submit to endpoint | kontakt.astro | `endpoint` URL |
| **ProcessSteps** | Display 4-step process with icons/numbers | so-arbeite-ich.astro | Array of `steps` |
| **ServiceCard** | Display one service (Verkauf or Vermietung) | leistungen.astro | `title`, `description`, `icon` |
| **FAQItem** | Single FAQ question/answer | faq.astro | `question`, `answer` |

**Key Boundaries:**
- **Pages** own content and page-specific structure
- **Layout** owns global structure (header/footer/nav)
- **Components** are pure UI - no business logic, just rendering
- **No data layer** - all content is hardcoded in components or passed as props

## Data Flow

```
Build Time (astro build):
  1. Astro reads src/pages/*.astro
  2. Each page imports layout (BaseLayout)
  3. Layout imports Header, Footer components
  4. Page imports specific components (Hero, ContactForm, etc.)
  5. Components receive props from parent
  6. All content is static German text from PDF
  7. Astro generates static HTML for each route
  8. CSS is bundled and minified
  9. Images in src/assets are optimized
  10. Output: dist/ folder with pure HTML/CSS/minimal JS

Runtime (user visits site):
  1. Browser requests route (e.g., /kontakt)
  2. Server returns pre-built HTML (instant load)
  3. CSS applies brand colors and responsive layout
  4. Minimal JS for contact form validation only
  5. Form submission → POST to external endpoint
  6. Google Maps loads via iframe (external call)
  7. Click-to-call/mailto use native browser protocols
```

**Direction of Data Flow:**
- **Build time:** Top-down (Pages → Layout → Components)
- **Runtime:** No data flow - everything is static HTML
- **User interaction:** Form → External endpoint (one-way, no response handling beyond success/error message)

## Patterns to Follow

### Pattern 1: Shared Layout Component

**What:** All pages use a single `BaseLayout.astro` that wraps content with consistent header/nav/footer.

**When:** Every page in the site.

**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Via Immobilien</title>
  <meta name="description" content={description}>
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

**Benefits:**
- Single source of truth for global structure
- Easy to update header/footer across all pages
- SEO meta tags managed in one place

### Pattern 2: Props-Based Component Reusability

**What:** Components accept props for dynamic content rather than hardcoding.

**When:** Any component used multiple times with different content (ServiceCard, ProcessSteps, FAQItem).

**Example:**
```astro
---
// src/components/ServiceCard.astro
interface Props {
  title: string;
  description: string;
  icon?: string;
}

const { title, description, icon } = Astro.props;
---

<div class="service-card">
  {icon && <img src={icon} alt={title} />}
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  .service-card {
    padding: 2rem;
    background: var(--cream);
    border-left: 4px solid var(--soft-gold);
  }
</style>
```

**Benefits:**
- DRY (Don't Repeat Yourself)
- Easy to add new services without duplicating markup
- Consistent styling across similar elements

### Pattern 3: Form Submission to External Endpoint

**What:** Contact form submits to third-party service (Web3Forms, Formsubmit, or similar) rather than building custom backend.

**When:** Contact form on /kontakt page.

**Example:**
```astro
---
// src/components/ContactForm.astro
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "YOUR_ACCESS_KEY"; // From env or config
---

<form action={FORM_ENDPOINT} method="POST" class="contact-form">
  <input type="hidden" name="access_key" value={ACCESS_KEY}>
  <input type="hidden" name="subject" value="Neue Anfrage von via-immobilien.de">

  <label for="name">Name *</label>
  <input type="text" id="name" name="name" required>

  <label for="email">E-Mail *</label>
  <input type="email" id="email" name="email" required>

  <label for="phone">Telefon</label>
  <input type="tel" id="phone" name="phone">

  <label for="message">Nachricht *</label>
  <textarea id="message" name="message" rows="5" required></textarea>

  <button type="submit">Nachricht senden</button>
</form>

<script>
  // Optional: Client-side validation and success handling
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('Nachricht gesendet! Wir melden uns bald bei Ihnen.');
      form.reset();
    } else {
      alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
    }
  });
</script>
```

**Benefits:**
- No backend infrastructure required
- Spam protection included (reCAPTCHA, honeypot)
- Emails delivered to denise@via-immobilien.de
- Can be swapped later without architecture changes

**Sources:**
- [Static Forms documentation](https://www.staticforms.xyz/)
- [Adding Contact Forms to Static Sites Guide](https://www.staticforms.dev/blog/adding-contact-forms-to-static-sites)
- [How to implement forms in static sites - Kinsta](https://kinsta.com/blog/static-site-forms/)

### Pattern 4: Semantic HTML with Accessibility

**What:** Use HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`) and ARIA attributes.

**When:** Every page and component.

**Example:**
```astro
<header role="banner">
  <nav role="navigation" aria-label="Hauptnavigation">
    <ul>
      <li><a href="/" aria-current="page">Startseite</a></li>
      <li><a href="/ueber-mich">Über mich</a></li>
      <!-- ... -->
    </ul>
  </nav>
</header>

<main role="main">
  <article>
    <h1>Leistungen</h1>
    <section aria-labelledby="verkauf-heading">
      <h2 id="verkauf-heading">Verkauf</h2>
      <!-- ... -->
    </section>
  </article>
</main>

<footer role="contentinfo">
  <!-- ... -->
</footer>
```

**Benefits:**
- Better SEO (search engines understand structure)
- Accessibility for screen readers
- Standards compliance

**Sources:**
- [HTML Layout Elements - W3Schools](https://www.w3schools.com/html/html_layout.asp)
- [Page Regions | Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/tutorials/page-structure/regions/)
- [Structuring documents - MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)

### Pattern 5: CSS Custom Properties for Brand Consistency

**What:** Define brand colors as CSS variables in global.css, use throughout components.

**When:** All styling.

**Example:**
```css
/* src/styles/global.css */
:root {
  --navy-blue: #142333;
  --cream: #F5F0EA;
  --soft-gold: #D1B787;

  --font-body: system-ui, -apple-system, sans-serif;
  --font-heading: Georgia, serif;

  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
}

body {
  font-family: var(--font-body);
  color: var(--navy-blue);
  background: var(--cream);
}

h1, h2, h3 {
  font-family: var(--font-heading);
  color: var(--navy-blue);
}

.button-primary {
  background: var(--soft-gold);
  color: var(--navy-blue);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

**Benefits:**
- Single source of truth for brand colors
- Easy to update globally
- Consistent spacing system

## Anti-Patterns to Avoid

### Anti-Pattern 1: Complex State Management

**What:** Adding React/Vue with useState, stores, or client-side routing.

**Why bad:** This is a 6-page static site with no interactive features beyond a form. Client-side state management adds unnecessary complexity, bundle size, and JavaScript that slows down the site.

**Consequences:**
- Slower page loads (shipping React/Vue is ~40-100KB minified)
- More complex build process
- SEO complications if pages require JavaScript to render
- Harder to maintain

**Instead:** Use Astro's default static HTML generation. For form validation, a small vanilla JavaScript snippet (< 1KB) is sufficient.

### Anti-Pattern 2: Page-Specific Component Files

**What:** Creating components that are only used once, like `HomeHero.astro`, `AboutIntro.astro`, `ContactHeading.astro`.

**Why bad:** These are effectively just page content split into separate files, not reusable components.

**Consequences:**
- More files to navigate
- Unclear where page content lives (in page file or component file?)
- Harder to edit content (jump between files)

**Instead:** Keep single-use content directly in page files. Only create components for elements used multiple times (ServiceCard, FAQItem) or for global structure (Header, Footer).

### Anti-Pattern 3: Building Custom Form Backend

**What:** Creating a Node.js/Express server or serverless function to handle form submissions.

**Why bad:** Unnecessary infrastructure for a simple contact form. Requires hosting, monitoring, security updates, and spam protection implementation.

**Consequences:**
- Hosting costs and complexity
- Maintenance burden
- Security risks if not implemented correctly
- Delayed MVP launch

**Instead:** Use a dedicated form service (Web3Forms, Formsubmit, Netlify Forms). These provide spam protection, email delivery, and are free or low-cost for low-volume sites.

**Sources:**
- [Contact Form Design Examples - Eleken](https://www.eleken.co/blog-posts/contact-form-design)
- [Four ways to implement a "Contact Us" form on a static website - Medium](https://medium.com/datafire-io/simple-backends-four-ways-to-implement-a-contact-us-form-on-a-static-website-10fc430984a4)

### Anti-Pattern 4: Over-Architecting with Atomic Design

**What:** Organizing components into strict atoms/molecules/organisms folders and creating excessive abstraction layers.

**Why bad:** For a 6-page site with ~7 components, atomic design creates unnecessary structure. "Atomic Design is not your architecture," as noted in [current frontend discussions](https://dev.to/m_midas/atomic-design-and-its-relevance-in-frontend-in-2025-32e9).

**Consequences:**
- Deep folder nesting (components/atoms/button, components/molecules/form-group, etc.)
- Unclear where to put components
- Harder to locate files

**Instead:** Flat component directory organized by function. For 7 components, a single `src/components/` folder is sufficient. Group only if you reach 15+ components.

### Anti-Pattern 5: CMS Integration Before Launch

**What:** Adding a headless CMS (Contentful, Sanity) in the first version.

**Why bad:** Content rarely changes on a business website. CMS adds complexity, build time, API calls, and potential points of failure.

**Consequences:**
- Slower builds (fetching from CMS API)
- More dependencies
- Content editing requires CMS learning curve
- Hosting considerations (API keys, environment variables)

**Instead:** Hardcode content in components initially. If content updates become frequent (> once per month), then consider a CMS in v2.

## Build Order & Dependencies

This section explicitly addresses the dependency chain for implementation.

### Phase Dependency Graph

```
Foundation Phase (Phase 1)
  ├─ Install Astro
  ├─ Create project structure (src/, public/, etc.)
  ├─ Set up global styles (CSS variables)
  └─ Create BaseLayout component
       ↓
Core Components Phase (Phase 2)
  ├─ Header component (depends on: BaseLayout, global styles)
  ├─ Footer component (depends on: BaseLayout, global styles)
  └─ Navigation links (depends on: Header)
       ↓
Pages Phase (Phase 3)
  ├─ Homepage (index.astro) → depends on: BaseLayout, Hero component
  ├─ Über mich page → depends on: BaseLayout
  ├─ Leistungen page → depends on: BaseLayout, ServiceCard component
  ├─ So arbeite ich → depends on: BaseLayout, ProcessSteps component
  ├─ FAQ page → depends on: BaseLayout, FAQItem component
  └─ Kontakt page → depends on: BaseLayout, ContactForm component
       ↓
Integration Phase (Phase 4)
  ├─ Contact form endpoint integration (depends on: ContactForm component)
  └─ Google Maps embed (depends on: Kontakt page)
       ↓
Polish Phase (Phase 5)
  ├─ Responsive design testing
  ├─ Accessibility audit
  ├─ Browser testing
  └─ Performance optimization
```

### Recommended Build Order

**1. Foundation (Must be built first)**
   - Rationale: Everything depends on project structure and base layout
   - Deliverable: `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`
   - Blocking: All other work

**2. Core Components (Depends on Foundation)**
   - Rationale: Header and Footer are used by all pages
   - Deliverable: `src/components/Header.astro`, `src/components/Footer.astro`
   - Blocks: All pages

**3. Content Components (Depends on Foundation, parallel to Core Components)**
   - Rationale: These can be built in parallel, no interdependencies
   - Deliverable: `Hero.astro`, `ServiceCard.astro`, `ProcessSteps.astro`, `FAQItem.astro`
   - Blocks: Specific pages that use them

**4. Pages (Depends on Core Components + Content Components)**
   - Rationale: Pages compose layout and components
   - Order within phase:
     1. Homepage first (validates layout system works)
     2. Über mich (simplest content page)
     3. Leistungen, So arbeite ich, FAQ (more complex layouts)
     4. Kontakt last (most complex - has form)
   - Deliverable: All 6 `.astro` files in `src/pages/`
   - Blocks: Nothing (this enables full site navigation)

**5. Form Integration (Depends on Kontakt page)**
   - Rationale: Requires ContactForm component and external service setup
   - Deliverable: Working form submission to email
   - Blocks: User can't contact (but site is viewable)

**6. Polish (Depends on all pages)**
   - Rationale: Can't optimize or test what doesn't exist
   - Deliverable: Responsive styles, accessibility fixes, performance tuning
   - Blocks: Launch

**Critical Path:**
```
Foundation → Core Components → Pages → Form Integration → Polish
```

**Parallelizable:**
- Content components (Hero, ServiceCard, etc.) can be built in parallel
- Individual pages can be built in parallel once components exist
- Polish work (responsive design, accessibility) can overlap with final pages

## Scalability Considerations

| Concern | At Launch (6 pages) | If Expanded (15+ pages) | If CMS Added |
|---------|-------------------|------------------------|--------------|
| **Component Organization** | Flat `src/components/` folder | Group by category (layout/, ui/, content/) | Add `src/content/` for collections |
| **Page Routing** | Manual `.astro` files | Consider dynamic routes `[slug].astro` | Fetch pages from CMS, generate routes |
| **Content Management** | Hardcoded in components | Extract to JSON/YAML files | Migrate to headless CMS (Contentful, Sanity) |
| **Styling** | Single `global.css` | Split into modules or use Tailwind | Maintain consistency with design tokens |
| **Build Time** | < 5 seconds | < 30 seconds (still fast) | Depends on CMS API speed (30s - 2min) |
| **Deployment** | Static host (Netlify, Vercel) | Same | Same + webhook for CMS updates |

**Note:** For Via Immobilien at launch, left column applies. Middle/right columns are future considerations ONLY if the business scales significantly.

## External Dependencies

| Service | Purpose | Integration Point | Alternative |
|---------|---------|------------------|-------------|
| **Web3Forms** (or similar) | Contact form endpoint | `ContactForm.astro` form action | Formsubmit, Netlify Forms, Getform |
| **Google Maps** | Location visualization | Kontakt page iframe embed | OpenStreetMap, static map image |

**Important:** These are runtime dependencies, not build dependencies. Site builds successfully without them, but features won't work at runtime.

**Configuration Needed:**
1. Form service: Sign up, get API key, add to form action
2. Google Maps: Get embed URL from Google Maps, paste into iframe

## Technology Architecture

**Static Site Generator:** Astro 4.x

**Languages:**
- Astro components (.astro) - HTML-like syntax with JS in frontmatter
- CSS (vanilla, no preprocessor needed)
- Minimal JavaScript (< 1KB for form validation)

**No Build-Time Dependencies Beyond Astro:**
- No React, Vue, Svelte
- No Tailwind (vanilla CSS with custom properties)
- No CMS, no database, no API calls during build

**Runtime Dependencies:**
- External form endpoint (e.g., Web3Forms)
- Google Maps embed

**This simplicity is intentional:** Small business site doesn't need complex architecture.

## Sources & Confidence

**HIGH Confidence:**
- [Astro Project Structure - Official Docs](https://docs.astro.build/en/basics/project-structure/)
- [HTML Layout Elements - W3Schools](https://www.w3schools.com/html/html_layout.asp)
- [Page Regions WAI](https://www.w3.org/WAI/tutorials/page-structure/regions/)

**MEDIUM Confidence:**
- [Static Website Architecture - Contentstack](https://www.contentstack.com/docs/developers/architecture-diagrams/static-website-detailed-architecture)
- [Static Forms Best Practices](https://www.staticforms.xyz/)
- [Astro File Organization - TillItsDone](https://tillitsdone.com/blogs/astro-js-file-organization-guide/)

**LOW Confidence (Industry Trends):**
- [Best Real Estate Website Designs 2026 - HousingWire](https://www.housingwire.com/articles/real-estate-website-design/)
- [Atomic Design Relevance in 2025 - DEV Community](https://dev.to/m_midas/atomic-design-and-its-relevance-in-frontend-in-2025-32e9)

**Note:** Architecture recommendations are based primarily on Astro official documentation (HIGH confidence) and standard web development patterns (HTML5 semantic elements, component-based design). Industry trend sources informed the "what not to do" sections but are not critical to the core architecture.
