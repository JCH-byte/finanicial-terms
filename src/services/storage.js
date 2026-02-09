import { STORAGE_KEYS } from '../constants.js';

const toFlashcardIndexKey = (level) => `${STORAGE_KEYS.FLASHCARD_INDEX}:${level}`;

export function getBookmarks() {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!saved) return [];

    try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error(e);
        return [];
    }
}

export function setBookmarks(bookmarks) {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
}

export function getFlashcardIndex(level) {
    const saved = localStorage.getItem(toFlashcardIndexKey(level));
    if (!saved) return 0;

    const parsed = parseInt(saved, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

export function setFlashcardIndex(level, index) {
    localStorage.setItem(toFlashcardIndexKey(level), index);
}
