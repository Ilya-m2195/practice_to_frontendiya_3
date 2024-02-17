export const handleError = <T extends Error>(e: T): string => {
  return e.message ?? `Error: ${e}`;
};
