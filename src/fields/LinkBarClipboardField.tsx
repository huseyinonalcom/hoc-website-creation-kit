"use client";

import { ClipboardFormSection } from "./ClipboardFormSection";
import { LinkListField, type LinkListItem } from "./LinkListField";

const COMPONENT_KEY = "LinkBar";

const sanitizeLinks = (raw: unknown): LinkListItem[] | null => {
  if (!Array.isArray(raw)) {
    return null;
  }

  return raw.map((link: any) => ({
    label: typeof link?.label === "string" ? link.label : "",
    path: typeof link?.path === "string" ? link.path : "",
  }));
};

type LinkBarClipboardFieldProps = {
  value?: LinkListItem[];
  onChange: (next: LinkListItem[]) => void;
};

export function LinkBarClipboardField({ value, onChange }: LinkBarClipboardFieldProps) {
  const normalizedValue = sanitizeLinks(value) ?? [];

  return (
    <ClipboardFormSection
      componentKey={COMPONENT_KEY}
      statusMessages={{
        copied: "Bağlantılar panoya kopyalandı.",
        pasted: "Bağlantılar başarıyla yapıştırıldı.",
        mismatch: "Pano içeriği Link Çubuğu ile eşleşmiyor.",
        invalid: "Pano içeriği geçersiz.",
      }}
      title="Link Çubuğu İçeriği"
      getValue={() => normalizedValue.map((link) => ({ ...link }))}
      onPaste={(next) => onChange(next)}
      sanitize={sanitizeLinks}
    >
      <LinkListField value={normalizedValue} onChange={onChange} />
    </ClipboardFormSection>
  );
}
