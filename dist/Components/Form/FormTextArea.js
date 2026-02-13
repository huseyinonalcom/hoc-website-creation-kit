import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { FormField } from "./FormField";
import { baseInputClasses } from "./FormInput";
import cn from "../../utils/classnames";
const baseTextareaClasses = `${baseInputClasses} min-h-24`;
export const FormTextarea = forwardRef(function FormTextarea({ className, rows = 3, ...props }, ref) {
    const handleInput = (e) => {
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    };
    return (_jsx("textarea", { ref: ref, rows: rows, onInput: handleInput, ...props, className: cn(baseTextareaClasses, className) }));
});
export const FormTextareaField = forwardRef(function FormTextareaField({ label, description, labelAction, fieldClassName = "sm:col-span-3", id, name, ...textareaProps }, ref) {
    const textareaId = id ?? name;
    const textareaName = name ?? id;
    const htmlFor = textareaId ?? textareaName;
    return (_jsx(FormField, { className: fieldClassName, description: description, htmlFor: htmlFor, label: label, labelAction: labelAction, children: _jsx(FormTextarea, { ...textareaProps, ref: ref, id: textareaId, name: textareaName }) }));
});
//# sourceMappingURL=FormTextArea.js.map