"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import type { SerializableDirectoryRecord } from "./types";

import { FilesBrowserClient } from "./FilesBrowserClient";
import { Button } from "../Editors/Page/Components/Actions/ButtonLink/Button";

export type FilesMoveModalProps = {
  open: boolean;
  directories: SerializableDirectoryRecord[];
  onClose: () => void;
  onConfirm: (directoryId: string | null) => void;
  initialDirectoryId?: string | null;
  title?: string;
};

export function FilesMoveModal({
  open,
  directories,
  onClose,
  onConfirm,
  initialDirectoryId = null,
  title = "Klasor Sec",
}: FilesMoveModalProps) {
  const [activeDirectoryId, setActiveDirectoryId] = useState<string | null>(
    initialDirectoryId,
  );

  return (
    <Dialog className="relative z-50" open={open} onClose={onClose}>
      <div aria-hidden="true" className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>
              <Button type="button" variant="ghost" onClick={onClose}>
                <span className="sr-only">Kapat</span>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>

            <FilesBrowserClient
              activeDirectoryId={activeDirectoryId}
              directories={directories}
              files={[]}
              showDirectoryCreate={false}
              showFiles={false}
              showUpload={false}
              onDirectoryChange={setActiveDirectoryId}
            />

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Vazgec
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onConfirm(activeDirectoryId ?? null);
                }}
              >
                Buraya Tasi
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
