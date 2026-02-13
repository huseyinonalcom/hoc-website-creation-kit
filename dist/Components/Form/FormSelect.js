import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { forwardRef } from "react";
import { FormField } from "./FormField";
import cn from "../../utils/classnames";
const baseSelectClasses = "block w-full appearance-none rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-indigo-500";
export const FormSelect = forwardRef(function FormSelect({ className, hideChevron = false, ...props }, ref) {
    return (_jsxs("div", { className: "relative", children: [_jsx("select", { ref: ref, ...props, className: cn(baseSelectClasses, className) }), hideChevron ? null : (_jsx(ChevronDownIcon, { "aria-hidden": "true", className: "pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" }))] }));
});
export const FormSelectField = forwardRef(function FormSelectField({ label, description, labelAction, fieldClassName = "sm:col-span-3", id, name, ...selectProps }, ref) {
    const selectId = id ?? name;
    const selectName = name ?? id;
    const htmlFor = selectId ?? selectName;
    return (_jsx(FormField, { className: fieldClassName, description: description, htmlFor: htmlFor, label: label, labelAction: labelAction, children: _jsx(FormSelect, { ...selectProps, ref: ref, id: selectId, name: selectName }) }));
});
//# sourceMappingURL=FormSelect.js.map