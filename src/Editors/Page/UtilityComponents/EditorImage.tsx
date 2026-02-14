"use client";

import { Selectable } from "kysely";
import { useState } from "react";
import Image from "next/image";

import { FilesPickerModal } from "../../../FileManagement/Components/FilesPickerModal";
import { useFilesData } from "../../../FileManagement/Providers/FilesDataProvider";
import { Button } from "../Components/Actions/ButtonLink/Button";
import { Files } from "../../../server/types/dbtypes";

export type EditorImageProps = {
  value?: string;
  onChange: (next: string) => void;
};

export function EditorImage({ value, onChange }: EditorImageProps) {
  const { files, directories, addFile, addDirectory } = useFilesData();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSelect = (file: Selectable<Files>) => {
    onChange(file.url);
    setIsPickerOpen(false);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">Seçilen Görsel</p>
        </div>
        <div className="flex gap-2">
          {value && (
            <Button type="button" variant="ghost" onClick={handleClear}>
              Kaldır
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsPickerOpen(true)}
          >
            Dosya Seç
          </Button>
        </div>
      </div>

      {value && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <Image
            fill
            alt={deriveFileName(value)}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            src={value}
          />
        </div>
      )}

      <FilesPickerModal
        directories={directories}
        files={files}
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onDirectoryCreate={addDirectory}
        onFileCreate={addFile}
        onSelect={handleSelect}
      />
    </div>
  );
}

const deriveFileName = (url: string) => {
  try {
    const decoded = decodeURIComponent(url);
    const parts = decoded.split("/");
    return parts[parts.length - 1] || decoded;
  } catch {
    return url;
  }
};
