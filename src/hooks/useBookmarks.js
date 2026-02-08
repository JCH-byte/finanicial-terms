import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'finTermBookmarks';

const readBookmarks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(readBookmarks());
  }, []);

  const toggleBookmark = useCallback((id) => {
    setBookmarks((prev) => {
      const next = prev.includes(id)
        ? prev.filter((bookmarkId) => bookmarkId !== id)
        : [...prev, id];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id) => bookmarks.includes(id), [bookmarks]);

  return { bookmarks, toggleBookmark, isBookmarked };
};
