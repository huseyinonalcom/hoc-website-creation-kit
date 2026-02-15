import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  CheckCircleIcon,
  LinkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { RichTextRenderer } from "../../../../Text/Renderer";
import { ButtonLinkProps } from "./type";

export const buttonIconOptions = [
  { label: "Bağlantı", value: "link", Icon: LinkIcon },
  { label: "Kaydet", value: "save", Icon: CheckCircleIcon },
  { label: "İndir", value: "download", Icon: ArrowDownTrayIcon },
  { label: "Favori", value: "bookmark", Icon: BookmarkIcon },
  { label: "Sil", value: "trash", Icon: TrashIcon },
] as const;

export const ButtonLink = ({
  text,
  url,
  icon,
  openInNewTab,
  color,
  borderRadius,
}: ButtonLinkProps) => {
  const normalizedHtml = (text ?? "").trim();
  const IconComponent =
    buttonIconOptions.find((option) => option.value === icon)?.Icon ??
    buttonIconOptions[0].Icon;
  const backgroundColor =
    typeof color === "string" && color.trim().length > 0 ? color : "#4f46e5";
  const radiusValue =
    typeof borderRadius === "number" && borderRadius >= 0 ? borderRadius : 12;
  const hasText = normalizedHtml.length > 0;
  const resolvedHref = url && url.trim().length > 0 ? url.trim() : undefined;
  const target = openInNewTab ? "_blank" : undefined;
  const rel = openInNewTab ? "noreferrer noopener" : undefined;

  if (!hasText && !resolvedHref) {
    return <></>;
  }

  return (
    <Link
      className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white"
      href={resolvedHref!}
      rel={rel}
      style={{
        backgroundColor,
        borderRadius: `${radiusValue}px`,
      }}
      target={target}
    >
      {IconComponent ? <IconComponent className="h-5 w-5" /> : null}
      {hasText ? <RichTextRenderer content={normalizedHtml} /> : "Buton"}
    </Link>
  );
};
