import { Library, UserConstraints } from "../types";

export function calculateTier(library: Library, constraints: UserConstraints): string {
    let score = library.baseAIScore;

    // Speed Penalty
    // If user wants lightweight but library is heavy, heavily penalize
    if (constraints.speed === 'lightweight' && library.tags.speed === 'heavy') {
        score -= 20;
    }

    // Animation Bonus
    // If user wants complex animation and library is built for it, boost score
    if (constraints.animation === 'complex' && library.tags.animation === 'complex') {
        score += 10;
    }

    // AI Filter
    // If user relies 100% on AI, we need to be stricter.
    // Any library that falls below 80 (mid-Tier B) is considered too risky (Tier C) for pure AI generation.
    if (constraints.aiReliance === 'ai' && score < 80) {
        return 'C';
    }

    // Return Tier based on final score
    if (score >= 95) return 'S';
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    return 'C';
}
