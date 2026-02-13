import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import CombinationLockEditor from "./Component";
const { numberInput } = defaultFieldHelpers;
export const combinationLockConfig = {
    label: "Kombinasyon Kilidi",
    defaultProps: {
        sequences: [],
        interval: 2000,
        spinDuration: 700,
        cycles: 1,
        loop: true,
    },
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "CombinationLock" }),
        },
        sequences: {
            label: "Diziler",
            type: "array",
            min: 2,
            defaultItemProps: { value: "" },
            getItemSummary: (item, index) => item?.value?.trim() ||
                `Dizi ${typeof index === "number" ? index + 1 : 1}`,
            arrayFields: {
                value: {
                    label: "Dizi metni",
                    type: "text",
                },
            },
        },
        interval: numberInput("Gösterim Süresi (ms)", {
            min: 0,
            defaultValue: 2000,
        }),
        spinDuration: numberInput("Dönme Süresi (ms)", {
            min: 0,
            defaultValue: 700,
        }),
        cycles: numberInput("Turlar", { min: 1, defaultValue: 1 }),
        loop: {
            label: "Tekrarla",
            type: "radio",
            options: [
                { label: "Evet", value: true },
                { label: "Hayır", value: false },
            ],
        },
    },
    render: (props) => {
        const { sequences, ...rest } = props;
        const mappedSequences = Array.isArray(sequences)
            ? sequences.map((item) => item?.value ?? "")
            : [];
        return _jsx(CombinationLockEditor, { ...rest, sequences: mappedSequences });
    },
};
//# sourceMappingURL=config.js.map