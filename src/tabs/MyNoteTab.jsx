import React, { useState } from "react";
import { BookOpen, Star, X } from "lucide-react";
import { RAW_DATA } from "../data/terms.js";
import DifficultyBadge from "../components/DifficultyBadge.jsx";

const MyNoteTab = ({ bookmarks, toggleBookmark }) => {
            const [selectedTerm, setSelectedTerm] = useState(null);
            const savedTerms = RAW_DATA.filter(item => bookmarks.includes(item.id));
            
            return React.createElement("div", { className: "pb-24 px-4 pt-6 min-h-screen bg-gray-50" },
                React.createElement("h1", { className: "text-2xl font-bold mb-6 text-gray-800 px-2" }, "내 노트 ", React.createElement("span", { className: "text-blue-500 text-lg ml-1" }, savedTerms.length)),
                
                savedTerms.length === 0 ? React.createElement("div", { className: "flex flex-col items-center justify-center py-20 mt-10" }, 
                    React.createElement("div", { className: "bg-white p-6 rounded-full mb-4 shadow-sm border border-gray-100" }, React.createElement(Star, { className: "text-gray-300", size: 40 })), 
                    React.createElement("p", { className: "text-gray-500 font-bold text-lg" }, "아직 빈 노트입니다"), 
                    React.createElement("p", { className: "text-gray-400 text-sm mt-1" }, "학습하다가 중요한 용어를 발견하면 별표하세요!")
                ) : React.createElement("div", { className: "grid gap-3" }, 
                    savedTerms.map(item => React.createElement("div", { 
                        key: item.id, 
                        onClick: () => setSelectedTerm(item),
                        className: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group hover:border-blue-200 transition-colors cursor-pointer active:scale-[0.98]" 
                    }, 
                        React.createElement("div", null, 
                            React.createElement("span", { className: "text-[10px] text-blue-500 font-bold bg-blue-50 px-1.5 py-0.5 rounded mb-1 inline-block" }, item.category), 
                            React.createElement("h3", { className: "text-lg font-bold text-gray-900" }, item.term), 
                            React.createElement("p", { className: "text-gray-400 text-sm mt-0.5 line-clamp-1" }, item.definition)
                        ), 
                        React.createElement("button", { 
                            onClick: (e) => { e.stopPropagation(); toggleBookmark(item.id); }, 
                            className: "p-2 text-yellow-400 hover:bg-yellow-50 rounded-full transition-colors" 
                        }, React.createElement(Star, { fill: "currentColor", size: 24 }))
                    ))
                ),

                selectedTerm && React.createElement("div", { className: "fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200", onClick: () => setSelectedTerm(null) },
                    React.createElement("div", { className: "bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-3xl p-6 shadow-2xl relative animate-in slide-in-from-bottom-10 zoom-in-95 duration-300", onClick: e => e.stopPropagation() },
                        React.createElement("button", { onClick: () => setSelectedTerm(null), className: "absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200" }, React.createElement(X, { size: 18 })),
                        React.createElement("div", { className: "mb-6 mt-2" },
                            React.createElement("div", { className: "flex space-x-2 mb-2" }, React.createElement("span", { className: "text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-md" }, selectedTerm.category), React.createElement(DifficultyBadge, { level: selectedTerm.difficulty })),
                            React.createElement("h2", { className: "text-2xl font-bold text-gray-900" }, selectedTerm.term),
                            selectedTerm.englishTerm && React.createElement("p", { className: "text-gray-400 text-sm font-medium font-mono mt-1" }, selectedTerm.englishTerm)
                        ),
                        React.createElement("div", { className: "bg-gray-50 rounded-xl p-5 mb-5 border border-gray-100" }, React.createElement("p", { className: "text-gray-800 font-bold leading-relaxed text-lg" }, selectedTerm.definition)),
                        React.createElement("div", { className: "mb-8" }, React.createElement("h4", { className: "text-xs font-bold text-gray-400 mb-2 uppercase flex items-center" }, React.createElement(BookOpen, { size: 12, className: "mr-1" }), " 상세 설명"), React.createElement("p", { className: "text-gray-600 text-sm leading-relaxed text-justify" }, selectedTerm.description)),
                        React.createElement("button", { onClick: () => toggleBookmark(selectedTerm.id), className: `w-full py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 ${bookmarks.includes(selectedTerm.id) ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' : 'bg-gray-900 text-white'}` }, React.createElement(Star, { size: 18, fill: bookmarks.includes(selectedTerm.id) ? "currentColor" : "none" }), React.createElement("span", null, bookmarks.includes(selectedTerm.id) ? '노트에 저장됨' : '내 노트에 저장'))
                    )
                )
            );
        };

export default MyNoteTab
