export interface LinkItem {
    text: string;
    href: string;
}
export interface LinkItemWithIcon extends LinkItem {
    icon: string;
}
export interface LinkDropdownItem {
    text: string;
    links: LinkItem[];
}
export type HeaderNavItem = LinkItem | LinkDropdownItem;
export interface headerData {
    topnav: LinkItemWithIcon[];
    nav: HeaderNavItem[];
}
export declare const isLinkDropdownItem: (item: HeaderNavItem) => item is LinkDropdownItem;
export interface FooterNavItem {
    text: string;
    href: string;
}
export type FooterContactType = "tel" | "email";
export interface FooterContactItem {
    label: string;
    value: string;
    type: FooterContactType;
}
export type FooterSocialIconName = "facebook" | "x" | "linkedin" | "instagram";
export interface FooterSocialItem {
    text: string;
    href: string;
    icon: FooterSocialIconName;
}
export type FooterBrandKey = "beyannameDuzenlemeKilavuzu" | "denetim" | "vergiDunyasi";
export interface FooterBrandItem {
    text: string;
    href: string;
    brandKey: FooterBrandKey;
}
export interface footerData {
    nav: FooterNavItem[];
    contact: FooterContactItem[];
    social: FooterSocialItem[];
    brands: FooterBrandItem[];
}
export declare const leadershipMetaNames: readonly ["baskanlar", "yonetim-kurulu"];
export type LeadershipMetaName = (typeof leadershipMetaNames)[number];
export interface LeadershipListMeta {
    userIds: string[];
}
export declare const ensureLeadershipListMeta: (rawValue: unknown) => LeadershipListMeta;
//# sourceMappingURL=types.d.ts.map