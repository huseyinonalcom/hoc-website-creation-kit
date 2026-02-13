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

export const isLinkDropdownItem = (
  item: HeaderNavItem,
): item is LinkDropdownItem => {
  return Array.isArray((item as LinkDropdownItem)?.links);
};

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

export type FooterBrandKey =
  | "beyannameDuzenlemeKilavuzu"
  | "denetim"
  | "vergiDunyasi";

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

export const leadershipMetaNames = ["baskanlar", "yonetim-kurulu"] as const;

export type LeadershipMetaName = (typeof leadershipMetaNames)[number];

export interface LeadershipListMeta {
  userIds: string[];
}

const sanitizeUserIdList = (candidate: unknown): string[] => {
  if (!Array.isArray(candidate)) {
    return [];
  }

  const uniqueIds = new Set<string>();

  candidate.forEach((item) => {
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed.length > 0) {
        uniqueIds.add(trimmed);
      }
    }
  });

  return Array.from(uniqueIds);
};

export const ensureLeadershipListMeta = (
  rawValue: unknown,
): LeadershipListMeta => {
  if (
    rawValue &&
    typeof rawValue === "object" &&
    Array.isArray((rawValue as { userIds?: unknown }).userIds)
  ) {
    const ids = sanitizeUserIdList(
      (rawValue as { userIds?: unknown }).userIds ?? [],
    );
    return { userIds: ids };
  }

  if (Array.isArray(rawValue)) {
    return { userIds: sanitizeUserIdList(rawValue) };
  }

  return { userIds: [] };
};
