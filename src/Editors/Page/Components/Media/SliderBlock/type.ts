import { SlideProps } from "../../../UtilityComponents/SlidesField";
import type { BaseComponentProps } from "../../type";

export type SliderBlockProps = BaseComponentProps & {
  slides?: { imageUrl?: string; text?: string }[];
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
