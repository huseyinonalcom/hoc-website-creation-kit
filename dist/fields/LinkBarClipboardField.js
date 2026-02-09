"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { ClipboardFormSection } from "./ClipboardFormSection";
import { LinkListField } from "./LinkListField";
const COMPONENT_KEY = "LinkBar";
const sanitizeLinks = (raw) => {
    if (!Array.isArray(raw)) {
        return null;
    }
    return raw.map((link) => ({
        label: typeof link?.label === "string" ? link.label : "",
        path: typeof link?.path === "string" ? link.path : "",
    }));
};
export function LinkBarClipboardField({ value, onChange }) {
    const normalizedValue = sanitizeLinks(value) ?? [];
    return (_jsx(ClipboardFormSection, { componentKey: COMPONENT_KEY, statusMessages: {
            copied: "Bağlantılar panoya kopyalandı.",
            pasted: "Bağlantılar başarıyla yapıştırıldı.",
            mismatch: "Pano içeriği Link Çubuğu ile eşleşmiyor.",
            invalid: "Pano içeriği geçersiz.",
        }, title: "Link \u00C7ubu\u011Fu \u0130\u00E7eri\u011Fi", getValue: () => normalizedValue.map((link) => ({ ...link })), onPaste: (next) => onChange(next), sanitize: sanitizeLinks, children: _jsx(LinkListField, { value: normalizedValue, onChange: onChange }) }));
}
//# sourceMappingURL=LinkBarClipboardField.js.map