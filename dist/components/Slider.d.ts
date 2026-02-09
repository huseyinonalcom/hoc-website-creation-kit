export type SliderSlideProps = {
    imageUrl: string;
    text?: string;
};
export type SliderProps = {
    slides?: SliderSlideProps[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    imageMode?: "cover" | "contain";
};
export default function Slider({ slides, autoPlay, autoPlayInterval, imageMode }: SliderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Slider.d.ts.map