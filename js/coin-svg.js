// ============================================
// COIN SVG DESIGNS
// Professional SVG coin designs for heads and tails
// ============================================

const CoinSVG = {
    // Heads side - Golden coin with star emblem
    heads: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer ring -->
            <circle cx="100" cy="100" r="95" fill="#FFD700" stroke="#B8860B" stroke-width="3"/>
            
            <!-- Inner ring -->
            <circle cx="100" cy="100" r="85" fill="none" stroke="#B8860B" stroke-width="2"/>
            
            <!-- Ridges around edge -->
            <circle cx="100" cy="100" r="92" fill="none" stroke="#DAA520" stroke-width="1" stroke-dasharray="8 4"/>
            
            <!-- Center emblem circle -->
            <circle cx="100" cy="100" r="70" fill="#FFC700" stroke="#B8860B" stroke-width="2"/>
            
            <!-- Star emblem -->
            <path d="M 100 40 L 110 75 L 145 80 L 117 105 L 125 140 L 100 120 L 75 140 L 83 105 L 55 80 L 90 75 Z" 
                  fill="#B8860B" stroke="#8B6914" stroke-width="2"/>
            
            <!-- Highlight effect -->
            <ellipse cx="80" cy="70" rx="20" ry="15" fill="white" opacity="0.3"/>
            
            <!-- Text "HEADS" curved on top -->
            <path id="headsTextPath" d="M 40 100 A 60 60 0 0 1 160 100" fill="none"/>
            <text font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#8B6914" letter-spacing="2">
                <textPath href="#headsTextPath" startOffset="50%" text-anchor="middle">
                    HEADS
                </textPath>
            </text>
            
            <!-- Year at bottom -->
            <text x="100" y="170" font-family="Arial, sans-serif" font-size="12" font-weight="bold" 
                  fill="#8B6914" text-anchor="middle">2026</text>
        </svg>
    `,

    // Tails side - Silver/grey coin with shield emblem
    tails: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer ring -->
            <circle cx="100" cy="100" r="95" fill="#C0C0C0" stroke="#808080" stroke-width="3"/>
            
            <!-- Inner ring -->
            <circle cx="100" cy="100" r="85" fill="none" stroke="#808080" stroke-width="2"/>
            
            <!-- Ridges around edge -->
            <circle cx="100" cy="100" r="92" fill="none" stroke="#A9A9A9" stroke-width="1" stroke-dasharray="8 4"/>
            
            <!-- Center emblem circle -->
            <circle cx="100" cy="100" r="70" fill="#D3D3D3" stroke="#808080" stroke-width="2"/>
            
            <!-- Shield emblem -->
            <path d="M 100 45 L 65 60 L 65 100 Q 65 130 100 150 Q 135 130 135 100 L 135 60 Z" 
                  fill="#808080" stroke="#606060" stroke-width="2"/>
            
            <!-- Shield detail - cross pattern -->
            <line x1="100" y1="55" x2="100" y2="140" stroke="#A9A9A9" stroke-width="3"/>
            <line x1="75" y1="85" x2="125" y2="85" stroke="#A9A9A9" stroke-width="3"/>
            
            <!-- Highlight effect -->
            <ellipse cx="75" cy="65" rx="20" ry="15" fill="white" opacity="0.4"/>
            
            <!-- Text "TAILS" curved on top -->
            <path id="tailsTextPath" d="M 40 100 A 60 60 0 0 1 160 100" fill="none"/>
            <text font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#606060" letter-spacing="2">
                <textPath href="#tailsTextPath" startOffset="50%" text-anchor="middle">
                    TAILS
                </textPath>
            </text>
            
            <!-- Year at bottom -->
            <text x="100" y="170" font-family="Arial, sans-serif" font-size="12" font-weight="bold" 
                  fill="#606060" text-anchor="middle">2026</text>
        </svg>
    `
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CoinSVG = CoinSVG;
}
