export const formDataToObject = <
  T extends Record<string, FormDataEntryValue | null>,
>(
  fd: FormData,
) => {
  const obj = {} as Record<string, FormDataEntryValue | null>;
  fd.forEach((value, key) => {
    obj[key] = value;
  });
  return obj as T;
};
