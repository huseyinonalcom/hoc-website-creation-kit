import type { BaseComponentProps } from "../../type";

export type ImageOverlayTextProps = BaseComponentProps & {
  src?: string;
  alt?: string;
  overlay?: string;
  height?: number;
  imageMode?: "cover" | "contain";
  href?: string;
};
