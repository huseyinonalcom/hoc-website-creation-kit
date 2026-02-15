"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import cn from "../../../../../utils/classnames";
export function Accordion({ sections = [], isEditing = false, }) {
    const sanitizedSections = useMemo(() => {
        return sections.filter((section) => Boolean(section));
    }, [sections]);
    const [openIndex, setOpenIndex] = useState(null);
    const handleToggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };
    if (!sanitizedSections.length) {
        return _jsx(_Fragment, {});
    }
    return (_jsx("div", { className: "w-full overflow-hidden", children: sanitizedSections.map((section, index) => {
            const isOpen = openIndex === index || isEditing;
            const title = section.title?.trim() || `Bölüm ${index + 1}`;
            return (_jsxs("div", { className: cn("border-b-2 border-gray-500 *:last:border-b-0"), children: [_jsxs("button", { "aria-expanded": isOpen, className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left", type: "button", onClick: () => handleToggle(index), children: [_jsx("span", { className: "text-base font-bold", children: title }), _jsx(ChevronUpIcon, { className: cn("h-5 w-5 transition-transform", isOpen && "rotate-180") })] }), _jsx("div", { className: cn("grid overflow-hidden px-5 transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"), children: _jsx("div", { className: "min-h-0", children: section.children ? (section.children) : (_jsx("p", { className: "text-sm" })) }) })] }, `accordion-section-${index}-${title}`));
        }) }));
}
//# sourceMappingURL=Component.js.map