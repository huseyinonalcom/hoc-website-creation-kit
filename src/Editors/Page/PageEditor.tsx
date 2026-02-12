"use client";

import type { Config, Data, Viewport } from "@puckeditor/core";
import type { ReactNode } from "react";

import { useEffect, useState } from "react";

import { createUsePuck, Puck } from "@puckeditor/core";
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
  // eslint-disable-next-line no-unused-vars
  onPublish?: (_data: Data) => void | Promise<void>;
  // eslint-disable-next-line no-unused-vars
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
  const [editorData, setEditorData] = useState<Partial<Data>>(data);

  useEffect(() => {
    setEditorData(data);
  }, [data]);

  return (
    <div className={wrapperClassName}>
      <Puck
        key={theme}
        config={config}
        data={editorData}
        height={height}
        onChange={(next) => {
          setEditorData(next);
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
