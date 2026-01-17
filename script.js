// Übersetzungen
const TRANSLATIONS = {
    de: {
        subtitle: 'Rate das 5-Buchstaben-Wort!',
        newGame: 'Neues Spiel',
        stats: 'Statistiken',
        statsTitle: 'Statistiken',
        played: 'Gespielt',
        winRate: 'Gewinnrate',
        streak: 'Streak',
        maxStreak: 'Max Streak',
        notEnough: 'Nicht genug Buchstaben!',
        notInList: 'Wort nicht in der Liste!',
        won: 'Gewonnen!',
        lost: 'Das Wort war: ',
        newGameStarted: 'Neues Spiel gestartet!',
        gameLimit: 'Limit erreicht! Du hast 5 Spiele in 12h gespielt. Nächstes Spiel in: ',
        howToPlayTitle: 'So funktioniert’s',
        instruction1: 'Gib ein 5-Buchstaben-Wort ein',
        instruction2: 'Die Farben zeigen, wie nah du dran bist',
        instruction3: 'Grün = richtig, Gelb = falsche Position',
        instruction4: 'Du hast 6 Versuche zum Erraten',
        //footer: '© 2026 Wordify powered by FrameSphere - Ein Wortratespiel',
        keys: [
            ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
            ['ENTER', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'ß', '⌫']
        ]
    },
    en: {
        subtitle: 'Guess the 5-letter word!',
        newGame: 'New Game',
        stats: 'Statistics',
        statsTitle: 'Statistics',
        played: 'Played',
        winRate: 'Win Rate',
        streak: 'Streak',
        maxStreak: 'Max Streak',
        notEnough: 'Not enough letters!',
        notInList: 'Word not in list!',
        won: 'You won!',
        lost: 'The word was: ',
        newGameStarted: 'New game started!',
        gameLimit: 'Limit reached! You played 5 games in 12h. Next game in: ',
        howToPlayTitle: 'How it works',
        instruction1: 'Enter a 5-letter word',
        instruction2: 'Colors show how close you are',
        instruction3: 'Green = correct, Yellow = wrong position',
        instruction4: 'You have 6 attempts to guess',
        //footer: '© 2026 Wordify powered by FrameSphere - A Word Guessing Game',
        keys: [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
        ]
    },
    es: {
        subtitle: '¡Adivina la palabra de 5 letras!',
        newGame: 'Nuevo Juego',
        stats: 'Estadísticas',
        statsTitle: 'Estadísticas',
        played: 'Jugados',
        winRate: 'Tasa de Victoria',
        streak: 'Racha',
        maxStreak: 'Racha Máx',
        notEnough: '¡No hay suficientes letras!',
        notInList: '¡Palabra no está en la lista!',
        won: '¡Ganaste!',
        lost: 'La palabra era: ',
        newGameStarted: '¡Nuevo juego iniciado!',
        gameLimit: '¡Límite alcanzado! Has jugado 5 partidas en 12h. Próximo juego en: ',
        howToPlayTitle: 'Cómo funciona',
        instruction1: 'Ingresa una palabra de 5 letras',
        instruction2: 'Los colores muestran qué tan cerca estás',
        instruction3: 'Verde = correcto, Amarillo = posición incorrecta',
        instruction4: 'Tienes 6 intentos para adivinar',
        //footer: '© 2026 Wordify powered by FrameSphere - Un Juego de Palabras',
        keys: [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
        ]
    },
    fr: {
        subtitle: 'Devinez le mot de 5 lettres!',
        newGame: 'Nouveau Jeu',
        stats: 'Statistiques',
        statsTitle: 'Statistiques',
        played: 'Joués',
        winRate: 'Taux de Victoire',
        streak: 'Série',
        maxStreak: 'Série Max',
        notEnough: 'Pas assez de lettres!',
        notInList: 'Mot pas dans la liste!',
        won: 'Vous avez gagné!',
        lost: 'Le mot était: ',
        newGameStarted: 'Nouveau jeu commencé!',
        gameLimit: 'Limite atteinte! Vous avez joué 5 parties en 12h. Prochain jeu dans: ',
        howToPlayTitle: 'Comment ça marche',
        instruction1: 'Entrez un mot de 5 lettres',
        instruction2: 'Les couleurs montrent à quel point vous êtes proche',
        instruction3: 'Vert = correct, Jaune = mauvaise position',
        instruction4: 'Vous avez 6 tentatives pour deviner',
        //footer: '© 2026 Wordify powered by FrameSphere - Un Jeu de Mots',
        keys: [
            ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
            ['ENTER', 'W', 'X', 'C', 'V', 'B', 'N', 'É', '⌫']
        ]
    },
    it: {
        subtitle: 'Indovina la parola di 5 lettere!',
        newGame: 'Nuovo Gioco',
        stats: 'Statistiche',
        statsTitle: 'Statistiche',
        played: 'Giocati',
        winRate: 'Tasso di Vittoria',
        streak: 'Serie',
        maxStreak: 'Serie Max',
        notEnough: 'Non abbastanza lettere!',
        notInList: 'Parola non nella lista!',
        won: 'Hai vinto!',
        lost: 'La parola era: ',
        newGameStarted: 'Nuovo gioco iniziato!',
        gameLimit: 'Limite raggiunto! Hai giocato 5 partite in 12h. Prossima partita tra: ',
        howToPlayTitle: 'Come funziona',
        instruction1: 'Inserisci una parola di 5 lettere',
        instruction2: 'I colori mostrano quanto sei vicino',
        instruction3: 'Verde = corretto, Giallo = posizione sbagliata',
        instruction4: 'Hai 6 tentativi per indovinare',
        //footer: '© 2026 Wordify powered by FrameSphere - Un Gioco di Parole',
        keys: [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
        ]
    }
};

// Wortlisten-Mapping
const WORD_LISTS = {
    de: WORDS_DE,
    en: WORDS_EN,
    es: WORDS_ES,
    fr: WORDS_FR,
    it: WORDS_IT
};

// Spielzustand
let currentLanguage = localStorage.getItem('wordifyLanguage') || 'de';
let targetWord = '';
let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let stats = JSON.parse(localStorage.getItem(`wordifyStats_${currentLanguage}`)) || {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0
};

// Spiellimit: 5 Spiele pro 12 Stunden
const GAMES_LIMIT = 5;
const TIME_WINDOW = 12 * 60 * 60 * 1000; // 12 Stunden in Millisekunden

function getGameHistory() {
    const history = localStorage.getItem('wordifyGameHistory');
    return history ? JSON.parse(history) : [];
}

function addGameToHistory() {
    const history = getGameHistory();
    const now = Date.now();
    history.push(now);
    localStorage.setItem('wordifyGameHistory', JSON.stringify(history));
}

function canStartNewGame() {
    const history = getGameHistory();
    const now = Date.now();
    const cutoff = now - TIME_WINDOW;
    
    // Filtere alte Spiele raus
    const recentGames = history.filter(timestamp => timestamp > cutoff);
    localStorage.setItem('wordifyGameHistory', JSON.stringify(recentGames));
    
    return recentGames.length < GAMES_LIMIT;
}

function getTimeUntilNextGame() {
    const history = getGameHistory();
    const now = Date.now();
    const cutoff = now - TIME_WINDOW;
    const recentGames = history.filter(timestamp => timestamp > cutoff);
    
    if (recentGames.length < GAMES_LIMIT) return 0;
    
    const oldestGame = Math.min(...recentGames);
    const timeRemaining = (oldestGame + TIME_WINDOW) - now;
    return Math.max(0, timeRemaining);
}

function formatTimeRemaining(ms) {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
        return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
}

// Theme
const currentTheme = localStorage.getItem('wordifyTheme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

// Elemente
const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const newGameBtn = document.getElementById('newGame');
const statsBtn = document.getElementById('statsBtn');
const modal = document.getElementById('statsModal');
const closeModal = document.querySelector('.close');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('wordifyTheme', newTheme);
});

// Sprache wechseln
languageSelect.value = currentLanguage;
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('wordifyLanguage', currentLanguage);
    stats = JSON.parse(localStorage.getItem(`wordifyStats_${currentLanguage}`)) || {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0
    };
    updateLanguage();
    init();
});

// UI-Texte aktualisieren
function updateLanguage() {
    const t = TRANSLATIONS[currentLanguage];
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('btnNewGame').textContent = t.newGame;
    document.getElementById('btnStats').textContent = t.stats;
    document.getElementById('modalTitle').textContent = t.statsTitle;
    document.getElementById('labelPlayed').textContent = t.played;
    document.getElementById('labelWinRate').textContent = t.winRate;
    document.getElementById('labelStreak').textContent = t.streak;
    document.getElementById('labelMaxStreak').textContent = t.maxStreak;
    
    // Update "So funktioniert's" section
    document.getElementById('howToPlayTitle').textContent = t.howToPlayTitle;
    document.getElementById('instruction1').textContent = t.instruction1;
    document.getElementById('instruction2').textContent = t.instruction2;
    document.getElementById('instruction3').textContent = t.instruction3;
    document.getElementById('instruction4').textContent = t.instruction4;
}

// Timer Instanz
let timer = null;

// Initialisierung
function init(checkLimit = false) {
    const t = TRANSLATIONS[currentLanguage];
    
    if (checkLimit && !canStartNewGame()) {
        const timeRemaining = getTimeUntilNextGame();
        showMessage(t.gameLimit + formatTimeRemaining(timeRemaining), 'error');
        return false;
    }
    
    if (checkLimit) {
        addGameToHistory();
    }
    
    const words = WORD_LISTS[currentLanguage];
    targetWord = words[Math.floor(Math.random() * words.length)];
    console.log('Zielwort:', targetWord); // Für Debugging
    currentRow = 0;
    currentTile = 0;
    gameOver = false;
    
    // Timer starten
    if (!timer) timer = new GameTimer();
    timer.reset();
    timer.start();
    
    createBoard();
    createKeyboard();
    updateStats();
    updateLanguage();
    return true;
}

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.setAttribute('data-row', i);
            tile.setAttribute('data-col', j);
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

function createKeyboard() {
    keyboard.innerHTML = '';
    const keys = TRANSLATIONS[currentLanguage].keys;
    
    keys.forEach(row => {
        const keyRow = document.createElement('div');
        keyRow.className = 'keyboard-row';
        row.forEach(key => {
            const keyBtn = document.createElement('button');
            keyBtn.className = 'key' + (key.length > 1 ? ' wide' : '');
            keyBtn.textContent = key;
            keyBtn.addEventListener('click', () => handleKeyPress(key));
            keyRow.appendChild(keyBtn);
        });
        keyboard.appendChild(keyRow);
    });
}

function handleKeyPress(key) {
    if (gameOver) return;

    if (key === 'ENTER') {
        submitGuess();
    } else if (key === '⌫') {
        deleteLetter();
    } else if (currentTile < 5) {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (currentTile < 5) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${currentTile}"]`);
        tile.textContent = letter;
        tile.classList.add('filled');
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${currentTile}"]`);
        tile.textContent = '';
        tile.classList.remove('filled');
    }
}

function submitGuess() {
    const t = TRANSLATIONS[currentLanguage];
    
    if (currentTile < 5) {
        showMessage(t.notEnough, 'error');
        return;
    }

    let guess = '';
    for (let i = 0; i < 5; i++) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`);
        guess += tile.textContent;
    }

    const words = WORD_LISTS[currentLanguage];
    if (!words.includes(guess)) {
        showMessage(t.notInList, 'error');
        return;
    }

    checkGuess(guess);
    
    if (guess === targetWord) {
        gameOver = true;
        const elapsedTime = timer.stop();
        showMessage(t.won, 'success');
        stats.gamesPlayed++;
        stats.gamesWon++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        saveStats();
        updateStats();
        setTimeout(() => showShareModal(true, elapsedTime), 500);
    } else if (currentRow === 5) {
        gameOver = true;
        const elapsedTime = timer.stop();
        showMessage(t.lost + targetWord, 'error');
        stats.gamesPlayed++;
        stats.currentStreak = 0;
        saveStats();
        updateStats();
        setTimeout(() => showShareModal(false, elapsedTime), 500);
    } else {
        currentRow++;
        currentTile = 0;
    }
}

function checkGuess(guess) {
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const letterStatus = new Array(5).fill('absent');
    const usedLetters = new Array(5).fill(false);

    // Erst korrekte Positionen markieren
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === targetLetters[i]) {
            letterStatus[i] = 'correct';
            usedLetters[i] = true;
        }
    }

    // Dann vorhandene Buchstaben markieren
    for (let i = 0; i < 5; i++) {
        if (letterStatus[i] === 'correct') continue;
        
        for (let j = 0; j < 5; j++) {
            if (!usedLetters[j] && guessLetters[i] === targetLetters[j]) {
                letterStatus[i] = 'present';
                usedLetters[j] = true;
                break;
            }
        }
    }

    // Tiles animieren und färben
    for (let i = 0; i < 5; i++) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`);
        setTimeout(() => {
            tile.classList.add(letterStatus[i]);
            updateKeyboard(guessLetters[i], letterStatus[i]);
        }, i * 200);
    }
}

function updateKeyboard(letter, status) {
    const keyButtons = document.querySelectorAll('.key');
    keyButtons.forEach(key => {
        if (key.textContent === letter) {
            const currentStatus = key.classList.contains('correct') ? 'correct' :
                                 key.classList.contains('present') ? 'present' : 'absent';
            
            if (status === 'correct' || 
                (status === 'present' && currentStatus !== 'correct') ||
                (status === 'absent' && currentStatus === 'absent')) {
                key.classList.remove('correct', 'present', 'absent');
                key.classList.add(status);
            }
        }
    });
}

function showMessage(text, type = '') {
    message.textContent = text;
    message.className = 'message ' + type;
    setTimeout(() => {
        message.textContent = '';
        message.className = 'message';
    }, 3000);
}

function saveStats() {
    localStorage.setItem(`wordifyStats_${currentLanguage}`, JSON.stringify(stats));
}

function updateStats() {
    document.getElementById('gamesPlayed').textContent = stats.gamesPlayed;
    const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
    document.getElementById('winRate').textContent = winRate + '%';
    document.getElementById('currentStreak').textContent = stats.currentStreak;
    document.getElementById('maxStreak').textContent = stats.maxStreak;
}

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    
    const key = e.key.toUpperCase();
    
    if (key === 'ENTER') {
        submitGuess();
    } else if (key === 'BACKSPACE') {
        deleteLetter();
    } else if (/^[A-ZÄÖÜÑÉÈÀÙÂÊÎÔÛËÏÇÆŒSS]$/.test(key)) {
        addLetter(key);
    }
});

newGameBtn.addEventListener('click', () => {
    const t = TRANSLATIONS[currentLanguage];
    if (init(true)) {
        showMessage(t.newGameStarted, 'success');
    }
});

statsBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ========== SHARE MODAL FUNKTIONALITÄT ==========

function generateEmojiGrid() {
    const board = document.getElementById('board');
    const rows = board.querySelectorAll('.row');
    let grid = '';
    
    rows.forEach((row, rowIndex) => {
        if (rowIndex >= currentRow) return;
        const tiles = row.querySelectorAll('.tile');
        let rowStr = '';
        tiles.forEach(tile => {
            const state = tile.dataset.state || tile.classList.contains('correct') ? 'correct' : 
                         tile.classList.contains('present') ? 'present' : 'absent';
            if (state === 'correct') rowStr += '🟩';
            else if (state === 'present') rowStr += '🟨';
            else rowStr += '⬜';
        });
        grid += rowStr + '\n';
    });
    
    return grid.trim();
}

function showShareModal(won, elapsedTime) {
    const t = TRANSLATIONS[currentLanguage];
    const emojiGrid = generateEmojiGrid();
    const attempts = won ? currentRow : 'X';
    const mins = Math.floor(elapsedTime / 60);
    const secs = elapsedTime % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    const shareText = `Wordify ${attempts}/6 in ${timeStr}\n\n${emojiGrid}\n\n🎮 wordify.pages.dev`;
    
    // Modal HTML erstellen
    const modal = document.createElement('div');
    modal.className = 'share-modal active';
    modal.innerHTML = `
        <div class="share-content">
            <h2>🎉 ${won ? t.won : t.lost + targetWord}</h2>
            <div class="share-stats">${attempts}/6 in ${timeStr} ⏱️</div>
            <div class="share-grid">${emojiGrid}</div>
            <div class="share-buttons">
                <button class="share-btn share-btn-primary" onclick="shareResults(\`${shareText.replace(/`/g, '\\`')}\`)">
                    📤 Teilen
                </button>
                <button class="share-btn share-btn-secondary" onclick="copyResults(\`${shareText.replace(/`/g, '\\`')}\`)">
                    📋 Kopieren
                </button>
            </div>
            <button class="share-btn share-btn-secondary" style="margin-top:10px;width:100%" onclick="closeShareModal()">❌ Schließen</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeShareModal();
    });
}

async function shareResults(text) {
    if (navigator.share) {
        try {
            await navigator.share({ text });
            showMessage('✓ Geteilt!', 'success');
        } catch (err) {
            if (err.name !== 'AbortError') {
                copyResults(text);
            }
        }
    } else {
        copyResults(text);
    }
}

async function copyResults(text) {
    try {
        await navigator.clipboard.writeText(text);
        showMessage('✓ In Zwischenablage kopiert!', 'success');
    } catch (err) {
        showMessage('❌ Fehler beim Kopieren', 'error');
    }
}

function closeShareModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) modal.remove();
}

// Spiel starten
init();
