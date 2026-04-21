// ============================================
// DICE ROLLING ENGINE
// Handles random number generation and roll calculations
// ============================================

class DiceEngine {
    constructor() {
        this.rng = this.initializeRNG();
    }

    // Initialize random number generator
    initializeRNG() {
        // Use crypto API for better randomness if available
        if (window.crypto && window.crypto.getRandomValues) {
            return {
                random: () => {
                    const array = new Uint32Array(1);
                    window.crypto.getRandomValues(array);
                    return array[0] / (0xFFFFFFFF + 1);
                }
            };
        }
        
        // Fallback to Math.random
        return {
            random: () => Math.random()
        };
    }

    // Roll a single die
    rollDie(sides) {
        return Math.floor(this.rng.random() * sides) + 1;
    }

    // Roll multiple dice of the same type
    rollMultipleDice(sides, count) {
        const results = [];
        for (let i = 0; i < count; i++) {
            results.push(this.rollDie(sides));
        }
        return results;
    }

    // Roll dice based on configuration
    rollDiceConfig(diceConfig) {
        const results = {
            rolls: {},
            total: 0,
            breakdown: []
        };

        // Roll each dice type
        CONFIG.diceTypes.forEach(diceType => {
            const count = diceConfig[diceType.id];
            
            if (count > 0) {
                const rolls = this.rollMultipleDice(diceType.sides, count);
                const subtotal = rolls.reduce((sum, roll) => sum + roll, 0);

                results.rolls[diceType.id] = {
                    diceType: diceType.id,
                    sides: diceType.sides,
                    count: count,
                    rolls: rolls,
                    subtotal: subtotal,
                    label: diceType.label,
                    color: diceType.color
                };

                results.breakdown.push({
                    label: `${count}${diceType.label}`,
                    subtotal: subtotal
                });

                results.total += subtotal;
            }
        });

        results.timestamp = Date.now();
        results.diceCount = Object.values(diceConfig).reduce((sum, count) => sum + count, 0);

        return results;
    }

    // Re-roll last configuration
    reroll(lastResults) {
        if (!lastResults || !lastResults.rolls) {
            return null;
        }

        const diceConfig = {};
        Object.entries(lastResults.rolls).forEach(([diceId, data]) => {
            diceConfig[diceId] = data.count;
        });

        return this.rollDiceConfig(diceConfig);
    }

    // Calculate statistics for a set of rolls
    calculateStats(rolls) {
        if (!rolls || rolls.length === 0) {
            return null;
        }

        const sorted = [...rolls].sort((a, b) => a - b);
        const sum = rolls.reduce((acc, val) => acc + val, 0);
        const mean = sum / rolls.length;
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        
        const median = rolls.length % 2 === 0
            ? (sorted[rolls.length / 2 - 1] + sorted[rolls.length / 2]) / 2
            : sorted[Math.floor(rolls.length / 2)];

        return {
            min,
            max,
            mean,
            median,
            sum,
            count: rolls.length
        };
    }

    // Validate dice configuration
    validateConfig(diceConfig) {
        const errors = [];
        
        // Check if any dice selected
        const totalDice = Object.values(diceConfig).reduce((sum, count) => sum + count, 0);
        if (totalDice === 0) {
            errors.push('No dice selected');
        }

        // Check individual dice counts
        Object.entries(diceConfig).forEach(([diceId, count]) => {
            if (count < CONFIG.counter.min) {
                errors.push(`${diceId}: count below minimum (${CONFIG.counter.min})`);
            }
            if (count > CONFIG.counter.max) {
                errors.push(`${diceId}: count above maximum (${CONFIG.counter.max})`);
            }
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Generate roll summary text
    generateRollSummary(results) {
        if (!results) {
            return '';
        }

        let summary = `Total: ${results.total}\n`;
        
        Object.entries(results.rolls).forEach(([diceId, data]) => {
            summary += `${data.count}${data.label}: ${data.rolls.join(', ')} = ${data.subtotal}\n`;
        });

        return summary;
    }

    // Test RNG quality (for debugging)
    testRNG(sides = 6, iterations = 10000) {
        const distribution = {};
        for (let i = 1; i <= sides; i++) {
            distribution[i] = 0;
        }

        for (let i = 0; i < iterations; i++) {
            const roll = this.rollDie(sides);
            distribution[roll]++;
        }

        const expected = iterations / sides;
        const results = {};
        
        Object.entries(distribution).forEach(([value, count]) => {
            results[value] = {
                count,
                percentage: (count / iterations * 100).toFixed(2),
                deviation: ((count - expected) / expected * 100).toFixed(2)
            };
        });

        return results;
    }
}

// Create global dice engine instance
const diceEngine = new DiceEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiceEngine;
}
