import Image from "next/image";
import Link from "next/link";
import { SingleImageProps } from "./type";

export const SingleImage = ({ src, alt, height, imageMode, href }: SingleImageProps) => {
  if (!src) return <></>;

  const resolvedHeight = typeof height === "number" && height > 0 ? height : 480;
  const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
  const resolvedHref = typeof href === "string" ? href.trim() : "";
  const hasHref = resolvedHref.length > 0;

  const imageContent = (
    <div className="relative w-full overflow-hidden" style={{ minHeight: `${resolvedHeight}px` }}>
      <Image fill alt={alt ?? "İlgili Görsel"} className={objectFitClass} sizes="100vw" src={src} />
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
