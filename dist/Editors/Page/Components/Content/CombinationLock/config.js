import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { CombinationLock } from "./Component";
const { numberInput } = defaultFieldHelpers;
export const combinationLockConfig = {
    label: "Kombinasyon Kilidi",
    defaultProps: {
        sequences: [],
        interval: 2000,
        spinDuration: 700,
        cycles: 1,
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
        scale: numberInput("Ölçek", {
            min: 0.5,
            defaultValue: 1,
        }),
    },
    render: (props) => {
        const { sequences, interval, spinDuration, cycles, scale } = props;
        const mappedSequences = Array.isArray(sequences)
            ? sequences.map((item) => item?.value ?? "")
            : [];
        return (_jsx(CombinationLock, { interval: interval, spinDuration: spinDuration, cycles: cycles, sequences: mappedSequences, scale: scale }));
    },
};
//# sourceMappingURL=config.js.map