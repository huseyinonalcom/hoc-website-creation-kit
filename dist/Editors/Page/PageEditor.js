"use client";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createUsePuck, Puck } from "@puckeditor/core";
import { createBaseEditorConfig } from "./config/baseEditorConfig";
const usePuck = createUsePuck();
export function PageEditor({ config = createBaseEditorConfig(), data, height, path, viewports, theme = "light", className, onPublish, renderHeaderActions, }) {
    const themeClassName = theme === "dark" ? "puck-theme-dark" : undefined;
    const wrapperClassName = ["puck-editor", themeClassName, className].filter(Boolean).join(" ");
    const [editorData, setEditorData] = useState(data);
    useEffect(() => {
        setEditorData(data);
    }, [data]);
    return (_jsx("div", { className: wrapperClassName, children: _jsx(Puck, { config: config, data: editorData, height: height, onChange: (next) => {
                setEditorData(next);
            }, overrides: renderHeaderActions
                ? {
                    headerActions: () => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const appState = usePuck((state) => state.appState);
                        return _jsx(_Fragment, { children: renderHeaderActions({ appState, path }) });
                    },
                }
                : undefined, viewports: viewports, onPublish: onPublish }, theme) }));
}
//# sourceMappingURL=PageEditor.js.map