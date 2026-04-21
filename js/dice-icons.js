// ============================================
// SVG DICE ICONS
// Clean, minimal SVG dice icons for each type
// ============================================

const DiceIcons = {
    // D4 - Tetrahedron (pyramid)
    d4: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 6L6 38H42L24 6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M24 6L24 38" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
            <path d="M6 38L24 6L42 38" stroke="currentColor" stroke-width="1" opacity="0.2"/>
        </svg>
    `,

    // D6 - Cube (standard die)
    d6: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Square die face -->
            <rect x="12" y="12" width="24" height="24" rx="3" stroke="currentColor" stroke-width="2"/>
            <!-- Six dots in classic arrangement -->
            <circle cx="18" cy="18" r="1.8" fill="currentColor"/>
            <circle cx="18" cy="24" r="1.8" fill="currentColor"/>
            <circle cx="18" cy="30" r="1.8" fill="currentColor"/>
            <circle cx="30" cy="18" r="1.8" fill="currentColor"/>
            <circle cx="30" cy="24" r="1.8" fill="currentColor"/>
            <circle cx="30" cy="30" r="1.8" fill="currentColor"/>
        </svg>
    `,

    // D8 - Octahedron (8-sided)
    d8: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 6L38 24L24 42L10 24L24 6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M10 24H38" stroke="currentColor" stroke-width="2"/>
            <path d="M24 6V42" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
        </svg>
    `,

    // D10 - Pentagonal trapezohedron
    d10: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L36 14L38 28L24 44L10 28L12 14L24 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 14L24 24L36 14" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M10 28L24 24L38 28" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M24 4V24" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
        </svg>
    `,

    // D12 - Dodecahedron (12-sided)
    d12: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 6L34 12L38 22V26L34 36L24 42L14 36L10 26V22L14 12L24 6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M14 12L24 18L34 12" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M14 36L24 30L34 36" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M10 22H18" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
            <path d="M30 22H38" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
        </svg>
    `,

    // D20 - Icosahedron (20-sided)
    d20: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L36 14L40 26L32 38L16 38L8 26L12 14L24 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 14L24 24L36 14" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M16 38L24 24L32 38" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M8 26L24 24L40 26" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
            <circle cx="24" cy="16" r="2" fill="currentColor" opacity="0.5"/>
        </svg>
    `,

    // D100 - Percentile die (sphere with % symbol)
    d100: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2"/>
            <circle cx="18" cy="16" r="2.5" fill="currentColor"/>
            <circle cx="30" cy="32" r="2.5" fill="currentColor"/>
            <line x1="19" y1="17" x2="29" y2="31" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 26C12 26 14 32 14 32" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
            <path d="M36 16C36 16 34 22 34 22" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
        </svg>
    `,

    // Get SVG for a specific dice type
    getSVG(diceType) {
        return this[diceType] || this.d6; // Default to d6 if not found
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiceIcons;
}
