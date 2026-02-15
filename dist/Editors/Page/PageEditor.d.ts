import type { Config, Data, Viewport } from "@puckeditor/core";
import type { ReactNode } from "react";
export type PageEditorHeaderActionsProps = {
    appState: {
        data: Data;
    } & Record<string, unknown>;
    path?: string;
};
export type PageEditorProps = {
    config?: Config;
    data: Partial<Data>;
    height?: string;
    path?: string;
    viewports?: Viewport[];
    theme?: "light" | "dark";
    className?: string;
    onPublish?: (_data: Data) => void | Promise<void>;
    renderHeaderActions?: (_props: PageEditorHeaderActionsProps) => ReactNode;
};
export declare function PageEditor({ config, data, height, path, viewports, theme, className, onPublish, renderHeaderActions, }: PageEditorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PageEditor.d.ts.map