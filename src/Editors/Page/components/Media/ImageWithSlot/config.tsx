import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";

import { EditorImage } from "../../../utilityComponents/EditorImage";
import { Clipboard } from "../../../utilityComponents/UniversalClipboard";
import Image from "next/image";
import Link from "next/link";

const { imageModeToggleField, imagePositionToggleField, numberInput, stackOrderToggleField } = defaultFieldHelpers;

export const imageWithSlotConfig: Config<BaseEditorProps>["components"]["ImageWithSlot"] = {
  label: "Görsel + Boş Alan",
  fields: {
    clipboard: {
      type: "custom",
      render: () => <Clipboard componentName="ImageWithSlot" />,
    },
    src: {
      label: "Görsel",
      type: "custom",
      render: ({ value, onChange }) => <EditorImage value={typeof value === "string" ? value : ""} onChange={onChange} />,
    },
    imagePosition: imagePositionToggleField,
    stackOrder: stackOrderToggleField,
    height: numberInput("Görsel Yüksekliği (px)", {
      min: 150,
      placeholder: "Örn: 360",
    }),
    imageMode: imageModeToggleField,
    alt: { type: "text", label: "Alternatif Metin" },
    href: {
      label: "Bağlantı URL'si",
      type: "text",
      placeholder: "https://...",
    },
    content: {
      label: "Boş Alan İçeriği",
      type: "slot",
    },
  },
  render: ({ src, alt, content: Content, imagePosition, stackOrder, height, imageMode, href }) => {
    if (!src && !Content) {
      return <></>;
    }

    const layoutClass = imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row";
    const mobileOrderClass = stackOrder === "content-first" ? "flex-col-reverse" : "flex-col";
    const resolvedHeight = typeof height === "number" && height > 0 ? height : 360;
    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
    const resolvedHref = typeof href === "string" ? href.trim() : "";
    const hasHref = resolvedHref.length > 0;

    const imageNode = src ? (
      <div className="relative w-full overflow-hidden" style={{ minHeight: `${resolvedHeight}px` }}>
        <Image fill alt={alt ?? "İlgili Görsel"} className={objectFitClass} sizes="(max-width: 1024px) 100vw, 50vw" src={src} />
      </div>
    ) : null;

    return (
      <div className={`flex ${mobileOrderClass} gap-6 lg:items-center ${layoutClass}`}>
        {imageNode ? (
          hasHref ? (
            <Link className="block w-full lg:w-1/2" href={resolvedHref}>
              {imageNode}
            </Link>
          ) : (
            <div className="w-full lg:w-1/2">{imageNode}</div>
          )
        ) : null}
        {Content && (
          <div className="lg:w-1/2">
            <Content />
          </div>
        )}
      </div>
    );
  },
};
