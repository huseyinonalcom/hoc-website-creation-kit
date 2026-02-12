# Page editor and renderer

This guide covers the Page editor (formerly PuckEditor), the Page renderer (formerly PublicRenderer), and how to extend the editor with new components.

## What the kit provides

- `PageEditor`: a configured Puck editor wrapper.
- `PageRenderer`: renders saved Puck data on public pages.
- `createBaseEditorConfig` and `createBaseRendererConfig`: base configs you can extend.

## Basic usage

### Editor

```tsx
import { PageEditor, createBaseEditorConfig } from "hoc-website-creation-kit";

export function AdminPageEditor({ data, onPublish }: { data: any; onPublish: (next: any) => void }) {
  return <PageEditor data={data} config={createBaseEditorConfig()} onPublish={onPublish} theme="light" />;
}
```

### Renderer

```tsx
import { PageRenderer, createBaseRendererConfig } from "hoc-website-creation-kit";

export function PublicPage({ data, pathSegments }: { data: any; pathSegments: string[] }) {
  return <PageRenderer data={data} pagePathSegments={pathSegments} config={createBaseRendererConfig()} />;
}
```

## Example DB schema

You can store the editor data as JSON. A minimal SQL example:

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);
```

## Save and load flow

1. Load `data` for a page from your DB.
2. Pass it into `PageEditor`.
3. On publish, persist the returned `data` JSON.
4. Render that same data with `PageRenderer`.

## Adding a new component

1. Create a React component.
2. Add it to your editor config `components`.
3. Add it to a category list so it appears in the editor.

```tsx
import type { Config } from "hoc-website-creation-kit";

const Callout = ({ text }: { text?: string }) => <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">{text || "New callout"}</div>;

export const config: Config = {
  ...createBaseEditorConfig(),
  components: {
    ...createBaseEditorConfig().components,
    Callout: {
      label: "Callout",
      fields: {
        text: { label: "Text", type: "textarea" },
      },
      render: ({ text }) => <Callout text={text} />,
    },
  },
  categories: {
    ...createBaseEditorConfig().categories,
    content: {
      ...createBaseEditorConfig().categories.content,
      components: [...createBaseEditorConfig().categories.content.components, "Callout"],
    },
  },
};
```

## Notes

- `PageEditor` and `PageRenderer` are breaking-name changes from the older exports.
- Keep data in your DB as-is; the renderer consumes the exact saved JSON.
