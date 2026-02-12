# File management integration

This guide shows how to wire the file-management UI to your own backend and storage logic.

## What the kit provides

- UI: file browser, picker, move modal, manager panel.
- State: `FilesDataProvider` + `useFilesData`.
- Types: `SerializableFileRecord`, `SerializableDirectoryRecord`, input/response types.
- Optional helper: `createFile` for uploading to R2 (S3 compatible).

All data mutations are handled by callbacks you provide. No DB logic is embedded in the kit.

## Basic setup

1. Wrap your page with `FilesDataProvider` using initial files/directories.
2. Pass your upload/create/update/delete functions into the UI components.
3. Use `EditorImage` for a file picker inside editors.

## Example: Files manager page

```tsx
import {
  FilesDataProvider,
  FilesManagerClient,
  type SerializableDirectoryRecord,
  type SerializableFileRecord,
  type UploadFileState,
} from "hoc-website-creation-kit";

export default function FilesPage({
  initialFiles,
  initialDirectories,
}: {
  initialFiles: SerializableFileRecord[];
  initialDirectories: SerializableDirectoryRecord[];
}) {
  return (
    <FilesDataProvider initialFiles={initialFiles} initialDirectories={initialDirectories}>
      <FilesManagerClient
        onUploadFile={async (input) => {
          // TODO: upload to storage + store metadata
          // Return UploadFileState
          return { result: "error", error: "Not implemented", uploadedFile: null };
        }}
        onCreateDirectory={async (input) => {
          // TODO: create directory record
          return { result: "error", error: "Not implemented" };
        }}
        onUpdateFile={async (input) => {
          // TODO: update file record
          return { result: "error", error: "Not implemented" } as any;
        }}
        onDeleteFile={async (input) => {
          // TODO: delete or soft delete
          return { result: "error", error: "Not implemented" } as any;
        }}
        onUpdateDirectory={async (input) => {
          // TODO: update directory record
          return { result: "error", error: "Not implemented" } as any;
        }}
        onDeleteDirectory={async (input) => {
          // TODO: delete directory
          return { result: "error", error: "Not implemented" } as any;
        }}
      />
    </FilesDataProvider>
  );
}
```

## Example: Editor image picker

```tsx
import { EditorImage, type UploadFileState } from "hoc-website-creation-kit";

export function ImageField({ value, onChange }: { value?: string; onChange: (next: string) => void }) {
  return (
    <EditorImage
      value={value}
      onChange={onChange}
      onUploadFile={async (input) => {
        // TODO: upload + create metadata
        const empty: UploadFileState = { result: "error", error: "Not implemented", uploadedFile: null };
        return empty;
      }}
      onCreateDirectory={async (input) => {
        // TODO: create directory
        return { result: "error", error: "Not implemented" };
      }}
    />
  );
}
```

## Using the R2 helper (optional)

The kit includes `createFile` for R2 uploads. It returns a public file URL and metadata so you can store it in your own DB.

```ts
import { createFile } from "hoc-website-creation-kit";

export async function uploadToStorage(formData: FormData) {
  const result = await createFile({
    fileData: {
      file: formData.get("file"),
      directoryId: formData.get("directoryId"),
      storageFolder: formData.get("storageFolder"),
      uploaderId: formData.get("uploaderId"),
    },
  });

  // result.fileUrl -> store in your DB
  return result;
}
```

### Required environment variables

```
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET
R2_ENDPOINT
R2_REGION
R2_PUBLIC_URL
```

## Suggested data shape

The UI expects the following fields in `SerializableFileRecord` and `SerializableDirectoryRecord`:

- File: `id`, `url`, `label?`, `directoryId?`, `isDeleted?`
- Directory: `id`, `name`, `parentId?`

Additional fields are allowed.
