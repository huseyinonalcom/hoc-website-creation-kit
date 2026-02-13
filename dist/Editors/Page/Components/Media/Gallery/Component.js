import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Gallery from "./Gallery";
export const isGalleryGridSize = (value) => value === 2 || value === 3 || value === 4;
export const isGalleryImageMode = (value) => value === "cover" || value === "contain";
export const GalleryBlock = ({ items, gridSize, imageMode }) => (_jsx(_Fragment, { children: _jsx(Gallery, { gridSize: isGalleryGridSize(gridSize) ? gridSize : undefined, imageMode: isGalleryImageMode(imageMode) ? imageMode : undefined, items: items }) }));
//# sourceMappingURL=Component.js.map