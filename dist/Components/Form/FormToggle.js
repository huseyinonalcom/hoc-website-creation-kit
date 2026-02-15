import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormField } from "./FormField";
import cn from "../../utils/classnames";
export function ToggleSwitch({ checked, onChange, className, }) {
    return (_jsx("button", { className: cn("relative inline-flex h-6 w-11 items-center rounded-full transition", checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700", className), type: "button", onClick: () => onChange?.(!checked), children: _jsx("span", { className: cn("inline-block h-4 w-4 transform rounded-full bg-white transition", checked ? "translate-x-6" : "translate-x-1") }) }));
}
export function FormToggleField({ label, description, labelAction, fieldClassName = "sm:col-span-3", name, trueValue = "true", falseValue = "false", checked, required, ...toggleProps }) {
    return (_jsxs(FormField, { className: fieldClassName, description: description, label: label, labelAction: labelAction, children: [name ? (_jsx("input", { name: name, required: required, type: "hidden", value: checked ? trueValue : falseValue })) : null, _jsx(ToggleSwitch, { checked: checked, ...toggleProps })] }));
}
//# sourceMappingURL=FormToggle.js.map