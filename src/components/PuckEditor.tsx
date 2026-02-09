"use client";

import type { Config, Data, Viewport } from "@puckeditor/core";
import type { ReactNode } from "react";

import { useEffect, useRef } from "react";

import { createUsePuck, Puck } from "@puckeditor/core";

export type PuckEditorHeaderActionsProps = {
  appState: { data: Data } & Record<string, unknown>;
  path?: string;
};

export type PuckEditorProps = {
  config: Config;
  data: Partial<Data>;
  height?: string;
  path?: string;
  viewports?: Viewport[];
  theme?: "light" | "dark";
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onPublish?: (_data: Data) => void | Promise<void>;
  // eslint-disable-next-line no-unused-vars
  renderHeaderActions?: (_props: PuckEditorHeaderActionsProps) => ReactNode;
};

const usePuck = createUsePuck();

export function PuckEditor({ config, data, height, path, viewports, theme = "light", className, onPublish, renderHeaderActions }: PuckEditorProps) {
  const themeClassName = theme === "dark" ? "puck-theme-dark" : undefined;
  const wrapperClassName = ["puck-editor", themeClassName, className].filter(Boolean).join(" ");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = wrapperRef.current?.querySelector("iframe");
    if (!frame) {
      return;
    }

    let rafId: number | null = null;
    let attempts = 0;

    const applyTheme = () => {
      const doc = frame.contentDocument;
      if (!doc) {
        return false;
      }

      const isDark = theme === "dark";
      doc.documentElement.classList.toggle("puck-theme-dark", isDark);
      doc.body?.classList.toggle("puck-theme-dark", isDark);
      return true;
    };

    const applyThemeWithRetry = () => {
      if (applyTheme()) {
        return;
      }

      if (attempts < 10) {
        attempts += 1;
        rafId = window.requestAnimationFrame(applyThemeWithRetry);
      }
    };

    applyThemeWithRetry();
    frame.addEventListener("load", applyThemeWithRetry);

    return () => {
      frame.removeEventListener("load", applyThemeWithRetry);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [theme]);

  return (
    <div className={wrapperClassName} ref={wrapperRef}>
      <Puck
        config={config}
        data={data}
        height={height}
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
