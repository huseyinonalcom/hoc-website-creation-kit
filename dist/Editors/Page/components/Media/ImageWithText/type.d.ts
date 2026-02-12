import type { BaseComponentProps } from "../../type";
export type ImageWithTextProps = BaseComponentProps & {
    src?: string;
    alt?: string;
    content?: string;
    imagePosition?: "left" | "right";
    stackOrder?: "image-first" | "content-first";
    height?: number;
    imageMode?: "cover" | "contain";
    href?: string;
};
//# sourceMappingURL=type.d.ts.map