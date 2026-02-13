import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from "../../utils/classnames";
const baseSectionClasses = "border-b border-gray-200 p-5 text-sm dark:border-white/10";
export function FormSection({ title, description, headingAddon, className, contentClassName, children, }) {
    const content = contentClassName ? (_jsx("div", { className: contentClassName, children: children })) : (children);
    return (_jsxs("section", { className: cn(baseSectionClasses, className), children: [title || description || headingAddon ? (_jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [title ? (_jsx("h2", { className: "text-base font-semibold text-gray-900 dark:text-white", children: title })) : null, description ? (_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: description })) : null] }), headingAddon] })) : null, title || description || headingAddon ? (_jsx("div", { className: "mt-4", children: content })) : (content)] }));
}
//# sourceMappingURL=FormSection.js.map