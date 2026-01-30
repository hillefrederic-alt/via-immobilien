# Via Immobilien Website

## What This Is

Eine professionelle Webseite für Via Immobilien — Denise Semmel als bodenständige, ehrliche Immobilienmaklerin in der Rhein-Main-Region. Die Seite richtet sich an normale Menschen (Erben, Familien, Erstverkäufer), die eine vertrauenswürdige Begleitung beim Immobilienverkauf oder -vermietung suchen — keine Luxusimmobilien, kein Hochglanz-Marketing.

**v1.0 shipped:** Complete business card website with legal compliance, contact form, and SEO.

## Core Value

Vertrauen aufbauen durch authentische, ehrliche Darstellung — Besucher sollen sich verstanden fühlen und den ersten Schritt wagen (Kontaktaufnahme).

## Current State

**Version:** v1.0 MVP (shipped 2026-01-30)
**Tech Stack:** Astro 5.17, Tailwind CSS, vanilla-cookieconsent, AOS, Leaflet
**Lines of Code:** ~472 (Astro/CSS/JS)
**Lighthouse:** A11y 100, SEO 100, BP 96, Perf 68 (throttled)

**Ready for production** after filling placeholders:
- LocalBusiness schema address (PLACEHOLDER_STREET, PLACEHOLDER_CITY, PLACEHOLDER_ZIP)
- Impressum address and supervisory authority
- Datenschutz controller address
- Web3Forms access key
- OG image (public/og-default.jpg, 1200x630px)
- Plausible Analytics domain registration

## Requirements

### Validated

- ✓ Startseite mit Hero-Bereich, Wertversprechen und Call-to-Action — v1.0
- ✓ Über mich Seite mit persönlicher Vorstellung und Foto — v1.0
- ✓ Leistungen Seite (Verkauf und Vermietung getrennt dargestellt) — v1.0
- ✓ So arbeite ich Seite (4-Schritte-Prozess visualisiert) — v1.0
- ✓ Kontakt Seite mit Formular, Telefon, E-Mail und Karte — v1.0
- ✓ FAQ Seite mit häufigen Fragen (Akkordeon-Stil) — v1.0
- ✓ Responsive Design (Mobile, Tablet, Desktop) — v1.0
- ✓ Klickbare Telefonnummer (click-to-call) — v1.0
- ✓ Klickbare E-Mail-Adresse (mailto) — v1.0
- ✓ Kontaktformular mit Validierung — v1.0
- ✓ OpenStreetMap Einbindung (Region Rhein-Main) — v1.0
- ✓ Navigation mit allen 6 Seiten — v1.0
- ✓ Footer mit Kontaktdaten und Impressum/Datenschutz-Links — v1.0
- ✓ Branding konsistent umgesetzt (Farben, Logo, Typografie) — v1.0
- ✓ Impressum mit Pflichtangaben für Immobilienmakler — v1.0
- ✓ Datenschutzerklärung (DSGVO-konform) — v1.0
- ✓ Cookie-Consent-Banner mit Opt-in/Opt-out — v1.0
- ✓ Testimonials/Social Proof — v1.0
- ✓ Scroll-Animationen (AOS) — v1.0
- ✓ SEO Meta-Tags für alle Seiten — v1.0
- ✓ Open Graph Tags für Social Sharing — v1.0
- ✓ LocalBusiness Schema (RealEstateAgent) — v1.0
- ✓ Plausible Analytics — v1.0

### Active

(None — ready for v1.1 planning)

### Out of Scope

- Immobilien-Listings/Objektanzeigen — kein Immobilienportal, reine Firmenpräsentation
- Blog/News-Bereich — nicht gewünscht für v1
- Mehrsprachigkeit — nur Deutsch
- CMS/Backend — statische Seite, Inhalte im Code
- Online-Terminbuchung — Kontakt erstmal nur per Formular/Telefon/E-Mail
- Live-Chat/Chatbot — widerspricht persönlicher Positionierung

## Context

**Branding (aus vorhandenen Materialien):**
- Logo: "VIA IMMOBILIEN" mit Slogan "Verstehen. Begleiten. Abschließen."
- Farben: Navy Blue (#142333), Cream (#F5F0EA), Soft Gold (#D1B787)
- Stil: Elegant aber bodenständig, vertrauenswürdig, nicht luxuriös
- Fonts: Libre Baskerville (headings), Inter (body)

**Content:**
- Alle Texte aus Webside ENTWURF.pdf übernommen
- Foto von Denise Semmel vorhanden
- Kontaktdaten: +49 176 33445373, denise@via-immobilien.de, www.via-immobilien.de

**Zielgruppe:**
- Eigentümer ohne Verkaufserfahrung
- Erben und Angehörige
- Familien und Betreuer
- Menschen in besonderen Lebenssituationen (Erbschaft, Betreuung, Trennung)

## Constraints

- **Tech Stack**: Astro (statischer Site-Generator) — modern, schnell, einfach zu warten
- **Sprache**: Deutsch
- **Hosting**: User's choice (Netlify, Vercel, or static host)
- **Content-Quelle**: Texte aus PDF übernommen

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro als Framework | Einfach, schnell, komponenten-basiert, kein unnötiges JavaScript | ✓ Good |
| Kein CMS | Inhalte ändern sich selten, statisch reicht | ✓ Good |
| Kontaktformular via Web3Forms | Für Hosting-Unabhängigkeit, einfache Integration | ✓ Good |
| OpenStreetMap statt Google Maps | GDPR-freundlicher, kein Cookie-Consent nötig | ✓ Good |
| vanilla-cookieconsent v3 | Lightweight, GDPR-konform, gute UX | ✓ Good |
| Plausible Analytics | GDPR-konform, keine Cookies, einfach | ✓ Good |
| RealEstateAgent Schema | Spezifischer als LocalBusiness für bessere Rich Results | ✓ Good |
| Lokale Font-Dateien | GDPR - keine Google Fonts CDN Anfragen | ✓ Good |
| Blur-based Validation | Bessere UX als Live-Validation, weniger aufdringlich | ✓ Good |

---
*Last updated: 2026-01-30 after v1.0 milestone*
