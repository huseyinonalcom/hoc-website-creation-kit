"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon, } from "@heroicons/react/24/outline";
import { Button } from "../Components/Actions/ButtonLink/Button";
import { RichTextEditor } from "../../Text/Editor";
import { Clipboard } from "./UniversalClipboard";
const sanitizeSlides = (raw) => {
    if (!Array.isArray(raw)) {
        return null;
    }
    return raw.map((slide) => ({
        imageUrl: typeof slide?.imageUrl === "string" ? slide.imageUrl : "",
        text: typeof slide?.text === "string" ? slide.text : "",
    }));
};
export function SlidesField({ value, onChange, ImageField, componentName, }) {
    const slides = sanitizeSlides(value) ?? [];
    const updateSlide = (index, payload) => {
        const cloned = [...slides];
        const nextSlide = { ...cloned[index], ...payload };
        cloned[index] = nextSlide;
        onChange(cloned);
    };
    const handleAddSlide = () => {
        onChange([...slides, { imageUrl: "", text: "" }]);
    };
    const handleRemoveSlide = (index) => {
        const cloned = slides.filter((_, idx) => idx !== index);
        onChange(cloned);
    };
    const handleMoveSlide = (fromIndex, toIndex) => {
        if (toIndex < 0 || toIndex >= slides.length) {
            return;
        }
        const cloned = [...slides];
        const [moved] = cloned.splice(fromIndex, 1);
        cloned.splice(toIndex, 0, moved);
        onChange(cloned);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(Clipboard, { componentName: componentName }), _jsxs("div", { className: "space-y-4", children: [slides.map((slide, index) => (_jsx("div", { className: "rounded-2xl border border-gray-200 p-4", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: _jsx(ImageField, { value: typeof slide.imageUrl === "string" ? slide.imageUrl : "", onChange: (next) => updateSlide(index, { imageUrl: next }) }) }), _jsx("div", { children: _jsx(RichTextEditor, { initialData: slide.text ?? "", onChange: (data) => updateSlide(index, { text: data }) }, `slider-slide-text-${index}`) }), _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { disabled: index === 0, type: "button", variant: "ghost", onClick: () => handleMoveSlide(index, index - 1), children: _jsx(ChevronUpIcon, { className: "h-4 w-4" }) }), _jsx(Button, { disabled: index === slides.length - 1, type: "button", variant: "ghost", onClick: () => handleMoveSlide(index, index + 1), children: _jsx(ChevronDownIcon, { className: "h-4 w-4" }) })] }), _jsx(Button, { className: "text-sm text-red-600 hover:text-red-700", type: "button", variant: "ghost", onClick: () => handleRemoveSlide(index), children: _jsx(TrashIcon, { className: "h-4 w-4" }) })] })] }) }, `slider-slide-${index}`))), _jsx(Button, { className: "w-full", type: "button", variant: "outline", onClick: handleAddSlide, children: _jsx(PlusIcon, { className: "h-4 w-4" }) })] })] }));
}
//# sourceMappingURL=SlidesField.js.map