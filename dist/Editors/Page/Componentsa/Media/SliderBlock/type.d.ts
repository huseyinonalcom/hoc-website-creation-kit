import type { BaseComponentProps } from "../../type";
import { SlideProps } from "../../../UtilityComponentsd/SlidesField";
export type SliderBlockProps = BaseComponentProps & {
    slides?: {
        imageUrl?: string;
        text?: string;
    }[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    imageMode?: "cover" | "contain";
};
export type SliderProps = {
    slides?: SlideProps[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    imageMode?: "cover" | "contain";
};
//# sourceMappingURL=type.d.ts.map