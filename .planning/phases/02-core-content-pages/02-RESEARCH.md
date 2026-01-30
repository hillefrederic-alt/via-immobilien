# Phase 2: Core Content Pages - Research

**Researched:** 2026-01-30
**Domain:** Astro content pages, scroll animations, image optimization, accessibility patterns
**Confidence:** HIGH

## Summary

This phase focuses on building 6 main content pages for Via Immobilien using Astro's component architecture. Research covered scroll animations, FAQ accordion patterns, image optimization, testimonials, service presentation, process visualization, and hero sections.

The recommended approach leverages Astro's built-in `astro:assets` Image component for automatic optimization, the **AOS (Animate On Scroll)** library for reveal animations, and the **accessible-astro-components** package for an accessible FAQ accordion using native `<details>`/`<summary>` elements. All components follow the existing BEM naming convention and CSS custom properties established in Phase 1.

**Primary recommendation:** Use AOS library for scroll animations (simplest integration), Astro's built-in Image component for photo optimization, and accessible-astro-components for the FAQ accordion.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^5.17.1 | Framework | Already in place, includes Image component |
| CSS Custom Properties | - | Design tokens | Established in global.css |

### Additional Required
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| aos | ^2.3.4 | Scroll reveal animations | Simplest integration with Astro, 22 animation types, CSS-driven |
| accessible-astro-components | ^5.1.2 | FAQ Accordion | WAI-ARIA compliant, uses native details/summary, v5 rewritten |

### Supporting (No Install Needed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| astro:assets | Built-in | Image optimization | All local images from src/ folder |
| Intersection Observer API | Browser API | Alternative to AOS | Only if AOS proves problematic |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| AOS | Native Intersection Observer | More code, no pre-built animations |
| AOS | GSAP ScrollTrigger | More powerful but overkill, larger bundle |
| accessible-astro-components | Native details/summary | More manual a11y work, no styling |
| accessible-astro-components | @xexiu/astro-accordion | Less proven, fewer features |

**Installation:**
```bash
npm install aos accessible-astro-components
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── assets/                   # Optimized images (processed by Astro)
│   └── images/
│       ├── denise-portrait.jpg   # Professional photo for Uber mich
│       └── testimonials/         # Customer photos if available
├── components/
│   ├── Hero.astro               # Homepage hero with CTA
│   ├── Section.astro            # Reusable section wrapper with scroll animation
│   ├── ServiceCard.astro        # Verkauf/Vermietung cards
│   ├── ProcessStep.astro        # Individual process step
│   ├── ProcessTimeline.astro    # 4-step visualization wrapper
│   ├── Testimonial.astro        # Single testimonial card
│   ├── TestimonialSection.astro # Testimonials container
│   └── FAQAccordion.astro       # Wrapper using accessible-astro-components
├── pages/
│   ├── index.astro              # Homepage (Startseite)
│   ├── ueber-mich.astro         # About page
│   ├── leistungen.astro         # Services page
│   ├── so-arbeite-ich.astro     # Process page
│   ├── kontakt.astro            # Contact page
│   └── faq.astro                # FAQ page
└── layouts/
    └── BaseLayout.astro         # Existing (add AOS init)
```

### Pattern 1: Section with Scroll Animation
**What:** Reusable section component that wraps content with AOS animation
**When to use:** Every major page section
**Example:**
```astro
---
// src/components/Section.astro
interface Props {
  id?: string;
  class?: string;
  background?: 'cream' | 'white' | 'navy';
  animation?: string;
  animationDelay?: string;
}

const {
  id,
  class: className = '',
  background = 'cream',
  animation = 'fade-up',
  animationDelay
} = Astro.props;
---

<section
  id={id}
  class:list={['section', `section--${background}`, className]}
  data-aos={animation}
  data-aos-delay={animationDelay}
>
  <div class="section__container container">
    <slot />
  </div>
</section>

<style>
  .section {
    padding-block: var(--spacing-3xl);
  }
  .section--cream { background-color: var(--color-cream); }
  .section--white { background-color: var(--color-white); }
  .section--navy {
    background-color: var(--color-navy);
    color: var(--color-cream);
  }
</style>
```

### Pattern 2: Astro Image Import
**What:** Importing and using local images with optimization
**When to use:** Any image in src/assets/
**Example:**
```astro
---
// Source: Astro official docs
import { Image } from 'astro:assets';
import denisePhoto from '../assets/images/denise-portrait.jpg';
---

<Image
  src={denisePhoto}
  alt="Denise Semmel - Ihre Immobilienmaklerin"
  width={600}
  height={800}
  loading="eager"
  class="about__photo"
/>
```

### Pattern 3: AOS Initialization in Layout
**What:** Global AOS setup in BaseLayout
**When to use:** Once in BaseLayout.astro
**Example:**
```astro
---
// In BaseLayout.astro frontmatter
import 'aos/dist/aos.css';
---

<!-- At end of body -->
<script>
  import AOS from 'aos';

  // Initialize AOS
  function initAOS() {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,           // Animate only once
      offset: 50,           // Trigger 50px before element is in view
      disable: 'mobile'     // Optional: disable on mobile for performance
    });
  }

  // Init on page load
  initAOS();

  // Re-init after Astro view transitions (if used later)
  document.addEventListener('astro:after-swap', initAOS);
</script>
```

### Pattern 4: FAQ Accordion with accessible-astro-components
**What:** Accessible FAQ using native details/summary
**When to use:** FAQ page
**Example:**
```astro
---
// Source: accessible-astro-components docs
import { Accordion, AccordionItem } from 'accessible-astro-components';
---

<Accordion>
  <AccordionItem
    name="faq"
    title="Wie lange dauert ein Immobilienverkauf?"
    headingLevel="h3"
  >
    <p>Die Dauer eines Immobilienverkaufs hangt von verschiedenen Faktoren ab...</p>
  </AccordionItem>
  <AccordionItem
    name="faq"
    title="Was kostet Ihre Dienstleistung?"
  >
    <p>Meine Provision ist erfolgsabhangig und betragt...</p>
  </AccordionItem>
</Accordion>
```

### Anti-Patterns to Avoid
- **Importing images as strings:** Don't use `src="/images/photo.jpg"` for optimized images - must import from src/assets
- **Multiple AOS inits:** Don't initialize AOS in multiple components, only in BaseLayout
- **JavaScript-heavy accordions:** Don't build custom JS accordion when native details/summary exists
- **Unoptimized hero images:** Always use priority loading for above-the-fold images
- **Missing alt text:** Every Image component must have meaningful alt text

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll reveal animations | Custom Intersection Observer + CSS | AOS library | Pre-built 22 animations, tested, CSS-driven |
| Image optimization | Manual compression, responsive srcset | Astro Image component | Automatic WebP/AVIF, lazy loading, CLS prevention |
| Accordion component | Custom JS expand/collapse | accessible-astro-components | WAI-ARIA compliant, keyboard nav, tested |
| Reduced motion handling | Custom prefers-reduced-motion | AOS respects it natively | Library handles this edge case |

**Key insight:** These problems have established solutions. Custom implementations risk accessibility issues, performance problems, and maintenance burden.

## Common Pitfalls

### Pitfall 1: Image Import Path Errors
**What goes wrong:** Astro can't find/process images
**Why it happens:** Using string paths instead of imports for src/ images
**How to avoid:** Always import images: `import img from '../assets/image.jpg'`
**Warning signs:** Build errors about "Local images must be imported"

### Pitfall 2: AOS Animations Not Playing
**What goes wrong:** Elements appear without animation
**Why it happens:** AOS not initialized, CSS not imported, or duplicate inits
**How to avoid:**
1. Import CSS: `import 'aos/dist/aos.css'`
2. Initialize once in BaseLayout
3. Use `data-aos` attributes (not `aos`)
**Warning signs:** data-aos attributes present but no animation classes added

### Pitfall 3: Accordion Accessibility Issues
**What goes wrong:** Screen readers can't navigate FAQ
**Why it happens:** Using divs instead of semantic elements
**How to avoid:** Use accessible-astro-components which uses native `<details>`/`<summary>`
**Warning signs:** No keyboard focus, no ARIA states

### Pitfall 4: CLS from Images
**What goes wrong:** Layout shifts as images load, hurting Core Web Vitals
**Why it happens:** Missing width/height attributes
**How to avoid:** Astro Image component auto-calculates, or always set width/height
**Warning signs:** CLS score > 0.1 in Lighthouse

### Pitfall 5: Hero CTA Lost in Visual Noise
**What goes wrong:** Low conversion, visitors don't click CTA
**Why it happens:** Too many competing elements, CTA doesn't stand out
**How to avoid:**
- Single primary CTA (max 2: primary + secondary)
- High contrast color (gold on navy background)
- Generous whitespace around CTA
**Warning signs:** Multiple buttons/links in hero, low color contrast

### Pitfall 6: Animations on Mobile
**What goes wrong:** Janky animations, battery drain on mobile
**Why it happens:** Complex animations on low-power devices
**How to avoid:**
- Use AOS `disable: 'mobile'` option or simpler animations
- Respect `prefers-reduced-motion` (AOS does this automatically)
**Warning signs:** Performance issues on mobile testing

## Code Examples

### Hero Section with CTA
```astro
---
// src/components/Hero.astro
interface Props {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCta?: { text: string; href: string };
}

const { headline, subheadline, ctaText, ctaHref, secondaryCta } = Astro.props;
---

<section class="hero">
  <div class="hero__container container">
    <div class="hero__content" data-aos="fade-up">
      <h1 class="hero__headline">{headline}</h1>
      {subheadline && <p class="hero__subheadline">{subheadline}</p>}
      <div class="hero__actions">
        <a href={ctaHref} class="hero__cta hero__cta--primary">
          {ctaText}
        </a>
        {secondaryCta && (
          <a href={secondaryCta.href} class="hero__cta hero__cta--secondary">
            {secondaryCta.text}
          </a>
        )}
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding-block: var(--spacing-4xl);
    min-height: 70vh;
    display: flex;
    align-items: center;
  }

  .hero__content {
    max-width: 42rem;
  }

  .hero__headline {
    margin-bottom: var(--spacing-md);
  }

  .hero__subheadline {
    font-size: var(--font-size-lg);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-xl);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  .hero__cta {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--border-radius-md);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);
    transition: all var(--transition-fast);
  }

  .hero__cta--primary {
    background-color: var(--color-navy);
    color: var(--color-cream);
  }

  .hero__cta--primary:hover,
  .hero__cta--primary:focus {
    background-color: var(--color-gold);
    color: var(--color-navy);
  }

  .hero__cta--secondary {
    background-color: transparent;
    color: var(--color-navy);
    border: 2px solid var(--color-navy);
  }

  .hero__cta--secondary:hover,
  .hero__cta--secondary:focus {
    background-color: var(--color-navy);
    color: var(--color-cream);
  }
</style>
```

### Service Card Component
```astro
---
// src/components/ServiceCard.astro
interface Props {
  title: string;
  description: string;
  icon?: string;
  href?: string;
}

const { title, description, icon, href } = Astro.props;
const Tag = href ? 'a' : 'div';
---

<Tag
  class="service-card"
  href={href}
  data-aos="fade-up"
>
  {icon && <span class="service-card__icon" aria-hidden="true">{icon}</span>}
  <h3 class="service-card__title">{title}</h3>
  <p class="service-card__description">{description}</p>
  {href && <span class="service-card__link">Mehr erfahren</span>}
</Tag>

<style>
  .service-card {
    display: block;
    padding: var(--spacing-xl);
    background-color: var(--color-white);
    border-radius: var(--border-radius-lg);
    text-decoration: none;
    color: var(--color-text);
    transition: box-shadow var(--transition-normal), transform var(--transition-normal);
  }

  a.service-card:hover,
  a.service-card:focus {
    box-shadow: 0 8px 24px rgba(20, 35, 51, 0.1);
    transform: translateY(-4px);
  }

  .service-card__icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: var(--spacing-md);
  }

  .service-card__title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-sm);
  }

  .service-card__description {
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-md);
  }

  .service-card__link {
    color: var(--color-gold);
    font-weight: var(--font-weight-semibold);
  }
</style>
```

### Process Timeline Step
```astro
---
// src/components/ProcessStep.astro
interface Props {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const { step, title, description, isLast = false } = Astro.props;
---

<div
  class="process-step"
  data-aos="fade-up"
  data-aos-delay={String(step * 100)}
>
  <div class="process-step__indicator">
    <span class="process-step__number">{step}</span>
    {!isLast && <span class="process-step__line" aria-hidden="true"></span>}
  </div>
  <div class="process-step__content">
    <h3 class="process-step__title">{title}</h3>
    <p class="process-step__description">{description}</p>
  </div>
</div>

<style>
  .process-step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-lg);
    padding-bottom: var(--spacing-xl);
  }

  .process-step__indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .process-step__number {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--color-navy);
    color: var(--color-cream);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-serif);
    font-size: var(--font-size-lg);
  }

  .process-step__line {
    width: 2px;
    flex: 1;
    background-color: var(--color-border);
    margin-top: var(--spacing-sm);
  }

  .process-step__title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-xs);
  }

  .process-step__description {
    color: var(--color-text-muted);
  }
</style>
```

### Testimonial Card
```astro
---
// src/components/Testimonial.astro
import { Image } from 'astro:assets';

interface Props {
  quote: string;
  author: string;
  role?: string;
  image?: ImageMetadata;
}

const { quote, author, role, image } = Astro.props;
---

<blockquote class="testimonial" data-aos="fade-up">
  <p class="testimonial__quote">"{quote}"</p>
  <footer class="testimonial__footer">
    {image && (
      <Image
        src={image}
        alt={`Foto von ${author}`}
        width={64}
        height={64}
        class="testimonial__image"
      />
    )}
    <div class="testimonial__author">
      <cite class="testimonial__name">{author}</cite>
      {role && <span class="testimonial__role">{role}</span>}
    </div>
  </footer>
</blockquote>

<style>
  .testimonial {
    background-color: var(--color-white);
    padding: var(--spacing-xl);
    border-radius: var(--border-radius-lg);
    border-left: 4px solid var(--color-gold);
  }

  .testimonial__quote {
    font-size: var(--font-size-lg);
    font-style: italic;
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--spacing-lg);
  }

  .testimonial__footer {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .testimonial__image {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .testimonial__author {
    display: flex;
    flex-direction: column;
  }

  .testimonial__name {
    font-style: normal;
    font-weight: var(--font-weight-semibold);
    color: var(--color-navy);
  }

  .testimonial__role {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }
</style>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery scroll plugins | Native Intersection Observer + CSS | 2019+ | Much better performance, no dependency |
| Custom JS accordion | Native `<details>`/`<summary>` | 2020+ | Built-in a11y, no JS required for basic function |
| Manual image optimization | Astro Image component | Astro 3.0+ | Automatic WebP/AVIF, responsive images |
| @astrojs/image integration | Built-in astro:assets | Astro 3.0+ | No extra package needed |
| jQuery AOS | AOS 2.x (vanilla JS) | AOS 2.0 | Smaller, no jQuery dependency |

**Deprecated/outdated:**
- `@astrojs/image` package: Replaced by built-in `astro:assets`
- `aos` attribute: Use `data-aos` (changed in AOS 2.0)
- `<ViewTransitions />` component name: Now `<ClientRouter />` in Astro 5

## Open Questions

1. **Testimonials content source**
   - What we know: Testimonials section is required (TRUST-01)
   - What's unclear: Are actual customer testimonials available? Photos?
   - Recommendation: Build component structure; use placeholder text initially if content not ready

2. **Denise portrait image**
   - What we know: Professional photo needed for Uber mich page
   - What's unclear: Image file provided? Resolution? Aspect ratio?
   - Recommendation: Plan for src/assets/images/denise-portrait.jpg; provide placeholder guidance

3. **AOS on mobile**
   - What we know: Can disable on mobile for performance
   - What's unclear: Client preference on animations
   - Recommendation: Enable animations by default with `once: true`; subtle fade-up only

## Sources

### Primary (HIGH confidence)
- Astro Images Documentation - https://docs.astro.build/en/guides/images/
- accessible-astro-components v5.1.2 - https://github.com/incluud/accessible-astro-components
- AOS Library - https://github.com/michalsnik/aos

### Secondary (MEDIUM confidence)
- LaunchFast AOS in Astro guide - https://www.launchfa.st/blog/aos-astro/
- MDN Intersection Observer API - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- Astro View Transitions docs - https://docs.astro.build/en/guides/view-transitions/

### Tertiary (LOW confidence)
- Hero section best practices (WebSearch 2026) - various sources
- Real estate testimonial patterns - https://trustmary.com/testimonials/real-estate-testimonials/
- Process timeline CSS patterns - https://www.w3schools.com/howto/howto_css_timeline.asp

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro docs verified, packages well-documented
- Architecture: HIGH - Patterns follow existing project conventions
- Scroll animations (AOS): HIGH - Library well-documented, multiple integration guides
- Image optimization: HIGH - Built into Astro, official docs comprehensive
- Accordion: HIGH - accessible-astro-components v5 docs verified
- Pitfalls: MEDIUM - Based on multiple sources, some general patterns

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (60 days - stack is stable)
