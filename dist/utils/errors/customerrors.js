export const throwCustomError = (message) => {
    const error = new Error("Hata: " + message);
    throw error;
};
export const isCustomError = (error) => {
    return error instanceof Error && error.message.startsWith("Hata: ");
};
//# sourceMappingURL=customerrors.js.map