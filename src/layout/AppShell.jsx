import React from 'react';
import { ArrowUp } from 'lucide-react';
import { TABS } from '../constants/tabs.js';

const AppShell = ({ activeTab, showTopBtn, onScrollContent, onScrollTop, bottomNav, children }) => {
  return React.createElement('div', { className: 'min-h-screen bg-gray-100 flex justify-center text-gray-900 font-sans selection:bg-blue-100' },
    React.createElement('main', { className: 'w-full max-w-md bg-white h-screen shadow-2xl relative flex flex-col' },
      React.createElement('header', { className: 'px-4 py-3 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-20' },
        React.createElement('h1', { className: 'text-sm font-bold text-gray-700' }, '경제금융용어 700')
      ),
      React.createElement('div', { id: 'content-area', className: 'flex-1 overflow-y-auto', onScroll: onScrollContent }, children),
      activeTab === TABS.DICT && showTopBtn && React.createElement('button', {
        onClick: onScrollTop,
        className: 'absolute bottom-20 right-4 bg-white text-blue-600 border border-blue-100 p-3 rounded-full shadow-xl z-50 hover:bg-blue-50 transition-all active:scale-90 animate-in fade-in zoom-in duration-300',
      }, React.createElement(ArrowUp, { size: 24, strokeWidth: 2.5 })),
      bottomNav,
    ),
  );
};

export default AppShell;
