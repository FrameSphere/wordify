// Cloudflare Pages Function
// Route: /api/wordlist?lang=de
// Serves the word list for a given language as JSON array
// Used by the HQ Manager to validate Wort des Tages entries

const VALID_LANGS = ['de', 'en', 'fr', 'es', 'it'];

export async function onRequestGet({ request }) {
  const url  = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'de';

  if (!VALID_LANGS.includes(lang)) {
    return new Response(JSON.stringify({ error: 'Invalid lang' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  // Fetch the static word file from the same Pages site
  const base    = new URL(request.url).origin;
  const fileUrl = `${base}/words/words_${lang}.js`;

  try {
    const res  = await fetch(fileUrl);
    if (!res.ok) throw new Error('File not found: ' + fileUrl);
    const text = await res.text();

    // Parse: extract all 'WORD' tokens from the JS array
    const words = Array.from(text.matchAll(/'([A-ZÄÖÜ]{5})'/g), m => m[1]);

    return new Response(JSON.stringify(words), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
