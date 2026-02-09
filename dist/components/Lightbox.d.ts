export type LightboxItem = {
    imageUrl: string;
    alt?: string;
    title?: string;
    subtitle?: string;
};
type LightboxProps = {
    items: LightboxItem[];
    activeIndex: number | null;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
};
export default function Lightbox({ items, activeIndex, onClose, onNext, onPrevious }: LightboxProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=Lightbox.d.ts.map