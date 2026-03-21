export type PasswordComplexityLevel = 'idle' | 'simple' | 'medium' | 'complex';

export type PasswordComplexityResult = {
    score: number;
    level: PasswordComplexityLevel;
};

function clamp(value: number, low: number, high: number): number {
    return Math.min(Math.max(value, low), high);
}

function getPasswordBytes(value: string): number[] {
    return Array.from(new TextEncoder().encode(value));
}

function prefixStats(bytes: number[]): { sumPi: number; maxPi: number; lastPi: number } {
    if (bytes.length === 0) {
        return { sumPi: 0, maxPi: 0, lastPi: 0 };
    }

    const pi = new Array(bytes.length).fill(0);
    let sumPi = 0;
    let maxPi = 0;

    for (let i = 1; i < bytes.length; i++) {
        let j = pi[i - 1];
        while (j > 0 && bytes[i] !== bytes[j]) {
            j = pi[j - 1];
        }
        if (bytes[i] === bytes[j]) {
            j++;
        }
        pi[i] = j;
        sumPi += j;
        if (j > maxPi) {
            maxPi = j;
        }
    }

    return { sumPi, maxPi, lastPi: pi[pi.length - 1] };
}

function hasExactPeriod(length: number, lastPi: number): boolean {
    if (!length) return false;
    const period = length - lastPi;
    return period < length && period > 0 && length % period === 0;
}

function longestPalindromeLen(bytes: number[]): number {
    if (!bytes.length) return 0;

    const transformed: number[] = [];
    for (const b of bytes) {
        transformed.push(-1, b);
    }
    transformed.push(-1);

    const radius = new Array(transformed.length).fill(0);
    let center = 0;
    let right = 0;
    let best = 1;

    for (let i = 0; i < transformed.length; i++) {
        if (i < right) {
            const mirror = 2 * center - i;
            radius[i] = Math.min(right - i, radius[mirror]);
        }

        while (
            i - 1 - radius[i] >= 0 &&
            i + 1 + radius[i] < transformed.length &&
            transformed[i - 1 - radius[i]] === transformed[i + 1 + radius[i]]
        ) {
            radius[i]++;
        }

        if (i + radius[i] > right) {
            center = i;
            right = i + radius[i];
        }
        if (radius[i] > best) {
            best = radius[i];
        }
    }

    return best;
}

function duplicateWindowCount(bytes: number[], window: number): number {
    if (bytes.length < window) return 0;

    const seen = new Set<string>();
    let duplicates = 0;
    for (let i = 0; i + window <= bytes.length; i++) {
        const key = bytes.slice(i, i + window).join('.');
        if (seen.has(key)) {
            duplicates++;
        } else {
            seen.add(key);
        }
    }

    return duplicates;
}

function longestConsecutiveRun(bytes: number[]): number {
    if (!bytes.length) return 0;

    let best = 1;
    let run = 1;
    let direction = 0;

    for (let i = 1; i < bytes.length; i++) {
        const diff = bytes[i] - bytes[i - 1];
        if (diff === 1) {
            run = direction >= 0 ? run + 1 : 2;
            direction = 1;
        } else if (diff === -1) {
            run = direction <= 0 ? run + 1 : 2;
            direction = -1;
        } else {
            run = 1;
            direction = 0;
        }

        if (run > best) {
            best = run;
        }
    }

    return best;
}

function distinctByteCount(bytes: number[]): number {
    return new Set(bytes).size;
}

function scoreLength(length: number): number {
    if (length >= 48) return 32;
    if (length >= 40) return 30;
    if (length >= 32) return 28;
    if (length >= 24) return 14;
    return 4;
}

function scoreDistinct(distinct: number): number {
    if (distinct >= 20) return 18;
    if (distinct >= 16) return 10;
    if (distinct >= 13) return 4;
    return -10;
}

function scorePrefix(maxPi: number, sumPi: number): number {
    let score = 0;

    if (maxPi === 0) score += 14;
    else if (maxPi <= 1) score += 10;
    else if (maxPi <= 3) score += 5;
    else score -= 8;

    if (sumPi === 0) score += 8;
    else if (sumPi <= 2) score += 5;
    else if (sumPi <= 5) score += 2;
    else score -= 8;

    return score;
}

function scorePalindrome(longestPal: number): number {
    if (longestPal <= 3) return 14;
    if (longestPal === 4) return 6;
    if (longestPal === 5) return -4;
    return -18;
}

function scoreDuplicateWindows(dup3: number, dup4: number): number {
    let score = 0;
    if (dup3 === 0) score += 8;
    else score -= 10 + Math.min(dup3, 3) * 4;

    if (dup4 === 0) score += 8;
    else score -= 12 + Math.min(dup4, 3) * 5;

    return score;
}

function scoreMonotonicRun(longest: number): number {
    if (longest <= 2) return 10;
    if (longest === 3) return 4;
    if (longest === 4) return -12;
    return -22;
}

function hiddenGate(bytes: number[], sumPi: number, longestPal: number, dup4: number): boolean {
    const base = 257;
    const mod = 1000000007;
    let hash = 0;

    for (let i = 0; i < bytes.length; i++) {
        hash = (hash * base + bytes[i] + ((i % 7) + 1) * 11) % mod;
    }

    const gate = (hash + sumPi * 7 + longestPal * 13 + dup4 * 17 + bytes.length * 19) % 19;
    return gate === 0 || gate === 7 || gate === 13;
}

export function evaluatePasswordComplexity(password: string): PasswordComplexityResult {
    const bytes = getPasswordBytes(password);
    if (!bytes.length) {
        return { score: 0, level: 'idle' };
    }

    const { sumPi, maxPi, lastPi } = prefixStats(bytes);
    const longestPal = longestPalindromeLen(bytes);
    const dup3 = duplicateWindowCount(bytes, 3);
    const dup4 = duplicateWindowCount(bytes, 4);
    const mono = longestConsecutiveRun(bytes);
    const distinct = distinctByteCount(bytes);
    const period = hasExactPeriod(bytes.length, lastPi);

    let score = 0;
    score += scoreLength(bytes.length);
    score += scoreDistinct(distinct);
    score += scorePrefix(maxPi, sumPi);
    score += scorePalindrome(longestPal);
    score += scoreDuplicateWindows(dup3, dup4);
    score += scoreMonotonicRun(mono);
    if (period) {
        score -= 34;
    }
    score = clamp(score, 0, 100);

    let level: PasswordComplexityLevel = 'simple';
    if (score < 52) {
        level = 'simple';
    } else if (score < 84) {
        level = 'medium';
    } else if (hiddenGate(bytes, sumPi, longestPal, dup4)) {
        level = 'complex';
    } else {
        level = 'medium';
    }

    return { score, level };
}

function normalizeInBand(score: number, scoreMin: number, scoreMax: number, widthMin: number, widthMax: number): number {
    const bounded = clamp(score, scoreMin, scoreMax);
    if (scoreMax === scoreMin) {
        return widthMax;
    }

    const ratio = (bounded - scoreMin) / (scoreMax - scoreMin);
    return widthMin + (widthMax - widthMin) * ratio;
}

export function getPasswordComplexityWidth(result: PasswordComplexityResult): number {
    if (result.level === 'idle') {
        return 0;
    }

    if (result.level === 'simple') {
        return normalizeInBand(result.score, 0, 51, 10, 34);
    }

    if (result.level === 'medium') {
        return normalizeInBand(result.score, 52, 83, 40, 72);
    }

    return normalizeInBand(result.score, 84, 100, 78, 100);
}
