export type GalleryBlockItemSize = "1x1" | "2x1" | "1x2" | "2x2";
export type GalleryGridSize = 2 | 3 | 4;
export type GalleryImageMode = "cover" | "contain";
export type GalleryBlockItem = {
    title?: string;
    date?: string;
    imageUrl?: string;
    size?: GalleryBlockItemSize;
    href?: string;
    imageMode?: GalleryImageMode;
};
import type { BaseComponentProps } from "../../type";
export type GalleryProps = BaseComponentProps & {
    items?: GalleryBlockItem[];
    gridSize?: GalleryGridSize;
    imageMode?: GalleryImageMode;
};
export type NormalizedGalleryItem = {
    title: string;
    date: string;
    imageUrl: string;
    size: GalleryBlockItemSize;
    href: string;
    imageMode: GalleryImageMode | undefined;
};
//# sourceMappingURL=type.d.ts.map