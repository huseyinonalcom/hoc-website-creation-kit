import { jsx as _jsx } from "react/jsx-runtime";
export const VerticalSpacer = ({ height }) => {
    const resolvedHeight = typeof height === "number" && height > 0 ? height : 32;
    return _jsx("div", { "aria-hidden": "true", className: "w-full", style: { height: `${resolvedHeight}px` } });
};
//# sourceMappingURL=Component.js.map