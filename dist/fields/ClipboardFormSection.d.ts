import { ReactNode } from "react";
type ClipboardStatus = "idle" | "copied" | "pasted" | "mismatch" | "invalid" | "error" | "unsupported";
type ClipboardFormSectionProps<T> = {
    componentKey: string;
    title: string;
    children?: ReactNode;
    getValue: () => T;
    sanitize: (raw: unknown) => T | null;
    onPaste: (value: T) => void;
    description?: string;
    copyLabel?: string;
    pasteLabel?: string;
    statusMessages?: Partial<Record<Exclude<ClipboardStatus, "idle">, string>>;
};
export declare function ClipboardFormSection<T>({ componentKey, title, children, getValue, sanitize, onPaste, description, copyLabel, pasteLabel, statusMessages, }: ClipboardFormSectionProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ClipboardFormSection.d.ts.map