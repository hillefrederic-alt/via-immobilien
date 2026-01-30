# Technology Stack

**Project:** Via Immobilien - Real Estate Agent Website
**Researched:** 2026-01-30
**Overall Confidence:** HIGH

## Executive Summary

For a German real estate agent website in 2025/2026, the optimal stack prioritizes **performance, simplicity, GDPR compliance, and local hosting**. The recommended approach is a **static-first architecture** using Astro for its exceptional performance (40% faster loads, 90% less JavaScript than Next.js), content-focused design, and native German hosting compatibility.

This stack delivers 100/100 Lighthouse scores out of the box, ensures GDPR compliance with minimal effort, and keeps monthly costs under 50 EUR while serving German customers with <100ms latency.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro** | 5.17.1 (stable) | Static site generator & framework | Best-in-class performance for content sites. Ships zero JS by default, 40% faster than Next.js, trivial to achieve 100 Lighthouse scores. Perfect for 6-page marketing site. | HIGH |
| **Node.js** | 22+ LTS | Runtime environment | Required by Astro 6+ (beta drops support for 18/20). LTS ensures stability. | HIGH |

**Rationale:** Astro is purpose-built for content-focused websites like real estate agent sites. Benchmarks show it consistently outperforms Next.js for static content, and its "islands architecture" allows selective interactivity only where needed (contact form). For Via Immobilien's 6 pages with minimal dynamic content, Astro is the clear choice.

**Why NOT Next.js:** Next.js optimizes for complex, data-driven applications with frequent updates. For a 6-page marketing site, it adds unnecessary complexity, larger bundle sizes, and more JavaScript overhead. Next.js makes sense at scale; Via Immobilien doesn't need that scale.

**Sources:**
- [Astro vs Next.js performance comparison](https://www.contentful.com/blog/astro-next-js-compared/) (Astro 40% faster, 90% less JS)
- [Astro official releases](https://github.com/withastro/astro/releases) (version verification)
- [Astro 6 beta announcement](https://astro.build/blog/astro-6-beta/) (future-proofing)

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Tailwind CSS** | 4.1 | Utility-first CSS framework | Rapid development, consistent design system, tiny bundle (< 10kB). Tailwind v4 uses CSS variables for theming, making the Navy Blue/Cream/Soft Gold palette trivial to implement. | HIGH |

**Rationale:** For small business websites in 2026, Tailwind CSS strikes the perfect balance between speed and maintainability. It eliminates CSS architecture decisions, ensures design consistency across 6 pages, and ships minimal CSS through automatic purging. The v4 release adds `@theme` support with CSS variables, making custom color palettes (Navy Blue #142333, Cream #F5F0EA, Soft Gold #D1B787) straightforward.

**Why NOT Vanilla CSS:** For a 6-page site with a cohesive design system, vanilla CSS would require manual architecture decisions, more boilerplate, and careful management of specificity. Tailwind's utility classes provide faster iteration and easier maintenance for a solo developer or small team.

**Why NOT CSS-in-JS:** Adds runtime overhead and JavaScript dependencies. Defeats the purpose of Astro's zero-JS architecture.

**Sources:**
- [Tailwind CSS v4.1 features](https://tailwindcss.com/) (CSS variables, OKLch colors, cascade layers)
- [Tailwind vs Vanilla CSS for small business 2026](https://dev.to/toboreeee/its-almost-2026-why-are-we-still-arguing-about-css-vs-tailwind-291f)

### Language

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **JavaScript** | ES2024+ | Primary language | Simpler setup, faster iteration for small projects. Astro provides type safety through its .astro components without TypeScript overhead. | MEDIUM |
| **TypeScript** (optional) | 5.x | Type safety for complex components | Consider only if project grows or interactive islands become complex. Not recommended for MVP. | MEDIUM |

**Rationale:** For small projects in 2026, the consensus is clear: **JavaScript first, TypeScript later if needed.** TypeScript adds upfront complexity for long-term maintainability benefits. For a 6-page real estate site with minimal interactivity, JavaScript's simplicity wins. Astro's `.astro` component format already provides structure and IntelliSense without TypeScript configuration.

**When to reconsider:** If you add complex interactive features (property search, virtual tours, CRM integration) or expect the site to grow significantly, TypeScript becomes valuable.

**Sources:**
- [TypeScript vs JavaScript 2026](https://www.carmatec.com/blog/typescript-vs-javascript-which-one-to-choose/) (JavaScript recommended for small projects)
- [When to use TypeScript](https://navanathjadhav.medium.com/typescript-vs-javascript-in-2026-when-should-you-actually-use-typescript-95da08708cc6)

---

## Supporting Libraries

### Form Handling & Validation

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| **Web3Forms** | API service | Contact form backend | Simple, GDPR-compliant form-to-email. Free tier: 250 submissions/month. No backend needed. | HIGH |
| **Zod** | 4.x | Form validation schema | Client-side validation for contact form. Type-safe validation that works with Astro. | HIGH |
| **React Hook Form** (optional) | 7.x | Form state management | Only if contact form becomes complex (multi-step, file uploads). Not needed for simple contact form. | MEDIUM |

**Rationale:**
- **Web3Forms** solves the "how do I handle form submissions without a backend?" problem. It's GDPR-friendly (data stored max 30 days), doesn't track users, and supports CAPTCHA (reCAPTCHA v3 or privacy-first Altcha). Perfect for a real estate agent who just needs email notifications.
- **Zod** provides lightweight validation without React dependencies. Works natively with Astro and ensures form data integrity.
- **React Hook Form** is overkill for a simple contact form but useful if you add multi-step lead capture or file uploads (e.g., property inquiry with documents).

**Why NOT custom backend:** Adds server costs, maintenance burden, and security concerns. For a contact form, a third-party service is more reliable and cost-effective.

**Why NOT Formspree/Netlify Forms:** Web3Forms offers more GDPR controls and is specifically designed for European privacy requirements.

**Sources:**
- [Web3Forms GDPR compliance](https://web3forms.com/) (privacy-first, 30-day retention)
- [Contact form GDPR requirements Germany](https://www.staticforms.dev/)
- [Zod validation with Astro](https://zod.dev/)

### Maps Integration

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| **Google Maps Embed API** | - | Office location map | With two-click consent flow for GDPR. Display map after user clicks "Show Map" button. | HIGH |
| **Leaflet + OpenStreetMap** (alternative) | 1.9+ | Privacy-first maps | If avoiding Google is a priority. Fully GDPR-compliant without consent banners. | MEDIUM |

**Rationale:**
- **Google Maps** is familiar to users and integrates with Google Business Profile, which is critical for local SEO in the Rhein-Main region. However, GDPR requires opt-in consent before loading Google Maps (automatic connection transfers user data to Google).
- **Implementation:** Use a two-click solution: show placeholder image of map with "Show Map" button. Only load Google Maps JavaScript after explicit click. This satisfies GDPR without cookie banners for maps.
- **Alternative:** OpenStreetMap + Leaflet requires no consent (no cookies, no tracking) and works great for simple "here's our office" use cases. Trade-off is less familiar UI and no integration with Google Business Profile.

**Sources:**
- [Google Maps GDPR compliance](https://www.iubenda.com/en/help/62728-google-maps-and-the-gdpr-how-to-be-compliant)
- [GDPR-compliant Google Maps implementation](https://devowl.io/gdpr-compliant/google-maps/)
- [Google Maps API security](https://developers.google.com/maps/api-security-best-practices)

---

## Infrastructure & Hosting

### Development Tools

| Tool | Version | Purpose | Why | Confidence |
|------|---------|---------|-----|------------|
| **npm** | 10+ | Package manager | Node.js default, industry standard. | HIGH |
| **Git** | 2.x | Version control | Essential for deployment workflows. | HIGH |

### Hosting & Deployment

| Service | Purpose | Why | Cost | Confidence |
|---------|---------|-----|------|------------|
| **Netlify** | Static hosting & CDN | Best-in-class JAMstack ergonomics. Free tier: 100GB bandwidth, auto SSL, form handling, deploy previews. Excellent DX. | Free (100GB bandwidth) | HIGH |
| **Cloudflare Pages** (alternative) | Static hosting & CDN | Unbeatable performance and cost at scale. Free tier: unlimited bandwidth, unlimited requests. Best for high-traffic sites. | Free (unlimited bandwidth) | HIGH |
| **IONOS** (alternative) | German hosting provider | Germany-based, GDPR-native, local support. Shared hosting from 1 EUR/month. Best for customers who demand "Made in Germany". | 1-10 EUR/month | MEDIUM |

**Recommendation: Netlify for MVP, Cloudflare Pages if traffic grows**

**Rationale:**
- **Netlify** is the most developer-friendly option for Astro. Git-based deployments, automatic SSL, form handling (alternative to Web3Forms), and deploy previews make iteration fast. The free tier (100GB bandwidth) is sufficient for a local real estate agent site. Netlify's JAMstack focus aligns perfectly with Astro.
- **Cloudflare Pages** offers unlimited bandwidth but requires more manual configuration. It's the better choice if traffic exceeds 100GB/month or if edge performance is critical. Cloudflare's acquisition of Astro (January 2025) means tight integration moving forward.
- **IONOS** appeals to customers who prioritize "Made in Germany" or need German-speaking support. However, it requires more manual setup (FTP/SSH uploads) and lacks modern deployment workflows. Choose this if the client insists on German hosting or has existing IONOS infrastructure.

**Why NOT Vercel:** Vercel optimizes for Next.js, not Astro. Netlify and Cloudflare offer better Astro support and more generous free tiers for static sites.

**Why NOT traditional German hosts (Hetzner, Strato):** They work but lack modern deployment automation. You'll spend more time on infrastructure than development.

**Sources:**
- [Netlify vs Vercel vs Cloudflare 2026](https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison)
- [Cloudflare acquires Astro](https://blog.cloudflare.com/astro-joins-cloudflare/)
- [German hosting providers 2026](https://hostadvice.com/web-hosting/germany/)

### Domain & Email

| Service | Purpose | Why | Cost | Confidence |
|---------|---------|-----|------|------------|
| **Namecheap / Porkbun** | Domain registration | Cheap, reliable, privacy protection included. | 10-15 EUR/year | HIGH |
| **Google Workspace** (alternative) | Professional email | denise@viaimmobilien.de looks professional. Includes Google Drive, Calendar. | 5.75 EUR/user/month | MEDIUM |
| **Mailbox.org** (alternative) | German email hosting | GDPR-native, German servers, eco-friendly. | 3 EUR/month | MEDIUM |

**Rationale:** Separate domain registration from hosting for flexibility. For email, Google Workspace is familiar and reliable, but German clients may prefer Mailbox.org for data sovereignty.

---

## Analytics & Monitoring

| Service | Purpose | Why | Cost | Confidence |
|---------|---------|-----|------|------------|
| **Plausible Analytics** | Privacy-first analytics | GDPR-compliant without cookie banners. EU-hosted, 30-day free trial. | 9 EUR/month | HIGH |
| **Google Analytics 4** (not recommended) | Traditional analytics | Requires cookie consent, complex GDPR compliance, overkill for small site. | Free | LOW |

**Rationale:** For a German real estate agent, **privacy-first analytics** are non-negotiable. Plausible requires no cookie banner, stores data in EU, and provides essential metrics (traffic, popular pages, referrers) without tracking individual users. Google Analytics 4 requires cookie consent banners and complex GDPR configuration—not worth it for a 6-page site.

**Sources:**
- [Plausible Analytics GDPR](https://plausible.io/privacy-focused-web-analytics)
- [Google Analytics GDPR challenges](https://complianz.io/google-maps-and-gdpr-what-you-should-know/)

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative | Confidence |
|----------|-------------|-------------|---------------------|------------|
| **Framework** | Astro 5.17 | Next.js 15 | Over-engineered for static sites, more JS, harder to hit Lighthouse 100. | HIGH |
| **Framework** | Astro 5.17 | Hugo/11ty | No JavaScript ecosystem, harder to add interactive islands if needed. | MEDIUM |
| **Styling** | Tailwind 4.1 | Vanilla CSS | More boilerplate, slower iteration, harder to maintain consistency. | HIGH |
| **Styling** | Tailwind 4.1 | Bootstrap 5 | Opinionated design, harder to customize for unique branding. | MEDIUM |
| **Forms** | Web3Forms | Custom backend | Adds server costs, security burden, maintenance overhead. | HIGH |
| **Forms** | Web3Forms | Netlify Forms | Good alternative but less GDPR control; 100 submissions/month limit. | MEDIUM |
| **Hosting** | Netlify | Vercel | Vercel optimizes for Next.js, not Astro. Less generous free tier for static. | HIGH |
| **Hosting** | Netlify | Traditional hosts (Hetzner, Strato) | Lack modern deployment workflows, more manual configuration. | MEDIUM |
| **Analytics** | Plausible | Google Analytics 4 | Requires cookie banner, complex GDPR compliance, privacy concerns. | HIGH |

---

## Installation

### Core Dependencies

```bash
# Create new Astro project
npm create astro@latest via-immobilien

# Navigate to project
cd via-immobilien

# Install Tailwind CSS
npx astro add tailwind

# Install form validation
npm install zod

# Optional: If using React islands for complex forms
npx astro add react
npm install react-hook-form @hookform/resolvers
```

### Dev Dependencies

```bash
# Prettier for code formatting
npm install -D prettier prettier-plugin-astro prettier-plugin-tailwindcss

# Optional: TypeScript if project grows
npm install -D typescript @types/node
```

### Environment Variables

```bash
# .env (for local development)
PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here (if using Google Maps)
```

---

## Configuration Recommendations

### Astro Config

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static', // Pure static site
  site: 'https://viaimmobilien.de', // For sitemap generation
});
```

### Tailwind Config

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'navy': '#142333',
        'cream': '#F5F0EA',
        'gold': '#D1B787',
      },
    },
  },
};
```

---

## Version Management Strategy

### Stable vs Cutting-Edge

**For MVP (recommended):**
- Astro 5.17.1 (stable)
- Tailwind 4.1 (stable)
- Zod 4.x (stable after Astro 6 beta upgrade)

**Future considerations:**
- Astro 6 (currently beta): Wait for stable release before upgrading. Key features (CSP, live collections) aren't needed for MVP.
- Node 22+: Required for Astro 6. Start with Node 22 LTS now to prepare for Astro 6 upgrade path.

### Update Cadence

- **Monthly:** Check for Astro/Tailwind security patches
- **Quarterly:** Review major version updates
- **Yearly:** Evaluate framework migration (unlikely with Astro)

---

## Stack Risks & Mitigations

### Risk 1: Astro is relatively young (2021)

**Mitigation:** Astro joined Cloudflare in January 2025, ensuring long-term support. Used by major companies (The Guardian, Firebase docs, Trivago). Active community, frequent releases.

**Confidence:** MEDIUM → HIGH after Cloudflare acquisition

### Risk 2: Tailwind v4 just released (2025)

**Mitigation:** Breaking changes are minimal. Use v4 from the start to avoid migration later. Extensive documentation and community support.

**Confidence:** HIGH

### Risk 3: Web3Forms is a third-party dependency

**Mitigation:** Low lock-in—switching to Netlify Forms or custom backend is straightforward. Export form data before retention period expires. API is simple REST interface.

**Confidence:** HIGH

---

## What NOT to Use (and Why)

### CMS (Contentful, Strapi, WordPress)
**Why avoid:** Content is already written and static. A CMS adds complexity, hosting costs, and security concerns for zero benefit. Markdown files in Git are simpler.

**When to reconsider:** If Denise wants to edit content herself without developer help, add a headless CMS later. Start with Git-based workflow.

### WordPress
**Why avoid:** PHP stack, plugin maintenance, security vulnerabilities, performance overhead. Defeats the purpose of static-first architecture.

**When to reconsider:** Never. If client demands WordPress, use a different stack entirely.

### jQuery
**Why avoid:** It's 2026. Modern JavaScript and Astro provide everything jQuery did, with better performance and smaller bundles.

**When to reconsider:** Never.

### Cookie Consent Banners (Cookiebot, OneTrust)
**Why avoid initially:** With Plausible Analytics (no cookies), Web3Forms (no cookies), and two-click Google Maps (no automatic load), you likely don't need a consent banner at all. GDPR only requires banners for cookies/tracking—which this stack avoids.

**When to reconsider:** If you add third-party marketing tools (Facebook Pixel, Google Ads tracking), then add Cookiebot or similar.

### React/Vue/Svelte as primary framework
**Why avoid:** Unnecessary JavaScript for a content site. Astro lets you use React/Vue/Svelte as islands for specific interactive components—best of both worlds.

**When to reconsider:** If 50%+ of pages need reactivity, consider Next.js instead.

---

## Total Cost of Ownership (Monthly)

### MVP Budget (First 6 months)
- Domain: 1 EUR/month (12 EUR/year)
- Hosting: 0 EUR (Netlify free tier)
- Email: 0 EUR (use existing email initially) OR 3-6 EUR (Mailbox.org or Google Workspace)
- Forms: 0 EUR (Web3Forms free tier: 250 submissions/month)
- Analytics: 0 EUR (30-day Plausible trial) → 9 EUR after trial
- SSL Certificate: 0 EUR (Netlify auto-SSL)

**Total: 1-16 EUR/month** (depending on email and analytics choices)

### Production Budget (After MVP)
- Domain: 1 EUR/month
- Hosting: 0-10 EUR (Netlify free → 19 USD if >100GB bandwidth)
- Email: 3-6 EUR (Mailbox.org or Google Workspace)
- Forms: 0-9 EUR (Web3Forms free → Pro if >250 submissions/month)
- Analytics: 9 EUR (Plausible)

**Total: 13-35 EUR/month** (< 50 EUR including buffer)

---

## Sources & Verification

All recommendations verified against current (January 2026) documentation and community consensus:

### Primary Sources (HIGH confidence)
- [Astro official releases](https://github.com/withastro/astro/releases) - Version verification
- [Astro 6 beta announcement](https://astro.build/blog/astro-6-beta/) - Future roadmap
- [Tailwind CSS v4 documentation](https://tailwindcss.com/) - Features and API
- [Web3Forms documentation](https://web3forms.com/) - GDPR compliance
- [Google Maps GDPR compliance guide](https://www.iubenda.com/en/help/62728-google-maps-and-the-gdpr-how-to-be-compliant)

### Comparative Analysis (HIGH confidence)
- [Astro vs Next.js performance benchmarks](https://www.contentful.com/blog/astro-next-js-compared/)
- [Netlify vs Vercel vs Cloudflare 2026 comparison](https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison)
- [Cloudflare acquires Astro announcement](https://blog.cloudflare.com/astro-joins-cloudflare/)

### Community Consensus (MEDIUM confidence)
- [TypeScript vs JavaScript small projects 2026](https://www.carmatec.com/blog/typescript-vs-javascript-which-one-to-choose/)
- [Tailwind CSS discussion 2026](https://dev.to/toboreeee/its-almost-2026-why-are-we-still-arguing-about-css-vs-tailwind-291f)
- [Real estate tech stack 2026](https://nowbam.com/the-real-estate-tech-stack-you-need-to-grow-in-2026/)

### Market Research (MEDIUM confidence)
- [German hosting providers 2026](https://hostadvice.com/web-hosting/germany/)
- [Small business website trends 2026](https://mytasker.com/blog/modern-web-design-trends-best-practices)

---

## Confidence Assessment

| Decision | Confidence | Justification |
|----------|------------|---------------|
| Astro as framework | HIGH | Performance benchmarks, Cloudflare backing, perfect fit for use case |
| Tailwind CSS | HIGH | Industry standard, v4 stable, official Astro integration |
| JavaScript over TypeScript | MEDIUM | Community consensus for small projects, but could add TS later |
| Web3Forms | HIGH | GDPR-compliant, free tier sufficient, low lock-in |
| Netlify hosting | HIGH | Best DX, generous free tier, Astro-optimized |
| Plausible Analytics | HIGH | GDPR-native, no consent needed, perfect for German market |
| Google Maps approach | MEDIUM | Two-click pattern is compliant but requires custom implementation |
| Zod validation | HIGH | Upgraded to v4 in Astro 6, lightweight, TypeScript-aligned |

---

## Roadmap Implications

Based on this stack, recommended phase structure:

1. **Development Environment Setup** (1-2 days)
   - Install Astro, Tailwind, configure Git
   - Set up Netlify deployment pipeline
   - Configure domain and SSL

2. **Core Pages & Design System** (3-5 days)
   - Implement Tailwind theme (Navy/Cream/Gold)
   - Build reusable components (header, footer, CTA)
   - Create 6 pages with German content

3. **Interactive Features** (2-3 days)
   - Contact form with Zod validation + Web3Forms
   - Click-to-call functionality
   - Google Maps with two-click GDPR flow

4. **Polish & Performance** (1-2 days)
   - Lighthouse 100 optimization
   - Responsive testing
   - German SEO meta tags

5. **Analytics & Launch** (1 day)
   - Plausible Analytics setup
   - Domain configuration
   - Launch checklist

**Total estimated MVP timeline: 8-13 days of development**

---

## Open Questions for Phase Planning

1. **Content Management:** Will Denise need to edit content herself, or will updates go through developer?
   - If yes → Add Astro Content Collections + Forestry/Decap CMS in Phase 2.5
   - If no → Keep Git-based workflow

2. **Lead Tracking:** Does she need to track form submissions beyond email notifications?
   - If yes → Integrate Web3Forms with Zapier → Google Sheets or CRM
   - If no → Email notifications sufficient

3. **Photography:** Who provides property/office photos? Budget for professional photography?
   - Impacts timeline and image optimization strategy

4. **German Hosting Requirement:** Is "Made in Germany" hosting a hard requirement for client?
   - If yes → Use IONOS instead of Netlify (adds deployment complexity)
   - If no → Netlify (better DX)

---

## Conclusion

This stack prioritizes **performance, simplicity, GDPR compliance, and low cost**—exactly what a German real estate agent needs in 2026. Astro + Tailwind delivers a blazingly fast, maintainable site that respects user privacy and keeps operational costs under 50 EUR/month.

The technology choices are conservative (stable versions) yet modern (Astro's cutting-edge performance), ensuring the site remains competitive for 3-5 years without major rewrites.

**Confidence in stack: HIGH**
**Ready for roadmap creation: YES**
