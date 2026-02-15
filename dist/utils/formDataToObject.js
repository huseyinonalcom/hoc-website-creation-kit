export const formDataToObject = (fd) => {
    const obj = {};
    fd.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};
//# sourceMappingURL=formDataToObject.js.map