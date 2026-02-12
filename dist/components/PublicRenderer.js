import { jsx as _jsx } from "react/jsx-runtime";
import { Render } from "@puckeditor/core";
import { createBaseRendererConfig } from "../config/baseRendererConfig";
export function PublicRenderer({ config = createBaseRendererConfig(), data, pagePathSegments }) {
    return _jsx(Render, { config: config, data: data, metadata: { pagePathSegments } });
}
//# sourceMappingURL=PublicRenderer.js.map