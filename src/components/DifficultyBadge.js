import React from 'react';

export function DifficultyBadge({ level }) {
    if (level === 1) return React.createElement("span", { className: "text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold border border-green-200" }, "Lv.1");
    if (level === 2) return React.createElement("span", { className: "text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold border border-blue-200" }, "Lv.2");
    return React.createElement("span", { className: "text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold border border-red-200" }, "Lv.3");
};
