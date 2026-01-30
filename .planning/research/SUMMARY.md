# Project Research Summary

**Project:** Via Immobilien - Real Estate Agent Business Website
**Domain:** Small Business Website (Real Estate Agent, Germany)
**Researched:** 2026-01-30
**Confidence:** HIGH

## Executive Summary

Via Immobilien requires a professional business card website, not a property search platform. In Germany, where IDX/MLS doesn't exist and properties are marketed through centralized portals (ImmoScout24), the website's purpose is establishing credibility and enabling contact. The optimal approach is a **static-first, performance-optimized, GDPR-native architecture** using Astro + Tailwind CSS, delivering sub-3-second loads, Lighthouse 100 scores, and operational costs under 50 EUR/month.

The critical success factor is not features—it's legal compliance, trust signals, and frictionless contact. German GDPR enforcement is aggressive: 54% of agents get zero website leads, and 10% of cookie banners violate DSGVO. The recommended stack (Astro 5.17 static site) avoids common pitfalls: no WordPress security concerns, no cookie consent complexity (privacy-first analytics), minimal JavaScript overhead, and straightforward German hosting compatibility.

Key risk mitigation: DSGVO compliance must be architectural from day one, not retrofitted. Impressum and Datenschutzerklärung are legally required (fines up to €50,000), Google Maps requires two-click consent or OpenStreetMap alternative, and contact forms must follow data minimization principles. The research indicates a 6-page MVP can launch in 8-13 development days with proper phase ordering: legal foundation → core components → content pages → integrations → polish.

## Key Findings

### Recommended Stack

**For German real estate agent websites in 2026, static-first architecture prioritizes performance, GDPR compliance, and local hosting.** Astro is purpose-built for content sites, delivering 40% faster loads and 90% less JavaScript than Next.js, with 100/100 Lighthouse scores achievable out of the box. Combined with Tailwind CSS v4 for rapid styling and German hosting (Netlify/Cloudflare Pages with EU data centers), this stack ensures sub-100ms latency for Rhein-Main users while keeping costs minimal.

**Core technologies:**
- **Astro 5.17.1**: Static site generator optimized for content-heavy sites—zero JavaScript by default, perfect for 6-page marketing site
- **Tailwind CSS 4.1**: Utility-first CSS with v4 CSS variables for brand colors (Navy Blue #142333, Cream #F5F0EA, Soft Gold #D1B787)
- **JavaScript (not TypeScript)**: Simpler for small projects; TypeScript adds unnecessary complexity for 6-page site with minimal interactivity
- **Web3Forms**: GDPR-compliant form backend (free tier: 250 submissions/month, 30-day data retention, no tracking)
- **Plausible Analytics**: Privacy-first analytics requiring no cookie consent, EU-hosted (9 EUR/month after trial)
- **Netlify hosting**: Free tier (100GB bandwidth), auto-SSL, Git-based deployments, excellent Astro integration

**Critical stack decisions:**
- NOT Next.js: Over-engineered for static sites; Astro's static generation is 40% faster
- NOT WordPress: Security burden (96% vulnerabilities from plugins), performance overhead, maintenance complexity
- NOT custom backend: Web3Forms handles contact forms without server infrastructure
- NOT Google Analytics: Requires cookie consent; Plausible is GDPR-native with no banners needed

**Version management:** Astro 5.17 stable (Astro 6 beta available but not needed for MVP), Node 22+ LTS (future-proofing for Astro 6 upgrade path), Tailwind 4.1 stable

### Expected Features

**In Germany, real estate agent websites are professional business cards, not property search platforms.** Unlike US sites with IDX/MLS integration, German sites establish credibility and facilitate contact while property listings live on portals like ImmoScout24. The MVP must deliver table stakes without over-engineering.

**Must have (table stakes):**
- Mobile-responsive design (60%+ traffic on mobile)
- Contact form (DSGVO-compliant, minimal fields: Name, Email, Message)
- Click-to-call phone number (mobile users expect tap-to-call)
- **Impressum** (German legal requirement, fines up to €50,000 if missing/incomplete)
- **Datenschutzerklärung** (GDPR privacy policy, required before collecting ANY data)
- SSL/HTTPS encryption (DSGVO requirement for contact forms)
- Professional agent photo (personal service = face connection)
- About/Bio section (personal connection differentiator for small agents)
- Services overview (Verkauf, Vermietung)
- Location/service area (Rhein-Main region specificity)
- Fast page load (sub-3 seconds, especially mobile)

**Should have (competitive differentiators):**
- Process explanation page ("So arbeite ich" - transparency reduces anxiety for first-time sellers)
- FAQ section (shows expertise, preempts questions, builds trust)
- Testimonials/reviews (social proof from real people)
- Personal story/values (connection beyond credentials, aligns with "down-to-earth" positioning)

**Defer to v2+:**
- Video introduction (production complexity, not critical for MVP)
- Blog/market insights (54% get zero website leads; time better spent on Google Business Profile)
- Neighborhood guides (high maintenance burden)
- Newsletter signup (creates ongoing commitment)

**Anti-features (explicitly avoid):**
- Property search/IDX integration (doesn't exist in Germany; creates unrealistic expectations)
- Live chat/chatbot (impersonal, contradicts "personal agent" positioning)
- Home valuation calculator (automated feels gimmicky; personal valuation is service offering)
- Luxury design elements (conflicts with "down-to-earth" for normal people positioning)

### Architecture Approach

**The recommended architecture is component-based static site generation with file-system routing, zero-JavaScript-by-default, and external service integration for forms/maps.** Astro's architecture provides clear separation: layouts wrap pages, pages compose components, components are pure UI receiving props. No CMS, no database, no build-time API calls—content is hardcoded German text from requirements, making the site fast, secure, and simple to maintain.

**Major components:**
1. **BaseLayout** — Wraps all pages with consistent header/nav/footer, manages SEO meta tags
2. **Header/Footer** — Global navigation and contact info, reused across all 6 pages
3. **Content Components** — Reusable UI elements (Hero, ServiceCard, ProcessSteps, FAQItem, ContactForm)
4. **Pages** — File-based routing (index.astro, ueber-mich.astro, leistungen.astro, so-arbeite-ich.astro, kontakt.astro, faq.astro)
5. **External Integrations** — Web3Forms for contact submissions, Google Maps iframe (two-click consent) or OpenStreetMap

**Data flow:** Build time (top-down: Pages → Layout → Components) generates static HTML/CSS. Runtime has no data flow except form POST to external endpoint. No state management, no client-side routing, minimal JavaScript (<1KB for form validation).

**Key patterns to follow:**
- Shared layout component for consistent structure
- Props-based component reusability (ServiceCard, FAQItem)
- Form submission to external endpoint (Web3Forms, not custom backend)
- Semantic HTML with accessibility (header, nav, main, footer, ARIA attributes)
- CSS custom properties for brand consistency (Navy Blue, Cream, Soft Gold)

**Anti-patterns to avoid:**
- Complex state management (React/Vue unnecessary for static content)
- Page-specific component files (keep single-use content in page files)
- Custom form backend (adds hosting/security burden)
- Atomic design over-architecture (flat components/ folder sufficient for 7 components)
- CMS integration before launch (content rarely changes; hardcode initially)

**Build order:** Foundation (project structure, BaseLayout, CSS variables) → Core Components (Header, Footer) → Content Components (Hero, ServiceCard, etc.) → Pages (homepage first, Kontakt last) → Form Integration → Polish

### Critical Pitfalls

Research identified 12 domain-specific pitfalls, with 3 being critical (legal/financial risk):

1. **DSGVO Non-Compliance Leading to Abmahnung** — Violating German data protection laws results in warning letters (Abmahnung) from competitors with costs up to €500, fines up to €50,000 (Impressum) or €20 million/4% turnover (DSGVO). Prevention: Impressum accessible in one click from every page with complete business details; Datenschutzerklärung as separate menu item describing actual data processing; SSL/HTTPS for all pages; no cookies before consent. Affects Phase 1 (must be architectural from day one).

2. **Google Maps Without Consent (DSGVO Violation)** — Direct iframe embedding transfers user data to Google US servers without consent, violating DSGVO Art. 6. Prevention: Two-click solution (show placeholder, load map after explicit click) or use OpenStreetMap (GDPR-compliant, no consent needed). Check browser network tab: if google.com/maps requests fire on page load, you're non-compliant. Affects Phase 3 (Contact page integration).

3. **Contact Form Conversion Killers** — Too many fields, missing required indicators, generic CTAs, no real-time validation, poor mobile optimization drastically reduce submissions. Reducing fields from 11 to 4 boosts conversions 120%; forms with 3 fields convert 10-12% better. Prevention: Keep to 3-4 fields (Name, Email/Phone, Message), mark required with asterisk, use specific CTA ("Jetzt Beratung anfragen"), implement real-time validation, add GDPR-required privacy checkbox. Affects Phase 3 (Contact functionality).

**Additional moderate pitfalls:**
4. Poor image optimization (3-8MB photos cause 3+ second loads; 53% mobile users abandon)
5. Cookie banner non-compliance (10% are illegal per 2026 study; equal-effort decline required)
6. Missing local SEO (unclaimed Google Business Profile = invisible to "Immobilienmakler Rhein-Main" searches)

**Minor pitfalls:**
7. Stock photos destroying trust (visitors recognize same photos from other sites)
8. Mobile optimization failures (50%+ traffic mobile; non-responsive "unforgivable" in 2026)
9. Visual clutter and poor readability (dense paragraphs, low contrast, tiny fonts)
10. Weak CTAs (generic "Contact Us" vs. specific "Kostenlose Beratung vereinbaren")

## Implications for Roadmap

Based on research, recommended phase structure emphasizes **legal compliance first, core content second, integrations third, polish fourth**. This order avoids the #1 critical pitfall (DSGVO non-compliance) by architecting legal requirements from foundation, not retrofitting later.

### Phase 1: Legal Foundation & Development Environment
**Rationale:** Cannot launch without DSGVO compliance; fines up to €50,000. All subsequent work depends on project structure. Legal requirements must be architectural, not added later.

**Delivers:**
- Astro + Tailwind project setup
- BaseLayout with SEO structure
- Impressum page (complete legal notice with Immobilienmakler licensing details)
- Datenschutzerklärung page (GDPR-compliant privacy policy)
- SSL/HTTPS configuration
- CSS custom properties for brand colors (Navy Blue, Cream, Soft Gold)
- Git repository + Netlify deployment pipeline

**Addresses:** Table stakes (SSL, Impressum, Datenschutzerklärung from FEATURES.md)

**Avoids:** Pitfall #1 (DSGVO non-compliance) by architecting legal compliance from start

**Research flag:** Standard patterns for Astro setup (skip research-phase); Impressum requires German legal template verification

---

### Phase 2: Core Pages & Design System
**Rationale:** Once legal foundation exists, build the business card content. Header/Footer must exist before individual pages can be built (dependency). Pages establish credibility and answer "Who is Denise?" and "What does she offer?"

**Delivers:**
- Header component (logo, navigation)
- Footer component (contact info, legal links)
- Homepage (Hero, value proposition, CTA)
- Über mich page (bio, professional photo, personal story)
- Leistungen page (Verkauf/Vermietung services with ServiceCard component)
- So arbeite ich page (4-step process visualization with ProcessSteps component)
- FAQ page (common questions with FAQItem component)
- Mobile-responsive design (60%+ traffic mobile)

**Addresses:** Table stakes (About, Services, Professional photo from FEATURES.md); Differentiators (Process page, FAQ, Personal story)

**Avoids:** Pitfall #7 (stock photos) by using real Denise photos; Pitfall #8 (mobile failures) by mobile-first design; Pitfall #9 (visual clutter) by readability-focused content structure

**Uses:** Astro component patterns (from ARCHITECTURE.md), Tailwind CSS for styling, Semantic HTML for accessibility

**Research flag:** Standard web design patterns (skip research-phase)

---

### Phase 3: Contact & Integrations
**Rationale:** Contact functionality enables business value (lead generation). Must be implemented carefully to avoid conversion killers (Pitfall #3) and GDPR violations (Pitfall #2 for maps).

**Delivers:**
- Contact page layout
- ContactForm component (3-4 fields: Name, Email/Phone, Message)
- Web3Forms integration (GDPR-compliant backend)
- Form validation (Zod, real-time feedback)
- GDPR privacy checkbox ("Ich habe die Datenschutzerklärung gelesen")
- Click-to-call functionality (mobile-optimized)
- Google Maps with two-click consent OR OpenStreetMap (GDPR-compliant)
- Success/error handling for form submissions

**Addresses:** Table stakes (Contact form, Click-to-call, Location/service area from FEATURES.md)

**Avoids:** Pitfall #3 (conversion killers) via 3-4 field limit and specific CTA; Pitfall #2 (Google Maps GDPR violation) via two-click consent

**Implements:** Form submission to external endpoint pattern (from ARCHITECTURE.md)

**Research flag:** May need research-phase if choosing complex consent management; standard if using OpenStreetMap or simple two-click

---

### Phase 4: SEO, Analytics & Performance
**Rationale:** Site is functional; now optimize for discovery and measure success. Local SEO critical for "Immobilienmakler Rhein-Main" visibility.

**Delivers:**
- Google Business Profile setup (complete with photos, posts, reviews)
- LocalBusiness schema markup (address, phone, service area)
- Plausible Analytics integration (privacy-first, no cookie consent needed)
- Image optimization (WebP format, lazy loading, < 200KB per image)
- Lighthouse 100 optimization (performance, accessibility, SEO)
- Meta tags for German SEO (local keywords: "Immobilienmakler Rhein-Main")
- Sitemap.xml and robots.txt

**Addresses:** Moderate pitfall #6 (missing local SEO) via GBP and schema; Pitfall #4 (poor image optimization)

**Avoids:** Google Analytics (requires cookie consent) by using Plausible

**Research flag:** Standard patterns (skip research-phase); Google Business Profile setup well-documented

---

### Phase 5: Pre-Launch Polish & Compliance Validation
**Rationale:** Final checks before launch ensure nothing missed and site meets quality standards. Legal compliance validation prevents post-launch Abmahnung.

**Delivers:**
- Legal compliance checklist (Impressum complete? Datenschutz accessible? SSL working?)
- Accessibility audit (WCAG 2.1 AA: contrast, keyboard nav, screen reader)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (actual phones, not just browser resize)
- Performance validation (PageSpeed Insights: >90 mobile, 100 desktop)
- Broken link check
- Contact form testing (spam protection, email delivery)
- Cookie consent validation (if any cookies used, equal-effort decline)

**Addresses:** Final validation that all table stakes present and no critical pitfalls remain

**Avoids:** Pitfall #1 (DSGVO) via legal checklist; Pitfall #8 (cookie banner non-compliance) via compliance validation

**Research flag:** Standard testing procedures (skip research-phase)

---

### Phase 6: Launch & Ongoing Maintenance (Post-MVP)
**Rationale:** Site is live; maintenance prevents drift into pitfalls over time (outdated content, security vulnerabilities, neglected GBP).

**Delivers:**
- Domain configuration (viaimmobilien.de)
- DNS setup with Netlify
- Professional email (denise@viaimmobilien.de via Mailbox.org or Google Workspace)
- Backup strategy (independent of host)
- Update cadence (monthly: security patches; quarterly: major versions)
- Google Business Profile monthly posts
- Quarterly review monitoring (analytics, broken links, uptime)

**Addresses:** Ongoing maintenance to prevent Pitfall #5 (WordPress security)—though Astro static site has minimal attack surface

**Research flag:** Standard DevOps practices (skip research-phase)

---

### Phase Ordering Rationale

1. **Legal first** because DSGVO violations cause immediate fines and cannot be retrofitted architecturally
2. **Core pages second** because Header/Footer are dependencies for all pages; homepage validates layout system works
3. **Contact third** because it's the highest-complexity feature (form validation, external integration, GDPR compliance) and requires working pages to exist
4. **SEO/Performance fourth** because you can't optimize what doesn't exist; analytics need content to track
5. **Polish fifth** because testing/validation requires complete site
6. **Maintenance ongoing** because pitfalls emerge over time (outdated plugins, neglected GBP)

**Critical path:** Legal Foundation → Core Components → Pages → Contact → Polish
**Parallelizable:** Content components (Hero, ServiceCard, ProcessSteps, FAQItem) can build in parallel within Phase 2

### Research Flags

**Phases likely needing `/gsd:research-phase` during planning:**
- **None** — All phases use well-documented patterns (Astro setup, web design, form integration, SEO best practices, testing procedures)

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Astro + Tailwind setup has official docs; Impressum uses German legal template
- **Phase 2:** Standard web design patterns; component-based architecture documented in Astro guides
- **Phase 3:** Web3Forms integration straightforward; two-click consent or OpenStreetMap both documented
- **Phase 4:** Local SEO well-documented; Plausible Analytics simple integration
- **Phase 5:** Testing/compliance procedures standard
- **Phase 6:** DevOps maintenance practices established

**Conditional research needs:**
- If client insists on complex consent management platform (Cookiebot, OneTrust), Phase 3 may need integration research
- If client has unusual Impressum requirements (e.g., non-standard licensing structure), Phase 1 may need legal research
- Otherwise, proceed with roadmap creation without additional research phases

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro official docs, performance benchmarks verified, Cloudflare backing (2025 acquisition), German hosting compatibility confirmed |
| Features | HIGH | German legal requirements verified with multiple sources (eRecht24, Datenschutz.org), table stakes validated against German real estate market research |
| Architecture | HIGH | Based on Astro official project structure docs, static site best practices, real-world component patterns |
| Pitfalls | HIGH | DSGVO enforcement data from 2026, real estate-specific pitfalls verified with German Immobilienmakler sources, conversion research from multiple studies |

**Overall confidence:** HIGH

Research drew from official documentation (Astro, GDPR), current 2026 German legal sources (eRecht24, Datenschutz.org, Händlerbund), and verified real estate industry best practices. All critical decisions (stack, legal requirements, architecture patterns) have primary sources. Medium-confidence areas (specific feature prioritization) based on cross-referenced secondary sources and don't affect core recommendations.

### Gaps to Address

**Minor gaps that don't block roadmap creation:**

1. **Exact Impressum requirements for Denise's business structure** — General Immobilienmakler requirements known (name, address, licensing authority, insurance), but specific licensing authority and insurance details need verification during Phase 1 implementation. Does not affect roadmap structure.

2. **Professional photography availability** — Assumed Denise can provide or commission professional photos for Phase 2. If not available, may need stock photos with careful selection (prefer lifestyle over obviously staged) or budget for photo session. Does not affect phase ordering, only timeline within Phase 2.

3. **Content creation capacity** — FAQ and Process pages (Phase 2 differentiators) require domain knowledge writing. If Denise cannot provide content, may need copywriting support or defer these pages to Phase 2.5. Does not affect core table stakes or phase structure.

4. **Google Maps vs. OpenStreetMap preference** — Research shows both options compliant if implemented correctly (Google Maps requires two-click consent, OpenStreetMap needs no consent). Client preference unknown. Phase 3 can accommodate either; decision needed during implementation, not roadmap.

**How to handle:**
- Impressum details: Add task in Phase 1 to gather business documentation
- Professional photos: Add task in Phase 2 to commission photography if not available
- Content creation: Add task in Phase 2 to workshop FAQ/Process content with Denise
- Maps choice: Add decision point in Phase 3 based on client preference

**No gaps block roadmap creation.** All gaps are implementation details resolvable during phase execution.

## Sources

### Primary (HIGH confidence)

**Technology Stack:**
- [Astro Official Documentation](https://docs.astro.build/) — Project structure, best practices, performance characteristics
- [Astro vs Next.js Performance Comparison](https://www.contentful.com/blog/astro-next-js-compared/) — 40% faster loads, 90% less JavaScript benchmarks
- [Cloudflare Acquires Astro](https://blog.cloudflare.com/astro-joins-cloudflare/) — Long-term viability, backing
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/) — CSS variables, theming, features
- [Web3Forms GDPR Documentation](https://web3forms.com/) — DSGVO compliance, data retention
- [Plausible Analytics Privacy Documentation](https://plausible.io/privacy-focused-web-analytics) — GDPR-compliant analytics

**German Legal Requirements:**
- [Datenschutz.org - Website Datenschutz](https://www.datenschutz.org/website/) — DSGVO requirements for websites
- [eRecht24 - Impressum für Immobilienmakler](https://www.e-recht24.de/impressum/7906-impressum-immobilienmakler.html) — Legal notice requirements for real estate agents
- [eRecht24 - Datenschutz Immobilienmakler](https://www.e-recht24.de/datenschutz/13205-datenschutz-immobilienmakler.html) — Privacy policy requirements
- [Dr. DSGVO - Google Maps](https://dr-dsgvo.de/google-maps/) — Google Maps GDPR compliance
- [Händlerbund - Cookie Abmahnung](https://www.haendlerbund.de/de/leistungen/rechtssicherheit/hilfe-bei-abmahnung/abmahnung-cookies) — Cookie banner compliance
- [vzbv - Cookie-Banner Studie 2026](https://www.vzbv.de/pressemitteilungen/jedes-zehnte-cookie-banner-ist-klar-rechtswidrig) — 10% cookie banners illegal (enforcement data)

**Architecture Patterns:**
- [Astro Project Structure Guide](https://docs.astro.build/en/basics/project-structure/) — Official directory structure, file-based routing
- [W3C WAI - Page Regions](https://www.w3.org/WAI/tutorials/page-structure/regions/) — Semantic HTML, accessibility
- [MDN - Structuring Documents](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents) — HTML5 semantic elements

### Secondary (MEDIUM confidence)

**Real Estate Domain:**
- [Jannis Roestel - Fehler auf Immobilienmakler-Webseiten](https://www.jannisroestel.de/blog/haeufige-fehler-auf-immobilienmakler-webseiten-und-wie-du-sie-vermeidest) — Common German real estate website mistakes
- [Immobilien-Profi - 10 häufigsten Fehler Makler-Webseiten](https://www.immobilien-profi.de/die-10-haeufigsten-fehler-auf-makler-webseiten/) — Real estate agent website pitfalls
- [Carrot - Real Estate Website Conversion](https://carrot.com/blog/real-estate-website-conversion/) — Conversion best practices (US-focused but applicable)
- [SiteBuilderReport - Real Estate Website Examples 2026](https://www.sitebuilderreport.com/inspiration/real-estate-websites) — Industry benchmarks, design trends

**Conversion & Forms:**
- [WPForms - Form Conversion Best Practices](https://wpforms.com/research-based-tips-to-improve-contact-form-conversions/) — 120% boost from 11→4 fields data
- [Formidable Forms - Contact Form Research](https://formidableforms.com/research-based-tips-improve-contact-form-conversions/) — 3-4 field optimization
- [Neil Patel - Form Optimization Guide](https://neilpatel.com/blog/the-definitive-guide-to-lead-generation-form-optimization/) — Real-time validation, CTA specificity

**SEO & Local Search:**
- [Local Mighty - Local SEO Mistakes 2026](https://www.localmighty.com/blog/top-local-seo-mistakes-killing-your-local-seo-rankings/) — Google Business Profile importance
- [SeoProfy - Local SEO for Small Business](https://seoprofy.com/blog/local-seo-for-small-business/) — NAP consistency, schema markup
- [Klient Authority - 5 Local SEO Mistakes](https://klientauthority.com/5-local-seo-mistakes-that-are-quietly-killing-your-small-business/) — "Near me" search data, GBP completion

**Security & Hosting:**
- [Bitcot - WordPress Security 2026](https://www.bitcot.com/wordpress-security-challenges-and-solutions/) — 96% vulnerabilities from plugins
- [Jetpack - WordPress Security Best Practices](https://jetpack.com/resources/wordpress-security-tips-and-best-practices/) — 2FA, update cadence
- [Cloudways - Cheap Hosting Hidden Costs](https://www.cloudways.com/blog/hidden-costs-of-cheap-hosting/) — Budget hosting pitfalls

### Tertiary (LOW confidence, used for context)

**Industry Trends:**
- [TypeScript vs JavaScript 2026](https://www.carmatec.com/blog/typescript-vs-javascript-which-one-to-choose/) — JavaScript recommended for small projects (community consensus)
- [Tailwind CSS Discussion 2026](https://dev.to/toboreeee/its-almost-2026-why-are-we-still-arguing-about-css-vs-tailwind-291f) — Utility-first CSS trends
- [Atomic Design Relevance 2025](https://dev.to/m_midas/atomic-design-and-its-relevance-in-frontend-in-2025-32e9) — Component organization anti-patterns

**Note:** Tertiary sources informed anti-pattern sections and "what not to do" guidance but did not drive core recommendations. All critical decisions based on Primary sources.

---

*Research completed: 2026-01-30*
*Ready for roadmap: YES*
