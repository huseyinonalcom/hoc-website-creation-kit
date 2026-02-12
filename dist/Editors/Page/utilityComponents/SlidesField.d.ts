import type { ComponentType } from "react";
export type SlideProps = {
    imageUrl?: string;
    text?: string;
};
type SlideImageFieldProps = {
    value?: string;
    onChange: (next: string) => void;
};
type SlidesFieldProps = {
    value?: SlideProps[];
    onChange: (next: SlideProps[]) => void;
    ImageField: ComponentType<SlideImageFieldProps>;
    componentName: string;
};
export declare function SlidesField({ value, onChange, ImageField, componentName }: SlidesFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SlidesField.d.ts.map