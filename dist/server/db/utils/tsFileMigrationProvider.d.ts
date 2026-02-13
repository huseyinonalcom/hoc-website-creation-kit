import type { Migration, MigrationProvider } from "kysely";
export declare class TsFileMigrationProvider implements MigrationProvider {
    private readonly folderPath;
    constructor(folderPath: string);
    getMigrations(): Promise<Record<string, Migration>>;
}
//# sourceMappingURL=tsFileMigrationProvider.d.ts.map