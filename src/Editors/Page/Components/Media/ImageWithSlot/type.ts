import type { Slot } from "@puckeditor/core";
import type { BaseComponentProps } from "../../type";

export type ImageWithSlotProps = BaseComponentProps & {
  src?: string;
  alt?: string;
  content?: Slot;
  imagePosition?: "left" | "right";
  stackOrder?: "image-first" | "content-first";
  height?: number;
  imageMode?: "cover" | "contain";
  href?: string;
};
