import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { BottomNav } from './components/BottomNav.js';
import { DictionaryTab } from './tabs/DictionaryTab.js';
import { FlashcardTab } from './tabs/FlashcardTab.js';
import { QuizTab } from './tabs/QuizTab.js';
import { MyNoteTab } from './tabs/MyNoteTab.js';
import { loadTerms } from './data/terms.js';
import { TAB_IDS } from './constants.js';
import { getBookmarks, setBookmarks as persistBookmarks } from './services/storage.js';

export function App() {
    const [activeTab, setActiveTab] = useState(TAB_IDS.DICTIONARY);
    const [bookmarks, setBookmarks] = useState([]);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBookmarks(getBookmarks());
    }, []);

    useEffect(() => {
        let isMounted = true;

        const initializeTerms = async () => {
            setLoading(true);
            setError(null);

            try {
                const loadedTerms = await loadTerms();
                if (isMounted) setTerms(loadedTerms);
            } catch (e) {
                if (isMounted) setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        initializeTerms();
        return () => {
            isMounted = false;
        };
    }, []);

    const toggleBookmark = (id) => {
        const newBookmarks = bookmarks.includes(id) ? bookmarks.filter((bId) => bId !== id) : [...bookmarks, id];
        setBookmarks(newBookmarks);
        persistBookmarks(newBookmarks);
    };

    const handleScroll = (e) => {
        const scrollTop = e.currentTarget.scrollTop;
        if (scrollTop > 300) setShowTopBtn(true);
        else setShowTopBtn(false);
    };

    const scrollToTop = () => {
        document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return React.createElement(
        'div',
        { className: 'min-h-screen bg-gray-100 flex justify-center text-gray-900 font-sans selection:bg-blue-100' },
        React.createElement(
            'main',
            { className: 'w-full max-w-md bg-white h-screen shadow-2xl relative flex flex-col' },
            React.createElement(
                'div',
                { id: 'content-area', className: 'flex-1 overflow-y-auto', onScroll: handleScroll },
                loading && React.createElement('div', { className: 'p-10 text-center text-gray-500' }, '용어 데이터를 불러오는 중입니다...'),
                error && !loading && React.createElement('div', { className: 'p-10 text-center text-red-500 font-semibold' }, error),
                !loading && !error && activeTab === TAB_IDS.DICTIONARY && React.createElement(DictionaryTab, { terms, bookmarks, toggleBookmark }),
                !loading && !error && activeTab === TAB_IDS.FLASHCARD && React.createElement(FlashcardTab, { terms }),
                !loading && !error && activeTab === TAB_IDS.QUIZ && React.createElement(QuizTab, { terms }),
                !loading && !error && activeTab === TAB_IDS.NOTE && React.createElement(MyNoteTab, { terms, bookmarks, toggleBookmark }),
            ),

            activeTab === TAB_IDS.DICTIONARY && showTopBtn && React.createElement(
                'button',
                {
                    onClick: scrollToTop,
                    className:
                        'absolute bottom-20 right-4 bg-white text-blue-600 border border-blue-100 p-3 rounded-full shadow-xl z-50 hover:bg-blue-50 transition-all active:scale-90 animate-in fade-in zoom-in duration-300',
                },
                React.createElement(ArrowUp, { size: 24, strokeWidth: 2.5 }),
            ),

            React.createElement(BottomNav, { activeTab, setActiveTab }),
        ),
    );
}
