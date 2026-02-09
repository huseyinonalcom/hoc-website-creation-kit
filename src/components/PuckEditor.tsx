"use client";

import type { Config, Data, History, InitialHistory, UiState, Viewport } from "@puckeditor/core";
import type { ReactNode } from "react";

import { useCallback, useEffect, useRef, useState } from "react";

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

type HistorySnapshot = {
  histories: History[];
  index: number;
};

type UiSyncProps = {
  onUiUpdate: (snapshot: UiState) => void;
};

type HistorySyncProps = {
  onHistoryUpdate: (snapshot: HistorySnapshot) => void;
};

type EditorStateSyncProps = HistorySyncProps & UiSyncProps;

function EditorStateSync({ onHistoryUpdate, onUiUpdate }: EditorStateSyncProps) {
  const history = usePuck((state) => state.history);
  const ui = usePuck((state) => state.appState.ui);
  const lastSnapshotRef = useRef<HistorySnapshot | null>(null);
  const lastUiRef = useRef<UiState | null>(null);

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

export function PuckEditor({ config, data, height, path, viewports, theme = "light", className, onPublish, renderHeaderActions }: PuckEditorProps) {
  const themeClassName = theme === "dark" ? "puck-theme-dark" : undefined;
  const wrapperClassName = ["puck-editor", themeClassName, className].filter(Boolean).join(" ");
  const [editorData, setEditorData] = useState<Partial<Data>>(data);
  const [historySnapshot, setHistorySnapshot] = useState<HistorySnapshot | null>(null);
  const [uiSnapshot, setUiSnapshot] = useState<UiState | null>(null);

  const handleHistoryUpdate = useCallback((snapshot: HistorySnapshot) => {
    setHistorySnapshot(snapshot);
  }, []);

  const handleUiUpdate = useCallback((snapshot: UiState) => {
    setUiSnapshot(snapshot);
  }, []);

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
        initialHistory={(() => {
          if (!historySnapshot?.histories.length) {
            return undefined;
          }

          const [first, ...rest] = historySnapshot.histories;
          return { histories: [first, ...rest], index: historySnapshot.index, appendData: false };
        })()}
        ui={uiSnapshot ?? undefined}
        renderHeader={({ children }) => (
          <>
            <EditorStateSync onHistoryUpdate={handleHistoryUpdate} onUiUpdate={handleUiUpdate} />
            {children}
          </>
        )}
        renderHeaderActions={renderHeaderActions ? ({ state }) => <>{renderHeaderActions({ appState: state, path })}</> : undefined}
        viewports={viewports}
        onPublish={onPublish}
      />
    </div>
  );
}
