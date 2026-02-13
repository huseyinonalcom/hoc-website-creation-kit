"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
export default function Lightbox({ items, activeIndex, onClose, onNext, onPrevious }) {
    if (!items.length || activeIndex == null || activeIndex < 0 || activeIndex >= items.length) {
        return null;
    }
    const currentItem = items[activeIndex];
    const altText = currentItem.alt || currentItem.title || "Galeri görseli";
    return (_jsx("div", { "aria-modal": "true", className: "fixed inset-0 z-50 flex w-full bg-black/80 p-6", role: "dialog", children: _jsx("div", { className: "pointer-events-none flex w-full items-center justify-center", children: _jsxs("div", { className: "pointer-events-auto relative min-h-[80vh] w-full max-w-5xl", children: [_jsx(Image, { fill: true, alt: altText, className: "object-contain", sizes: "80vw", src: currentItem.imageUrl }), (currentItem.title || currentItem.subtitle) && (_jsxs("div", { className: "absolute bottom-6 left-6 max-w-xl rounded-lg bg-black/60 px-4 py-3 text-white shadow-lg backdrop-blur", children: [currentItem.title ? _jsx("p", { className: "text-base font-semibold", children: currentItem.title }) : null, currentItem.subtitle ? _jsx("p", { className: "text-sm text-white/80", children: currentItem.subtitle }) : null] })), _jsxs("div", { className: "absolute -bottom-16 flex w-full justify-center gap-4", children: [_jsx("button", { "aria-label": "Kapat", className: "rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20", type: "button", onClick: (event) => {
                                    event.stopPropagation();
                                    onClose();
                                }, children: "Kapat" }), _jsx("button", { "aria-label": "\u00D6nceki g\u00F6rsel", className: "rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20", type: "button", onClick: (event) => {
                                    event.stopPropagation();
                                    onPrevious();
                                }, children: "\u00D6nceki" }), _jsx("button", { "aria-label": "Sonraki g\u00F6rsel", className: "rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20", type: "button", onClick: (event) => {
                                    event.stopPropagation();
                                    onNext();
                                }, children: "Sonraki" })] })] }) }) }));
}
//# sourceMappingURL=Lightbox.js.map