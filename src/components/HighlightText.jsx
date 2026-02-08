import React from "react";

const HighlightText = ({ text, highlight }) => {
            if (!highlight || !highlight.trim()) return React.createElement("span", null, text);
            const regex = new RegExp(`(${highlight})`, 'gi');
            const parts = text.split(regex);
            return React.createElement("span", null, parts.map((part, i) => regex.test(part) ? React.createElement("span", { key: i, className: "bg-blue-100 text-blue-700 font-bold px-0.5 rounded-sm" }, part) : React.createElement("span", { key: i }, part)));
        };

export default HighlightText
