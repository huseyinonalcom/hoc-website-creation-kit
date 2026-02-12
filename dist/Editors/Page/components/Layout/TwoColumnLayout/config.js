import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { Clipboard } from "../../../utilityComponents/UniversalClipboard";
const { numberInput } = defaultFieldHelpers;
export const twoColumnLayoutConfig = {
    label: "2 Sütun",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "TwoColumnLayout" }),
        },
        left: {
            label: "Sol Sütun",
            type: "slot",
        },
        right: {
            label: "Sağ Sütun",
            type: "slot",
        },
        gap: numberInput("Sütun Aralığı (px)", {
            min: 0,
            placeholder: "Örn: 32",
        }),
        columnRatio: {
            label: "Sütun Oranı",
            type: "radio",
            options: [
                { label: "1:2", value: "1-2" },
                { label: "1:1", value: "1-1" },
                { label: "2:1", value: "2-1" },
            ],
        },
    },
    render: ({ left: Left, right: Right, gap, columnRatio }) => {
        if (!Left && !Right) {
            return _jsx(_Fragment, {});
        }
        const gapValue = typeof gap === "number" && gap >= 0 ? gap : 32;
        const ratio = columnRatio ?? "1-1";
        const containerClass = ratio === "1-1" ? "grid grid-cols-1 lg:grid-cols-2" : "grid grid-cols-1 lg:grid-cols-3";
        const leftColClass = (() => {
            if (ratio === "1-2")
                return "lg:col-span-1";
            if (ratio === "2-1")
                return "lg:col-span-2";
            return "";
        })();
        const rightColClass = (() => {
            if (ratio === "1-2")
                return "lg:col-span-2";
            if (ratio === "2-1")
                return "lg:col-span-1";
            return "";
        })();
        return (_jsxs("div", { className: containerClass, style: { gap: `${gapValue}px` }, children: [_jsx("div", { className: leftColClass, children: Left ? _jsx(Left, {}) : null }), _jsx("div", { className: rightColClass, children: Right ? _jsx(Right, {}) : null })] }));
    },
};
//# sourceMappingURL=config.js.map