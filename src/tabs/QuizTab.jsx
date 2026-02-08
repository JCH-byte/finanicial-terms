import React, { useEffect, useState } from "react";
import { ArrowUp, BarChart3, Trophy } from "lucide-react";
import { RAW_DATA } from "../data/terms.js";
import DifficultyBadge from "../components/DifficultyBadge.jsx";

const QuizTab = () => {
            const [currentQuestion, setCurrentQuestion] = useState(null);
            const [options, setOptions] = useState([]);
            const [selectedOption, setSelectedOption] = useState(null);
            const [score, setScore] = useState(0);
            const [combo, setCombo] = useState(0);
            const generateQuestion = () => {
                const randomIdx = Math.floor(Math.random() * RAW_DATA.length);
                const answer = RAW_DATA[randomIdx];
                const distractors = RAW_DATA.filter(item => item.id !== answer.id).sort(() => Math.random() - 0.5).slice(0, 3).map(item => item.term);
                const allOptions = [...distractors, answer.term].sort(() => Math.random() - 0.5);
                setCurrentQuestion(answer); setOptions(allOptions); setSelectedOption(null);
            };
            useEffect(() => { generateQuestion(); }, []);
            const handleAnswer = (option) => { if (selectedOption) return; setSelectedOption(option); if (option === currentQuestion?.term) { setScore(s => s + 10 + (combo * 2)); setCombo(c => c + 1); } else { setCombo(0); } };
            if (!currentQuestion) return null;
            return React.createElement("div", { className: "flex flex-col h-screen pb-24 px-4 pt-8 bg-indigo-50" },
                React.createElement("div", { className: "flex justify-between items-center mb-6" }, React.createElement("div", null, React.createElement("h2", { className: "text-xl font-bold text-gray-800 flex items-center" }, "스피드 퀴즈"), React.createElement("p", { className: "text-xs text-indigo-400 font-bold flex items-center mt-1" }, React.createElement(BarChart3, { size: 12, className: "mr-1" }), `현재 ${combo}연속 정답 중!`)), React.createElement("div", { className: "bg-white px-4 py-2 rounded-2xl shadow-sm text-indigo-600 font-black border border-indigo-100 flex items-center" }, React.createElement(Trophy, { size: 16, className: "mr-2 text-yellow-500" }), score)),
                React.createElement("div", { className: "bg-white rounded-3xl p-8 shadow-sm border border-indigo-100 mb-6 flex-1 flex flex-col justify-center text-center relative overflow-hidden" }, React.createElement("span", { className: "text-indigo-400 font-bold text-xs tracking-widest uppercase mb-4 block" }, "Definition"), React.createElement("p", { className: "text-xl font-bold text-gray-800 leading-relaxed break-keep" }, `"${currentQuestion.definition}"`), React.createElement("div", { className: "mt-4" }, React.createElement(DifficultyBadge, { level: currentQuestion.difficulty }))),
                React.createElement("div", { className: "grid grid-cols-1 gap-3" }, options.map((option, idx) => { let style = "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"; if (selectedOption) { if (option === currentQuestion.term) style = "bg-green-500 text-white border-green-500 shadow-md ring-2 ring-green-200"; else if (option === selectedOption) style = "bg-red-500 text-white border-red-500 shadow-md"; else style = "bg-gray-50 text-gray-300 border-transparent"; } return React.createElement("button", { key: idx, onClick: () => handleAnswer(option), disabled: !!selectedOption, className: `py-4 rounded-xl font-bold text-lg border-2 transition-all ${style}` }, option); })),
                selectedOption && React.createElement("div", { className: "mt-4 flex justify-end animate-in slide-in-from-bottom-2" }, React.createElement("button", { onClick: generateQuestion, className: "bg-gray-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center" }, "다음 문제 ", React.createElement(ArrowUp, { size: 16, className: "ml-2 rotate-90" })))
            );
        };

export default QuizTab
