import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "subtle";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};
export declare function Button({ variant, className, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
};
export declare function ButtonLink({ variant, className, ...props }: ButtonLinkProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map