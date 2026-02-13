import { fileURLToPath } from "node:url";
import { Migrator } from "kysely";
import path from "node:path";
import { TsFileMigrationProvider } from "./utils/tsFileMigrationProvider";
import { db } from "./config";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrator = new Migrator({
    db,
    provider: new TsFileMigrationProvider(path.join(__dirname, "./migrations")),
});
async function migrateToLatest() {
    const migrationResult = await migrator.migrateToLatest();
    console.info(migrationResult);
    for (const result of migrationResult.results ?? []) {
        if (result.status === "Success") {
            console.info(`Migrated: ${result.migrationName}`);
        }
        else if (result.status === "Error") {
            console.error(`Failed: ${result.migrationName}`);
        }
    }
    if (migrationResult.error) {
        console.error("Migration run failed");
        console.error(migrationResult.error);
        process.exit(1);
    }
    await db.destroy();
}
migrateToLatest();
//# sourceMappingURL=migrate.js.map