# SLV Chest & Allergy Clinic — QA and security review

Date: 13 November 2026
Target canonical hostname: https://www.slvchestallergy.com/

## Scope
Reviewed the six public pages: Home, About, Services, Appointment, Contact and Privacy. The package is static HTML/CSS/JS; appointment requests are handled by phone, email or WhatsApp only. No online booking form or booking API remains in these pages.

## Results
- HTML structure smoke check: passed.
- SEO metadata coverage (title, description, canonical, Open Graph/Twitter): passed for all six pages.
- Heading check: one H1 per page.
- Image accessibility check: no missing `alt` attributes found.
- Local asset/link check: no missing local href/src references found.
- Structured data: homepage and contact-page MedicalClinic JSON-LD parsed successfully.
- Sitemap XML: parsed successfully.
- JavaScript syntax: `main.js`, jQuery, Bootstrap bundle and Easing passed `node --check`.
- Public form/backend check: no HTML forms or Google Apps Script endpoint references found.
- External new-tab links: `noopener noreferrer` added.
- Apache hardening: `.htaccess` and folder-level access rules added.

## Security controls included
- Content-Security-Policy tailored to local scripts and the external Google Fonts, cdnjs and jsDelivr CSS/font assets.
- HSTS (six-month max-age; no includeSubDomains/preload).
- X-Content-Type-Options: nosniff.
- X-Frame-Options: DENY and CSP frame-ancestors 'none'.
- Referrer-Policy: strict-origin-when-cross-origin.
- Permissions-Policy disables camera, microphone and geolocation.
- Directory listing disabled; hidden files, README/TODO/checklist and source-only folders denied on Apache-compatible hosting.

## Important limitations
- Browser-driven viewport and interaction testing could not be completed because the available headless browser was blocked from opening local pages. WeasyPrint generated static layout previews, but these do not validate real browser media queries, JavaScript behavior, mobile navigation or tap targets.
- The bundled Bootstrap CSS and JS were upgraded together from 5.0.0 to 5.3.6. Bootstrap 5.3.9 is the current stable patch as of 13 November 2026; 5.3.6 remains behind by three patch releases and should be updated when the exact upstream package can be retrieved.
- The `.htaccess` protections apply only on Apache/LiteSpeed-compatible hosting. They will not apply on GitHub Pages or hosts that ignore `.htaccess`.
- Live HTTPS, TLS, response headers, redirects, cache behavior and deployed asset loading could not be verified from this environment.
- No authenticated penetration test or intrusive vulnerability scan was performed.

## Production sign-off required
1. Upgrade Bootstrap 5.0.0 to current stable 5.3.x and retest.
2. Test all six pages in Chromium, Firefox and Safari at desktop and mobile widths.
3. Verify live hosting headers/HTTPS after upload and configure equivalent host/CDN rules if `.htaccess` is unsupported.
4. Confirm all clinic facts and privacy commitments with the clinic owner.
5. Run Lighthouse/PageSpeed and submit sitemap in Google Search Console.
