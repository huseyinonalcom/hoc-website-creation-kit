import type { Config, Data, Viewport } from "@puckeditor/core";
import type { ReactNode } from "react";
export type PuckEditorHeaderActionsProps = {
    appState: {
        data: Data;
    } & Record<string, unknown>;
    path?: string;
};
export type PuckEditorProps = {
    config?: Config;
    data: Partial<Data>;
    height?: string;
    path?: string;
    viewports?: Viewport[];
    theme?: "light" | "dark";
    className?: string;
    onPublish?: (_data: Data) => void | Promise<void>;
    renderHeaderActions?: (_props: PuckEditorHeaderActionsProps) => ReactNode;
};
export declare function PuckEditor({ config, data, height, path, viewports, theme, className, onPublish, renderHeaderActions, }: PuckEditorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PuckEditor.d.ts.map