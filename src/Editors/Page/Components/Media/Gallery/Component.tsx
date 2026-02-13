import type { GalleryGridSize, GalleryImageMode, GalleryProps } from "./type";

import Gallery from "./Gallery";

export const isGalleryGridSize = (value: unknown): value is GalleryGridSize => value === 2 || value === 3 || value === 4;

export const isGalleryImageMode = (value: unknown): value is GalleryImageMode => value === "cover" || value === "contain";

export const GalleryBlock = ({ items, gridSize, imageMode }: GalleryProps) => (
  <>
    <Gallery gridSize={isGalleryGridSize(gridSize) ? gridSize : undefined} imageMode={isGalleryImageMode(imageMode) ? imageMode : undefined} items={items} />
  </>
);
