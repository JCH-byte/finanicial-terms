import React from "react";
import { BookOpen, Brain, Home, Star } from "lucide-react";

const BottomNav = ({ activeTab, setActiveTab }) => {
            const navItems = [{ id: 'dict', icon: Home, label: '사전' }, { id: 'flashcard', icon: BookOpen, label: '암기' }, { id: 'quiz', icon: Brain, label: '퀴즈' }, { id: 'note', icon: Star, label: '노트' }];
            return React.createElement("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]" },
                navItems.map(item => React.createElement("button", { key: item.id, onClick: () => setActiveTab(item.id), className: `flex flex-col items-center p-2 transition-colors ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}` },
                    React.createElement(item.icon, { size: 24, strokeWidth: activeTab === item.id ? 2.5 : 2 }),
                    React.createElement("span", { className: "text-[10px] font-bold mt-1" }, item.label)
                ))
            );
        };

        // --- Tabs ---

export default BottomNav
