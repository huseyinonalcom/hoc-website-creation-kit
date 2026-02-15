import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FormField({ label, description, labelAction, htmlFor, className, children, }) {
    const hasHeader = Boolean(label || labelAction);
    const hasDescription = Boolean(description);
    return (_jsxs("div", { className: className, children: [hasHeader ? (_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [label ? (_jsx("label", { className: "text-sm font-medium text-gray-900 dark:text-white", htmlFor: htmlFor, children: label })) : (_jsx("span", {})), labelAction ? (_jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: labelAction })) : null] })) : null, _jsx("div", { className: hasHeader || hasDescription ? "mt-2" : undefined, children: children }), hasDescription ? (_jsx("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: description })) : null] }));
}
//# sourceMappingURL=FormField.js.map