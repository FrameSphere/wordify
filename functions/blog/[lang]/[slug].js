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

const FB_API = 'https://webcontrol-hq-api.karol-paschek.workers.dev/api/blog/feedback';

function feedbackWidget(postId, postSlug, lang, siteId) {
  const labels = {
    question: { de:'War dieser Artikel hilfreich?', en:'Was this article helpful?', fr:'Cet article \u00e9tait-il utile\u00a0?', es:'\u00bfFue \u00fatil este art\u00edculo?', it:'Questo articolo ti \u00e8 stato utile?' },
    yes:      { de:'Ja', en:'Yes', fr:'Oui', es:'S\u00ed', it:'S\u00ec' },
    no:       { de:'Nein', en:'No', fr:'Non', es:'No', it:'No' },
    thanks:   { de:'\uD83D\uDE4F Danke f\u00fcr dein Feedback!', en:'\uD83D\uDE4F Thanks for your feedback!', fr:'\uD83D\uDE4F Merci pour ton retour\u00a0!', es:'\uD83D\uDE4F \u00a1Gracias por tu opini\u00f3n!', it:'\uD83D\uDE4F Grazie per il tuo feedback!' },
  };
  const q = (labels.question[lang] || labels.question.en);
  const y = (labels.yes[lang]      || labels.yes.en);
  const n = (labels.no[lang]       || labels.no.en);
  const t = (labels.thanks[lang]   || labels.thanks.en);
  const key = `fb_${postId}_${lang}`;
  return `
<div id="feedback-widget" style="margin-top:2rem;padding:1.25rem 1.5rem;border:1px solid rgba(88,101,242,.2);border-radius:12px;background:rgba(88,101,242,.04);display:none;text-align:center">
  <p id="fb-question" style="font-size:.88rem;color:var(--text-secondary);margin:0 0 .9rem">${q}</p>
  <div id="fb-buttons" style="display:flex;gap:.75rem;justify-content:center">
    <button onclick="sendFeedback(true)" style="padding:8px 24px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:transparent;color:var(--text-secondary);cursor:pointer;font-size:.88rem;transition:all .2s;font-family:inherit" onmouseover="this.style.background='rgba(34,197,94,.12)';this.style.borderColor='rgba(34,197,94,.3)';this.style.color='#4ade80'" onmouseout="this.style.background='transparent';this.style.borderColor='rgba(255,255,255,.12)';this.style.color='var(--text-secondary)'">\uD83D\uDC4D ${y}</button>
    <button onclick="sendFeedback(false)" style="padding:8px 24px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:transparent;color:var(--text-secondary);cursor:pointer;font-size:.88rem;transition:all .2s;font-family:inherit" onmouseover="this.style.background='rgba(239,68,68,.10)';this.style.borderColor='rgba(239,68,68,.25)';this.style.color='#f87171'" onmouseout="this.style.background='transparent';this.style.borderColor='rgba(255,255,255,.12)';this.style.color='var(--text-secondary)'">\uD83D\uDC4E ${n}</button>
  </div>
  <p id="fb-thanks" style="display:none;font-size:.88rem;color:#4ade80;margin:0">${t}</p>
</div>
<script>
(function(){
  var KEY='${key}';
  if(localStorage.getItem(KEY))return;
  var body=document.querySelector('.post-body');
  if(!body)return;
  var shown=false;
  function check(){
    if(shown)return;
    var r=body.getBoundingClientRect();
    if((window.innerHeight-r.top)/r.height>=0.6){shown=true;document.getElementById('feedback-widget').style.display='block';}
  }
  window.addEventListener('scroll',check,{passive:true});
  check();
})();
function sendFeedback(helpful){
  var KEY='${key}';
  if(localStorage.getItem(KEY))return;
  localStorage.setItem(KEY,'1');
  document.getElementById('fb-buttons').style.display='none';
  document.getElementById('fb-question').style.display='none';
  document.getElementById('fb-thanks').style.display='block';
  fetch('${FB_API}',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({site_id:'${siteId}',post_id:${postId},post_slug:'${postSlug}',lang:'${lang}',helpful:helpful?1:0})}).catch(function(){});
}
<\/script>`;
}

function renderHTML(post, lang, m, siblings) {
  const tags        = (post.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
  const dateStr     = fmtDate(post.published_at || post.created_at, lang);
  const description = post.excerpt || post.title;
  const canonical   = `https://wordify.pages.dev/blog/${lang}/${post.slug}`;
  const BASE = 'https://wordify.pages.dev';
  const hreflangs = siblings.map(s =>
    `  <link rel="alternate" hreflang="${s.lang}" href="${BASE}/blog/${s.lang}/${s.slug}">`
  ).join('\n');
  const enVersion = siblings.find(s => s.lang === 'en');
  const xDefault = enVersion
    ? `  <link rel="alternate" hreflang="x-default" href="${BASE}/blog/en/${enVersion.slug}">`
    : `  <link rel="alternate" hreflang="x-default" href="${BASE}/blog/">`;

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
  <meta property="article:published_time" content="${post.published_at || post.created_at}">
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${esc(post.title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image"       content="https://wordify.pages.dev/assets/og-wordify.png">
${hreflangs}
${xDefault}

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(post.title)},
    "description": ${JSON.stringify(description)},
    "datePublished": "${post.published_at || post.created_at}",
    "dateModified": "${post.published_at || post.created_at}",
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
  <script>(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();<\/script>

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
      <div style="display:flex;align-items:center;gap:10px">
        <button onclick="(function(){var n=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);localStorage.setItem('theme',n);})()" style="background:none;border:1px solid var(--border-color);color:var(--text-secondary);padding:4px 9px;border-radius:6px;cursor:pointer;font-size:16px;line-height:1" title="Theme">🌓</button>
        <a href="${m.blogHome}">${m.backBlog}</a>
      </div>
    </nav>

    <header>
      <div class="post-meta">
        ${tags.map(t => `<a href="${m.blogHome}?tag=${encodeURIComponent(t)}" class="post-tag">${esc(t)}</a>`).join('')}
        <time class="post-date" itemprop="datePublished" datetime="${post.published_at || post.created_at}">${dateStr}</time>
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

    ${feedbackWidget(post.id, post.slug, lang, SITE_ID)}

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

  let siblings = [{ lang, slug }];
  if (post.group_id) {
    try {
      const sr = await fetch(`${API}/api/blog/group?site_id=${SITE_ID}&group_id=${encodeURIComponent(post.group_id)}`);
      if (sr.ok) siblings = await sr.json();
    } catch(_) {}
  }

  return new Response(renderHTML(post, lang, m, siblings), {
    headers: {
      'Content-Type':  'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=1800',
    },
  });
}
