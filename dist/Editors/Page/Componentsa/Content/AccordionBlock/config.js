import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import AccordionBlock from "./Component";
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
            defaultItemProps: {
                title: "Yeni Bölüm",
            },
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
    render: AccordionBlock,
};
//# sourceMappingURL=config.js.map