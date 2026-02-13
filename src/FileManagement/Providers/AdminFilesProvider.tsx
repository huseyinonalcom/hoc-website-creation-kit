import "server-only";
import React from "react";

// ServerFilesProvider loads directories and files from the database
// and provides them to the client `FilesDataProvider`.
import ServerFilesProvider from "./ServerFilesProvider";

export default async function AdminFilesProvider({ children }: { children: React.ReactNode }) {
  // Use this component at the root of your admin layout (server component).
  // It will fetch files and directories server-side and render the client
  // `FilesDataProvider` with initial data so any file-management client
  // components work immediately.
  return <ServerFilesProvider>{children}</ServerFilesProvider>;
}
