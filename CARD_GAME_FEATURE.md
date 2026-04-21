# Card Game Feature - Higher or Lower

## 🎮 Game Overview

A classic card guessing game where players predict whether the next card will be higher or lower than the current card. Built with poker card format and professional SVG designs.

---

## 🃏 Game Mechanics

### How to Play

1. **Start**: Two cards are dealt
   - **Current Card**: Face-up, value visible
   - **Mystery Card**: Face-down, hidden

2. **Make Your Guess**: 
   - Click **LOWER** if you think the mystery card has a lower value
   - Click **HIGHER** if you think the mystery card has a higher value

3. **Reveal**:
   - Mystery card flips over with animation
   - Result is shown immediately

4. **Scoring**:
   - ✓ **Correct Guess**: +1 point, continue playing
   - ✗ **Wrong Guess**: Game over, start new game
   - **Equal Values**: Counts as wrong

5. **Continue**: After correct guess, mystery card becomes the new current card

---

## 🎨 Card Design

### Poker Card System

**Card Values** (Low to High):
- A (Ace) = 1
- 2-10 = Face value
- J (Jack) = 11
- Q (Queen) = 12
- K (King) = 13

**Suits**:
- ♥ Hearts (Red)
- ♦ Diamonds (Red)
- ♣ Clubs (Black)
- ♠ Spades (Black)

**Total Cards**: 52 (13 ranks × 4 suits)

### SVG Card Design Features

#### Card Face
- Professional poker card layout
- Top-left corner: Rank + Suit
- Bottom-right corner: Rank + Suit (rotated 180°)
- Center: Large suit symbol
- White background with black border
- Color-coded suits (red/black)

#### Card Back
- Blue gradient pattern
- Geometric design with circles
- White decorative frame
- Professional casino-style appearance

---

## 💻 Technical Implementation

### Files Created

**`js/card-svg.js`** - Card SVG Generator
- `CardSVG.suits`: Suit definitions with colors and SVG paths
- `CardSVG.ranks`: All 13 card ranks with values
- `CardSVG.getCardFace(rank, suit)`: Generate card face SVG
- `CardSVG.getCardBack()`: Generate card back SVG
- `CardSVG.getAllCards()`: Get all 52 cards
- `CardSVG.getRandomCard(excludeCards)`: Random card selection

### Modified Files

**`index.html`**
- Added Card Game navigation menu item (🃏)
- Added card game feature container
- Structure includes:
  - Card display section (visible + hidden cards)
  - Game info section (status + score)
  - Guess section (LOWER/HIGHER buttons + New Game)
- Added `card-svg.js` script reference

**`css/styles.css`**
- `.card-display-section`: Card layout container
- `.cards-container`: Flex container for two cards
- `.card-wrapper`: Individual card wrapper with label
- `.card`: 140×200px card styling
- `.game-status`: Dynamic status messages (correct/wrong)
- `.score-display`: Score counter with label
- `.guess-buttons`: LOWER/HIGHER button container
- `.guess-button`: Large touch-friendly buttons (80px height)
- `.new-game-button`: Restart game button
- **Animations**:
  - `cardFlip`: 3D flip animation (0.6s)
  - `cardShake`: Shake effect on wrong guess (0.5s)

**`js/navigation.js`**
- Added `card-game` to feature containers
- Added "Card Game" to header titles
- Implemented `initCardGame()` method with full game logic:
  - `startNewGame()`: Reset score and deal cards
  - `dealNewCards()`: Generate and display new cards
  - `makeGuess(guess)`: Process player's guess
  - `showResult(isCorrect, currentValue, hiddenValue)`: Display outcome
  - `continueGame()`: Move to next round after correct guess
  - `updateScore()`: Update score display
  - `enableButtons()` / `disableButtons()`: Button state management

---

## 🎯 Game Features

### User Experience
- ✅ Clean, minimal interface
- ✅ Professional poker card designs
- ✅ Smooth flip animations (3D effect)
- ✅ Clear feedback (correct/wrong colors)
- ✅ Real-time score tracking
- ✅ Shake animation on wrong guess
- ✅ Touch-optimized buttons
- ✅ Instant card reveal

### Technical Features
- ✅ No duplicate cards in a round
- ✅ Random card generation
- ✅ Proper value comparison
- ✅ Tie handling (equal = wrong)
- ✅ Animation timing coordination
- ✅ Button disable during animations
- ✅ Lazy initialization (loads when accessed)
- ✅ Modular code structure

---

## 🎮 Game States

### 1. **Initial State**
- Current card: Random card (face-up)
- Mystery card: Random card (face-down)
- Status: "Will the mystery card be higher or lower?"
- Buttons: Enabled
- Score: 0

### 2. **Guessing**
- Player clicks LOWER or HIGHER
- Buttons disabled
- Card flip animation starts

### 3. **Reveal**
- Mystery card flips to show face
- Comparison happens
- Result displayed

### 4. **Correct Guess**
- ✓ Green success message
- Score increments
- After 1.5s: Mystery card moves to current position
- New mystery card dealt
- Game continues

### 5. **Wrong Guess**
- ✗ Red error message
- Shake animation on card
- Score stays same
- New Game button available
- Must restart to play again

---

## 🎨 Visual Design

### Color Scheme
- **Correct**: `#4CAF50` (Green)
- **Wrong**: `#E53935` (Red)
- **Hearts/Diamonds**: `#E53935` (Red)
- **Clubs/Spades**: `#212121` (Black)
- **Card Back**: `#1565C0` (Blue)

### Typography
- **Card Rank**: 24px, Bold, Arial
- **Card Suit**: 20px, Arial
- **Status**: 1.125rem (18px), Medium weight
- **Score**: 1.5rem (24px), Bold
- **Buttons**: 1.25rem (20px), Bold

### Spacing
- Card size: 140×200px
- Gap between cards: 24px
- Button height: 80px
- Button gap: 16px

---

## 🚀 Usage

### Starting the Game
1. Open the app
2. Click burger menu (☰)
3. Select "Card Game" (🃏)
4. Game starts automatically

### Playing
1. Look at the current card value
2. Predict if mystery card is higher or lower
3. Click your guess
4. Watch the reveal
5. Continue if correct, restart if wrong

### Scoring
- Each correct guess = 1 point
- Try to achieve the highest score possible
- No maximum score - keep going!

---

## 🔄 Game Flow Diagram

```
START GAME
    ↓
Deal 2 Cards (1 visible, 1 hidden)
    ↓
Player Makes Guess (Higher/Lower)
    ↓
Reveal Hidden Card (Flip Animation)
    ↓
Compare Values
    ↓
    ├─→ CORRECT → +1 Score → Continue → New Hidden Card
    │                            ↑______________|
    │
    └─→ WRONG → Game Over → New Game Button
```

---

## 🎲 Integration with App

### Navigation
- **Menu Icon**: 🃏
- **Menu Label**: Card Game
- **Header Title**: Card Game
- **Feature ID**: `card-game`

### Feature Container
- ID: `cardGameFeature`
- Hidden by default
- Shown when selected from menu
- Lazy initialization on first access

---

## 📊 Statistics Potential (Future Enhancement)

Could track:
- Highest score
- Total games played
- Win rate
- Average streak length
- Most common guesses
- Card frequency analysis

---

## 🎯 Future Enhancements

### Gameplay
- [ ] Difficulty levels (different card ranges)
- [ ] Multiplayer mode (turn-based)
- [ ] Timed challenges
- [ ] Special cards (wild cards, bonus points)
- [ ] Card counting hints

### Features
- [ ] Sound effects (flip, correct, wrong)
- [ ] Leaderboard
- [ ] Achievement system
- [ ] Daily challenges
- [ ] Statistics dashboard
- [ ] Save/load game state
- [ ] Undo last guess
- [ ] Hint system

### Visual
- [ ] Different card deck themes
- [ ] Custom card backs
- [ ] More animations
- [ ] Confetti on high scores
- [ ] Card history view

---

*Feature implemented: April 20, 2026*
*Version: 1.0*
