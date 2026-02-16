"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import cn from "../../../../../utils/classnames";
export default function SingleAccordion({ title, children, defaultOpen = false, }) {
    const [isOpen, setIsOpen] = useState(Boolean(defaultOpen));
    const resolvedTitle = title?.trim() || "Bölüm";
    return (_jsx("div", { className: "w-full overflow-hidden rounded-2xl border border-gray-200 bg-white", children: _jsxs("div", { className: "border-b border-gray-200 last:border-b-0", children: [_jsxs("button", { "aria-expanded": isOpen, className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left", type: "button", onClick: () => setIsOpen((prev) => !prev), children: [_jsx("span", { className: "text-base font-semibold text-gray-900", children: resolvedTitle }), _jsx(ChevronUpIcon, { className: cn("h-5 w-5 text-gray-600 transition-transform", isOpen && "rotate-180") })] }), _jsx("div", { className: cn("grid overflow-hidden px-5 transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"), children: _jsx("div", { className: "min-h-0", children: children ? _jsx(_Fragment, { children: children }) : _jsx("p", {}) }) })] }) }));
}
//# sourceMappingURL=Component.js.map