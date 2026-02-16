import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { Accordion } from "./Component";
export const accordionBlockConfig = {
    label: "Akordeon Listesi",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "AccordionBlock" }),
        },
        sections: {
            label: "Bölümler",
            type: "array",
            min: 1,
            getItemSummary: (item, index) => item?.title?.trim() ||
                `Bölüm ${typeof index === "number" ? index + 1 : 1}`,
            arrayFields: {
                title: {
                    label: "Başlık",
                    type: "text",
                },
                content: {
                    label: "İçerik",
                    type: "slot",
                },
            },
        },
    },
    render: ({ sections, puck: { isEditing } }) => {
        const normalizedSections = (sections ?? []).map((section) => {
            const Content = section?.content;
            return {
                title: section?.title,
                content: Content ? _jsx(Content, {}) : _jsx(_Fragment, {}),
            };
        });
        if (normalizedSections.length < 1) {
            return _jsx(_Fragment, {});
        }
        return _jsx(Accordion, { isEditing: isEditing, sections: normalizedSections });
    },
};
//# sourceMappingURL=config.js.map