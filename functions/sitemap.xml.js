// Dynamic Sitemap – Wordify
const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'wordify';
const BASE    = 'https://wordify.pages.dev';
const LANGS   = ['de', 'en', 'fr', 'es', 'it'];

const hreflangBlock = (base) => LANGS.map(l =>
  `    <xhtml:link rel="alternate" hreflang="${l}" href="${base}/${l}/"/>`
).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/en/"/>`;

const STATIC_URLS = `
  <url>
    <loc>${BASE}/</loc>
    <changefreq>daily</changefreq><priority>0.8</priority>
  </url>
  ${LANGS.map(l => `<url>
    <loc>${BASE}/${l}/</loc>
    <changefreq>daily</changefreq><priority>1.0</priority>
${hreflangBlock(BASE)}
  </url>`).join('')}
  <url><loc>${BASE}/blog/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/impressum.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
  <url><loc>${BASE}/datenschutz.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>`;

export async function onRequestGet() {
  let posts = [];
  try {
    const res = await fetch(`${API}/api/blog/published?site_id=${SITE_ID}`);
    if (res.ok) posts = await res.json();
  } catch(_) {}

  const groups = {};
  const solo   = [];
  for (const p of posts) {
    if (p.group_id && p.group_id.trim()) {
      if (!groups[p.group_id]) groups[p.group_id] = [];
      groups[p.group_id].push(p);
    } else {
      solo.push(p);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  function postUrl(p, siblings) {
    const hreflang = siblings.map(s =>
      `    <xhtml:link rel="alternate" hreflang="${s.lang}" href="${BASE}/blog/${s.lang}/${s.slug}"/>`
    ).join('\n');
    const enSib = siblings.find(s => s.lang === 'en');
    const xd = enSib
      ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/blog/en/${enSib.slug}"/>`
      : '';
    return `  <url>
    <loc>${BASE}/blog/${p.lang}/${p.slug}</loc>
    <lastmod>${(p.published_at || p.created_at || today).slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${hreflang}
${xd}
  </url>`;
  }

  const blogUrls = [
    ...Object.values(groups).flatMap(siblings => siblings.map(p => postUrl(p, siblings))),
    ...solo.map(p => postUrl(p, [p])),
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${STATIC_URLS}
${blogUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
