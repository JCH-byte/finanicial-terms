import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, RotateCw } from 'lucide-react';
import { DifficultyBadge } from '../components/DifficultyBadge.js';
import { filterTermsByDifficulty } from '../features/terms/selectors.js';

export function FlashcardTab({ terms }) {
    const [level, setLevel] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [deck, setDeck] = useState([]);

    useEffect(() => {
        let target = filterTermsByDifficulty(terms, level);
        if (target.length === 0) target = terms;
        const sortedDeck = [...target].sort((a, b) => a.term.localeCompare(b.term, 'ko'));
        setDeck(sortedDeck);

        const savedProgress = localStorage.getItem(`flashcard_idx_${level}`);
        if (savedProgress) {
            const savedIdx = parseInt(savedProgress, 10);
            if (savedIdx < sortedDeck.length) setCurrentIndex(savedIdx);
            else setCurrentIndex(0);
        } else {
            setCurrentIndex(0);
        }
        setIsFlipped(false);
    }, [level, terms]);

    useEffect(() => {
        localStorage.setItem(`flashcard_idx_${level}`, currentIndex);
    }, [currentIndex, level]);

    const currentCard = deck[currentIndex];
    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev + 1) % deck.length), 200);
    };
    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length), 200);
    };

    if (!currentCard) return React.createElement('div', { className: 'p-10 text-center' }, '데이터 준비 중...');
    return React.createElement(
        'div',
        { className: 'flex flex-col h-screen pb-24 px-6 pt-6 bg-gray-100' },
        React.createElement(
            'div',
            { className: 'flex justify-center space-x-2 mb-4' },
            [1, 2, 3, 'all'].map((l) =>
                React.createElement(
                    'button',
                    {
                        key: l,
                        onClick: () => setLevel(l),
                        className: `text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                            level === l ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-400 border-gray-200'
                        }`,
                    },
                    l === 'all' ? '전체' : `Lv.${l}`,
                ),
            ),
        ),
        React.createElement('div', { className: 'text-center mb-4' }, React.createElement('h2', { className: 'text-xl font-bold text-gray-800' }, '암기 카드'), React.createElement('p', { className: 'text-gray-400 text-xs mt-1' }, `${currentIndex + 1} / ${deck.length}`)),
        React.createElement(
            'div',
            { className: 'flex-1 relative perspective-1000 group cursor-pointer mb-6', onClick: () => setIsFlipped(!isFlipped) },
            React.createElement(
                'div',
                {
                    className: `relative w-full h-full duration-500 preserve-3d transition-all transform ${isFlipped ? 'rotate-y-180' : ''}`,
                    style: { transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' },
                },
                React.createElement('div', { className: 'absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 border border-gray-200' }, React.createElement(DifficultyBadge, { level: currentCard.difficulty }), React.createElement('h3', { className: 'text-3xl font-black text-gray-800 text-center mt-6 mb-2 break-keep' }, currentCard.term), currentCard.englishTerm && React.createElement('p', { className: 'text-gray-400 font-mono text-sm' }, currentCard.englishTerm), React.createElement('div', { className: 'absolute bottom-8 text-gray-400 flex items-center text-xs animate-bounce' }, React.createElement(RotateCw, { size: 14, className: 'mr-1.5' }), ' 터치해서 뜻 확인')),
                React.createElement('div', { className: 'absolute inset-0 backface-hidden bg-gray-900 text-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 rotate-y-180', style: { transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' } }, React.createElement('div', { className: 'mb-6 bg-white/10 p-3 rounded-full' }, React.createElement(Lightbulb, { size: 28, className: 'text-yellow-400' })), React.createElement('p', { className: 'text-xl font-bold text-center leading-relaxed mb-6 break-keep' }, currentCard.definition), React.createElement('p', { className: 'text-gray-400 text-sm text-center line-clamp-4 leading-relaxed' }, currentCard.description)),
            ),
        ),
        React.createElement(
            'div',
            { className: 'flex space-x-3' },
            React.createElement('button', { onClick: (e) => { e.stopPropagation(); handlePrev(); }, className: 'bg-white text-gray-600 border border-gray-200 w-1/3 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center' }, React.createElement(ChevronLeft, { size: 24 })),
            React.createElement('button', { onClick: (e) => { e.stopPropagation(); handleNext(); }, className: 'bg-blue-600 text-white flex-1 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg active:scale-95 transition-all flex items-center justify-center' }, React.createElement('span', { className: 'mr-1' }, '다음'), React.createElement(ChevronRight, { size: 20 })),
        ),
    );
}
