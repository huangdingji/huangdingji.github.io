// Add an article under markets/, add its entry to guides.json, then run:
// node scripts/build-markets.mjs
// This renders static links; JavaScript only enhances the regional navigation.
import {readFile, writeFile, access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const catalog = JSON.parse(await readFile(path.join(root, 'assets/markets-v2/guides.json'), 'utf8'));
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const ids = new Set();
for (const region of catalog.regions) {
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(region.id) || ids.has(region.id)) throw new Error('Invalid or duplicate region: ' + region.id);
  ids.add(region.id);
}
const slugs = new Set();
for (const guide of catalog.guides) {
  if (!ids.has(guide.region) || !/^[a-z]+(?:-[a-z]+)*$/.test(guide.slug) || slugs.has(guide.slug)) throw new Error('Invalid or duplicate guide: ' + guide.slug);
  slugs.add(guide.slug);
  await access(path.join(root, 'markets', guide.slug + '.html'));
}
const guidesFor = region => catalog.guides.filter(guide => guide.region === region.id);
const countText = count => count ? `${count} ${count === 1 ? 'guide' : 'guides'}` : 'Coming soon';
const arrow = '<svg aria-hidden="true" class="arrow-icon" viewBox="0 0 20 20"><path d="M3 10h13m-5-5 5 5-5 5"></path></svg>';
const links = catalog.regions.map(region => `<li><a href="#region-${region.id}" data-region-link="${region.id}">${esc(region.name)} <span>${countText(guidesFor(region).length)}</span></a></li>`).join('\n');
const tabs = catalog.regions.map(region => `<a id="region-tab-${region.id}" href="#region-${region.id}" data-region-tab="${region.id}"><span>${esc(region.name)}</span><span class="markets-region-count">${countText(guidesFor(region).length)}</span></a>`).join('\n');
const panels = catalog.regions.map(region => {
  const guides = guidesFor(region);
  const cards = guides.map((guide, index) => `<article class="markets-guide"><div class="markets-guide-top"><span aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><p>${esc(guide.focus)}</p></div><h4>${esc(guide.country)}</h4><p class="markets-guide-copy">${esc(guide.summary)}</p><div class="markets-guide-links"><a class="markets-guide-link" href="${guide.slug}.html" aria-label="Read the ${esc(guide.country)} buying guide">Read buying guide ${arrow}</a><a class="markets-quote-link" href="/contact/?product=${encodeURIComponent('Market inquiry — PTFE tape for ' + guide.country)}&amp;country=${encodeURIComponent(guide.country)}" aria-label="Start an inquiry for ${esc(guide.country)}">Inquire for this market ${arrow}</a></div></article>`).join('\n');
  return `<div class="markets-region-panel" id="region-${region.id}" data-region-panel="${region.id}" aria-labelledby="region-heading-${region.id}"><div class="markets-region-heading"><h3 id="region-heading-${region.id}">${esc(region.name)}</h3><p>${guides.length ? countText(guides.length) + ' available' : 'More destinations to follow'}</p></div>${guides.length ? `<div class="markets-guide-grid">${cards}</div>` : `<div class="markets-region-empty"><p class="markets-empty-title">New market guides are on the way.</p><p>We haven’t published guides for this region yet. Tell us your destination and product requirements to discuss your order.</p><a class="text-link" href="/contact/?product=${encodeURIComponent('Market inquiry — PTFE tape for ' + region.name)}">Discuss your market ${arrow}</a></div>`}</div>`;
}).join('\n');
const page = path.join(root, 'markets/index.html');
let html = await readFile(page, 'utf8');
for (const [name, content] of [['REGION-LINKS', links], ['REGION-DIRECTORY', `<nav class="markets-region-tabs" aria-label="Market regions">${tabs}</nav><div class="markets-region-panels">${panels}</div>`]]) {
  const start = `<!-- ${name}:START -->`, end = `<!-- ${name}:END -->`;
  if (!html.includes(start) || !html.includes(end)) throw new Error('Missing markers: ' + name);
  html = html.slice(0, html.indexOf(start) + start.length) + '\n' + content + '\n' + html.slice(html.indexOf(end));
}
await writeFile(page, html);
console.log(`Rendered ${catalog.guides.length} guides across ${catalog.regions.length} regions.`);
