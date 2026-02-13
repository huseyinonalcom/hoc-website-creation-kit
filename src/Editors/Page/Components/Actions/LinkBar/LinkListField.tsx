"use client";

import { useMemo } from "react";

import type { LinkListItem } from "./type";

import { Button } from "../ButtonLink/Button";

export function LinkListField({
  value,
  onChange,
  labelPlaceholder = "Örn: Hakkımızda",
  pathPlaceholder = "Örn: /hakkimizda",
}: {
  value?: LinkListItem[];
  onChange: (next: LinkListItem[]) => void;
  labelPlaceholder?: string;
  pathPlaceholder?: string;
}) {
  const links = useMemo(() => value ?? [], [value]);

  const handleUpdate = (index: number, field: keyof LinkListItem, next: string) => {
    const cloned = [...links];
    const target = cloned[index] ?? { label: "", path: "" };
    cloned[index] = { ...target, [field]: next };
    onChange(cloned);
  };

  const handleAdd = () => {
    onChange([...links, { label: "", path: "" }]);
  };

  const handleRemove = (index: number) => {
    const cloned = links.filter((_, idx) => idx !== index);
    onChange(cloned);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= links.length) {
      return;
    }

    const cloned = [...links];
    const temp = cloned[index];
    cloned[index] = cloned[targetIndex];
    cloned[targetIndex] = temp;
    onChange(cloned);
  };

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <div key={`link-${index}`} className="rounded-2xl border border-gray-200 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Etiket</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder={labelPlaceholder}
                type="text"
                value={link.label}
                onChange={(event) => handleUpdate(index, "label", event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Path</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder={pathPlaceholder}
                type="text"
                value={link.path}
                onChange={(event) => handleUpdate(index, "path", event.target.value)}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button className="text-sm" disabled={index === 0} type="button" variant="ghost" onClick={() => handleMove(index, "up")}>
                Yukarı Al
              </Button>
              <Button className="text-sm" disabled={index === links.length - 1} type="button" variant="ghost" onClick={() => handleMove(index, "down")}>
                Aşağı Al
              </Button>
            </div>
            <Button className="text-sm text-red-600 hover:text-red-700" type="button" variant="ghost" onClick={() => handleRemove(index)}>
              Bağlantıyı Sil
            </Button>
          </div>
        </div>
      ))}

      <Button className="w-full" type="button" variant="outline" onClick={handleAdd}>
        Yeni Bağlantı Ekle
      </Button>
    </div>
  );
}
