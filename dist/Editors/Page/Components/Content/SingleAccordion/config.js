import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import SingleAccordion from "./Component";
export const singleAccordionConfig = {
    label: "Tekli Akordeon",
    defaultProps: {
        defaultOpen: false,
    },
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "SingleAccordion" }),
        },
        title: {
            label: "Başlık",
            type: "text",
        },
        content: {
            label: "İçerik",
            type: "slot",
        },
        defaultOpen: {
            label: "Varsayılan olarak açık",
            type: "radio",
            options: [
                { label: "Evet", value: true },
                { label: "Hayır", value: false },
            ],
        },
    },
    render: ({ title, content: Content, defaultOpen, puck: { isEditing } }) => (_jsx(SingleAccordion, { title: title, defaultOpen: defaultOpen || (isEditing ?? false), children: Content ? _jsx(Content, {}) : _jsx(_Fragment, {}) })),
};
//# sourceMappingURL=config.js.map