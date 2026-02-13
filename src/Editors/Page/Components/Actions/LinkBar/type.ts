import type { BaseComponentProps } from "../../type";

export type LinkBarProps = BaseComponentProps & {
  links?: { label?: string; path?: string }[];
};

export type LinkListItem = {
  label: string;
  path: string;
};

export type LinkBarClipboardFieldProps = {
  value?: LinkListItem[];
  onChange: (next: LinkListItem[]) => void;
};
