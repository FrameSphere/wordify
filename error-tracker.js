// ── Wordify Error Tracker ─────────────────────────────────────────
// Fängt JS-Fehler, unhandled Promises und console.error auf
// und sendet sie anonym ans HQ-Dashboard (/api/errors).
(function () {
  var API = 'https://webcontrol-hq-api.karol-paschek.workers.dev/api/errors';
  var SITE = 'wordify';
  var _sent = {};

  function send(error_type, message, stack) {
    var msg = String(message || '').slice(0, 500);
    var key = error_type + ':' + msg;
    if (_sent[key]) return;
    _sent[key] = 1;

    var payload = JSON.stringify({
      site_id:    SITE,
      error_type: error_type,
      message:    msg,
      stack:      stack ? String(stack).slice(0, 2000) : null,
      path:       window.location.pathname,
    });

    // fetch mit credentials:'omit' – kein CORS-Credential-Problem
    // keepalive:true damit der Request auch beim Seitenabbruch rausgeht
    fetch(API, {
      method:      'POST',
      headers:     { 'Content-Type': 'application/json' },
      body:        payload,
      credentials: 'omit',   // ← verhindert den CORS-Credential-Konflikt
      keepalive:   true,
    }).catch(function () {}); // Fehler beim Senden still ignorieren
  }

  // 1) Unbehandelte JS-Fehler (inkl. SyntaxError in externen Scripts)
  window.addEventListener('error', function (e) {
    var msg   = e.message || 'Unknown error';
    var stack = (e.error && e.error.stack)
      ? e.error.stack
      : (e.filename ? (e.filename + ':' + e.lineno + ':' + e.colno) : null);
    send('js_error', msg, stack);
  });

  // 2) Unhandled Promise Rejections
  window.addEventListener('unhandledrejection', function (e) {
    var reason = e.reason;
    var msg    = reason instanceof Error ? reason.message : String(reason);
    var stack  = reason instanceof Error ? reason.stack   : null;
    send('unhandled_promise', msg, stack);
  });

  // 3) console.error abfangen
  var _origError = console.error.bind(console);
  console.error = function () {
    _origError.apply(console, arguments);
    var args  = Array.prototype.slice.call(arguments);
    var msg   = args.map(function (a) { return a instanceof Error ? a.message : String(a); }).join(' ');
    var errObj = args.find ? args.find(function (a) { return a instanceof Error; }) : null;
    send('console_error', msg, errObj ? errObj.stack : null);
  };

  // 4) console.warn – nur wenn es nach einem echten Fehler aussieht
  var _origWarn = console.warn.bind(console);
  console.warn = function () {
    _origWarn.apply(console, arguments);
    var args = Array.prototype.slice.call(arguments);
    var msg  = args.map(function (a) { return String(a); }).join(' ');
    if (/error|fail|undefined|cannot|uncaught/i.test(msg)) {
      send('console_warn', msg, null);
    }
  };
})();
