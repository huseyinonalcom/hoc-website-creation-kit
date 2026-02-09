import type { ComponentType } from "react";
export type SlideFormValue = {
    imageUrl?: string;
    text?: string;
};
type ImageFieldProps = {
    value?: string;
    onChange: (next: string) => void;
};
type SlidesFieldProps = {
    value?: SlideFormValue[];
    onChange: (next: SlideFormValue[]) => void;
    ImageField: ComponentType<ImageFieldProps>;
};
export declare function SlidesField({ value, onChange, ImageField }: SlidesFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SlidesField.d.ts.map