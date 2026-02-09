import { jsx as _jsx } from "react/jsx-runtime";
import DOMPurify from "isomorphic-dompurify";
export function RichTextRenderer({ html }) {
    const cleanHtml = DOMPurify.sanitize(html);
    return (_jsx("div", { className: "ql-snow ql-container w-full border-none!", children: _jsx("div", { dangerouslySetInnerHTML: { __html: cleanHtml }, className: "ql-editor w-full" }) }));
}
//# sourceMappingURL=Renderer.js.map