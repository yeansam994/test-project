// ============================================
// ANIMATION ENGINE
// Handles pseudo-3D dice rolling animations
// ============================================

class AnimationEngine {
    constructor() {
        this.container = null;
        this.isAnimating = false;
        this.animatedDice = [];
    }

    // Initialize animation container
    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Animation container not found');
        }
    }

    // Play roll animation
    async playRollAnimation(results) {
        if (!this.container || this.isAnimating) {
            return;
        }

        this.isAnimating = true;
        this.container.classList.add('active');

        // Clear previous animations
        this.clearAnimations();

        // Create single animated die (no value shown)
        this.createSingleAnimatedDie();

        // Wait for animation to complete
        const animationDuration = 1200;
        await this.wait(animationDuration);

        // Clean up
        this.fadeOutDice();
        await this.wait(300);
        
        this.clearAnimations();
        this.container.classList.remove('active');
        this.isAnimating = false;
    }

    // Create single animated die (generic, no value shown)
    createSingleAnimatedDie() {
        const die = document.createElement('div');
        die.className = 'animated-die single-die';
        
        // Use generic dice icon (🎲)
        die.innerHTML = '🎲';

        this.container.appendChild(die);
        this.animatedDice.push(die);
    }

    // Fade out all animated dice
    fadeOutDice() {
        this.animatedDice.forEach(die => {
            die.classList.add('fade-out');
        });
    }

    // Clear all animations
    clearAnimations() {
        this.animatedDice.forEach(die => {
            if (die.parentNode) {
                die.parentNode.removeChild(die);
            }
        });
        this.animatedDice = [];
    }

    // Generate random number in range
    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Wait utility
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Check if animation is playing
    isPlaying() {
        return this.isAnimating;
    }

    // Cancel current animation
    cancel() {
        if (this.isAnimating) {
            this.fadeOutDice();
            setTimeout(() => {
                this.clearAnimations();
                this.container.classList.remove('active', 'simple-mode');
                this.isAnimating = false;
            }, 300);
        }
    }

    // Update animation based on device performance
    updatePerformanceMode() {
        const isLowEnd = DEVICE_CAPABILITIES.isLowEnd();
        if (isLowEnd && this.container) {
            this.container.classList.add('low-performance');
        } else if (this.container) {
            this.container.classList.remove('low-performance');
        }
    }
}

// Create global animation engine instance
const animationEngine = new AnimationEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationEngine;
}
