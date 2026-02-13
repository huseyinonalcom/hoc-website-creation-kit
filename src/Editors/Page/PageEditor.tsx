"use client";

import type { Config, Data, Viewport } from "@puckeditor/core";
import type { ReactNode } from "react";

import { createUsePuck, Puck } from "@puckeditor/core";
import { useRef } from "react";

import { baseEditorConfig } from "./config/baseEditorConfig";

export type PageEditorHeaderActionsProps = {
  appState: { data: Data } & Record<string, unknown>;
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

const usePuck = createUsePuck();

export function PageEditor({
  config = baseEditorConfig,
  data,
  height,
  path,
  viewports,
  theme = "light",
  className,
  onPublish,
  renderHeaderActions,
}: PageEditorProps) {
  const themeClassName = theme === "dark" ? "puck-theme-dark" : undefined;
  const wrapperClassName = ["puck-editor", themeClassName, className].filter(Boolean).join(" ");
  const editorDataRef = useRef<Partial<Data>>(data);

  return (
    <div className={wrapperClassName}>
      <Puck
        key={theme}
        config={config}
        data={editorDataRef.current}
        height={height}
        onChange={(next) => {
          editorDataRef.current = next;
        }}
        overrides={
          renderHeaderActions
            ? {
                headerActions: () => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const appState = usePuck((state) => state.appState);
                  return <>{renderHeaderActions({ appState, path })}</>;
                },
              }
            : undefined
        }
        viewports={viewports}
        onPublish={onPublish}
      />
    </div>
  );
}
