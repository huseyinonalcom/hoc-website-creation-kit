import { jsx as _jsx } from "react/jsx-runtime";
import cn from "../utils/classnames";
const baseClasses = "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400",
    secondary: "bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:outline-gray-300 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
    ghost: "text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-200 dark:text-white dark:hover:bg-white/10",
    danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
    subtle: "bg-white text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-200 dark:bg-white/10 dark:text-white dark:inset-ring-white/10 dark:hover:bg-white/15",
};
export function Button({ variant = "primary", className, ...props }) {
    return _jsx("button", { className: cn(baseClasses, variantClasses[variant], className), ...props });
}
export function ButtonLink({ variant = "outline", className, ...props }) {
    return _jsx("a", { className: cn(baseClasses, variantClasses[variant], className), ...props });
}
//# sourceMappingURL=Button.js.map