"use client";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { createUsePuck, Puck } from "@puckeditor/core";
const usePuck = createUsePuck();
export function PuckEditor({ config, data, height, path, viewports, onPublish, renderHeaderActions }) {
    return (_jsx(Puck, { config: config, data: data, height: height, overrides: renderHeaderActions
            ? {
                headerActions: () => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const appState = usePuck((state) => state.appState);
                    return _jsx(_Fragment, { children: renderHeaderActions({ appState, path }) });
                },
            }
            : undefined, viewports: viewports, onPublish: onPublish }));
}
//# sourceMappingURL=PuckEditor.js.map