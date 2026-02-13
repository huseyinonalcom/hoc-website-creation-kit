import type { Config } from "@puckeditor/core";

import type {
  GalleryBlockItem,
  GalleryBlockItemSize,
  GalleryGridSize,
  GalleryImageMode,
} from "./type";
import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponents/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { GalleryBlock, isGalleryImageMode } from "./Component";

const gallerySizeOptions: { label: string; value: GalleryBlockItemSize }[] = [
  { label: "1 sütun x 1 satır", value: "1x1" },
  { label: "2 sütun x 1 satır", value: "2x1" },
  { label: "1 sütun x 2 satır", value: "1x2" },
  { label: "2 sütun x 2 satır", value: "2x2" },
];

const galleryGridColumnsOptions: {
  label: string;
  value: GalleryGridSize;
}[] = [
  { label: "4 sütun", value: 4 },
  { label: "3 sütun", value: 3 },
  { label: "2 sütun", value: 2 },
];

const galleryItemImageModeField = {
  label: "Görsel Modu (Bu Görsel)",
  type: "custom" as const,
  render: ({
    value,
    onChange,
  }: {
    value?: GalleryImageMode;

    onChange: (next: GalleryImageMode | undefined) => void;
    field: unknown;
    id: string;
    name: string;
  }) => {
    const currentValue = isGalleryImageMode(value) ? value : undefined;

    const buttonClasses = (isActive: boolean) =>
      `rounded border px-4 py-2 text-left text-sm font-medium transition ${
        isActive
          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
          : "border-gray-300 text-gray-600 hover:border-indigo-400"
      }`;

    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">
          Görsel Modu (Bu Görsel)
        </span>
        <div className="flex gap-3">
          {(["cover", "contain"] as const).map((mode) => (
            <button
              key={mode}
              className={buttonClasses(currentValue === mode)}
              type="button"
              onClick={() => onChange(mode)}
            >
              {mode === "cover" ? "Kapla" : "Sığdır"}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

const { createButtonToggleField, imageModeToggleField } = defaultFieldHelpers;

export const galleryConfig: Config<BaseEditorProps>["components"]["Gallery"] = {
  label: "Galeri",
  fields: {
    clipboard: {
      type: "custom",
      render: () => <Clipboard componentName="Gallery" />,
    },
    items: {
      label: "Galeri Görselleri",
      type: "array",
      min: 1,
      defaultItemProps: {
        title: "",
        date: "",
        imageUrl: "",
        size: "1x1",
        href: "",
      } satisfies GalleryBlockItem,
      getItemSummary: (item, index) => {
        const title = item?.title?.trim();
        if (title) {
          return title;
        }

        const path = typeof item?.imageUrl === "string" ? item.imageUrl : "";
        if (path) {
          const segments = path.split("/");
          const lastSegment = segments[segments.length - 1];
          if (lastSegment) {
            return lastSegment;
          }
        }

        const position = typeof index === "number" ? index + 1 : 1;
        return `Görsel ${position}`;
      },
      arrayFields: {
        title: {
          label: "Başlık",
          type: "text",
        },
        date: {
          label: "Tarih",
          type: "text",
          placeholder: "2020/02/03",
        },
        imageUrl: {
          label: "Görsel",
          type: "custom",
          render: ({ value, onChange }) => (
            <EditorImage
              value={typeof value === "string" ? value : ""}
              onChange={(next) => onChange(next)}
            />
          ),
        },
        href: {
          label: "Bağlantı URL'si",
          type: "text",
          placeholder: "https://...",
        },
        size: {
          label: "Grid Boyutu",
          type: "radio",
          options: gallerySizeOptions,
        },
        imageMode: galleryItemImageModeField,
      },
    },
    gridSize: createButtonToggleField<GalleryGridSize>(
      "Grid Sütun Sayısı (lg)",
      galleryGridColumnsOptions,
      3,
    ),
    imageMode: imageModeToggleField,
  },
  render: GalleryBlock,
};
