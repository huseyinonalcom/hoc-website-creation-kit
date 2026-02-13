import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { FormField } from "./FormField";
import cn from "../../utils/classnames";
export const baseInputClasses = "w-full block rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500";
export const FormInput = forwardRef(function FormInput({ className, type = "text", ...props }, ref) {
    return (_jsx("input", { ref: ref, ...props, className: cn(baseInputClasses, className), type: type }));
});
export const FormInputField = forwardRef(function FormInputField({ label, description, labelAction, fieldClassName = "sm:col-span-3", id, name, ...inputProps }, ref) {
    const inputId = id ?? name;
    const inputName = name ?? id;
    const htmlFor = inputId ?? inputName;
    return (_jsx(FormField, { className: fieldClassName, description: description, htmlFor: htmlFor, label: label, labelAction: labelAction, children: _jsx(FormInput, { ...inputProps, ref: ref, id: inputId, name: inputName }) }));
});
//# sourceMappingURL=FormInput.js.map