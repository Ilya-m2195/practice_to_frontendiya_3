import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { Languages } from 'constant';

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    lng: Languages.En,
    fallbackLng: Languages.En,

    interpolation: {
      escapeValue: false,
    },
  });
