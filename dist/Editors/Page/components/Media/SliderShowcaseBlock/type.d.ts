import type { SliderProps } from "../SliderBlock/type";
import type { BaseComponentProps } from "../../type";
import { SlideProps } from "../../../utilityComponentsa/SlidesField";
export type SliderShowcaseBlockProps = BaseComponentProps & {
    slides?: SlideProps[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    imageMode?: "cover" | "contain";
    desktopHeight?: number;
    mobileHeight?: number;
};
export type SliderShowcaseProps = SliderProps & {
    desktopHeight?: number;
    mobileHeight?: number;
};
//# sourceMappingURL=type.d.ts.map