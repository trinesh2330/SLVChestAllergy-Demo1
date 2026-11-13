# S.L.V Chest & Allergy Clinic: website

Plain HTML + Bootstrap 5.3.6 + jQuery. No build step is needed to deploy: upload the folder as it is.

## Editing the shared header, footer, menu and scripts

The header, footer, menu, `<head>` assets and script tags are **not** typed into each page.
They live once in `partials/`:

| File | Controls |
|---|---|
| `partials/header.html` | top bar + navigation menu |
| `partials/footer.html` | footer (timings, address, links, copyright) |
| `partials/assets.html` | favicon, fonts, CSS links in `<head>` |
| `partials/scripts.html` | JavaScript files + back-to-top button |

After editing a partial, run (needs Node.js, nothing to install):

```
node tools/sync-partials.js
```

This copies the partial into every page (between the `<!-- HEADER:START -->` / `<!-- HEADER:END -->`
style markers). **Do not edit text between the markers inside a page: it is overwritten.**
The menu highlights the current page automatically.

## Pages

`index.html`, `about.html`, `service.html`, `appointment.html`, `contact.html`, `privacy.html`

To add a page: copy an existing page, keep the marker comments, add a link in `partials/header.html`
and `partials/footer.html` (and an `{{active:pagename}}` token), then run the sync script.

## Things to know

- Text in double square brackets, like `[[ADDRESS]]`, is a placeholder: see `TODO.md`.
- Hero image: `img/hero.webp` (desktop) and `img/hero-900.webp` (mobile).
- Equipment photos: `img/g-NAME-sm.webp` (thumbnail) and `img/g-NAME-lg.webp` (enlarged view).
- Bootstrap CSS/JS is 5.3.6 and jQuery is 3.7.1, both hosted locally. Bootstrap 5.3.9 is the current stable patch; see `QA-SECURITY-REPORT.md` for the remaining update note.
- Fonts and icon fonts still load from Google Fonts / cdnjs / jsDelivr.


## Appointment contact
There is no online booking form in this version. Patients can arrange appointments by calling, emailing, or messaging the clinic. See `SEO-LAUNCH-CHECKLIST.md` for remaining production SEO tasks.
