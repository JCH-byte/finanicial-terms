import React from 'react';
import { TABS } from '../constants/tabs.js';

const TabRouter = ({ activeTab, bookmarks, toggleBookmark, DictionaryTab, FlashcardTab, QuizTab, MyNoteTab }) => {
  switch (activeTab) {
    case TABS.DICT:
      return React.createElement(DictionaryTab, { bookmarks, toggleBookmark });
    case TABS.FLASHCARD:
      return React.createElement(FlashcardTab);
    case TABS.QUIZ:
      return React.createElement(QuizTab);
    case TABS.NOTE:
      return React.createElement(MyNoteTab, { bookmarks, toggleBookmark });
    default:
      return null;
  }
};

export default TabRouter;
