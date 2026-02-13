# File Management — Usage in Admin Layout

Use the `AdminFilesProvider` server component to wrap your admin layout so all nested admin pages/components can use the file management UI without extra wiring.

Example (Next.js app directory - server layout):

```tsx
// app/(admin)/layout.tsx
import AdminFilesProvider from "@/FileManagement/Providers/AdminFilesProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {/* Wrap admin UI with file provider */}
        {/* AdminFilesProvider is an async server component that fetches files/directories */}
        <AdminFilesProvider>{children}</AdminFilesProvider>
      </body>
    </html>
  );
}
```

Example (Next.js pages directory - server-side render in \_app.tsx):

```tsx
// pages/_app.tsx (wrap the admin routes only)
import dynamic from "next/dynamic";
import AdminFilesProvider from "@/FileManagement/Providers/AdminFilesProvider";

function MyApp({ Component, pageProps, router }) {
  // If you have an admin prefix in routes, wrap only admin routes
  if (router.pathname.startsWith("/admin")) {
    // Note: in pages dir, AdminFilesProvider is server-only; ensure you call it
    // from server-side code or adapt to a client fetcher. For app dir prefer the
    // server-layout approach above.
  }

  return <Component {...pageProps} />;
}

export default MyApp;
```

Client components

- The client components `FilesBrowserClient` and `FilesManagerClient` are already present in the kit. They read initial state from the `FilesDataProvider` (a client component) which is rendered by `ServerFilesProvider`.

APIs

- The repo includes server helpers and lightweight API endpoints under `src/pages/api/files/*` (list, directories, upload, create-directory, update-file, delete-file, update-directory, delete-directory).
- Client helpers in `src/FileManagement/api.ts` call those endpoints and map DB rows into the serializable types used by the UI.

Next steps

- If you want, I can update `FilesManagerClient` and `FilesBrowserClient` to use the `src/FileManagement/api.ts` helpers by default (no prop wiring required), or create thin hooks to do that.
