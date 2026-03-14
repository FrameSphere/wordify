// ── Cloudflare Pages Function ─────────────────────────────────────
// Route: /blog/[lang]/[slug]
// Server-Side Rendered Blog-Post page – Wordify Style
// ─────────────────────────────────────────────────────────────────

const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'wordify';

const LANG_META = {
  de: { home:'/de/', blogHome:'/blog/', locale:'de_DE',
        backBlog:'\u2190 Blog', readMore:'Mehr Artikel',
        notFound:'Artikel nicht gefunden.',
        notFoundSub:'Dieser Artikel existiert nicht oder wurde entfernt.',
        play:'\uD83C\uDFAE Jetzt spielen \u2192' },
  en: { home:'/en/', blogHome:'/blog/', locale:'en_US',
        backBlog:'\u2190 Blog', readMore:'More Articles',
        notFound:'Article not found.',
        notFoundSub:'This article does not exist or has been removed.',
        play:'\uD83C\uDFAE Play now \u2192' },
  fr: { home:'/fr/', blogHome:'/blog/', locale:'fr_FR',
        backBlog:'\u2190 Blog', readMore:"Plus d'articles",
        notFound:'Article introuvable.',
        notFoundSub:"Cet article n'existe pas ou a \u00e9t\u00e9 supprim\u00e9.",
        play:'\uD83C\uDFAE Jouer \u2192' },
  es: { home:'/es/', blogHome:'/blog/', locale:'es_ES',
        backBlog:'\u2190 Blog', readMore:'M\u00e1s art\u00edculos',
        notFound:'Art\u00edculo no encontrado.',
        notFoundSub:'Este art\u00edculo no existe o ha sido eliminado.',
        play:'\uD83C\uDFAE Jugar \u2192' },
  it: { home:'/it/', blogHome:'/blog/', locale:'it_IT',
        backBlog:'\u2190 Blog', readMore:'Altri articoli',
        notFound:'Articolo non trovato.',
        notFoundSub:"Questo articolo non esiste o \u00e8 stato rimosso.",
        play:'\uD83C\uDFAE Gioca \u2192' },
};

function fmtDate(d, lang) {
  const loc = { de:'de-DE', en:'en-GB', fr:'fr-FR', es:'es-ES', it:'it-IT' };
  return new Date(d).toLocaleDateString(loc[lang]||'en-GB', {year:'numeric',month:'long',day:'numeric'});
}

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderHTML(post, lang, m) {
  const tags        = (post.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
  const dateStr     = fmtDate(post.created_at, lang);
  const description = post.excerpt || post.title;
  const canonical   = `https://wordify.pages.dev/blog/${lang}/${post.slug}`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(post.title)} \u2013 Wordify Blog</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="de" href="https://wordify.pages.dev/de/">
  <link rel="alternate" hreflang="en" href="https://wordify.pages.dev/en/">
  <link rel="alternate" hreflang="fr" href="https://wordify.pages.dev/fr/">
  <link rel="alternate" hreflang="es" href="https://wordify.pages.dev/es/">
  <link rel="alternate" hreflang="it" href="https://wordify.pages.dev/it/">

  <meta property="og:type"        content="article">
  <meta property="og:title"       content="${esc(post.title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url"         content="${canonical}">
  <meta property="og:site_name"   content="Wordify">
  <meta property="og:locale"      content="${m.locale}">
  <meta property="og:image"       content="https://wordify.pages.dev/assets/og-wordify.png">
  <meta property="article:published_time" content="${post.created_at}">
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${esc(post.title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image"       content="https://wordify.pages.dev/assets/og-wordify.png">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(post.title)},
    "description": ${JSON.stringify(description)},
    "datePublished": "${post.created_at}",
    "dateModified": "${post.created_at}",
    "author":    { "@type": "Organization", "name": "Wordify" },
    "publisher": { "@type": "Organization", "name": "Wordify", "url": "https://wordify.pages.dev" },
    "url": "${canonical}",
    "inLanguage": "${lang}",
    "image": "https://wordify.pages.dev/assets/og-wordify.png",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "${canonical}" }
  }
  <\/script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wordify", "item": "https://wordify.pages.dev/" },
      { "@type": "ListItem", "position": 2, "name": "Blog",    "item": "https://wordify.pages.dev/blog/" },
      { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(post.title)}, "item": "${canonical}" }
    ]
  }
  <\/script>

  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/style.css">

  <style>
    body { background: var(--bg-primary); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: block !important; align-items: unset !important; justify-content: unset !important; padding: 0 !important; }

    .blog-post-page { max-width: 760px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }

    .blog-nav { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 2rem; }
    .blog-nav a { color: var(--text-secondary); text-decoration: none; font-size: 14px; display: flex; align-items: center; gap: 6px; transition: color .2s; }
    .blog-nav a:hover { color: var(--accent-primary); }
    .blog-nav .logo-icon { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: #fff; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 13px; }

    .post-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
    .post-tag  { font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: 20px; background: rgba(88,101,242,.15); color: var(--accent-primary); text-decoration: none; }
    .post-tag:hover { background: rgba(88,101,242,.25); }
    .post-date { font-size: 12px; color: var(--text-secondary); }

    .post-title   { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 800; line-height: 1.25; margin: 0 0 1rem; }
    .post-excerpt { font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; border-left: 3px solid var(--accent-primary); padding-left: 1rem; margin-bottom: 2rem; }
    .post-divider { border: none; border-top: 1px solid var(--border-color); margin: 2rem 0; }

    .post-body            { font-size: 1rem; line-height: 1.8; color: var(--text-secondary); }
    .post-body h2         { font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin: 2rem 0 0.75rem; }
    .post-body h3         { font-size: 1.1rem;  font-weight: 700; color: var(--text-primary); margin: 1.5rem 0 0.5rem; }
    .post-body p          { margin-bottom: 1rem; }
    .post-body ul,
    .post-body ol         { padding-left: 1.4rem; margin-bottom: 1rem; }
    .post-body li         { margin-bottom: 0.4rem; }
    .post-body strong     { color: var(--text-primary); }
    .post-body a          { color: var(--accent-primary); }
    .post-body hr         { border: none; border-top: 1px solid var(--border-color); margin: 2rem 0; }

    .cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 2.5rem; }
    .back-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 10px 20px; border-radius: 10px;
      background: rgba(88,101,242,.1); color: var(--accent-primary);
      text-decoration: none; font-weight: 600; font-size: 0.9rem;
      border: 1px solid rgba(88,101,242,.25); transition: background .2s;
    }
    .back-btn:hover { background: rgba(88,101,242,.2); }
    .play-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 10px 20px; border-radius: 10px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: #fff; text-decoration: none; font-weight: 700; font-size: 0.9rem;
      transition: opacity .2s;
    }
    .play-btn:hover { opacity: .85; }

    footer { text-align: center; padding: 28px 24px; color: var(--text-secondary); font-size: 13px; border-top: 1px solid var(--border-color); margin-top: 2rem; }
    footer a { color: var(--text-secondary); text-decoration: none; }
    footer a:hover { color: var(--accent-primary); }
    .sep { margin: 0 8px; }
  </style>
</head>
<body>

  <article class="blog-post-page" itemscope itemtype="https://schema.org/Article">

    <nav class="blog-nav" aria-label="Breadcrumb">
      <a href="${m.home}"><span class="logo-icon">W</span> Wordify</a>
      <a href="${m.blogHome}">${m.backBlog}</a>
    </nav>

    <header>
      <div class="post-meta">
        ${tags.map(t => `<a href="${m.blogHome}?tag=${encodeURIComponent(t)}" class="post-tag">${esc(t)}</a>`).join('')}
        <time class="post-date" itemprop="datePublished" datetime="${post.created_at}">${dateStr}</time>
      </div>
      <h1 class="post-title" itemprop="headline">${esc(post.title)}</h1>
      ${post.excerpt ? `<p class="post-excerpt" itemprop="description">${esc(post.excerpt)}</p>` : ''}
    </header>

    <hr class="post-divider">

    <div class="post-body" itemprop="articleBody">
      ${post.content || `<p>${esc(post.excerpt || '')}</p>`}
    </div>

    <hr class="post-divider">

    <div class="cta-row">
      <a href="${m.blogHome}" class="back-btn">\u2190 ${m.readMore}</a>
      <a href="${m.home}" class="play-btn">${m.play}</a>
    </div>

  </article>

  <footer>
    <a href="${m.home}">Wordify</a>
    <span class="sep">\u00b7</span>
    <a href="/blog/">Blog</a>
    <span class="sep">\u00b7</span>
    <a href="/impressum.html">Impressum</a>
    <span class="sep">\u00b7</span>
    <a href="/datenschutz.html">Datenschutz</a>
    <p style="margin-top:10px">\u00a9 2026 Wordify \u00b7 powered by <a href="https://frame-sphere.vercel.app">FrameSphere</a></p>
  </footer>

</body>
</html>`;
}

function render404(lang, m) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 \u2013 Wordify Blog</title>
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/style.css">
  <style>
    .not-found { max-width: 560px; margin: 6rem auto; padding: 2rem; text-align: center; }
    .not-found h1 { font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; }
    .not-found p  { color: var(--text-secondary); margin-bottom: 2rem; }
    .not-found a  { display: inline-block; padding: 10px 24px; border-radius: 10px;
      background: rgba(88,101,242,.1); color: var(--accent-primary);
      text-decoration: none; font-weight: 600; border: 1px solid rgba(88,101,242,.25); }
  </style>
</head>
<body>
  <div class="not-found">
    <h1>404 \u2013 ${m.notFound}</h1>
    <p>${m.notFoundSub}</p>
    <a href="${m.blogHome}">\u2190 ${m.readMore}</a>
  </div>
</body>
</html>`;
}

export async function onRequestGet({ params }) {
  const { lang, slug } = params;
  const VALID = ['de', 'en', 'fr', 'es', 'it'];
  if (!VALID.includes(lang)) return new Response('Not Found', { status: 404 });

  const m = LANG_META[lang];

  let post;
  try {
    const res = await fetch(
      `${API}/api/blog/post?site_id=${SITE_ID}&lang=${lang}&slug=${encodeURIComponent(slug)}`
    );
    if (res.status === 404) {
      return new Response(render404(lang, m), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    if (!res.ok) throw new Error('API ' + res.status);
    post = await res.json();
  } catch (e) {
    return new Response(render404(lang, m), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new Response(renderHTML(post, lang, m), {
    headers: {
      'Content-Type':  'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=1800',
    },
  });
}
