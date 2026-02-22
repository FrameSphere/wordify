/**
 * wdt-script.js – Wort des Tages / Word of the Day
 * Shared across all language versions.
 *
 * Requires on the page:
 *   window.WDT_CONFIG = { lang, keyboard, dailyWords, getValidWords }
 *
 * All UI strings live in the HTML (static text + data-* attributes on body).
 * This script only fills dynamic values via element IDs.
 */

(function () {
    'use strict';

    // ─── Config ────────────────────────────────────────────────────────────
    const CFG  = window.WDT_CONFIG;
    const LANG = CFG.lang;

    // ─── Word selection (UTC date → same word for everyone at 00:00 UTC) ───
    function getTodayUTC() {
        const d = new Date();
        return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
    }

    function getDayIndex(list) {
        const epoch = Date.UTC(2024, 0, 1);
        const now   = new Date();
        const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        const diff  = Math.floor((today - epoch) / 86400000);
        return ((diff % list.length) + list.length) % list.length;
    }

    const WORD_LIST = [...new Set(CFG.dailyWords.filter(w => w.length === 5).map(w => w.toUpperCase()))];
    const ANSWER    = WORD_LIST[getDayIndex(WORD_LIST)];
    const UTC_DATE  = getTodayUTC();

    // localStorage keys – namespaced by lang
    const DAY_KEY   = `wdt_played_${LANG}_${UTC_DATE}`;
    const WON_KEY   = `wdt_won_${LANG}_${UTC_DATE}`;
    const STATS_KEY = `wordify_wdt_stats_${LANG}`;

    // ─── State ──────────────────────────────────────────────────────────────
    let currentRow = 0;
    let currentCol = 0;
    const board    = Array.from({ length: 6 }, () => Array(5).fill(''));
    let gameOver   = false;
    let won        = false;

    // ─── DOM refs ───────────────────────────────────────────────────────────
    const boardEl    = document.getElementById('board');
    const keyboardEl = document.getElementById('keyboard');
    const messageEl  = document.getElementById('message');
    const modal      = document.getElementById('wdtModal');
    const bannerEl   = document.getElementById('wdtBanner');

    // Dynamic strings from data-* attributes on <body>
    const STR = {
        msgShort:    document.body.dataset.msgShort    || '',
        msgUnknown:  document.body.dataset.msgUnknown  || '',
        sharePrefix: document.body.dataset.sharePrefix || 'Wordify',
        shareUrl:    document.body.dataset.shareUrl    || 'wordify.pages.dev',
    };

    // ─── Build board ────────────────────────────────────────────────────────
    function buildBoard() {
        boardEl.innerHTML = '';
        for (let r = 0; r < 6; r++) {
            const row = document.createElement('div');
            row.className = 'row';
            row.id = `row-${r}`;
            for (let c = 0; c < 5; c++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = `tile-${r}-${c}`;
                row.appendChild(tile);
            }
            boardEl.appendChild(row);
        }
    }

    // ─── Build keyboard ─────────────────────────────────────────────────────
    function buildKeyboard() {
        keyboardEl.innerHTML = '';
        CFG.keyboard.forEach(keys => {
            const row = document.createElement('div');
            row.className = 'keyboard-row';
            keys.forEach(k => {
                const btn     = document.createElement('button');
                const isWide  = (k === 'Enter' || k === 'ENTER' || k === '⌫');
                btn.className = 'key' + (isWide ? ' wide' : '');
                btn.textContent = k;
                btn.dataset.key = k;
                btn.addEventListener('click', () =>
                    handleKey(k === '⌫' ? 'BACKSPACE' : k.toUpperCase())
                );
                row.appendChild(btn);
            });
            keyboardEl.appendChild(row);
        });
    }

    // ─── Input ──────────────────────────────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const k = e.key.toUpperCase();
        if (k === 'BACKSPACE')       handleKey('BACKSPACE');
        else if (k === 'ENTER')      handleKey('ENTER');
        else if (/^[A-ZÄÖÜÁÉÍÓÚÀÈÊÂÔÎÛÙÑÇ]$/.test(k)) handleKey(k);
    });

    function handleKey(key) {
        if (gameOver) return;
        if (key === 'BACKSPACE')     deleteLetter();
        else if (key === 'ENTER')    submitGuess();
        else if (/^[A-ZÄÖÜÁÉÍÓÚÀÈÊÂÔÎÛÙÑÇ]$/.test(key)) addLetter(key);
    }

    function addLetter(l) {
        if (currentCol >= 5) return;
        board[currentRow][currentCol] = l;
        const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
        tile.textContent = l;
        tile.classList.add('filled');
        currentCol++;
    }

    function deleteLetter() {
        if (currentCol <= 0) return;
        currentCol--;
        board[currentRow][currentCol] = '';
        const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
        tile.textContent = '';
        tile.classList.remove('filled');
    }

    // ─── Submit ─────────────────────────────────────────────────────────────
    function submitGuess() {
        if (currentCol < 5) {
            showMessage(STR.msgShort);
            shakeRow(currentRow);
            return;
        }
        const guess = board[currentRow].join('');
        if (!isValidWord(guess)) {
            showMessage(STR.msgUnknown);
            shakeRow(currentRow);
            return;
        }
        showMessage('');
        revealRow(currentRow, guess, () => {
            if (guess === ANSWER) {
                won = true; gameOver = true;
                saveResult(true, currentRow + 1);
                markButtonGreen();
                setTimeout(() => openModal(true), 500);
            } else {
                currentRow++;
                currentCol = 0;
                if (currentRow >= 6) {
                    gameOver = true;
                    saveResult(false, 6);
                    setTimeout(() => openModal(false), 500);
                }
            }
        });
    }

    function isValidWord(w) {
        const ext = CFG.getValidWords ? CFG.getValidWords() : null;
        if (ext && Array.isArray(ext)) return ext.includes(w) || WORD_LIST.includes(w);
        return WORD_LIST.includes(w) || w.length === 5;
    }

    // ─── Reveal row (flip animation) ─────────────────────────────────────────
    function revealRow(row, guess, cb) {
        const result = scoreGuess(guess, ANSWER);
        for (let c = 0; c < 5; c++) {
            const tile  = document.getElementById(`tile-${row}-${c}`);
            const delay = c * 300;
            setTimeout(() => {
                tile.style.transition = 'transform 0.3s ease';
                tile.style.transform  = 'rotateX(90deg)';
                setTimeout(() => {
                    tile.classList.remove('filled');
                    tile.classList.add(result[c]);
                    tile.style.transform = 'rotateX(0deg)';
                    updateKey(guess[c], result[c]);
                }, 150);
            }, delay);
        }
        setTimeout(cb, 5 * 300 + 200);
    }

    function scoreGuess(guess, answer) {
        const result = Array(5).fill('absent');
        const ans    = answer.split('');
        const g      = guess.split('');
        const used   = Array(5).fill(false);
        for (let i = 0; i < 5; i++) {
            if (g[i] === ans[i]) { result[i] = 'correct'; used[i] = true; g[i] = null; }
        }
        for (let i = 0; i < 5; i++) {
            if (result[i] === 'correct') continue;
            for (let j = 0; j < 5; j++) {
                if (!used[j] && g[i] === ans[j]) { result[i] = 'present'; used[j] = true; break; }
            }
        }
        return result;
    }

    // ─── Keyboard colors ────────────────────────────────────────────────────
    const keyState = {};
    const PRIO     = { correct: 3, present: 2, absent: 1 };

    function updateKey(letter, state) {
        if ((PRIO[state] || 0) <= (PRIO[keyState[letter]] || 0)) return;
        keyState[letter] = state;
        document.querySelectorAll('.key').forEach(btn => {
            if (btn.dataset.key && btn.dataset.key.toUpperCase() === letter) {
                btn.classList.remove('correct', 'present', 'absent');
                btn.classList.add(state);
            }
        });
    }

    // ─── Message ────────────────────────────────────────────────────────────
    let msgTimer;
    function showMessage(txt, ms) {
        ms = (ms === undefined) ? 2000 : ms;
        messageEl.textContent = txt;
        messageEl.className   = txt ? 'message error' : 'message';
        clearTimeout(msgTimer);
        if (txt && ms > 0) msgTimer = setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className   = 'message';
        }, ms);
    }

    function shakeRow(r) {
        const row = document.getElementById(`row-${r}`);
        row.classList.add('shake');
        setTimeout(() => row.classList.remove('shake'), 500);
    }

    // ─── Stats ──────────────────────────────────────────────────────────────
    function loadStats() {
        try { return JSON.parse(localStorage.getItem(STATS_KEY)) || { played: 0, won: 0, streak: 0, maxStreak: 0 }; }
        catch { return { played: 0, won: 0, streak: 0, maxStreak: 0 }; }
    }

    function saveResult(didWin, attempts) {
        if (localStorage.getItem(DAY_KEY)) return;
        localStorage.setItem(DAY_KEY, JSON.stringify({ won: didWin, attempts }));
        const s = loadStats();
        s.played++;
        if (didWin) { s.won++; s.streak++; s.maxStreak = Math.max(s.maxStreak, s.streak); }
        else { s.streak = 0; }
        localStorage.setItem(STATS_KEY, JSON.stringify(s));
    }

    function winRate(s) { return s.played ? Math.round(s.won / s.played * 100) : 0; }

    // ─── Emoji grid ─────────────────────────────────────────────────────────
    function buildEmoji() {
        let out  = '';
        const rows = won ? currentRow + 1 : 6;
        for (let r = 0; r < rows; r++) {
            if (!board[r][0]) break;
            out += scoreGuess(board[r].join(''), ANSWER)
                .map(s => s === 'correct' ? '🟩' : s === 'present' ? '🟨' : '⬜')
                .join('') + '\n';
        }
        return out.trim();
    }

    // ─── Modal ──────────────────────────────────────────────────────────────
    function openModal(didWin) {
        const s        = loadStats();
        const attempts = didWin ? currentRow + 1 : 'X';
        const emoji    = buildEmoji();

        // Toggle win / lose sections
        document.getElementById('stateWin').hidden  = !didWin;
        document.getElementById('stateLose').hidden = didWin;
        if (didWin) {
            document.getElementById('attemptCount').textContent = attempts;
        }

        // Word box colour
        document.getElementById('modalWordBox').classList.toggle('lost', !didWin);
        document.getElementById('wordLabelWon').hidden  = !didWin;
        document.getElementById('wordLabelLost').hidden = didWin;
        document.getElementById('modalWordValue').textContent = ANSWER;

        // Stats values (labels are static in HTML)
        document.getElementById('statPlayed').textContent = s.played;
        document.getElementById('statWon').textContent    = winRate(s) + '%';
        document.getElementById('statStreak').textContent = s.streak;
        document.getElementById('statMax').textContent    = s.maxStreak;

        // Emoji result
        document.getElementById('emojiResult').textContent = emoji;

        // Countdown
        updateModalCountdown();

        // Wire share button
        document.getElementById('wdtShareBtn').onclick = () => doShare(emoji, attempts);

        modal.style.display = 'flex';

        // Keep countdown live while modal is open
        const iv = setInterval(() => {
            if (modal.style.display === 'none') { clearInterval(iv); return; }
            updateModalCountdown();
        }, 1000);
    }

    function updateModalCountdown() {
        const el = document.getElementById('modalCountdown');
        if (el) el.textContent = getCountdownStr();
    }

    // Close modal on backdrop click
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // ─── Share ───────────────────────────────────────────────────────────────
    function doShare(emoji, attempts) {
        const d       = new Date();
        const dateStr = d.toLocaleDateString(LANG, { day: 'numeric', month: 'numeric', year: 'numeric' });
        const text    = `${STR.sharePrefix}\n${dateStr} | ${attempts}/6\n\n${emoji}\n\n▶ ${STR.shareUrl}`;
        if (navigator.share) {
            navigator.share({ title: STR.sharePrefix, text });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => showMessage('✓', 2000));
        }
    }

    // ─── Countdown ───────────────────────────────────────────────────────────
    function getCountdownStr() {
        const now  = new Date();
        const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
        const diff = next - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    // ─── Date display ────────────────────────────────────────────────────────
    function showDate() {
        const el = document.getElementById('todayDate');
        if (!el) return;
        el.textContent = new Date().toLocaleDateString(LANG, {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
    }

    // ─── Mark index button green ──────────────────────────────────────────────
    function markButtonGreen() {
        localStorage.setItem(WON_KEY, '1');
    }

    // ─── Day rollover (auto-reload when UTC date changes) ─────────────────────
    let _lastDay = UTC_DATE;
    setInterval(() => {
        const el = document.getElementById('countdown');
        if (el) el.textContent = getCountdownStr();
        if (getTodayUTC() !== _lastDay) location.reload();
    }, 1000);

    // ─── Theme toggle (called by HTML button) ─────────────────────────────────
    window.wdtToggleTheme = function () {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('wordifyTheme', next);
    };

    // ─── Init ────────────────────────────────────────────────────────────────
    const theme = localStorage.getItem('wordifyTheme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    buildBoard();
    buildKeyboard();
    showDate();
    document.getElementById('countdown').textContent = getCountdownStr();

    // Already played today?
    const saved = localStorage.getItem(DAY_KEY);
    if (saved) {
        gameOver = true;
        if (bannerEl) bannerEl.hidden = false;
        try {
            const data = JSON.parse(saved);
            setTimeout(() => openModal(data.won), 400);
        } catch { /* ignore */ }
    }

})();
