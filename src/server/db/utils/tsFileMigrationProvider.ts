import type { Migration, MigrationProvider } from "kysely";

import { pathToFileURL } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";

const SUPPORTED_EXTENSIONS = new Set([".js", ".cjs", ".mjs", ".ts"]);

export class TsFileMigrationProvider implements MigrationProvider {
  constructor(private readonly folderPath: string) {}

  async getMigrations(): Promise<Record<string, Migration>> {
    const files = await fs.readdir(this.folderPath);
    const migrations: Record<string, Migration> = {};

    for (const fileName of files.sort()) {
      const ext = path.extname(fileName);

      if (!SUPPORTED_EXTENSIONS.has(ext) || fileName.endsWith(".d.ts")) {
        continue;
      }

      const absolutePath = path.join(this.folderPath, fileName);
      const fileUrl = pathToFileURL(absolutePath).href;
      const moduleExports = await import(fileUrl);
      const migration: Migration = moduleExports.default ?? moduleExports;
      const migrationName = path.basename(fileName, ext);

      migrations[migrationName] = migration;
    }

    return migrations;
  }
}
