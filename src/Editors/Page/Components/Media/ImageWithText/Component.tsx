import Image from "next/image";
import Link from "next/link";

import { RichTextRenderer } from "../../../../Text/Renderer";
import { ImageWithTextProps } from "./type";

export const ImageWithText = ({ src, alt, content, imagePosition, stackOrder, height, imageMode, href }: ImageWithTextProps) => {
  if (!src && !content) {
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
      {content && (
        <div className="lg:w-1/2">
          <RichTextRenderer content={content} />
        </div>
      )}
    </div>
  );
};
