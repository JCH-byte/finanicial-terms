export const filterTermsBySearch = (terms, query) => {
  if (!query) return terms;
  const normalizedQuery = query.toLowerCase();

  return terms.filter(
    (item) =>
      item.term.includes(query)
      || (item.englishTerm && item.englishTerm.toLowerCase().includes(normalizedQuery)),
  );
};

export const filterTermsByDifficulty = (terms, level) => {
  if (level === 'all') return terms;
  return terms.filter((item) => item.difficulty === level);
};

export const shuffleTerms = (terms) => {
  const shuffled = [...terms];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const pickQuizQuestion = (terms, usedIds = []) => {
  if (!terms.length) return null;

  const usedSet = new Set(usedIds);
  const pool = terms.filter((item) => !usedSet.has(item.id));
  const source = pool.length ? pool : terms;
  return source[Math.floor(Math.random() * source.length)];
};
