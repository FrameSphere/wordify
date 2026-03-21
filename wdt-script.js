/**
 * wdt-script.js – Wort des Tages / Word of the Day
 * Shared across all language versions.
 *
 * Requires on the page:
 *   window.WDT_CONFIG = { lang, keyboard, dailyWords, getValidWords }
 *
 * Word source: Dashboard API first, fallback to local dailyWords list.
 */

(function () {
    'use strict';

    const DASHBOARD_API = 'https://webcontrol-hq-api.karol-paschek.workers.dev';

    // ─── Config ─────────────────────────────────────────────────────────────
    const CFG  = window.WDT_CONFIG;
    const LANG = CFG.lang;

    // ─── UTC date helper ─────────────────────────────────────────────────────
    function getTodayUTC() {
        const d  = new Date();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        return d.getUTCFullYear() + '-' + mm + '-' + dd;
    }

    const UTC_DATE  = getTodayUTC();
    const DAY_KEY   = 'wdt_played_'  + LANG + '_' + UTC_DATE;
    const WON_KEY   = 'wdt_won_'     + LANG + '_' + UTC_DATE;
    const STATS_KEY = 'wordify_wdt_stats_' + LANG;
    const CACHE_KEY = 'wdt_word_'    + LANG + '_' + UTC_DATE;

    // Fallback list (used when API has no entry for today)
    const FALLBACK_LIST = (function () {
        const raw = (CFG.dailyWords || []).filter(function (w) { return w.length === 5; });
        return raw.map(function (w) { return w.toUpperCase(); });
    }());

    function getFallbackWord() {
        if (!FALLBACK_LIST.length) return 'WORTE';
        const epoch = Date.UTC(2024, 0, 1);
        const now   = new Date();
        const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        const diff  = Math.floor((today - epoch) / 86400000);
        const idx   = ((diff % FALLBACK_LIST.length) + FALLBACK_LIST.length) % FALLBACK_LIST.length;
        return FALLBACK_LIST[idx];
    }

    // ─── State (ANSWER set after API fetch) ──────────────────────────────────
    let ANSWER     = null;
    let currentRow = 0;
    let currentCol = 0;
    const board    = Array.from({ length: 6 }, function () { return Array(5).fill(''); });
    let gameOver   = false;
    let won        = false;

    // ─── DOM refs ───────────────────────────────────────────────────────────
    const boardEl    = document.getElementById('board');
    const keyboardEl = document.getElementById('keyboard');
    const messageEl  = document.getElementById('message');
    const modal      = document.getElementById('wdtModal');
    const bannerEl   = document.getElementById('wdtBanner');

    const STR = {
        msgShort:    document.body.dataset.msgShort    || '',
        msgUnknown:  document.body.dataset.msgUnknown  || '',
        sharePrefix: document.body.dataset.sharePrefix || 'Wordify',
        shareUrl:    document.body.dataset.shareUrl    || 'wordify.pages.dev',
    };

    // ─── Fetch daily word from dashboard ─────────────────────────────────────
    async function fetchDailyWord() {
        // 1. Check localStorage cache (valid for today only)
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) return cached;

        // 2. Fetch from API
        try {
            const resp = await fetch(
                DASHBOARD_API + '/api/daily-word?lang=' + LANG + '&date=' + UTC_DATE,
                { cache: 'no-store' }
            );
            if (resp.ok) {
                const data = await resp.json();
                if (data.word && data.word.length === 5) {
                    localStorage.setItem(CACHE_KEY, data.word);
                    return data.word;
                }
            }
        } catch (e) {
            // Network error – use fallback silently
        }

        // 3. Fallback to local list
        return getFallbackWord();
    }

    // ─── Build board ─────────────────────────────────────────────────────────
    function buildBoard() {
        boardEl.innerHTML = '';
        for (var r = 0; r < 6; r++) {
            var row = document.createElement('div');
            row.className = 'row';
            row.id = 'row-' + r;
            for (var c = 0; c < 5; c++) {
                var tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = 'tile-' + r + '-' + c;
                row.appendChild(tile);
            }
            boardEl.appendChild(row);
        }
    }

    // ─── Build keyboard ──────────────────────────────────────────────────────
    function buildKeyboard() {
        keyboardEl.innerHTML = '';
        CFG.keyboard.forEach(function (keys) {
            var row = document.createElement('div');
            row.className = 'keyboard-row';
            keys.forEach(function (k) {
                var btn    = document.createElement('button');
                var isWide = (k === 'Enter' || k === 'ENTER' || k === '\u232b');
                btn.className   = 'key' + (isWide ? ' wide' : '');
                btn.textContent = k;
                btn.dataset.key = k;
                btn.addEventListener('click', function () {
                    handleKey(k === '\u232b' ? 'BACKSPACE' : k.toUpperCase());
                });
                row.appendChild(btn);
            });
            keyboardEl.appendChild(row);
        });
    }

    // ─── Input ───────────────────────────────────────────────────────────────
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var k = e.key.toUpperCase();
        if (k === 'BACKSPACE')  handleKey('BACKSPACE');
        else if (k === 'ENTER') handleKey('ENTER');
        else if (/^[A-Z\u00C4\u00D6\u00DC\u00C1\u00C9\u00CD\u00D3\u00DA\u00C0\u00C8\u00CA\u00C2\u00D4\u00CE\u00DB\u00D9\u00D1\u00C7]$/.test(k)) handleKey(k);
    });

    function handleKey(key) {
        if (gameOver || !ANSWER) return;
        if (key === 'BACKSPACE')     deleteLetter();
        else if (key === 'ENTER')    submitGuess();
        else if (/^[A-Z\u00C4\u00D6\u00DC\u00C1\u00C9\u00CD\u00D3\u00DA\u00C0\u00C8\u00CA\u00C2\u00D4\u00CE\u00DB\u00D9\u00D1\u00C7]$/.test(key)) addLetter(key);
    }

    function addLetter(l) {
        if (currentCol >= 5) return;
        board[currentRow][currentCol] = l;
        var tile = document.getElementById('tile-' + currentRow + '-' + currentCol);
        tile.textContent = l;
        tile.classList.add('filled');
        currentCol++;
    }

    function deleteLetter() {
        if (currentCol <= 0) return;
        currentCol--;
        board[currentRow][currentCol] = '';
        var tile = document.getElementById('tile-' + currentRow + '-' + currentCol);
        tile.textContent = '';
        tile.classList.remove('filled');
    }

    // ─── Submit ──────────────────────────────────────────────────────────────
    function submitGuess() {
        if (currentCol < 5) {
            showMessage(STR.msgShort);
            shakeRow(currentRow);
            return;
        }
        var guess = board[currentRow].join('');
        if (!isValidWord(guess)) {
            showMessage(STR.msgUnknown);
            shakeRow(currentRow);
            return;
        }
        showMessage('');
        revealRow(currentRow, guess, function () {
            if (guess === ANSWER) {
                won = true; gameOver = true;
                saveResult(true, currentRow + 1);
                markButtonGreen();
                // Win an API melden
                trackWin('daily', ANSWER, LANG, UTC_DATE, currentRow + 1);
                setTimeout(function () { openModal(true); }, 500);
            } else {
                currentRow++;
                currentCol = 0;
                if (currentRow >= 6) {
                    gameOver = true;
                    saveResult(false, 6);
                    setTimeout(function () { openModal(false); }, 500);
                }
            }
        });
    }

    function isValidWord(w) {
        var ext = CFG.getValidWords ? CFG.getValidWords() : null;
        if (ext && Array.isArray(ext)) return ext.includes(w) || FALLBACK_LIST.includes(w);
        return FALLBACK_LIST.includes(w) || w.length === 5;
    }

    // ─── Reveal row ──────────────────────────────────────────────────────────
    function revealRow(row, guess, cb) {
        var result = scoreGuess(guess, ANSWER);
        for (var c = 0; c < 5; c++) {
            (function (col) {
                var tile  = document.getElementById('tile-' + row + '-' + col);
                var delay = col * 300;
                setTimeout(function () {
                    tile.style.transition = 'transform 0.3s ease';
                    tile.style.transform  = 'rotateX(90deg)';
                    setTimeout(function () {
                        tile.classList.remove('filled');
                        tile.classList.add(result[col]);
                        tile.style.transform = 'rotateX(0deg)';
                        updateKey(guess[col], result[col]);
                    }, 150);
                }, delay);
            }(c));
        }
        setTimeout(cb, 5 * 300 + 200);
    }

    function scoreGuess(guess, answer) {
        var result = Array(5).fill('absent');
        var ans    = answer.split('');
        var g      = guess.split('');
        var used   = Array(5).fill(false);
        for (var i = 0; i < 5; i++) {
            if (g[i] === ans[i]) { result[i] = 'correct'; used[i] = true; g[i] = null; }
        }
        for (var i2 = 0; i2 < 5; i2++) {
            if (result[i2] === 'correct') continue;
            for (var j = 0; j < 5; j++) {
                if (!used[j] && g[i2] === ans[j]) { result[i2] = 'present'; used[j] = true; break; }
            }
        }
        return result;
    }

    // ─── Keyboard colors ─────────────────────────────────────────────────────
    var keyState = {};
    var PRIO     = { correct: 3, present: 2, absent: 1 };

    function updateKey(letter, state) {
        if ((PRIO[state] || 0) <= (PRIO[keyState[letter]] || 0)) return;
        keyState[letter] = state;
        document.querySelectorAll('.key').forEach(function (btn) {
            if (btn.dataset.key && btn.dataset.key.toUpperCase() === letter) {
                btn.classList.remove('correct', 'present', 'absent');
                btn.classList.add(state);
            }
        });
    }

    // ─── Message ─────────────────────────────────────────────────────────────
    var msgTimer;
    function showMessage(txt, ms) {
        ms = (ms === undefined) ? 2000 : ms;
        messageEl.textContent = txt;
        messageEl.className   = txt ? 'message error' : 'message';
        clearTimeout(msgTimer);
        if (txt && ms > 0) msgTimer = setTimeout(function () {
            messageEl.textContent = '';
            messageEl.className   = 'message';
        }, ms);
    }

    function shakeRow(r) {
        var row = document.getElementById('row-' + r);
        row.classList.add('shake');
        setTimeout(function () { row.classList.remove('shake'); }, 500);
    }

    // ─── Stats ───────────────────────────────────────────────────────────────
    function loadStats() {
        try { return JSON.parse(localStorage.getItem(STATS_KEY)) || { played: 0, won: 0, streak: 0, maxStreak: 0 }; }
        catch (e) { return { played: 0, won: 0, streak: 0, maxStreak: 0 }; }
    }

    function saveResult(didWin, attempts) {
        if (localStorage.getItem(DAY_KEY)) return;
        localStorage.setItem(DAY_KEY, JSON.stringify({ won: didWin, attempts: attempts }));
        var s = loadStats();
        s.played++;
        if (didWin) { s.won++; s.streak++; s.maxStreak = Math.max(s.maxStreak, s.streak); }
        else { s.streak = 0; }
        localStorage.setItem(STATS_KEY, JSON.stringify(s));
    }

    function winRate(s) { return s.played ? Math.round(s.won / s.played * 100) : 0; }

    // ─── Emoji grid ──────────────────────────────────────────────────────────
    function buildEmoji() {
        var out  = '';
        var rows = won ? currentRow + 1 : 6;
        for (var r = 0; r < rows; r++) {
            if (!board[r][0]) break;
            out += scoreGuess(board[r].join(''), ANSWER)
                .map(function (s) { return s === 'correct' ? '\uD83D\uDFE9' : s === 'present' ? '\uD83D\uDFE8' : '\u2B1C'; })
                .join('') + '\n';
        }
        return out.trim();
    }

    // ─── Modal ───────────────────────────────────────────────────────────────
    function openModal(didWin) {
        var s        = loadStats();
        var attempts = didWin ? currentRow + 1 : 'X';
        var emoji    = buildEmoji();

        document.getElementById('stateWin').hidden  = !didWin;
        document.getElementById('stateLose').hidden = didWin;
        if (didWin) document.getElementById('attemptCount').textContent = attempts;

        document.getElementById('modalWordBox').classList.toggle('lost', !didWin);
        document.getElementById('wordLabelWon').hidden  = !didWin;
        document.getElementById('wordLabelLost').hidden = didWin;
        document.getElementById('modalWordValue').textContent = ANSWER;

        document.getElementById('statPlayed').textContent = s.played;
        document.getElementById('statWon').textContent    = winRate(s) + '%';
        document.getElementById('statStreak').textContent = s.streak;
        document.getElementById('statMax').textContent    = s.maxStreak;
        document.getElementById('emojiResult').textContent = emoji;

        updateModalCountdown();
        document.getElementById('wdtShareBtn').onclick = function () { doShare(emoji, attempts); };
        modal.style.display = 'flex';

        var iv = setInterval(function () {
            if (modal.style.display === 'none') { clearInterval(iv); return; }
            updateModalCountdown();
        }, 1000);
    }

    function updateModalCountdown() {
        var el = document.getElementById('modalCountdown');
        if (el) el.textContent = getCountdownStr();
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // ─── Share ───────────────────────────────────────────────────────────────
    function doShare(emoji, attempts) {
        var d       = new Date();
        var dateStr = d.toLocaleDateString(LANG, { day: 'numeric', month: 'numeric', year: 'numeric' });
        var text    = STR.sharePrefix + '\n' + dateStr + ' | ' + attempts + '/6\n\n' + emoji + '\n\n\u25B6 ' + STR.shareUrl;
        if (navigator.share) {
            navigator.share({ title: STR.sharePrefix, text: text });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () { showMessage('\u2713', 2000); });
        }
    }

    // ─── Countdown ───────────────────────────────────────────────────────────
    function getCountdownStr() {
        var now  = new Date();
        var next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
        var diff = next - now;
        var h = Math.floor(diff / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }

    // ─── Date display ────────────────────────────────────────────────────────
    function showDate() {
        var el = document.getElementById('todayDate');
        if (!el) return;
        el.textContent = new Date().toLocaleDateString(LANG, {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
    }

    function markButtonGreen() {
        localStorage.setItem(WON_KEY, '1');
    }

    // ─── Theme toggle ─────────────────────────────────────────────────────────
    window.wdtToggleTheme = function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('wordifyTheme', next);
    };

    // ─── Day rollover ─────────────────────────────────────────────────────────
    var _lastDay = UTC_DATE;
    setInterval(function () {
        var el = document.getElementById('countdown');
        if (el) el.textContent = getCountdownStr();
        if (getTodayUTC() !== _lastDay) location.reload();
    }, 1000);

    // ─── Init (async – fetches word first) ───────────────────────────────────
    // ─── Win Tracking ───────────────────────────────────────────────────
    function trackWin(gameType, word, language, date, attempts) {
        fetch(DASHBOARD_API + '/api/game-wins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_type: gameType, word: word, language: language, date: date, attempts: attempts }),
        }).catch(function () {}); // fire-and-forget
    }

    async function init() {
        var theme = localStorage.getItem('wordifyTheme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);

        buildBoard();
        buildKeyboard();
        showDate();

        var cntEl = document.getElementById('countdown');
        if (cntEl) cntEl.textContent = getCountdownStr();

        // Fetch the daily word (API or fallback)
        ANSWER = await fetchDailyWord();

        // Already played today?
        var saved = localStorage.getItem(DAY_KEY);
        if (saved) {
            gameOver = true;
            if (bannerEl) bannerEl.hidden = false;
            try {
                var data = JSON.parse(saved);
                setTimeout(function () { openModal(data.won); }, 400);
            } catch (e) { /* ignore */ }
        }
    }

    init();

}());
