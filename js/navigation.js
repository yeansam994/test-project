// ============================================
// NAVIGATION CONTROLLER
// Handles menu toggling and feature switching
// ============================================

class NavigationController {
    constructor() {
        this.elements = {
            burgerMenu: null,
            sideNav: null,
            navOverlay: null,
            closeNavButton: null,
            navItems: null,
            appTitle: null,
            featureContainers: null
        };
        this.currentFeature = 'dice-roller';
    }

    // Initialize navigation
    init() {
        this.cacheElements();
        this.bindEvents();
        console.log('✅ Navigation controller initialized');
    }

    // Cache DOM elements
    cacheElements() {
        this.elements.burgerMenu = document.getElementById('burgerMenu');
        this.elements.sideNav = document.getElementById('sideNav');
        this.elements.navOverlay = document.getElementById('navOverlay');
        this.elements.closeNavButton = document.getElementById('closeNavButton');
        this.elements.appTitle = document.getElementById('appTitle');
        this.elements.navItems = document.querySelectorAll('.nav-item');
        this.elements.featureContainers = {
            'dice-roller': document.getElementById('diceRollerFeature'),
            'coin-tosser': document.getElementById('coinTosserFeature'),
            'card-game': document.getElementById('cardGameFeature')
        };
    }

    // Bind event listeners
    bindEvents() {
        // Open menu
        this.elements.burgerMenu.addEventListener('click', () => {
            this.openMenu();
        });

        // Close menu
        this.elements.closeNavButton.addEventListener('click', () => {
            this.closeMenu();
        });

        // Close menu when clicking overlay
        this.elements.navOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // Handle navigation item clicks
        this.elements.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const feature = item.getAttribute('data-feature');
                this.switchFeature(feature);
                this.closeMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.sideNav.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    // Open navigation menu
    openMenu() {
        this.elements.sideNav.classList.add('active');
        this.elements.navOverlay.classList.add('active');
        this.elements.burgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close navigation menu
    closeMenu() {
        this.elements.sideNav.classList.remove('active');
        this.elements.navOverlay.classList.remove('active');
        this.elements.burgerMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Switch between features
    switchFeature(featureName) {
        if (featureName === this.currentFeature) {
            return; // Already on this feature
        }

        // Hide current feature
        if (this.elements.featureContainers[this.currentFeature]) {
            this.elements.featureContainers[this.currentFeature].classList.remove('active');
        }

        // Show new feature
        if (this.elements.featureContainers[featureName]) {
            this.elements.featureContainers[featureName].classList.add('active');
        }

        // Update navigation active state
        this.elements.navItems.forEach(item => {
            if (item.getAttribute('data-feature') === featureName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update header title
        const titles = {
            'dice-roller': 'Dice Roller',
            'coin-tosser': 'Coin Tosser',
            'card-game': 'Card Game'
        };
        this.elements.appTitle.textContent = titles[featureName] || 'App';

        // Update current feature
        this.currentFeature = featureName;

        // Initialize feature if needed
        if (featureName === 'coin-tosser') {
            this.initCoinTosser();
        } else if (featureName === 'card-game') {
            this.initCardGame();
        }

        console.log(`Switched to: ${featureName}`);
    }

    // Initialize coin tosser
    initCoinTosser() {
        // Check if coin tosser is already initialized
        if (window.coinTosser && window.coinTosser.initialized) {
            return;
        }

        // Initialize coin tosser
        const tossButton = document.getElementById('tossButton');
        const coinResultContainer = document.getElementById('coinResultContainer');

        if (!tossButton || !coinResultContainer) {
            console.error('Coin tosser elements not found');
            return;
        }

        // Create coin tosser instance
        window.coinTosser = {
            initialized: true,
            isFlipping: false,

            toss() {
                if (this.isFlipping) {
                    return;
                }

                this.isFlipping = true;
                tossButton.disabled = true;

                // Random result: heads or tails
                const result = Math.random() < 0.5 ? 'heads' : 'tails';
                const displayText = result === 'heads' ? 'HEADS' : 'TAILS';

                // Clear previous result
                coinResultContainer.innerHTML = '';

                // Show coin animation with SVG
                const coinDisplay = document.createElement('div');
                coinDisplay.className = 'coin-display';
                
                // Use SVG design if available, fallback to emoji
                if (window.CoinSVG) {
                    coinDisplay.innerHTML = window.CoinSVG[result];
                } else {
                    // Fallback to emoji
                    const emoji = result === 'heads' ? '🟡' : '⚪';
                    coinDisplay.textContent = emoji;
                }
                
                coinResultContainer.appendChild(coinDisplay);

                // Show result text after animation
                setTimeout(() => {
                    const resultText = document.createElement('div');
                    resultText.className = 'coin-result-text';
                    resultText.textContent = displayText;
                    coinResultContainer.appendChild(resultText);

                    this.isFlipping = false;
                    tossButton.disabled = false;
                }, 600);
            }
        };

        // Bind toss button
        tossButton.addEventListener('click', () => {
            window.coinTosser.toss();
        });

        console.log('✅ Coin tosser initialized');
    }

    // Initialize card game
    initCardGame() {
        // Check if card game is already initialized
        if (window.cardGame && window.cardGame.initialized) {
            return;
        }

        // Get DOM elements
        const visibleCard = document.getElementById('visibleCard');
        const hiddenCard = document.getElementById('hiddenCard');
        const gameStatus = document.getElementById('gameStatus');
        const scoreValue = document.getElementById('scoreValue');
        const lowerButton = document.getElementById('lowerButton');
        const higherButton = document.getElementById('higherButton');
        const newGameButton = document.getElementById('newGameButton');

        if (!visibleCard || !hiddenCard || !gameStatus || !scoreValue || 
            !lowerButton || !higherButton || !newGameButton) {
            console.error('Card game elements not found');
            return;
        }

        // Create card game instance
        window.cardGame = {
            initialized: true,
            currentCard: null,
            hiddenCardData: null,
            score: 0,
            isAnimating: false,

            // Start new game
            startNewGame() {
                this.score = 0;
                this.updateScore();
                this.dealNewCards();
                gameStatus.className = 'game-status';
                gameStatus.innerHTML = '<p>Will the mystery card be higher or lower?</p>';
                this.enableButtons();
            },

            // Deal new cards
            dealNewCards() {
                if (!window.CardSVG) {
                    console.error('CardSVG not loaded');
                    return;
                }

                // Get a random card for visible card (must NOT be a Joker)
                do {
                    this.currentCard = window.CardSVG.getRandomCard();
                } while (this.currentCard.isJoker);

                // Get a random card for hidden card (can be any card including Joker)
                this.hiddenCardData = window.CardSVG.getRandomCard([this.currentCard]);

                // Display current card
                visibleCard.innerHTML = window.CardSVG.getCardFace(
                    this.currentCard.rank, 
                    this.currentCard.suit
                );

                // Display card back for hidden card
                hiddenCard.innerHTML = window.CardSVG.getCardBack();
                hiddenCard.classList.remove('flip-animation', 'shake-animation');
            },

            // Handle guess
            makeGuess(guess) {
                if (this.isAnimating) return;

                this.isAnimating = true;
                this.disableButtons();

                // Check if hidden card is a Joker (automatic win)
                const isJoker = this.hiddenCardData.isJoker;
                const currentValue = this.currentCard.value;
                const hiddenValue = this.hiddenCardData.value;
                let isCorrect = false;

                // Joker always wins (bypasses higher/lower rule)
                if (isJoker) {
                    isCorrect = true;
                } else {
                    // Normal card comparison logic
                    if (guess === 'lower' && hiddenValue < currentValue) {
                        isCorrect = true;
                    } else if (guess === 'higher' && hiddenValue > currentValue) {
                        isCorrect = true;
                    } else if (hiddenValue === currentValue) {
                        // Tie - count as wrong
                        isCorrect = false;
                    }
                }

                // Reveal the hidden card with animation
                setTimeout(() => {
                    hiddenCard.classList.add('flip-animation');
                    
                    setTimeout(() => {
                        hiddenCard.innerHTML = window.CardSVG.getCardFace(
                            this.hiddenCardData.rank,
                            this.hiddenCardData.suit
                        );
                    }, 300);
                }, 100);

                // Show result after animation
                setTimeout(() => {
                    this.showResult(isCorrect, currentValue, hiddenValue, isJoker);
                    this.isAnimating = false;

                    if (isCorrect) {
                        // Continue game - move hidden card to visible position
                        setTimeout(() => {
                            this.continueGame();
                        }, 1500);
                    } else {
                        // Game over - enable new game button
                        this.enableButtons();
                    }
                }, 800);
            },

            // Show result message
            showResult(isCorrect, currentValue, hiddenValue, isJoker = false) {
                // Special message for Joker
                if (isJoker) {
                    this.score++;
                    this.updateScore();
                    gameStatus.className = 'game-status correct';
                    gameStatus.innerHTML = `<p>🎉 JOKER! Free Win! 🎉</p>`;
                    return;
                }

                const comparison = hiddenValue === currentValue ? 'equal to' : 
                                 (hiddenValue > currentValue ? 'higher than' : 'lower than');
                
                if (isCorrect) {
                    this.score++;
                    this.updateScore();
                    gameStatus.className = 'game-status correct';
                    gameStatus.innerHTML = `<p>✓ Correct! ${this.hiddenCardData.display} is ${comparison} ${this.currentCard.display}</p>`;
                } else {
                    gameStatus.className = 'game-status wrong';
                    gameStatus.innerHTML = `<p>✗ Wrong! ${this.hiddenCardData.display} is ${comparison} ${this.currentCard.display}. Game Over!</p>`;
                    
                    // Shake animation on wrong guess
                    hiddenCard.classList.add('shake-animation');
                }
            },

            // Continue game after correct guess
            continueGame() {
                // If the revealed card was a Joker, deal completely new cards
                if (this.hiddenCardData.isJoker) {
                    this.dealNewCards();
                    gameStatus.className = 'game-status';
                    gameStatus.innerHTML = '<p>Will the mystery card be higher or lower?</p>';
                    this.enableButtons();
                    return;
                }

                // Move the revealed mystery card to become the new visible card
                this.currentCard = this.hiddenCardData;
                
                // Update visible card with the previous mystery card
                visibleCard.innerHTML = window.CardSVG.getCardFace(
                    this.currentCard.rank,
                    this.currentCard.suit
                );

                // Deal a new mystery card (excluding the current visible card)
                this.hiddenCardData = window.CardSVG.getRandomCard([this.currentCard]);
                
                // Reset hidden card to show back side
                hiddenCard.innerHTML = window.CardSVG.getCardBack();
                hiddenCard.classList.remove('flip-animation', 'shake-animation');

                // Reset status message
                gameStatus.className = 'game-status';
                gameStatus.innerHTML = '<p>Will the mystery card be higher or lower?</p>';
                
                this.enableButtons();
            },

            // Update score display
            updateScore() {
                scoreValue.textContent = this.score;
            },

            // Enable guess buttons
            enableButtons() {
                lowerButton.disabled = false;
                higherButton.disabled = false;
            },

            // Disable guess buttons
            disableButtons() {
                lowerButton.disabled = true;
                higherButton.disabled = true;
            }
        };

        // Bind event listeners
        lowerButton.addEventListener('click', () => {
            window.cardGame.makeGuess('lower');
        });

        higherButton.addEventListener('click', () => {
            window.cardGame.makeGuess('higher');
        });

        newGameButton.addEventListener('click', () => {
            window.cardGame.startNewGame();
        });

        // Start first game
        window.cardGame.startNewGame();

        console.log('✅ Card game initialized');
    }

    // Get current feature
    getCurrentFeature() {
        return this.currentFeature;
    }
}

// Create global navigation controller instance
const navigationController = new NavigationController();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.navigationController = navigationController;
}
