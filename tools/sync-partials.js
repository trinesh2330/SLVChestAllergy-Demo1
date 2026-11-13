#!/usr/bin/env node
/**
 * sync-partials.js: keeps the shared parts of every page in ONE place.
 *
 * Usage (from the project root):   node tools/sync-partials.js
 *
 * Every page contains marker pairs such as
 *     <!-- HEADER:START --> ... <!-- HEADER:END -->
 * This script replaces whatever is between each pair with the matching file
 * from /partials (assets, header, footer, scripts). Edit the partial ONCE,
 * run this script, and all pages are updated. The output is plain HTML, so no
 * build step is needed on the server.
 *
 * Tokens inside partials:
 *   {{active:NAME}}  becomes " active" on the page NAME.html (menu highlight)
 *   {{year}}         becomes the current year
 *
 * Needs only Node.js (no npm install).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const parts = { ASSETS: 'assets', HEADER: 'header', FOOTER: 'footer', SCRIPTS: 'scripts' };
const year = String(new Date().getFullYear());

const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let changed = 0;

for (const file of pages) {
  const pageName = path.basename(file, '.html');
  const full = path.join(root, file);
  const original = fs.readFileSync(full, 'utf8');
  const eol = original.includes('\r\n') ? '\r\n' : '\n';
  let html = original.replace(/\r\n/g, '\n');
  let found = 0;

  for (const [marker, partial] of Object.entries(parts)) {
    const re = new RegExp(`([ \\t]*)<!-- ${marker}:START -->[\\s\\S]*?<!-- ${marker}:END -->`);
    if (!re.test(html)) continue;
    found++;
    const body = fs.readFileSync(path.join(root, 'partials', partial + '.html'), 'utf8')
      .replace(/\r\n/g, '\n').trimEnd()
      .replace(/\{\{active:([\w-]+)\}\}/g, (_, n) => (n === pageName ? ' active' : ''))
      .replace(/\{\{year\}\}/g, year);
    html = html.replace(re, (_, indent) =>
      `${indent}<!-- ${marker}:START -->\n    ${body}\n    <!-- ${marker}:END -->`);
  }

  if (!found) { console.log(`skip     ${file} (no markers)`); continue; }
  const out = html.replace(/\n/g, eol);
  if (out !== original) { fs.writeFileSync(full, out); changed++; console.log(`updated  ${file}`); }
  else console.log(`ok       ${file}`);
}
console.log(`\nDone. ${changed} page(s) updated.`);
