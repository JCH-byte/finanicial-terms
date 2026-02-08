const REQUIRED_STRING_FIELDS = ['term', 'definition', 'category'];
const OPTIONAL_STRING_FIELDS = ['englishTerm', 'description'];

export function isValidDifficulty(value) {
  return Number.isInteger(value) && value >= 1 && value <= 3;
}

export function validateTermShape(term) {
  if (!term || typeof term !== 'object') return false;
  if (!Number.isInteger(term.id) || term.id <= 0) return false;

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof term[field] !== 'string' || term[field].trim() === '') {
      return false;
    }
  }

  for (const field of OPTIONAL_STRING_FIELDS) {
    if (term[field] != null && typeof term[field] !== 'string') {
      return false;
    }
  }

  return isValidDifficulty(term.difficulty);
}

export function assertTermsSchema(terms) {
  if (!Array.isArray(terms)) {
    throw new Error('Terms data must be an array.');
  }

  const invalidIndex = terms.findIndex((term) => !validateTermShape(term));
  if (invalidIndex !== -1) {
    const invalidTerm = terms[invalidIndex];
    throw new Error(`Invalid term schema at index ${invalidIndex} (id=${invalidTerm?.id ?? 'unknown'}).`);
  }

  return terms;
}
