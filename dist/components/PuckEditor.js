"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { createUsePuck, Puck } from "@puckeditor/core";
const usePuck = createUsePuck();
function EditorStateSync({ onHistoryUpdate, onUiUpdate }) {
    const history = usePuck((state) => state.history);
    const ui = usePuck((state) => state.appState.ui);
    const lastSnapshotRef = useRef(null);
    const lastUiRef = useRef(null);
    useEffect(() => {
        if (!history.histories.length) {
            return;
        }
        const snapshot = { histories: history.histories, index: history.index };
        if (lastSnapshotRef.current?.histories === snapshot.histories && lastSnapshotRef.current?.index === snapshot.index) {
            return;
        }
        lastSnapshotRef.current = snapshot;
        onHistoryUpdate(snapshot);
    }, [history.histories, history.index, onHistoryUpdate]);
    useEffect(() => {
        if (lastUiRef.current === ui) {
            return;
        }
        lastUiRef.current = ui;
        onUiUpdate(ui);
    }, [ui, onUiUpdate]);
    return null;
}
export function PuckEditor({ config, data, height, path, viewports, theme = "light", className, onPublish, renderHeaderActions }) {
    const themeClassName = theme === "dark" ? "puck-theme-dark" : undefined;
    const wrapperClassName = ["puck-editor", themeClassName, className].filter(Boolean).join(" ");
    const [editorData, setEditorData] = useState(data);
    const [historySnapshot, setHistorySnapshot] = useState(null);
    const [uiSnapshot, setUiSnapshot] = useState(null);
    const handleHistoryUpdate = useCallback((snapshot) => {
        setHistorySnapshot(snapshot);
    }, []);
    const handleUiUpdate = useCallback((snapshot) => {
        setUiSnapshot(snapshot);
    }, []);
    useEffect(() => {
        setEditorData(data);
    }, [data]);
    return (_jsx("div", { className: wrapperClassName, children: _jsx(Puck, { config: config, data: editorData, height: height, onChange: (next) => {
                setEditorData(next);
            }, initialHistory: (() => {
                if (!historySnapshot?.histories.length) {
                    return undefined;
                }
                const [first, ...rest] = historySnapshot.histories;
                return { histories: [first, ...rest], index: historySnapshot.index, appendData: false };
            })(), ui: uiSnapshot ?? undefined, renderHeader: ({ children }) => (_jsxs(_Fragment, { children: [_jsx(EditorStateSync, { onHistoryUpdate: handleHistoryUpdate, onUiUpdate: handleUiUpdate }), children] })), renderHeaderActions: renderHeaderActions ? ({ state }) => _jsx(_Fragment, { children: renderHeaderActions({ appState: state, path }) }) : undefined, viewports: viewports, onPublish: onPublish }, theme) }));
}
//# sourceMappingURL=PuckEditor.js.map