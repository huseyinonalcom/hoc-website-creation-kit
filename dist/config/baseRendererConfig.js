import { jsx as _jsx } from "react/jsx-runtime";
import { createBaseEditorConfig } from "./baseEditorConfig";
import { RichTextRenderer } from "../components/TextEditor/Renderer";
export const createBaseRendererConfig = (options = {}) => {
    const baseConfig = createBaseEditorConfig(options);
    return {
        ...baseConfig,
        components: {
            ...baseConfig.components,
            RichTextBlock: {
                label: "Metin",
                render: ({ content }) => _jsx(RichTextRenderer, { html: content ?? "" }),
            },
        },
    };
};
//# sourceMappingURL=baseRendererConfig.js.map