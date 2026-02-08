import { TERMS } from '../data/terms.js';
import { assertTermsSchema } from '../domain/termSchema.js';

const termStore = assertTermsSchema(TERMS);

export function getAllTerms() {
  return termStore;
}

export function getTermsByCategory(category) {
  if (!category || category === 'all') return termStore;
  return termStore.filter((term) => term.category === category);
}

export function getTermsByDifficulty(level) {
  if (level === 'all') return termStore;
  return termStore.filter((term) => term.difficulty === level);
}

export function getTermsByIds(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const idSet = new Set(ids);
  return termStore.filter((term) => idSet.has(term.id));
}
