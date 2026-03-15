// Dynamic Sitemap – Wordify
const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'wordify';
const BASE    = 'https://wordify.pages.dev';
const LANGS   = ['de', 'en', 'fr', 'es', 'it'];

function altLinks(map) {
  const enHref = map['en'] || Object.values(map)[0];
  return Object.entries(map).map(([l, href]) =>
    `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`
  ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}"/>`;
}

function staticUrl(loc, lastmod, freq, prio, alts = '') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
${alts}
  </url>`;
}

const homeLangs = Object.fromEntries(LANGS.map(l => [l, `${BASE}/${l}/`]));

const STATIC_ENTRIES = [
  staticUrl(`${BASE}/`,    '2026-02-15', 'daily', '0.8'),
  ...LANGS.map(l => staticUrl(`${BASE}/${l}/`, '2026-02-15', 'daily', '1.0', altLinks(homeLangs))),

  // Blog listing
  staticUrl(`${BASE}/blog/`, '2026-03-15', 'weekly', '0.8'),

  // Wort des Tages
  staticUrl(`${BASE}/de/wort-des-tages.html`,    '2026-02-25', 'daily', '0.7', altLinks({ de:`${BASE}/de/wort-des-tages.html`, en:`${BASE}/en/word-of-the-day.html`, es:`${BASE}/es/palabra-del-dia.html`, fr:`${BASE}/fr/mot-du-jouer.html`, it:`${BASE}/it/parola-del-giorno.html` })),
  staticUrl(`${BASE}/en/word-of-the-day.html`,   '2026-02-25', 'daily', '0.7', altLinks({ de:`${BASE}/de/wort-des-tages.html`, en:`${BASE}/en/word-of-the-day.html`, es:`${BASE}/es/palabra-del-dia.html`, fr:`${BASE}/fr/mot-du-jouer.html`, it:`${BASE}/it/parola-del-giorno.html` })),
  staticUrl(`${BASE}/es/palabra-del-dia.html`,   '2026-02-25', 'daily', '0.7', altLinks({ de:`${BASE}/de/wort-des-tages.html`, en:`${BASE}/en/word-of-the-day.html`, es:`${BASE}/es/palabra-del-dia.html`, fr:`${BASE}/fr/mot-du-jouer.html`, it:`${BASE}/it/parola-del-giorno.html` })),
  staticUrl(`${BASE}/fr/mot-du-jouer.html`,      '2026-02-25', 'daily', '0.7', altLinks({ de:`${BASE}/de/wort-des-tages.html`, en:`${BASE}/en/word-of-the-day.html`, es:`${BASE}/es/palabra-del-dia.html`, fr:`${BASE}/fr/mot-du-jouer.html`, it:`${BASE}/it/parola-del-giorno.html` })),
  staticUrl(`${BASE}/it/parola-del-giorno.html`, '2026-02-25', 'daily', '0.7', altLinks({ de:`${BASE}/de/wort-des-tages.html`, en:`${BASE}/en/word-of-the-day.html`, es:`${BASE}/es/palabra-del-dia.html`, fr:`${BASE}/fr/mot-du-jouer.html`, it:`${BASE}/it/parola-del-giorno.html` })),

  // FAQ
  staticUrl(`${BASE}/de/haeufige-fragen.html`,      '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/haeufige-fragen.html`, en:`${BASE}/en/faq.html`, es:`${BASE}/es/preguntas-frecuentes.html`, fr:`${BASE}/fr/questions-frequentes.html`, it:`${BASE}/it/domande-frequenti.html` })),
  staticUrl(`${BASE}/en/faq.html`,                  '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/haeufige-fragen.html`, en:`${BASE}/en/faq.html`, es:`${BASE}/es/preguntas-frecuentes.html`, fr:`${BASE}/fr/questions-frequentes.html`, it:`${BASE}/it/domande-frequenti.html` })),
  staticUrl(`${BASE}/es/preguntas-frecuentes.html`, '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/haeufige-fragen.html`, en:`${BASE}/en/faq.html`, es:`${BASE}/es/preguntas-frecuentes.html`, fr:`${BASE}/fr/questions-frequentes.html`, it:`${BASE}/it/domande-frequenti.html` })),
  staticUrl(`${BASE}/fr/questions-frequentes.html`, '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/haeufige-fragen.html`, en:`${BASE}/en/faq.html`, es:`${BASE}/es/preguntas-frecuentes.html`, fr:`${BASE}/fr/questions-frequentes.html`, it:`${BASE}/it/domande-frequenti.html` })),
  staticUrl(`${BASE}/it/domande-frequenti.html`,    '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/haeufige-fragen.html`, en:`${BASE}/en/faq.html`, es:`${BASE}/es/preguntas-frecuentes.html`, fr:`${BASE}/fr/questions-frequentes.html`, it:`${BASE}/it/domande-frequenti.html` })),

  // Tipps und Strategien
  staticUrl(`${BASE}/de/tipps-und-strategien.html`,    '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/tipps-und-strategien.html`, en:`${BASE}/en/tips-and-strategies.html`, es:`${BASE}/es/consejos-y-estrategias.html`, fr:`${BASE}/fr/conseils-et-strategies.html`, it:`${BASE}/it/consigli-e-strategie.html` })),
  staticUrl(`${BASE}/en/tips-and-strategies.html`,     '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/tipps-und-strategien.html`, en:`${BASE}/en/tips-and-strategies.html`, es:`${BASE}/es/consejos-y-estrategias.html`, fr:`${BASE}/fr/conseils-et-strategies.html`, it:`${BASE}/it/consigli-e-strategie.html` })),
  staticUrl(`${BASE}/es/consejos-y-estrategias.html`,  '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/tipps-und-strategien.html`, en:`${BASE}/en/tips-and-strategies.html`, es:`${BASE}/es/consejos-y-estrategias.html`, fr:`${BASE}/fr/conseils-et-strategies.html`, it:`${BASE}/it/consigli-e-strategie.html` })),
  staticUrl(`${BASE}/fr/conseils-et-strategies.html`,  '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/tipps-und-strategien.html`, en:`${BASE}/en/tips-and-strategies.html`, es:`${BASE}/es/consejos-y-estrategias.html`, fr:`${BASE}/fr/conseils-et-strategies.html`, it:`${BASE}/it/consigli-e-strategie.html` })),
  staticUrl(`${BASE}/it/consigli-e-strategie.html`,    '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/tipps-und-strategien.html`, en:`${BASE}/en/tips-and-strategies.html`, es:`${BASE}/es/consejos-y-estrategias.html`, fr:`${BASE}/fr/conseils-et-strategies.html`, it:`${BASE}/it/consigli-e-strategie.html` })),

  // Warum Wordify spielen
  staticUrl(`${BASE}/de/warum-wordify-spielen.html`,   '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/warum-wordify-spielen.html`, en:`${BASE}/en/why-play-wordify.html`, es:`${BASE}/es/por-que-jugar-wordify.html`, fr:`${BASE}/fr/pourquoi-jouer-wordify.html`, it:`${BASE}/it/perche-giocare-wordify.html` })),
  staticUrl(`${BASE}/en/why-play-wordify.html`,        '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/warum-wordify-spielen.html`, en:`${BASE}/en/why-play-wordify.html`, es:`${BASE}/es/por-que-jugar-wordify.html`, fr:`${BASE}/fr/pourquoi-jouer-wordify.html`, it:`${BASE}/it/perche-giocare-wordify.html` })),
  staticUrl(`${BASE}/es/por-que-jugar-wordify.html`,   '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/warum-wordify-spielen.html`, en:`${BASE}/en/why-play-wordify.html`, es:`${BASE}/es/por-que-jugar-wordify.html`, fr:`${BASE}/fr/pourquoi-jouer-wordify.html`, it:`${BASE}/it/perche-giocare-wordify.html` })),
  staticUrl(`${BASE}/fr/pourquoi-jouer-wordify.html`,  '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/warum-wordify-spielen.html`, en:`${BASE}/en/why-play-wordify.html`, es:`${BASE}/es/por-que-jugar-wordify.html`, fr:`${BASE}/fr/pourquoi-jouer-wordify.html`, it:`${BASE}/it/perche-giocare-wordify.html` })),
  staticUrl(`${BASE}/it/perche-giocare-wordify.html`,  '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/warum-wordify-spielen.html`, en:`${BASE}/en/why-play-wordify.html`, es:`${BASE}/es/por-que-jugar-wordify.html`, fr:`${BASE}/fr/pourquoi-jouer-wordify.html`, it:`${BASE}/it/perche-giocare-wordify.html` })),

  // Was ist Wordify
  staticUrl(`${BASE}/de/was-ist-wordify.html`,           '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/was-ist-wordify.html`, en:`${BASE}/en/what-is-wordify.html`, es:`${BASE}/es/que-es-wordify.html`, fr:`${BASE}/fr/qu-est-ce-que-wordify.html`, it:`${BASE}/it/cos-e-wordify.html` })),
  staticUrl(`${BASE}/en/what-is-wordify.html`,           '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/was-ist-wordify.html`, en:`${BASE}/en/what-is-wordify.html`, es:`${BASE}/es/que-es-wordify.html`, fr:`${BASE}/fr/qu-est-ce-que-wordify.html`, it:`${BASE}/it/cos-e-wordify.html` })),
  staticUrl(`${BASE}/es/que-es-wordify.html`,            '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/was-ist-wordify.html`, en:`${BASE}/en/what-is-wordify.html`, es:`${BASE}/es/que-es-wordify.html`, fr:`${BASE}/fr/qu-est-ce-que-wordify.html`, it:`${BASE}/it/cos-e-wordify.html` })),
  staticUrl(`${BASE}/fr/qu-est-ce-que-wordify.html`,     '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/was-ist-wordify.html`, en:`${BASE}/en/what-is-wordify.html`, es:`${BASE}/es/que-es-wordify.html`, fr:`${BASE}/fr/qu-est-ce-que-wordify.html`, it:`${BASE}/it/cos-e-wordify.html` })),
  staticUrl(`${BASE}/it/cos-e-wordify.html`,             '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/was-ist-wordify.html`, en:`${BASE}/en/what-is-wordify.html`, es:`${BASE}/es/que-es-wordify.html`, fr:`${BASE}/fr/qu-est-ce-que-wordify.html`, it:`${BASE}/it/cos-e-wordify.html` })),

  // Wie spiele ich Wordify
  staticUrl(`${BASE}/de/wie-spiele-ich-wordify.html`,   '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wie-spiele-ich-wordify.html`, en:`${BASE}/en/how-to-play-wordify.html`, es:`${BASE}/es/como-jugar-wordify.html`, fr:`${BASE}/fr/comment-jouer-wordify.html`, it:`${BASE}/it/come-giocare-wordify.html` })),
  staticUrl(`${BASE}/en/how-to-play-wordify.html`,      '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wie-spiele-ich-wordify.html`, en:`${BASE}/en/how-to-play-wordify.html`, es:`${BASE}/es/como-jugar-wordify.html`, fr:`${BASE}/fr/comment-jouer-wordify.html`, it:`${BASE}/it/come-giocare-wordify.html` })),
  staticUrl(`${BASE}/es/como-jugar-wordify.html`,       '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wie-spiele-ich-wordify.html`, en:`${BASE}/en/how-to-play-wordify.html`, es:`${BASE}/es/como-jugar-wordify.html`, fr:`${BASE}/fr/comment-jouer-wordify.html`, it:`${BASE}/it/come-giocare-wordify.html` })),
  staticUrl(`${BASE}/fr/comment-jouer-wordify.html`,    '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wie-spiele-ich-wordify.html`, en:`${BASE}/en/how-to-play-wordify.html`, es:`${BASE}/es/como-jugar-wordify.html`, fr:`${BASE}/fr/comment-jouer-wordify.html`, it:`${BASE}/it/come-giocare-wordify.html` })),
  staticUrl(`${BASE}/it/come-giocare-wordify.html`,     '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wie-spiele-ich-wordify.html`, en:`${BASE}/en/how-to-play-wordify.html`, es:`${BASE}/es/como-jugar-wordify.html`, fr:`${BASE}/fr/comment-jouer-wordify.html`, it:`${BASE}/it/come-giocare-wordify.html` })),

  // Wordify 5 Sprachen
  staticUrl(`${BASE}/de/wordify-5-sprachen.html`,   '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wordify-5-sprachen.html`, en:`${BASE}/en/wordify-5-languages.html`, es:`${BASE}/es/wordify-5-idiomas.html`, fr:`${BASE}/fr/wordify-5-langues.html`, it:`${BASE}/it/wordify-5-lingue.html` })),
  staticUrl(`${BASE}/en/wordify-5-languages.html`,  '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wordify-5-sprachen.html`, en:`${BASE}/en/wordify-5-languages.html`, es:`${BASE}/es/wordify-5-idiomas.html`, fr:`${BASE}/fr/wordify-5-langues.html`, it:`${BASE}/it/wordify-5-lingue.html` })),
  staticUrl(`${BASE}/es/wordify-5-idiomas.html`,    '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wordify-5-sprachen.html`, en:`${BASE}/en/wordify-5-languages.html`, es:`${BASE}/es/wordify-5-idiomas.html`, fr:`${BASE}/fr/wordify-5-langues.html`, it:`${BASE}/it/wordify-5-lingue.html` })),
  staticUrl(`${BASE}/fr/wordify-5-langues.html`,    '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wordify-5-sprachen.html`, en:`${BASE}/en/wordify-5-languages.html`, es:`${BASE}/es/wordify-5-idiomas.html`, fr:`${BASE}/fr/wordify-5-langues.html`, it:`${BASE}/it/wordify-5-lingue.html` })),
  staticUrl(`${BASE}/it/wordify-5-lingue.html`,     '2026-02-25', 'monthly', '0.7', altLinks({ de:`${BASE}/de/wordify-5-sprachen.html`, en:`${BASE}/en/wordify-5-languages.html`, es:`${BASE}/es/wordify-5-idiomas.html`, fr:`${BASE}/fr/wordify-5-langues.html`, it:`${BASE}/it/wordify-5-lingue.html` })),

  // Legal
  staticUrl(`${BASE}/impressum.html`,   '2026-02-15', 'yearly', '0.2'),
  staticUrl(`${BASE}/datenschutz.html`, '2026-02-15', 'yearly', '0.2'),
].join('\n');

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
${STATIC_ENTRIES}
${blogUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
