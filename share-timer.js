// Timer & Share Funktionalität für Wordify
class GameTimer {
    constructor() {
        this.startTime = null;
        this.endTime = null;
        this.timerInterval = null;
        this.timerElement = document.getElementById('timer');
    }

    start() {
        this.startTime = Date.now();
        this.endTime = null;
        this.updateDisplay();
        this.timerInterval = setInterval(() => this.updateDisplay(), 100);
    }

    stop() {
        this.endTime = Date.now();
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        return this.getElapsedTime();
    }

    reset() {
        this.startTime = null;
        this.endTime = null;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.updateDisplay();
    }

    getElapsedTime() {
        if (!this.startTime) return 0;
        const endTime = this.endTime || Date.now();
        return Math.floor((endTime - this.startTime) / 1000);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        if (this.timerElement) {
            const elapsed = this.getElapsedTime();
            this.timerElement.textContent = this.formatTime(elapsed);
        }
    }
}

// Share-Funktionalität
class GameShare {
    constructor() {
        this.translations = {
            de: {
                shareTitle: 'Wordify',
                shareButton: 'Teilen',
                copyButton: 'Kopieren',
                copiedSuccess: '✓ Kopiert!',
                shareText: (attempts, time) => `Wordify ${attempts}/6 in ${time}`,
                downloadButton: 'Als Bild speichern'
            },
            en: {
                shareTitle: 'Wordify',
                shareButton: 'Share',
                copyButton: 'Copy',
                copiedSuccess: '✓ Copied!',
                shareText: (attempts, time) => `Wordify ${attempts}/6 in ${time}`,
                downloadButton: 'Save as Image'
            },
            es: {
                shareTitle: 'Wordify',
                shareButton: 'Compartir',
                copyButton: 'Copiar',
                copiedSuccess: '✓ Copiado!',
                shareText: (attempts, time) => `Wordify ${attempts}/6 en ${time}`,
                downloadButton: 'Guardar como imagen'
            },
            fr: {
                shareTitle: 'Wordify',
                shareButton: 'Partager',
                copyButton: 'Copier',
                copiedSuccess: '✓ Copié!',
                shareText: (attempts, time) => `Wordify ${attempts}/6 en ${time}`,
                downloadButton: 'Enregistrer comme image'
            },
            it: {
                shareTitle: 'Wordify',
                shareButton: 'Condividi',
                copyButton: 'Copia',
                copiedSuccess: '✓ Copiato!',
                shareText: (attempts, time) => `Wordify ${attempts}/6 in ${time}`,
                downloadButton: 'Salva come immagine'
            }
        };
    }

    generateEmojiGrid(guesses) {
        // Erstelle Emoji-Grid wie echtes Wordle
        return guesses.map(guess => {
            return guess.map(tile => {
                if (tile.state === 'correct') return '🟩';
                if (tile.state === 'present') return '🟨';
                return '⬜';
            }).join('');
        }).join('\n');
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback für ältere Browser
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            return success;
        }
    }

    createShareText(attempts, time, emojiGrid, lang = 'de') {
        const t = this.translations[lang];
        const formattedTime = this.formatTime(time);
        return `${t.shareText(attempts, formattedTime)}\n\n${emojiGrid}\n\n🎮 wordify.pages.dev`;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    async shareResults(guesses, attempts, time, won, lang = 'de') {
        const emojiGrid = this.generateEmojiGrid(guesses);
        const shareText = this.createShareText(attempts, time, emojiGrid, lang);

        // Web Share API wenn verfügbar
        if (navigator.share) {
            try {
                await navigator.share({
                    text: shareText
                });
                return true;
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share failed:', err);
                }
            }
        }

        // Fallback: Copy to Clipboard
        return await this.copyToClipboard(shareText);
    }

    // Screenshot-Funktion für visuelles Teilen
    async generateScreenshot(boardElement, word, attempts, time, won, lang = 'de') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Canvas-Größe für Social Media optimiert
        canvas.width = 600;
        canvas.height = 700;

        // Hintergrund
        const isDark = document.body.classList.contains('dark-theme');
        ctx.fillStyle = isDark ? '#1e293b' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header
        ctx.fillStyle = isDark ? '#ffffff' : '#1e293b';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Wordify', 300, 60);

        // Stats
        ctx.font = '24px Arial';
        const statsText = won 
            ? `${attempts}/6 in ${this.formatTime(time)} ⏱️`
            : `X/6 in ${this.formatTime(time)} ⏱️`;
        ctx.fillText(statsText, 300, 110);

        // Board nachzeichnen
        const tiles = boardElement.querySelectorAll('.tile');
        const tileSize = 60;
        const gap = 8;
        const startX = (canvas.width - (5 * tileSize + 4 * gap)) / 2;
        const startY = 150;

        tiles.forEach((tile, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            const x = startX + col * (tileSize + gap);
            const y = startY + row * (tileSize + gap);

            // Tile-Hintergrund
            const state = tile.dataset.state;
            if (state === 'correct') {
                ctx.fillStyle = '#6aaa64';
            } else if (state === 'present') {
                ctx.fillStyle = '#c9b458';
            } else if (state === 'absent') {
                ctx.fillStyle = '#787c7e';
            } else {
                ctx.fillStyle = isDark ? '#3a3a3c' : '#d3d6da';
            }
            
            ctx.fillRect(x, y, tileSize, tileSize);

            // Border
            ctx.strokeStyle = isDark ? '#565758' : '#878a8c';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, tileSize, tileSize);

            // Buchstabe
            const letter = tile.textContent;
            if (letter) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 32px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(letter, x + tileSize / 2, y + tileSize / 2);
            }
        });

        // Footer
        ctx.fillStyle = isDark ? '#ffffff' : '#1e293b';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('wordify.pages.dev', 300, 650);

        return canvas;
    }

    async downloadScreenshot(canvas, filename = 'wordify-result.png') {
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                URL.revokeObjectURL(url);
                resolve(true);
            });
        });
    }
}

// Globale Instanzen
const gameTimer = new GameTimer();
const gameShare = new GameShare();

// Export für Verwendung in anderen Scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameTimer, GameShare };
}
