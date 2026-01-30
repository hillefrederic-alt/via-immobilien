# Phase 3: Contact & Interactivity - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable contact via working form, clickable phone/email, and GDPR-compliant map. Users can submit inquiries that reach Denise's email, call directly from mobile, or send email via their client. Map shows the Rhein-Main service area.

</domain>

<decisions>
## Implementation Decisions

### Form Submission
- Email delivery to denise@via-immobilien.de
- Claude's discretion on form service (Formspree, Web3Forms, or similar GDPR-compliant static form handler)
- Fields: Name (required), Email (required), Phone (optional), Message (required)
- GDPR privacy checkbox (required to submit)
- Honeypot field for spam protection (hidden from users, catches bots)

### Validation Style
- Validate on blur (when user leaves field)
- Inline error messages directly below invalid fields
- Claude's discretion on visual error styling (should fit brand)
- Claude's discretion on email validation rules (sensible format checking)

### Map Integration
- OpenStreetMap (GDPR-friendly, no two-click consent needed)
- Show Rhein-Main service area (centered on Frankfurt region)
- No office pin - just regional overview
- Interactive map (user can zoom and pan)
- Claude's discretion on size/position within contact page layout

### Confirmation Experience
- Redirect to /danke (thank you page) on success
- Thank you page includes: confirmation message + invitation to follow on Instagram
- On failure: show error message, keep form data, allow retry
- Claude's discretion on loading state during submission

### Claude's Discretion
- Exact form service choice (Formspree vs Web3Forms vs similar)
- Error styling that fits brand (red, gold accent, or icon-based)
- Email validation specifics
- Map size and position on contact page
- Loading state implementation

</decisions>

<specifics>
## Specific Ideas

- Thank you page should feel warm and personal, consistent with Denise's approachable brand
- Form should be simple and not intimidating - this is a local real estate agent, not a corporate form
- Optional phone field for users who prefer callback

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-contact-interactivity*
*Context gathered: 2026-01-30*
