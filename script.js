// ========== TOP SHARE MODAL (Header Button) ==========

function showTopShareModal(elapsedTime) {
    const t = TRANSLATIONS[currentLanguage];
    const mins = Math.floor(elapsedTime / 60);
    const secs = elapsedTime % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    const shareUrl = window.location.href;
    const langMessages = {
        de: `Wordify - Das tägliche Wortratespiel!`,
        en: `Wordify - The Daily Word Guessing Game!`,
        es: `Wordify - ¡El juego diario de adivinanza de palabras!`,
        fr: `Wordify - Le jeu quotidien de devinettes de mots!`,
        it: `Wordify - Il gioco quotidiano di indovinelli di parole!`
    };
    
    const shareTitle = langMessages[currentLanguage] || langMessages.de;
    const shareText = `${shareTitle}\n🎮 ${shareUrl}`;
    
    // Modal HTML für Share-Optionen
    const shareModal = document.createElement('div');
    shareModal.className = 'share-modal-overlay';
    shareModal.id = 'topShareModal';
    shareModal.innerHTML = `
        <div class="share-modal-content">
            <button class="close-share-modal" onclick="closeTopShareModal()">&times;</button>
            <h3>${t.shareButton}</h3>
            <p>${t.shareLink}</p>
            
            <div class="share-options">
                <button class="share-option" onclick="copyShareText('${shareText.replace(/'/g, "\\'")}')">                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    ${t.shareLink}
                </button>
                <button class="share-option" onclick="shareToWhatsApp('${encodeURIComponent(shareText)}', '${encodeURIComponent(shareUrl)}')">                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    WhatsApp
                </button>
                <button class="share-option" onclick="shareToFacebook('${encodeURIComponent(shareUrl)}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Facebook
                </button>
                <button class="share-option" onclick="shareToTwitter('${encodeURIComponent(shareTitle)}', '${encodeURIComponent(shareUrl)}')">                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Twitter / X
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) closeTopShareModal();
    });
}

function closeTopShareModal() {
    const modal = document.getElementById('topShareModal');
    if (modal) modal.remove();
}// Übersetzungen
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
        requestWord: 'Wort vorschlagen',
        requestSent: '✓ Vorschlag gesendet!',
        requestError: 'Fehler beim Senden',
        won: 'Gewonnen!',
        lost: 'Das Wort war: ',
        newGameStarted: 'Neues Spiel gestartet!',
        gameLimit: 'Limit erreicht! Du hast 15 Spiele in 12h gespielt. Nächstes Spiel in: ',
        shareButton: 'Teilen',
        shareLink: 'Link teilen',
        linkCopied: '✓ Link kopiert!',
        howToPlayTitle: "So funktioniert's",
        instruction1: 'Gib ein 5-Buchstaben-Wort ein',
        instruction2: 'Die Farben zeigen, wie nah du dran bist',
        instruction3: 'Grün = richtig, Gelb = falsche Position',
        instruction4: 'Du hast 6 Versuche zum Erraten',
        congratulations: 'Gratuliere!',
        theWord: 'Das Wort:',
        attempts: 'Versuche',
        time: 'Zeit',
        gameOver: 'Spiel vorbei!',
        tryAgain: 'Erneut versuchen',
        nextOneBetter: 'Die nächste wird besser!',
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
        requestWord: 'Suggest word',
        requestSent: '✓ Suggestion sent!',
        requestError: 'Error sending',
        won: 'You won!',
        lost: 'The word was: ',
        newGameStarted: 'New game started!',
        gameLimit: 'Limit reached! You played 15 games in 12h. Next game in: ',
        shareButton: 'Share',
        shareLink: 'Share Link',
        linkCopied: '✓ Link copied!',
        howToPlayTitle: 'How it works',
        instruction1: 'Enter a 5-letter word',
        instruction2: 'Colors show how close you are',
        instruction3: 'Green = correct, Yellow = wrong position',
        instruction4: 'You have 6 attempts to guess',
        congratulations: 'Congratulations!',
        theWord: 'The Word:',
        attempts: 'Attempts',
        time: 'Time',
        gameOver: 'Game Over!',
        tryAgain: 'Try Again',
        nextOneBetter: 'The next one will be better!',
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
        requestWord: 'Sugerir palabra',
        requestSent: '✓ Sugerencia enviada!',
        requestError: 'Error al enviar',
        won: '¡Ganaste!',
        lost: 'La palabra era: ',
        newGameStarted: '¡Nuevo juego iniciado!',
        gameLimit: '¡Límite alcanzado! Has jugado 15 partidas en 12h. Próximo juego en: ',
        shareButton: 'Compartir',
        shareLink: 'Compartir enlace',
        linkCopied: '✓ Enlace copiado!',
        howToPlayTitle: 'Cómo funciona',
        instruction1: 'Ingresa una palabra de 5 letras',
        instruction2: 'Los colores muestran qué tan cerca estás',
        instruction3: 'Verde = correcto, Amarillo = posición incorrecta',
        instruction4: 'Tienes 6 intentos para adivinar',
        congratulations: '¡Felicitaciones!',
        theWord: 'La Palabra:',
        attempts: 'Intentos',
        time: 'Tiempo',
        gameOver: '¡Juego terminado!',
        tryAgain: 'Intentar de nuevo',
        nextOneBetter: '¡La próxima será mejor!',
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
        requestWord: 'Proposer ce mot',
        requestSent: '✓ Proposition envoyée!',
        requestError: "Erreur d'envoi",
        won: 'Vous avez gagné!',
        lost: 'Le mot était: ',
        newGameStarted: 'Nouveau jeu commencé!',
        gameLimit: 'Limite atteinte! Vous avez joué 15 parties en 12h. Prochain jeu dans: ',
        shareButton: 'Partager',
        shareLink: 'Partager le lien',
        linkCopied: '✓ Lien copié!',
        howToPlayTitle: 'Comment ça marche',
        instruction1: 'Entrez un mot de 5 lettres',
        instruction2: 'Les couleurs montrent à quel point vous êtes proche',
        instruction3: 'Vert = correct, Jaune = mauvaise position',
        instruction4: 'Vous avez 6 tentatives pour deviner',
        congratulations: 'Félicitations!',
        theWord: 'Le Mot:',
        attempts: 'Tentatives',
        time: 'Temps',
        gameOver: 'Partie terminée!',
        tryAgain: 'Réessayer',
        nextOneBetter: 'La prochaine sera meilleure!',
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
        requestWord: 'Suggerisci parola',
        requestSent: '✓ Suggerimento inviato!',
        requestError: 'Errore di invio',
        won: 'Hai vinto!',
        lost: 'La parola era: ',
        newGameStarted: 'Nuovo gioco iniziato!',
        gameLimit: 'Limite raggiunto! Hai giocato 15 partite in 12h. Prossima partita tra: ',
        shareButton: 'Condividi',
        shareLink: 'Condividi link',
        linkCopied: '✓ Link copiato!',
        howToPlayTitle: 'Come funziona',
        instruction1: 'Inserisci una parola di 5 lettere',
        instruction2: 'I colori mostrano quanto sei vicino',
        instruction3: 'Verde = corretto, Giallo = posizione sbagliata',
        instruction4: 'Hai 6 tentativi per indovinare',
        congratulations: 'Complimenti!',
        theWord: 'La Parola:',
        attempts: 'Tentativi',
        time: 'Tempo',
        gameOver: 'Gioco finito!',
        tryAgain: 'Riprova',
        nextOneBetter: 'Il prossimo sarà migliore!',
        keys: [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
        ]
    }
};

// Wortlisten-Mapping
// WORD_LISTS: Alle gültigen Wörter für Eingabe-Validierung
const WORD_LISTS = {
    de: WORDS_DE,
    en: WORDS_EN,
    es: WORDS_ES,
    fr: WORDS_FR,
    it: WORDS_IT
};

// QUEST_LISTS: Wörter die als Lösung drankommen können
const QUEST_LISTS = {
    de: WORDS_DE_QUEST,
    en: WORDS_EN_QUEST,
    es: WORDS_ES_QUEST,
    fr: WORDS_FR_QUEST,
    it: WORDS_IT_QUEST
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

// Spiellimit: 15 Spiele pro 12 Stunden
const GAMES_LIMIT = 15;
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

// Share Button Event Listener
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', () => {
    showTopShareModal(timer ? timer.getElapsedTime() : 0);
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('wordifyTheme', newTheme);
});

// Sprache wechseln - mit URL-Redirect
languageSelect.value = currentLanguage;
languageSelect.addEventListener('change', (e) => {
    const newLanguage = e.target.value;
    // Redirect zur richtigen Sprachseite
    window.location.href = `/${newLanguage}/`;
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
    
    // Zielwort aus Quest-Liste wählen (Lösungswörter)
    const questWords = QUEST_LISTS[currentLanguage];
    targetWord = questWords[Math.floor(Math.random() * questWords.length)];
    console.log('🎯 DEBUG - Zu erratendes Wort:', targetWord); // Für Debugging
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
        showMessageWithRequest(t.notInList, guess, currentLanguage);
        return;
    }

    checkGuess(guess);
    
    if (guess === targetWord) {
        gameOver = true;
        const elapsedTime = timer.stop();
        stats.gamesPlayed++;
        stats.gamesWon++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        saveStats();
        updateStats();
        // Gewinn ans Dashboard melden
        fetch(DASHBOARD_API + '/api/game-wins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                game_type: 'classic',
                word: targetWord,
                language: currentLanguage,
                date: new Date().toISOString().slice(0, 10),
                attempts: currentRow + 1,
            }),
        }).catch(() => {}); // fire-and-forget
        // Win Modal anzeigen statt einfache Nachricht
        setTimeout(() => {
            showWinModal(currentRow + 1, elapsedTime, targetWord);
        }, 1500); // Nach Animationen
    } else if (currentRow === 5) {
        gameOver = true;
        const elapsedTime = timer.stop();
        stats.gamesPlayed++;
        stats.currentStreak = 0;
        saveStats();
        updateStats();
        // Fail Modal anzeigen
        setTimeout(() => {
            showFailModal(targetWord);
        }, 1500); // Nach Animationen
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

//Open About Wordify Modal
function openAboutModal() {
    document.getElementById('aboutModal').style.display = 'flex';
}

function closeAboutModal() {
    document.getElementById('aboutModal').style.display = 'none';
}

function toggleHowToPlay() {
    const instructions = document.querySelector('.how-to-play .instructions');
    const toggle = document.querySelector('.how-to-play-toggle');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    instructions.classList.toggle('collapsed');
    toggle.setAttribute('aria-expanded', !isExpanded);
}

function toggleSEOContent() {
    const sections = document.querySelector('.seo-sections');
    const toggle = document.querySelector('.seo-toggle');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    sections.classList.toggle('collapsed');
    toggle.setAttribute('aria-expanded', !isExpanded);
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

function showShareModal(won, elapsedTime) {
    const t = TRANSLATIONS[currentLanguage];
    const mins = Math.floor(elapsedTime / 60);
    const secs = elapsedTime % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    const shareUrl = window.location.href;
    const shareTitle = won ? `Ich habe Wordify in ${currentRow} Versuchen gelöst!` : 'Spiel Wordify - Das 5-Buchstaben Wortratespiel!';
    const shareText = `Wordify - Das tägliche Wortratespiel! Spiele jetzt auf ${shareUrl}`;
    
    // Modal HTML erstellen
    const modal = document.createElement('div');
    modal.className = 'share-modal active';
    modal.innerHTML = `
        <div class="share-content">
            <h2 style="margin-bottom: 1rem; font-size: 1.5rem;">${t.shareButton || 'Teilen'}</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Teile Wordify mit deinen Freunden!</p>
            <div class="share-buttons" style="display: flex; flex-direction: column; gap: 12px;">
                <button class="share-btn share-btn-primary" onclick="copyLink('${shareUrl}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    <span>${t.shareLink || 'Link kopieren'}</span>
                </button>
                <button class="share-btn share-btn-secondary" onclick="shareWhatsApp('${encodeURIComponent(shareText)}', '${encodeURIComponent(shareUrl)}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>WhatsApp</span>
                </button>
                <button class="share-btn share-btn-secondary" onclick="shareFacebook('${encodeURIComponent(shareUrl)}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span>Facebook</span>
                </button>
                <button class="share-btn share-btn-secondary" onclick="shareTwitter('${encodeURIComponent(shareTitle)}', '${encodeURIComponent(shareUrl)}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    <span>Twitter / X</span>
                </button>
            </div>
            <button class="share-btn share-btn-secondary" style="margin-top:16px;width:100%;border: 2px solid var(--border-color);" onclick="closeShareModal()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>Schließen</span>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeShareModal();
    });
}

async function copyLink(url) {
    try {
        await navigator.clipboard.writeText(url);
        const t = TRANSLATIONS[currentLanguage];
        showMessage(t.linkCopied, 'success');
    } catch (err) {
        showMessage('❌ Fehler beim Kopieren', 'error');
    }
}

function shareWhatsApp(text, url) {
    const whatsappUrl = `https://wa.me/?text=${text}%20${url}`;
    window.open(whatsappUrl, '_blank');
}

function shareFacebook(url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank');
}

function shareTwitter(text, url) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, '_blank');
}

function closeShareModal() {
    const modal = document.querySelector('.share-modal-overlay');
    if (modal) modal.remove();
    // Nicht das Win Modal schließen, nur das Share Modal
}

// ========== WIN MODAL FUNKTIONALITÄT ==========

function showWinModal(attempts, timeInSeconds, word) {
    const t = TRANSLATIONS[currentLanguage];
    
    // Zeit formatieren
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    // Emoji basierend auf Versuche
    const emojiMap = {
        1: '🎯',
        2: '😎',
        3: '🤓',
        4: '🙂',
        5: '😅',
        6: '🎉'
    };
    const emoji = emojiMap[attempts] || '🎉';
    
    // Gratulationstexte je nach Versuche
    const congratsMap = {
        de: {
            1: 'Perfekt! Beim ersten Mal!',
            2: 'Genial! Du bist sehr schnell!',
            3: 'Großartig! Sehr gut gemacht!',
            4: 'Sehr gut! Du hast es geschafft!',
            5: 'Geschafft! Knapp gewonnen!',
            6: 'Geschafft! Auf den letzten Drücker!'
        },
        en: {
            1: 'Perfect! First try!',
            2: 'Genius! You\'re very fast!',
            3: 'Excellent! Well done!',
            4: 'Very good! You made it!',
            5: 'Done! Won by a narrow margin!',
            6: 'Done! Made it just in time!'
        },
        es: {
            1: '¡Perfecto! ¡Primer intento!',
            2: '¡Genio! ¡Eres muy rápido!',
            3: '¡Excelente! ¡Muy bien hecho!',
            4: '¡Muy bien! ¡Lo lograste!',
            5: '¡Listo! ¡Ganaste por poco!',
            6: '¡Listo! ¡Lo lograste a tiempo!'
        },
        fr: {
            1: 'Parfait! Au premier essai!',
            2: 'Génie! Tu es très rapide!',
            3: 'Excellent! Très bien joué!',
            4: 'Très bien! Tu y es arrivé!',
            5: 'Fait! Gagné de justesse!',
            6: 'Fait! Juste à temps!'
        },
        it: {
            1: 'Perfetto! Al primo tentativo!',
            2: 'Genio! Sei molto veloce!',
            3: 'Eccellente! Ben fatto!',
            4: 'Molto bene! Ce l\'hai fatta!',
            5: 'Fatto! Vinto di poco!',
            6: 'Fatto! Proprio in tempo!'
        }
    };
    
    const congratsText = congratsMap[currentLanguage][attempts] || congratsMap[currentLanguage][4];
    
    // Modal HTML erstellen
    const modal = document.createElement('div');
    modal.className = 'win-modal-overlay';
    modal.innerHTML = `
        <div class="win-modal">
            <div class="win-header">
                <div class="win-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1 class="win-title">${t.congratulations}</h1>
                <p class="win-text">${congratsText}</p>
            </div>
            
            <div class="win-stats">
                <div class="win-stat">
                    <div class="stat-label">${t.attempts}</div>
                    <div class="stat-value">${attempts}/6</div>
                </div>
                <div class="win-stat">
                    <div class="stat-label">${t.time} ⏱️</div>
                    <div class="stat-value">${timeStr}</div>
                </div>
            </div>
            
            <div class="win-word">
                <p class="win-word-label">${t.theWord}</p>
                <p class="win-word-value">${word.toUpperCase()}</p>
            </div>
            
            <div class="win-actions">
                <button class="win-btn win-btn-primary" onclick="startNewGameFromModal()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                    </svg>
                    <span>${t.newGame}</span>
                </button>
                <button class="win-btn win-btn-secondary" onclick="shareWinResult(${attempts}, ${timeInSeconds})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span>${t.shareButton}</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Schließen bei Klick außerhalb
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeWinModal();
        }
    });
}

function startNewGameFromModal() {
    closeWinModal();
    const t = TRANSLATIONS[currentLanguage];
    if (init(true)) {
        showMessage(t.newGameStarted, 'success');
    }
}

function closeWinModal() {
    const modal = document.querySelector('.win-modal-overlay');
    if (modal) {
        modal.classList.add('closing');
        setTimeout(() => modal.remove(), 300);
    }
}

function shareWinResult(attempts, timeInSeconds) {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    const shareUrl = window.location.href;
    const t = TRANSLATIONS[currentLanguage];
    
    const langMessages = {
        de: `Wordify ${attempts}/6 in ${timeStr} ⏱️`,
        en: `Wordify ${attempts}/6 in ${timeStr} ⏱️`,
        es: `Wordify ${attempts}/6 en ${timeStr} ⏱️`,
        fr: `Wordify ${attempts}/6 en ${timeStr} ⏱️`,
        it: `Wordify ${attempts}/6 in ${timeStr} ⏱️`
    };
    
    const shareDescriptions = {
        de: 'Teile deinen Erfolg!',
        en: 'Share your success!',
        es: '¡Comparte tu éxito!',
        fr: 'Partagez votre succès!',
        it: 'Condividi il tuo successo!'
    };
    
    const copyLinkTexts = {
        de: 'Link kopieren',
        en: 'Copy link',
        es: 'Copiar enlace',
        fr: 'Copier le lien',
        it: 'Copia link'
    };
    
    const shareTitle = langMessages[currentLanguage] || langMessages.de;
    const shareText = `${shareTitle}\n🎮 wordify.pages.dev`;
    const shareDescription = shareDescriptions[currentLanguage] || shareDescriptions.de;
    const copyLinkText = copyLinkTexts[currentLanguage] || copyLinkTexts.de;
    
    // Modal HTML für Share-Optionen
    const shareModal = document.createElement('div');
    shareModal.className = 'share-modal-overlay';
    shareModal.innerHTML = `
        <div class="share-modal-content">
            <button class="close-share-modal" onclick="closeShareModal()">&times;</button>
            <h3>${t.shareButton}</h3>
            <p>${shareDescription}</p>
            
            <div class="share-options">
                <button class="share-option" onclick="copyShareText('${shareText.replace(/'/g, "\\'")}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    ${copyLinkText}
                </button>
                <button class="share-option" onclick="shareToWhatsApp('${encodeURIComponent(shareText)}', '${encodeURIComponent(shareUrl)}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    WhatsApp
                </button>
                <button class="share-option" onclick="shareToFacebook('${encodeURIComponent(shareUrl)}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Facebook
                </button>
                <button class="share-option" onclick="shareToTwitter('${encodeURIComponent(shareTitle)}', '${encodeURIComponent(shareUrl)}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Twitter / X
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) closeShareModal();
    });
}

function copyShareText(text) {
    navigator.clipboard.writeText(text).then(() => {
        const t = TRANSLATIONS[currentLanguage];
        showMessage(t.linkCopied, 'success');
    }).catch(() => {
        showMessage('❌ Fehler beim Kopieren', 'error');
    });
}

function shareToWhatsApp(text, url) {
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareToFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareToTwitter(text, url) {
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function closeShareModal() {
    // Schließt BEIDE Share Modals - aus Win/Fail oder vom Header
    const modal = document.querySelector('.share-modal-overlay');
    if (modal) modal.remove();
}

// ========== FAIL MODAL FUNKTIONALITÄT ==========

function showFailModal(word) {
    const t = TRANSLATIONS[currentLanguage];
    
    // Modal HTML erstellen
    const modal = document.createElement('div');
    modal.className = 'fail-modal-overlay';
    modal.innerHTML = `
        <div class="fail-modal">
            <div class="fail-header">
                <div class="fail-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </div>
                <h1 class="fail-title">${t.gameOver}</h1>
                <p class="fail-text">${t.nextOneBetter}</p>
            </div>
            
            <div class="fail-word">
                <p class="fail-word-label">${t.theWord}</p>
                <p class="fail-word-value">${word.toUpperCase()}</p>
            </div>
            
            <div class="fail-actions">
                <button class="fail-btn fail-btn-primary" onclick="startNewGameFromFailModal()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                    </svg>
                    <span>${t.tryAgain}</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Schließen bei Klick außerhalb
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeFailModal();
        }
    });
}

function startNewGameFromFailModal() {
    closeFailModal();
    const t = TRANSLATIONS[currentLanguage];
    if (init(true)) {
        showMessage(t.newGameStarted, 'success');
    }
}

function closeFailModal() {
    const modal = document.querySelector('.fail-modal-overlay');
    if (modal) {
        modal.classList.add('closing');
        setTimeout(() => modal.remove(), 300);
    }
}

// ========== WORT-ANFRAGE AN DASHBOARD ==========

const DASHBOARD_API = 'https://webcontrol-hq-api.karol-paschek.workers.dev';

// Zeigt Fehlermeldung + kleinen Anfrage-Button nebeneinander
function showMessageWithRequest(text, word, language) {
    const t = TRANSLATIONS[currentLanguage];

    // Alten Timeout sicher löschen
    if (message._hideTimeout) clearTimeout(message._hideTimeout);

    // Inline: Text + Button
    message.innerHTML = '';
    message.className = 'message error';

    const span = document.createElement('span');
    span.textContent = text;

    const btn = document.createElement('button');
    btn.textContent = t.requestWord;
    btn.style.cssText = [
        'margin-left:10px',
        'padding:2px 10px',
        'font-size:0.75em',
        'border:1px solid currentColor',
        'border-radius:12px',
        'background:transparent',
        'color:inherit',
        'cursor:pointer',
        'opacity:0.85',
        'transition:opacity 0.15s',
        'vertical-align:middle',
        'white-space:nowrap',
    ].join(';');
    btn.onmouseenter = () => btn.style.opacity = '1';
    btn.onmouseleave = () => btn.style.opacity = '0.85';
    btn.onclick = () => requestWord(word, language, btn);

    message.appendChild(span);
    message.appendChild(btn);

    // Auto-hide nach 5 Sekunden (etwas länger wegen Button)
    message._hideTimeout = setTimeout(() => {
        message.innerHTML = '';
        message.className = 'message';
    }, 5000);
}

async function requestWord(word, language, btn) {
    const t = TRANSLATIONS[currentLanguage];
    btn.disabled = true;
    btn.style.opacity = '0.5';

    try {
        const resp = await fetch(DASHBOARD_API + '/api/words', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                word:      word,
                language:  language,
                requested_at: new Date().toISOString(),
            }),
        });

        if (resp.ok) {
            // Erfolg: Button durch Checkmark ersetzen
            btn.textContent = t.requestSent;
            btn.style.opacity = '1';
        } else {
            btn.textContent = t.requestError;
            btn.disabled = false;
            btn.style.opacity = '0.85';
        }
    } catch (e) {
        btn.textContent = t.requestError;
        btn.disabled = false;
        btn.style.opacity = '0.85';
    }
}

// Spiel starten
init();