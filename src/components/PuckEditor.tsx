"use client";

import type { Config, Data, Viewport } from "@puckeditor/core";
import type { ReactNode } from "react";

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
  // eslint-disable-next-line no-unused-vars
  onPublish?: (_data: Data) => void | Promise<void>;
  // eslint-disable-next-line no-unused-vars
  renderHeaderActions?: (_props: PuckEditorHeaderActionsProps) => ReactNode;
};

const usePuck = createUsePuck();

export function PuckEditor({
  config,
  data,
  height,
  path,
  viewports,
  onPublish,
  renderHeaderActions,
}: PuckEditorProps) {
  return (
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
  );
}
