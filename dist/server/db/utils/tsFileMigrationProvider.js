import { pathToFileURL } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";
const SUPPORTED_EXTENSIONS = new Set([".js", ".cjs", ".mjs", ".ts"]);
export class TsFileMigrationProvider {
    constructor(folderPath) {
        this.folderPath = folderPath;
    }
    async getMigrations() {
        const files = await fs.readdir(this.folderPath);
        const migrations = {};
        for (const fileName of files.sort()) {
            const ext = path.extname(fileName);
            if (!SUPPORTED_EXTENSIONS.has(ext) || fileName.endsWith(".d.ts")) {
                continue;
            }
            const absolutePath = path.join(this.folderPath, fileName);
            const fileUrl = pathToFileURL(absolutePath).href;
            const moduleExports = await import(fileUrl);
            const migration = moduleExports.default ?? moduleExports;
            const migrationName = path.basename(fileName, ext);
            migrations[migrationName] = migration;
        }
        return migrations;
    }
}
//# sourceMappingURL=tsFileMigrationProvider.js.map