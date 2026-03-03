// ── Wordify Error Tracker ─────────────────────────────────────────
// Fängt alle JS-Fehler, unhandled Promises und console.error auf
// und sendet sie anonym ans HQ-Dashboard (/api/errors → errors tab).
(function () {
  const API = 'https://webcontrol-hq-api.karol-paschek.workers.dev/api/errors';
  const SITE = 'wordify';

  // Einfaches Deduping: gleichen Fehler nicht mehrfach senden
  const _sent = new Set();

  function send(error_type, message, stack) {
    const key = error_type + ':' + message;
    if (_sent.has(key)) return;
    _sent.add(key);

    const payload = {
      site_id:     SITE,
      error_type:  error_type,
      message:     String(message).slice(0, 500),
      stack:       stack ? String(stack).slice(0, 2000) : null,
      path:        window.location.pathname,
    };

    // Wir nutzen sendBeacon wenn vorhanden (feuert auch beim Seitenabbruch),
    // sonst fetch mit keepalive.
    const data = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' });
      navigator.sendBeacon(API, blob);
    } else {
      fetch(API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    data,
        keepalive: true,
      }).catch(() => {}); // Fehler beim Senden ignorieren
    }
  }

  // ── 1) Unbehandelte JS-Fehler ─────────────────────────────────
  window.addEventListener('error', function (e) {
    const msg   = e.message || 'Unknown error';
    const stack = e.error && e.error.stack ? e.error.stack : (e.filename + ':' + e.lineno + ':' + e.colno);
    send('js_error', msg, stack);
  });

  // ── 2) Unhandled Promise Rejections ───────────────────────────
  window.addEventListener('unhandledrejection', function (e) {
    const reason = e.reason;
    const msg    = reason instanceof Error ? reason.message : String(reason);
    const stack  = reason instanceof Error ? reason.stack   : null;
    send('unhandled_promise', msg, stack);
  });

  // ── 3) console.error abfangen ─────────────────────────────────
  const _origError = console.error.bind(console);
  console.error = function (...args) {
    _origError(...args); // Original-Ausgabe bleibt erhalten
    const msg   = args.map(a => (a instanceof Error ? a.message : String(a))).join(' ');
    const stack = args.find(a => a instanceof Error)?.stack || null;
    send('console_error', msg, stack);
  };

  // ── 4) console.warn abfangen (optional, als warning-type) ─────
  const _origWarn = console.warn.bind(console);
  console.warn = function (...args) {
    _origWarn(...args);
    const msg = args.map(a => String(a)).join(' ');
    // Nur senden wenn es nach einem echten Problem aussieht
    if (/error|fail|undefined|null|cannot|uncaught/i.test(msg)) {
      send('console_warn', msg, null);
    }
  };
})();
