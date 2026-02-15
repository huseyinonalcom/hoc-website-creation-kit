import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BaseFormInputField = ({ label, className, ...inputProps }) => (_jsxs("label", { className: "flex flex-col gap-2 text-sm font-medium text-gray-700", children: [label ? _jsx("span", { children: label }) : null, _jsx("input", { ...inputProps, className: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${className ?? ""}` })] }));
export const createButtonToggleField = (label, options, defaultValue) => ({
    label,
    type: "custom",
    render: ({ value, onChange, }) => {
        const currentValue = value ?? defaultValue ?? options[0]?.value ?? "";
        return (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: label }), _jsx("div", { className: "flex gap-3", children: options.map((option) => (_jsx("button", { className: `rounded border px-4 py-2 text-left text-sm font-medium transition ${currentValue === option.value ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"}`, type: "button", onClick: () => onChange(option.value), children: option.label }, option.value))) })] }));
    },
});
const stackOrderToggleField = createButtonToggleField("Mobil Sıralama", [
    { label: "Görsel Önce", value: "image-first" },
    { label: "Metin Önce", value: "content-first" },
], "image-first");
const imageModeToggleField = createButtonToggleField("Görsel Modu", [
    { label: "Kapla", value: "cover" },
    { label: "Sığdır", value: "contain" },
], "cover");
const imagePositionToggleField = createButtonToggleField("Görsel Konumu", [
    { label: "Sol", value: "left" },
    { label: "Sağ", value: "right" },
], "left");
const numberInput = (label, options = {}) => ({
    label,
    type: "custom",
    render: ({ value, onChange, }) => {
        const displayValue = typeof value === "number" ? value : typeof options.defaultValue === "number" ? options.defaultValue : "";
        return (_jsx(BaseFormInputField, { label: label, min: options.min, placeholder: options.placeholder, step: options.step, type: "number", value: displayValue, onChange: (event) => {
                const rawValue = event.target.value;
                if (rawValue === "") {
                    onChange(undefined);
                    return;
                }
                const parsedValue = Number(rawValue);
                onChange(Number.isNaN(parsedValue) ? undefined : parsedValue);
            } }));
    },
});
const colorInput = (label, defaultValue) => ({
    label,
    type: "custom",
    render: ({ value, onChange, }) => (_jsx(BaseFormInputField, { className: "h-10 cursor-pointer px-2", label: label, type: "color", value: typeof value === "string" && value.trim().length > 0 ? value : defaultValue, onChange: (event) => onChange(event.target.value) })),
});
export const defaultFieldHelpers = {
    FormInput: BaseFormInputField,
    numberInput,
    colorInput,
    createButtonToggleField,
    imageModeToggleField,
    imagePositionToggleField,
    stackOrderToggleField,
};
//# sourceMappingURL=fieldHelpers.js.map