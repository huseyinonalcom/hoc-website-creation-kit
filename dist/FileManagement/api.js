export const mapDbFileToSerializable = (row) => ({
    id: row.id,
    url: row.url,
    label: row.label ?? null,
    directoryId: row.directory_id ?? null,
    isDeleted: Boolean(row.is_deleted),
    uploadedAt: row.uploaded_at?.toString?.() ?? null,
    deletedAt: row.deleted_at?.toString?.() ?? null,
});
export const mapDbDirToSerializable = (row) => ({
    id: row.id,
    name: row.name,
    parentId: row.parent_id ?? null,
    createdAt: row.created_at?.toString?.() ?? null,
    updatedAt: row.updated_at?.toString?.() ?? null,
});
export async function fetchFiles(includeDeleted = true) {
    const res = await fetch(`/api/files/list`);
    const data = await res.json();
    return (data.result ?? []).map(mapDbFileToSerializable);
}
export async function fetchDirectories() {
    const res = await fetch(`/api/files/directories`);
    const data = await res.json();
    return (data.result ?? []).map(mapDbDirToSerializable);
}
export async function createDirectory(input) {
    const res = await fetch(`/api/files/create-directory`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
    const data = await res.json();
    return data;
}
export async function uploadFile(input) {
    const file = input.file;
    const buffer = await file.arrayBuffer();
    const b64 = Buffer.from(buffer).toString("base64");
    const res = await fetch(`/api/files/upload`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            base64: b64,
            originalName: file.name,
            storageFolder: input.storageFolder ?? undefined,
            directoryId: input.directoryId ?? undefined,
            contentType: file.type || undefined,
        }),
    });
    const data = await res.json();
    return data;
}
export async function updateFile(input) {
    const res = await fetch(`/api/files/update-file`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
    return res.json();
}
export async function deleteFile(id) {
    const res = await fetch(`/api/files/delete-file`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
    return res.json();
}
export async function updateDirectory(input) {
    const res = await fetch(`/api/files/update-directory`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
    return res.json();
}
export async function deleteDirectory(id) {
    const res = await fetch(`/api/files/delete-directory`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
    return res.json();
}
//# sourceMappingURL=api.js.map