"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../components/Button";

type ClipboardStatus = "idle" | "copied" | "pasted" | "mismatch" | "invalid" | "error" | "unsupported";

type ClipboardFormSectionProps<T> = {
  componentKey: string;
  title: string;
  children?: ReactNode;
  getValue: () => T;
  sanitize: (raw: unknown) => T | null;
  onPaste: (value: T) => void;
  description?: string;
  copyLabel?: string;
  pasteLabel?: string;
  statusMessages?: Partial<Record<Exclude<ClipboardStatus, "idle">, string>>;
};

const DEFAULT_STATUS_MESSAGES: Record<Exclude<ClipboardStatus, "idle">, string> = {
  copied: "İçerik panoya kopyalandı.",
  pasted: "İçerik başarıyla yapıştırıldı.",
  mismatch: "Panodaki veri bu alanla eşleşmiyor.",
  invalid: "Panodaki veri geçersiz.",
  error: "Pano işlemi başarısız oldu.",
  unsupported: "Tarayıcı pano erişimini desteklemiyor.",
};

export function ClipboardFormSection<T>({
  componentKey,
  title,
  children,
  getValue,
  sanitize,
  onPaste,
  description,
  copyLabel = "Kopyala",
  pasteLabel = "Yapıştır",
  statusMessages,
}: ClipboardFormSectionProps<T>) {
  const [status, setStatus] = useState<ClipboardStatus>("idle");
  const [clipboardSupported, setClipboardSupported] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mergedStatusMessages = useMemo(() => ({ ...DEFAULT_STATUS_MESSAGES, ...statusMessages }), [statusMessages]);

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
      scheduleStatusReset("unsupported");
      return;
    }

    setIsBusy(true);
    try {
      const payload = JSON.stringify({
        component: componentKey,
        value: getValue(),
      });
      await navigator.clipboard.writeText(payload);
      scheduleStatusReset("copied");
    } catch {
      scheduleStatusReset("error");
    } finally {
      setIsBusy(false);
    }
  };

  const handlePaste = async () => {
    if (!clipboardSupported || typeof navigator === "undefined") {
      scheduleStatusReset("unsupported");
      return;
    }

    setIsBusy(true);
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);

      if (parsed?.component !== componentKey) {
        scheduleStatusReset("mismatch");
        return;
      }

      const sanitized = sanitize(parsed?.value);
      if (sanitized == null) {
        scheduleStatusReset("invalid");
        return;
      }

      onPaste(sanitized);
      scheduleStatusReset("pasted");
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
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</p>
          {status !== "idle" ? (
            <p className="text-xs text-gray-500">{mergedStatusMessages[status as Exclude<ClipboardStatus, "idle">]}</p>
          ) : description ? (
            <p className="text-xs text-gray-500">{description}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button disabled={!clipboardSupported || isBusy} type="button" variant="outline" onClick={handleCopy}>
            {copyLabel}
          </Button>
          <Button disabled={!clipboardSupported || isBusy} type="button" variant="outline" onClick={handlePaste}>
            {pasteLabel}
          </Button>
        </div>
      </div>
      {children ?? null}
    </div>
  );
}
