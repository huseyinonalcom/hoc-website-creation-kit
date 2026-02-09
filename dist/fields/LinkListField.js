"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Button } from "../components/Button";
export function LinkListField({ value, onChange, labelPlaceholder = "Örn: Hakkımızda", pathPlaceholder = "Örn: /hakkimizda", }) {
    const links = useMemo(() => value ?? [], [value]);
    const handleUpdate = (index, field, next) => {
        const cloned = [...links];
        const target = cloned[index] ?? { label: "", path: "" };
        cloned[index] = { ...target, [field]: next };
        onChange(cloned);
    };
    const handleAdd = () => {
        onChange([...links, { label: "", path: "" }]);
    };
    const handleRemove = (index) => {
        const cloned = links.filter((_, idx) => idx !== index);
        onChange(cloned);
    };
    const handleMove = (index, direction) => {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= links.length) {
            return;
        }
        const cloned = [...links];
        const temp = cloned[index];
        cloned[index] = cloned[targetIndex];
        cloned[targetIndex] = temp;
        onChange(cloned);
    };
    return (_jsxs("div", { className: "space-y-4", children: [links.map((link, index) => (_jsxs("div", { className: "rounded-2xl border border-gray-200 p-4", children: [_jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "text-xs font-medium text-gray-500", children: "Etiket" }), _jsx("input", { className: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm", placeholder: labelPlaceholder, type: "text", value: link.label, onChange: (event) => handleUpdate(index, "label", event.target.value) })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "text-xs font-medium text-gray-500", children: "Path" }), _jsx("input", { className: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm", placeholder: pathPlaceholder, type: "text", value: link.path, onChange: (event) => handleUpdate(index, "path", event.target.value) })] })] }), _jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { className: "text-sm", disabled: index === 0, type: "button", variant: "ghost", onClick: () => handleMove(index, "up"), children: "Yukar\u0131 Al" }), _jsx(Button, { className: "text-sm", disabled: index === links.length - 1, type: "button", variant: "ghost", onClick: () => handleMove(index, "down"), children: "A\u015Fa\u011F\u0131 Al" })] }), _jsx(Button, { className: "text-sm text-red-600 hover:text-red-700", type: "button", variant: "ghost", onClick: () => handleRemove(index), children: "Ba\u011Flant\u0131y\u0131 Sil" })] })] }, `link-${index}`))), _jsx(Button, { className: "w-full", type: "button", variant: "outline", onClick: handleAdd, children: "Yeni Ba\u011Flant\u0131 Ekle" })] }));
}
//# sourceMappingURL=LinkListField.js.map