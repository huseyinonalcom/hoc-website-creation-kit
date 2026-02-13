export type LightboxItem = {
    imageUrl: string;
    alt?: string;
    title?: string;
    subtitle?: string;
};
export type LightboxProps = {
    items: LightboxItem[];
    activeIndex: number | null;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
};
//# sourceMappingURL=type.d.ts.map