"use client";

import type { ComponentData } from "@puckeditor/core";

import { createUsePuck } from "@puckeditor/core";
import { useEffect, useRef, useState } from "react";
import { ClipboardIcon, DocumentDuplicateIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

import { Button } from "../components/Actions/ButtonLink/Button";

type ClipboardStatus = "idle" | "success" | "error";

export type ClipboardProps = {
  componentName: string;
};

const usePuckStore = createUsePuck();

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const stripId = (value: Record<string, unknown>): Record<string, unknown> => {
  const { id, ...rest } = value;
  return rest;
};

export function Clipboard({ componentName }: ClipboardProps) {
  const [status, setStatus] = useState<ClipboardStatus>("idle");
  const [clipboardSupported, setClipboardSupported] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedItem = usePuckStore((state) => {
    if (state.selectedItem?.type === componentName) {
      return state.selectedItem as ComponentData<Record<string, unknown>>;
    }
    return null;
  });
  const dispatch = usePuckStore((state) => state.dispatch);
  const getSelectorForId = usePuckStore((state) => state.getSelectorForId);

  useEffect(() => {
    setClipboardSupported(typeof navigator !== "undefined" && Boolean(navigator.clipboard));

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, []);

  const scheduleStatusReset = (next: ClipboardStatus) => {
    setStatus(next);
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      setStatus("idle");
      resetTimerRef.current = null;
    }, 2200);
  };

  const handleCopy = async () => {
    if (!clipboardSupported || typeof navigator === "undefined") {
      scheduleStatusReset("error");
      return;
    }

    if (!selectedItem || !isPlainObject(selectedItem.props)) {
      scheduleStatusReset("error");
      return;
    }

    setIsBusy(true);
    try {
      const safeProps = stripId(selectedItem.props);
      const payload = JSON.stringify({
        componentName,
        value: safeProps,
      });
      await navigator.clipboard.writeText(payload);
      scheduleStatusReset("success");
    } catch {
      scheduleStatusReset("error");
    } finally {
      setIsBusy(false);
    }
  };

  const handlePaste = async () => {
    if (!clipboardSupported || typeof navigator === "undefined") {
      scheduleStatusReset("error");
      return;
    }

    if (!selectedItem || !isPlainObject(selectedItem.props)) {
      scheduleStatusReset("error");
      return;
    }

    setIsBusy(true);
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);

      if (parsed?.componentName !== componentName) {
        scheduleStatusReset("error");
        return;
      }

      const sanitized = isPlainObject(parsed?.value) ? stripId(parsed.value as Record<string, unknown>) : null;
      if (!sanitized) {
        scheduleStatusReset("error");
        return;
      }

      const selectedId = selectedItem.props.id;
      if (typeof selectedId !== "string" || selectedId.length === 0) {
        scheduleStatusReset("error");
        return;
      }

      const selector = getSelectorForId(selectedId);
      if (!selector) {
        scheduleStatusReset("error");
        return;
      }

      dispatch({
        type: "setData",
        data: (previous) => {
          const updateItemProps = (item: ComponentData<Record<string, unknown>>) => ({
            ...item,
            props: {
              ...(isPlainObject(item.props) ? item.props : {}),
              ...sanitized,
            },
          });

          if (selector.zone && previous.zones?.[selector.zone]) {
            const zoneItems = previous.zones[selector.zone];
            const updatedZone = zoneItems.map((item, index) =>
              index === selector.index ? updateItemProps(item as ComponentData<Record<string, unknown>>) : item,
            );

            return {
              zones: {
                ...previous.zones,
                [selector.zone]: updatedZone,
              },
            };
          }

          const updatedContent = previous.content.map((item, index) =>
            index === selector.index ? updateItemProps(item as ComponentData<Record<string, unknown>>) : item,
          );

          return {
            content: updatedContent,
          };
        },
      });
      scheduleStatusReset("success");
    } catch {
      scheduleStatusReset("error");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{componentName}</p>
        </div>
        <div className="flex gap-2">
          <Button disabled={!clipboardSupported || isBusy} type="button" variant="outline" onClick={handleCopy}>
            <DocumentDuplicateIcon />
          </Button>
          <Button disabled={!clipboardSupported || isBusy} type="button" variant="outline" onClick={handlePaste}>
            <ClipboardIcon />
          </Button>
          {status === "success" ? (
            <CheckCircleIcon className="h-4 w-4 text-green-500" aria-hidden="true" />
          ) : status === "error" ? (
            <XCircleIcon className="h-4 w-4 text-red-500" aria-hidden="true" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
