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
type GalleryProps = {
    items?: GalleryBlockItem[];
    gridSize?: GalleryGridSize;
    imageMode?: GalleryImageMode;
};
export default function Gallery({ items, gridSize, imageMode }: GalleryProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Gallery.d.ts.map