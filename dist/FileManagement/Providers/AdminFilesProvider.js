import { jsx as _jsx } from "react/jsx-runtime";
import "server-only";
// ServerFilesProvider loads directories and files from the database
// and provides them to the client `FilesDataProvider`.
import ServerFilesProvider from "./ServerFilesProvider";
export default async function AdminFilesProvider({ children, }) {
    // Use this component at the root of your admin layout (server component).
    // It will fetch files and directories server-side and render the client
    // `FilesDataProvider` with initial data so any file-management client
    // components work immediately.
    return _jsx(ServerFilesProvider, { children: children });
}
//# sourceMappingURL=AdminFilesProvider.js.map