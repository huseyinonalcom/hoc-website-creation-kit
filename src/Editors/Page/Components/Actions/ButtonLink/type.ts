import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import type { BaseComponentProps } from "../../type";

export type ButtonLinkProps = BaseComponentProps & {
  text?: string;
  url?: string;
  icon?: string;
  openInNewTab?: boolean;
  color?: string;
  borderRadius?: number;
};

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "subtle";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export type ButtonLinkComponentProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
};
