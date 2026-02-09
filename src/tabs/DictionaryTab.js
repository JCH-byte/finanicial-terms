import React, { useMemo, useState } from 'react';
import { Search, BookOpen, Star, X } from 'lucide-react';
import { DifficultyBadge } from '../components/DifficultyBadge.js';
import { filterTermsBySearchAndDifficulty } from '../features/terms/selectors.js';

function HighlightText({ text, highlight }) {
    if (!highlight || !highlight.trim()) return React.createElement('span', null, text);
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return React.createElement(
        'span',
        null,
        parts.map((part, i) =>
            regex.test(part)
                ? React.createElement('span', { key: i, className: 'bg-blue-100 text-blue-700 font-bold px-0.5 rounded-sm' }, part)
                : React.createElement('span', { key: i }, part),
        ),
    );
}

export function DictionaryTab({ terms, bookmarks, toggleBookmark }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLevel, setActiveLevel] = useState(1);
    const [selectedTerm, setSelectedTerm] = useState(null);

    const filteredData = useMemo(
        () => filterTermsBySearchAndDifficulty(terms, searchTerm, activeLevel),
        [terms, searchTerm, activeLevel],
    );

    return React.createElement(
        'div',
        { className: 'pb-24 px-4 pt-6 min-h-screen bg-gray-50' },
        React.createElement(
            'div',
            { className: 'mb-6' },
            React.createElement('h1', { className: 'text-2xl font-bold text-gray-800' }, '경제금융용어 700'),
            React.createElement('p', { className: 'text-gray-500 text-xs mt-1' }, `총 ${terms.length}개의 용어가 탑재되었습니다.`),
        ),
        !searchTerm &&
            React.createElement(
                'div',
                { className: 'flex bg-gray-200 p-1 rounded-xl mb-4 overflow-x-auto no-scrollbar' },
                [1, 2, 3, 'all'].map((lvl) =>
                    React.createElement(
                        'button',
                        {
                            key: lvl,
                            onClick: () => setActiveLevel(lvl),
                            className: `flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                                activeLevel === lvl ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                            }`,
                        },
                        lvl === 'all' ? '전체' : `Lv.${lvl}`,
                    ),
                ),
            ),
        React.createElement(
            'div',
            { className: 'relative mb-4 group' },
            React.createElement('input', {
                type: 'text',
                placeholder: '용어 검색...',
                className:
                    'w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm',
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
            }),
            React.createElement(Search, { className: 'absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500', size: 20 }),
        ),
        React.createElement(
            'div',
            { className: 'space-y-3' },
            filteredData.map((item) =>
                React.createElement(
                    'div',
                    {
                        key: item.id,
                        className: 'bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer',
                        onClick: () => setSelectedTerm(item),
                    },
                    React.createElement(
                        'div',
                        { className: 'flex justify-between items-start mb-1' },
                        React.createElement(
                            'div',
                            { className: 'flex items-center space-x-2' },
                            React.createElement('span', { className: 'text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded' }, item.category),
                            React.createElement(DifficultyBadge, { level: item.difficulty }),
                        ),
                        React.createElement(
                            'button',
                            {
                                onClick: (e) => {
                                    e.stopPropagation();
                                    toggleBookmark(item.id);
                                },
                                className: `p-1 rounded-full ${bookmarks.includes(item.id) ? 'text-yellow-400' : 'text-gray-200'}`,
                            },
                            React.createElement(Star, { size: 18, fill: bookmarks.includes(item.id) ? 'currentColor' : 'none' }),
                        ),
                    ),
                    React.createElement('h3', { className: 'text-lg font-bold text-gray-900 mb-1' }, React.createElement(HighlightText, { text: item.term, highlight: searchTerm })),
                    React.createElement('p', { className: 'text-gray-500 text-sm line-clamp-1' }, item.definition),
                ),
            ),
            filteredData.length === 0 &&
                React.createElement('div', { className: 'text-center py-20 opacity-50' }, React.createElement(Search, { className: 'mx-auto mb-2', size: 32 }), React.createElement('p', null, '검색 결과가 없습니다.')),
        ),
        selectedTerm &&
            React.createElement(
                'div',
                {
                    className: 'fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200',
                    onClick: () => setSelectedTerm(null),
                },
                React.createElement(
                    'div',
                    {
                        className: 'bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-3xl p-6 shadow-2xl relative animate-in slide-in-from-bottom-10 zoom-in-95 duration-300',
                        onClick: (e) => e.stopPropagation(),
                    },
                    React.createElement('button', { onClick: () => setSelectedTerm(null), className: 'absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200' }, React.createElement(X, { size: 18 })),
                    React.createElement(
                        'div',
                        { className: 'mb-6 mt-2' },
                        React.createElement(
                            'div',
                            { className: 'flex space-x-2 mb-2' },
                            React.createElement('span', { className: 'text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-md' }, selectedTerm.category),
                            React.createElement(DifficultyBadge, { level: selectedTerm.difficulty }),
                        ),
                        React.createElement('h2', { className: 'text-2xl font-bold text-gray-900' }, selectedTerm.term),
                        selectedTerm.englishTerm && React.createElement('p', { className: 'text-gray-400 text-sm font-medium font-mono mt-1' }, selectedTerm.englishTerm),
                    ),
                    React.createElement('div', { className: 'bg-gray-50 rounded-xl p-5 mb-5 border border-gray-100' }, React.createElement('p', { className: 'text-gray-800 font-bold leading-relaxed text-lg' }, selectedTerm.definition)),
                    React.createElement('div', { className: 'mb-8' }, React.createElement('h4', { className: 'text-xs font-bold text-gray-400 mb-2 uppercase flex items-center' }, React.createElement(BookOpen, { size: 12, className: 'mr-1' }), ' 상세 설명'), React.createElement('p', { className: 'text-gray-600 text-sm leading-relaxed text-justify' }, selectedTerm.description)),
                    React.createElement(
                        'button',
                        {
                            onClick: () => toggleBookmark(selectedTerm.id),
                            className: `w-full py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 ${
                                bookmarks.includes(selectedTerm.id) ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' : 'bg-gray-900 text-white'
                            }`,
                        },
                        React.createElement(Star, { size: 18, fill: bookmarks.includes(selectedTerm.id) ? 'currentColor' : 'none' }),
                        React.createElement('span', null, bookmarks.includes(selectedTerm.id) ? '노트에 저장됨' : '내 노트에 저장'),
                    ),
                ),
            ),
    );
}
