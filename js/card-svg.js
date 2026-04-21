// ============================================
// PLAYING CARD SVG DESIGNS
// Professional poker card designs
// ============================================

const CardSVG = {
    // Card suits
    suits: {
        hearts: {
            symbol: '♥',
            color: '#E53935',
            path: 'M 60 45 C 60 35, 50 30, 45 30 C 40 30, 35 35, 35 40 C 35 35, 30 30, 25 30 C 20 30, 10 35, 10 45 C 10 60, 35 75, 35 75 C 35 75, 60 60, 60 45 Z'
        },
        diamonds: {
            symbol: '♦',
            color: '#E53935',
            path: 'M 35 30 L 60 50 L 35 70 L 10 50 Z'
        },
        clubs: {
            symbol: '♣',
            color: '#212121',
            path: 'M 35 30 C 35 30, 30 30, 30 35 C 30 40, 35 42, 35 42 C 30 42, 25 42, 25 47 C 25 52, 30 55, 35 55 C 32 55, 30 60, 32 65 L 38 65 C 40 60, 38 55, 35 55 C 40 55, 45 52, 45 47 C 45 42, 40 42, 35 42 C 35 42, 40 40, 40 35 C 40 30, 35 30, 35 30 Z'
        },
        spades: {
            symbol: '♠',
            color: '#212121',
            path: 'M 35 30 C 35 30, 25 40, 15 50 C 10 55, 15 60, 20 60 C 25 60, 30 57, 32 55 C 30 60, 32 65, 32 65 L 38 65 C 38 65, 40 60, 38 55 C 40 57, 45 60, 50 60 C 55 60, 60 55, 55 50 C 45 40, 35 30, 35 30 Z'
        }
    },

    // Card ranks with values
    ranks: [
        { id: 'A', name: 'Ace', value: 1, display: 'A' },
        { id: '2', name: 'Two', value: 2, display: '2' },
        { id: '3', name: 'Three', value: 3, display: '3' },
        { id: '4', name: 'Four', value: 4, display: '4' },
        { id: '5', name: 'Five', value: 5, display: '5' },
        { id: '6', name: 'Six', value: 6, display: '6' },
        { id: '7', name: 'Seven', value: 7, display: '7' },
        { id: '8', name: 'Eight', value: 8, display: '8' },
        { id: '9', name: 'Nine', value: 9, display: '9' },
        { id: '10', name: 'Ten', value: 10, display: '10' },
        { id: 'J', name: 'Jack', value: 11, display: 'J' },
        { id: 'Q', name: 'Queen', value: 12, display: 'Q' },
        { id: 'K', name: 'King', value: 13, display: 'K' }
    ],

    // Generate card back design
    getCardBack() {
        return `
            <svg width="140" height="200" viewBox="0 0 140 200" xmlns="http://www.w3.org/2000/svg">
                <!-- Card border -->
                <rect x="2" y="2" width="136" height="196" rx="8" fill="white" stroke="#333" stroke-width="2"/>
                
                <!-- Inner border -->
                <rect x="8" y="8" width="124" height="184" rx="6" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/>
                
                <!-- Pattern -->
                <pattern id="cardPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="3" fill="#0D47A1" opacity="0.3"/>
                </pattern>
                <rect x="10" y="10" width="120" height="180" rx="5" fill="url(#cardPattern)"/>
                
                <!-- Center diamond design -->
                <g transform="translate(70, 100)">
                    <rect x="-25" y="-35" width="50" height="70" rx="5" fill="none" stroke="#FFF" stroke-width="2" opacity="0.5"/>
                    <rect x="-20" y="-30" width="40" height="60" rx="4" fill="none" stroke="#FFF" stroke-width="2" opacity="0.3"/>
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#FFF" stroke-width="2" opacity="0.6"/>
                </g>
            </svg>
        `;
    },

    // Generate Joker card
    getJokerCard() {
        return `
            <svg width="140" height="200" viewBox="0 0 140 200" xmlns="http://www.w3.org/2000/svg">
                <!-- Card border -->
                <rect x="2" y="2" width="136" height="196" rx="8" fill="white" stroke="#333" stroke-width="2"/>
                
                <!-- Top-left corner -->
                <text x="15" y="32" font-family="Arial, sans-serif" font-size="26" font-weight="bold" 
                      fill="#9C27B0" text-anchor="middle">★</text>
                
                <!-- Bottom-right corner (rotated) -->
                <g transform="translate(125, 168) rotate(180)">
                    <text x="0" y="32" font-family="Arial, sans-serif" font-size="26" font-weight="bold" 
                          fill="#9C27B0" text-anchor="middle">★</text>
                </g>
                
                <!-- Center design -->
                <g transform="translate(70, 100)">
                    <!-- Large star -->
                    <path d="M 0,-35 L 8,-10 L 35,-10 L 13,5 L 21,30 L 0,13 L -21,30 L -13,5 L -35,-10 L -8,-10 Z" 
                          fill="#9C27B0" stroke="#7B1FA2" stroke-width="2"/>
                    
                    <!-- Inner accent -->
                    <circle cx="0" cy="0" r="8" fill="white" opacity="0.9"/>
                    <text x="0" y="6" font-family="Arial, sans-serif" font-size="14" font-weight="bold"
                          fill="#9C27B0" text-anchor="middle">J</text>
                </g>
                
                <!-- "JOKER" text -->
                <text x="70" y="170" font-family="Arial, sans-serif" font-size="16" font-weight="bold"
                      fill="#9C27B0" text-anchor="middle">JOKER</text>
            </svg>
        `;
    },

    // Generate card face
    getCardFace(rank, suit) {
        // Handle Joker card
        if (rank === 'JOKER' || suit === 'joker') {
            return this.getJokerCard();
        }

        const suitInfo = this.suits[suit];
        const rankInfo = this.ranks.find(r => r.id === rank);
        
        if (!suitInfo || !rankInfo) {
            return this.getCardBack();
        }

        return `
            <svg width="140" height="200" viewBox="0 0 140 200" xmlns="http://www.w3.org/2000/svg">
                <!-- Card border -->
                <rect x="2" y="2" width="136" height="196" rx="8" fill="white" stroke="#333" stroke-width="2"/>
                
                <!-- Top-left corner -->
                <text x="15" y="30" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
                      fill="${suitInfo.color}" text-anchor="middle">${rankInfo.display}</text>
                <text x="15" y="50" font-family="Arial, sans-serif" font-size="20" 
                      fill="${suitInfo.color}" text-anchor="middle">${suitInfo.symbol}</text>
                
                <!-- Bottom-right corner (rotated) -->
                <g transform="translate(125, 170) rotate(180)">
                    <text x="0" y="20" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
                          fill="${suitInfo.color}" text-anchor="middle">${rankInfo.display}</text>
                    <text x="0" y="40" font-family="Arial, sans-serif" font-size="20" 
                          fill="${suitInfo.color}" text-anchor="middle">${suitInfo.symbol}</text>
                </g>
                
                <!-- Center suit symbol -->
                <g transform="translate(70, 100) scale(1.8) translate(-35, -52.5)">
                    <path d="${suitInfo.path}" fill="${suitInfo.color}"/>
                </g>
            </svg>
        `;
    },

    // Get all possible cards
    getAllCards() {
        const cards = [];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        
        // Add regular cards
        suits.forEach(suit => {
            this.ranks.forEach(rank => {
                cards.push({
                    id: `${rank.id}_${suit}`,
                    rank: rank.id,
                    suit: suit,
                    value: rank.value,
                    display: rank.display,
                    name: `${rank.name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
                    isJoker: false
                });
            });
        });
        
        // Add 2 Joker cards
        cards.push({
            id: 'JOKER_1',
            rank: 'JOKER',
            suit: 'joker',
            value: 0, // Special value for Joker (bypasses comparison)
            display: 'JOKER',
            name: 'Joker',
            isJoker: true
        });
        cards.push({
            id: 'JOKER_2',
            rank: 'JOKER',
            suit: 'joker',
            value: 0,
            display: 'JOKER',
            name: 'Joker',
            isJoker: true
        });
        
        return cards;
    },

    // Get random card
    getRandomCard(excludeCards = []) {
        const allCards = this.getAllCards();
        const excludeIds = excludeCards.map(c => c.id);
        const availableCards = allCards.filter(c => !excludeIds.includes(c.id));
        
        if (availableCards.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        return availableCards[randomIndex];
    }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CardSVG = CardSVG;
}
