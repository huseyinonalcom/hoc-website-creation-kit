import type { BaseComponentProps } from "../../type";
export type CombinationLockBlockProps = BaseComponentProps & {
    sequences?: string[];
    interval?: number;
    spinDuration?: number;
    cycles?: number;
    loop?: boolean;
};
export type CombinationLockProps = BaseComponentProps & {
    sequences?: {
        value?: string;
    }[];
    interval?: number;
    spinDuration?: number;
    cycles?: number;
    loop?: boolean;
};
//# sourceMappingURL=type.d.ts.map