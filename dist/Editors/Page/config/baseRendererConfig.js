import { jsx as _jsx } from "react/jsx-runtime";
import { createBaseEditorConfig } from "./baseEditorConfig";
import { RichTextRenderer } from "../../Text/Renderer";
export const createBaseRendererConfig = () => {
    const baseConfig = createBaseEditorConfig();
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