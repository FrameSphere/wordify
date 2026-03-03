/**
 * wordify-tracker.js
 * – Sendet Konsolen-Errors automatisch ans Dashboard
 * – Stellt submitContact() für das Kontaktformular bereit
 * Wird auf allen Wordify-Seiten geladen.
 */
(function () {
    'use strict';

    const API = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
    const SITE = 'wordify';
    const CONTACT_COOLDOWN_MS = 30 * 60 * 1000; // 30 Minuten

    // ── Sprache ermitteln ──────────────────────────────────────────
    function getLang() {
        const ls = localStorage.getItem('wordifyLanguage');
        if (ls) return ls;
        const seg = window.location.pathname.split('/').filter(Boolean)[0];
        return ['de','en','es','fr','it'].includes(seg) ? seg : 'de';
    }

    // ── Fehler-Duplikat-Filter ─────────────────────────────────────
    const _sent = new Set();
    function isDupe(msg) {
        if (_sent.has(msg)) return true;
        _sent.add(msg);
        setTimeout(() => _sent.delete(msg), 60000);
        return false;
    }

    // ── Fehler ans Dashboard senden ────────────────────────────────
    function sendError(type, message, stack) {
        const key = type + ':' + message.slice(0, 80);
        if (isDupe(key)) return;
        // Fire-and-forget, kein await
        fetch(API + '/api/errors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                site_id:    SITE,
                error_type: type,
                message:    String(message).slice(0, 500),
                stack:      String(stack  || '').slice(0, 1000),
                path:       window.location.pathname,
            }),
        }).catch(() => {}); // Fehler beim Senden ignorieren
    }

    // ── window.onerror ──────────────────────────────────────────────
    const _origOnerror = window.onerror;
    window.onerror = function (msg, src, line, col, err) {
        const stack = err?.stack || (src + ':' + line + ':' + col);
        sendError('JS_ERROR', String(msg), stack);
        if (typeof _origOnerror === 'function') _origOnerror.apply(this, arguments);
        return false; // nicht unterdrücken
    };

    // ── unhandledrejection (Promise-Fehler) ─────────────────────────
    window.addEventListener('unhandledrejection', function (e) {
        const msg   = e.reason?.message || String(e.reason) || 'Unhandled Promise Rejection';
        const stack = e.reason?.stack   || '';
        sendError('PROMISE_ERROR', msg, stack);
    });

    // ── console.error weiterleiten ──────────────────────────────────
    const _origConsoleError = console.error;
    console.error = function (...args) {
        _origConsoleError.apply(console, args);
        const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
        sendError('CONSOLE_ERROR', msg.slice(0, 500), '');
    };

    // ══════════════════════════════════════════════════════════════
    // KONTAKTFORMULAR
    // ══════════════════════════════════════════════════════════════

    const CONTACT_STRINGS = {
        de: {
            name:        'Dein Name (optional)',
            msg:         'Deine Nachricht…',
            send:        'Senden',
            sending:     'Wird gesendet…',
            sent:        '✓ Nachricht gesendet! Danke.',
            errShort:    'Bitte mindestens 5 Zeichen schreiben.',
            errLong:     'Nachricht zu lang (max. 1000 Zeichen).',
            errCooldown: 'Bitte warte 30 Minuten zwischen Nachrichten.',
            errNet:      'Fehler beim Senden – bitte versuche es später.',
        },
        en: {
            name:        'Your name (optional)',
            msg:         'Your message…',
            send:        'Send',
            sending:     'Sending…',
            sent:        '✓ Message sent! Thank you.',
            errShort:    'Please write at least 5 characters.',
            errLong:     'Message too long (max. 1000 characters).',
            errCooldown: 'Please wait 30 minutes between messages.',
            errNet:      'Failed to send – please try again later.',
        },
        es: {
            name:        'Tu nombre (opcional)',
            msg:         'Tu mensaje…',
            send:        'Enviar',
            sending:     'Enviando…',
            sent:        '✓ ¡Mensaje enviado! Gracias.',
            errShort:    'Por favor escribe al menos 5 caracteres.',
            errLong:     'Mensaje demasiado largo (máx. 1000 caracteres).',
            errCooldown: 'Por favor espera 30 minutos entre mensajes.',
            errNet:      'Error al enviar – inténtalo más tarde.',
        },
        fr: {
            name:        'Votre nom (optionnel)',
            msg:         'Votre message…',
            send:        'Envoyer',
            sending:     'Envoi en cours…',
            sent:        '✓ Message envoyé ! Merci.',
            errShort:    'Veuillez écrire au moins 5 caractères.',
            errLong:     'Message trop long (max. 1000 caractères).',
            errCooldown: 'Veuillez attendre 30 minutes entre les messages.',
            errNet:      "Échec de l'envoi – réessayez plus tard.",
        },
        it: {
            name:        'Il tuo nome (facoltativo)',
            msg:         'Il tuo messaggio…',
            send:        'Invia',
            sending:     'Invio in corso…',
            sent:        '✓ Messaggio inviato! Grazie.',
            errShort:    'Scrivi almeno 5 caratteri.',
            errLong:     'Messaggio troppo lungo (max. 1000 caratteri).',
            errCooldown: 'Attendi 30 minuti tra un messaggio e l\'altro.',
            errNet:      'Errore di invio – riprova più tardi.',
        },
    };

    // ── Cooldown prüfen ────────────────────────────────────────────
    function contactOnCooldown() {
        const last = parseInt(localStorage.getItem('wordify_contact_ts') || '0');
        return Date.now() - last < CONTACT_COOLDOWN_MS;
    }

    function contactCooldownRemaining() {
        const last = parseInt(localStorage.getItem('wordify_contact_ts') || '0');
        const rem  = CONTACT_COOLDOWN_MS - (Date.now() - last);
        const min  = Math.ceil(rem / 60000);
        return min;
    }

    // ── Formular rendern ───────────────────────────────────────────
    // Wird von impressum.html aufgerufen mit einer Container-ID
    window.wordifyRenderContact = function (containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const lang = getLang();
        const s    = CONTACT_STRINGS[lang] || CONTACT_STRINGS.de;

        container.innerHTML = `
            <div id="wfy-contact-form" style="margin-top:8px">
                <input
                    id="wfy-contact-name"
                    type="text"
                    placeholder="${s.name}"
                    maxlength="60"
                    style="
                        width:100%;box-sizing:border-box;
                        background:var(--bg-primary,#1a1a2e);
                        border:1px solid var(--border-color,#333);
                        border-radius:10px;padding:10px 14px;
                        color:var(--text-primary,#fff);
                        font-size:14px;margin-bottom:10px;outline:none;
                    "
                >
                <textarea
                    id="wfy-contact-msg"
                    placeholder="${s.msg}"
                    maxlength="1000"
                    rows="5"
                    style="
                        width:100%;box-sizing:border-box;resize:vertical;
                        background:var(--bg-primary,#1a1a2e);
                        border:1px solid var(--border-color,#333);
                        border-radius:10px;padding:10px 14px;
                        color:var(--text-primary,#fff);
                        font-size:14px;margin-bottom:10px;outline:none;
                    "
                ></textarea>
                <div id="wfy-contact-counter" style="font-size:11px;color:var(--text-secondary,#888);margin-bottom:8px;text-align:right">0 / 1000</div>
                <button
                    id="wfy-contact-btn"
                    onclick="wordifySubmitContact()"
                    style="
                        padding:10px 24px;border-radius:12px;
                        background:var(--accent-primary,#6c63ff);
                        color:#fff;border:none;cursor:pointer;
                        font-size:14px;font-weight:700;
                        transition:opacity 0.15s;
                    "
                >${s.send}</button>
                <div id="wfy-contact-status" style="margin-top:10px;font-size:13px;min-height:20px"></div>
            </div>
        `;

        // Zeichenzähler
        const msgEl = document.getElementById('wfy-contact-msg');
        const ctrEl = document.getElementById('wfy-contact-counter');
        if (msgEl && ctrEl) {
            msgEl.addEventListener('input', () => {
                ctrEl.textContent = msgEl.value.length + ' / 1000';
            });
        }
    };

    // ── Formular absenden ──────────────────────────────────────────
    window.wordifySubmitContact = async function () {
        const lang   = getLang();
        const s      = CONTACT_STRINGS[lang] || CONTACT_STRINGS.de;
        const nameEl = document.getElementById('wfy-contact-name');
        const msgEl  = document.getElementById('wfy-contact-msg');
        const btnEl  = document.getElementById('wfy-contact-btn');
        const statEl = document.getElementById('wfy-contact-status');

        const name = (nameEl?.value || '').trim();
        const msg  = (msgEl?.value  || '').trim();

        // Validierung
        if (msg.length < 5)    { statEl.textContent = s.errShort;    statEl.style.color = '#ef4444'; return; }
        if (msg.length > 1000) { statEl.textContent = s.errLong;     statEl.style.color = '#ef4444'; return; }
        if (contactOnCooldown()) {
            const min = contactCooldownRemaining();
            statEl.textContent = s.errCooldown.replace('30', min);
            statEl.style.color = '#f59e0b';
            return;
        }

        btnEl.disabled    = true;
        btnEl.textContent = s.sending;
        statEl.textContent = '';

        try {
            const resp = await fetch(API + '/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message: msg, language: lang }),
            });
            if (resp.ok) {
                localStorage.setItem('wordify_contact_ts', Date.now().toString());
                statEl.textContent  = s.sent;
                statEl.style.color  = '#22c55e';
                if (nameEl) nameEl.value = '';
                if (msgEl)  msgEl.value  = '';
                document.getElementById('wfy-contact-counter').textContent = '0 / 1000';
                btnEl.textContent = s.send;
                btnEl.disabled    = false;
            } else {
                const data = await resp.json().catch(() => ({}));
                statEl.textContent = data.error || s.errNet;
                statEl.style.color = '#ef4444';
                btnEl.textContent  = s.send;
                btnEl.disabled     = false;
            }
        } catch (e) {
            statEl.textContent = s.errNet;
            statEl.style.color = '#ef4444';
            btnEl.textContent  = s.send;
            btnEl.disabled     = false;
        }
    };

})();
