# SEO, security and launch QA

## Implemented in this package
- Canonical URLs, Open Graph URLs, social preview image metadata and Twitter summary metadata use `https://www.slvchestallergy.com/`.
- Unique page titles and meta descriptions for all six public HTML pages.
- MedicalClinic JSON-LD on the homepage and contact page, including clinic contact details, opening hours and the supplied Instagram/Facebook profiles.
- Valid XML sitemap and robots.txt for the six public pages.
- Descriptive alt text on every image checked.
- Removed the online booking form and booking backend dependency; appointment page directs visitors to call, email or WhatsApp.
- Instagram and Facebook links in the shared footer.
- Apache/Hostinger `.htaccess` hardening: no directory listing, CSP, HSTS, anti-framing, MIME sniffing protection, Referrer-Policy, Permissions-Policy and denial of source-only folders/files.
- No forms, API keys, credentials or booking endpoints found in the public HTML/JS review.

## Checks completed on the package
- All six HTML pages parsed with Python's HTML parser.
- All six pages have one H1, title, description and canonical URL.
- All image tags have alt attributes.
- All local href/src references checked resolve to a file.
- JSON-LD parsed successfully.
- sitemap.xml parsed successfully.
- Main site JavaScript and bundled jQuery/Bootstrap/Easing JavaScript pass `node --check`.
- ZIP integrity verified.

## Findings / items to resolve before production
1. The bundled Bootstrap CSS and JS are version 5.0.0. This is old; upgrade to the current stable Bootstrap 5.3.x patch and rerun visual regression tests before launch. The current environment could not retrieve upstream package files, so the bundled copy was not replaced.
2. The host must support Apache-compatible `.htaccess` for the included headers and directory protections to take effect. If hosting uses GitHub Pages or another static host, configure equivalent headers at the host/CDN instead.
3. Confirm HTTPS redirects and response headers on the live host after upload. HSTS is included in `.htaccess` but cannot be confirmed until deployed.
4. A full browser-driven desktop/mobile test and interactive click-through could not be completed in this environment. Static HTML/CSS rendering was used as a layout smoke test only; it is not equivalent to Chromium/Firefox/Safari testing.
5. Confirm the clinic email, phone/WhatsApp number, credentials, service list, opening hours, social profiles and privacy-policy statements with the clinic owner.
6. After deployment, run Lighthouse/PageSpeed, Google Rich Results Test and Search Console sitemap submission.
7. This is a static-site hardening review, not a penetration test or guarantee against all vulnerabilities.
