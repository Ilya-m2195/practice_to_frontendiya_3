import { countSymbol } from 'constant';

export const getFileNameFromURL = (photoURL: string): string => {
  if (!photoURL) return '';

  const urlObject = new URL(photoURL!);
  const path = urlObject.pathname;

  return path.substring(path.lastIndexOf('2F') + countSymbol);
};
