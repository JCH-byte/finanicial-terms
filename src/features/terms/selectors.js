export function filterTermsBySearchAndDifficulty(terms, searchTerm, activeLevel) {
    if (!Array.isArray(terms)) return [];

    const normalizedSearchTerm = searchTerm?.trim() ?? '';
    if (normalizedSearchTerm) {
        const lowered = normalizedSearchTerm.toLowerCase();
        return terms.filter(
            (item) =>
                item.term.includes(normalizedSearchTerm) ||
                (item.englishTerm && item.englishTerm.toLowerCase().includes(lowered)),
        );
    }

    if (activeLevel === 'all') return terms;
    return terms.filter((item) => item.difficulty === activeLevel);
}

export function filterTermsByDifficulty(terms, level) {
    if (!Array.isArray(terms)) return [];
    if (level === 'all') return terms;
    return terms.filter((item) => item.difficulty === level);
}
