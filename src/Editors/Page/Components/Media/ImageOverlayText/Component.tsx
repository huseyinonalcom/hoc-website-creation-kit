import Image from "next/image";
import Link from "next/link";

import { RichTextRenderer } from "../../../../Text/Renderer";
import { ImageOverlayTextProps } from "./type";

export const ImageOverlayText = ({ src, alt, overlay, height, imageMode, href }: ImageOverlayTextProps) => {
  if (!src) {
    return <></>;
  }

  const resolvedHeight = typeof height === "number" && height > 0 ? height : 420;
  const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
  const resolvedHref = typeof href === "string" ? href.trim() : "";
  const hasHref = resolvedHref.length > 0;

  const imageContent = (
    <div className="relative w-full overflow-hidden" style={{ minHeight: `${resolvedHeight}px` }}>
      <Image fill alt={alt ?? "İlgili Görsel"} className={objectFitClass} sizes="100vw" src={src} />
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-6 text-center">
          <div className="max-w-3xl text-white">
            <RichTextRenderer content={overlay} />
          </div>
        </div>
      )}
    </div>
  );

  if (hasHref) {
    return (
      <Link className="block" href={resolvedHref}>
        {imageContent}
      </Link>
    );
  }

  return imageContent;
};
