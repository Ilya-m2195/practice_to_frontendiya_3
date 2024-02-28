import { useTranslation } from 'react-i18next';

import { Languages, Locale } from 'constant';

export const useChangeFormatDate = (date: string): string => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  let locale = Locale.En;

  const originalDate = new Date(date);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  if (currentLanguage !== Languages.En) {
    locale = Locale.Ru;
  }

  return originalDate.toLocaleDateString(locale, dateOptions);
};
