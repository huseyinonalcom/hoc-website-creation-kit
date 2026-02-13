export const throwCustomError = (message: string) => {
  const error = new Error("Hata: " + message);

  throw error;
};

export const isCustomError = (error: { message: string; }) => {
  return error instanceof Error && error.message.startsWith("Hata: ");
};
