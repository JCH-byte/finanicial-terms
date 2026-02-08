import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import BottomNav from "./components/BottomNav.jsx";
import DictionaryTab from "./tabs/DictionaryTab.jsx";
import FlashcardTab from "./tabs/FlashcardTab.jsx";
import MyNoteTab from "./tabs/MyNoteTab.jsx";
import QuizTab from "./tabs/QuizTab.jsx";

const BOOKMARK_STORAGE_KEY = "finTermBookmarks";

const loadBookmarks = () => {
    const saved = localStorage.getItem(BOOKMARK_STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error(error);
        return [];
    }
};

const buildNextBookmarks = (prevBookmarks, id) => (
    prevBookmarks.includes(id)
        ? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...prevBookmarks, id]
);

const App = () => {
            const [activeTab, setActiveTab] = useState("dict");
            const [bookmarks, setBookmarks] = useState([]);
            const [showTopBtn, setShowTopBtn] = useState(false);

            useEffect(() => {
                setBookmarks(loadBookmarks());
            }, []);

            const toggleBookmark = (id) => {
                const nextBookmarks = buildNextBookmarks(bookmarks, id);
                setBookmarks(nextBookmarks);
                localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(nextBookmarks));
            };

            const handleScroll = (e) => {
                const scrollTop = e.currentTarget.scrollTop;
                if (scrollTop > 300) setShowTopBtn(true);
                else setShowTopBtn(false);
            };

            const scrollToTop = () => {
                document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
            };

            return React.createElement("div", { className: "min-h-screen bg-gray-100 flex justify-center text-gray-900 font-sans selection:bg-blue-100" },
                React.createElement("main", { className: "w-full max-w-md bg-white h-screen shadow-2xl relative flex flex-col" },
                    React.createElement("div", { id: "content-area", className: "flex-1 overflow-y-auto", onScroll: handleScroll }, 
                        activeTab === 'dict' && React.createElement(DictionaryTab, { bookmarks, toggleBookmark }),
                        activeTab === 'flashcard' && React.createElement(FlashcardTab, null),
                        activeTab === 'quiz' && React.createElement(QuizTab, null),
                        activeTab === 'note' && React.createElement(MyNoteTab, { bookmarks, toggleBookmark })
                    ),
                    
                    activeTab === 'dict' && showTopBtn && React.createElement("button", { 
                        onClick: scrollToTop, 
                        className: "absolute bottom-20 right-4 bg-white text-blue-600 border border-blue-100 p-3 rounded-full shadow-xl z-50 hover:bg-blue-50 transition-all active:scale-90 animate-in fade-in zoom-in duration-300" 
                    }, React.createElement(ArrowUp, { size: 24, strokeWidth: 2.5 })),

                    React.createElement(BottomNav, { activeTab, setActiveTab })
                )
            );
        };

export default App
