import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { Languages } from './constants/enums';

i18n
  .use(initReactI18next)
  .use(backend)
  .init({
    lng: Languages.En,
    fallbackLng: Languages.En,

    interpolation: {
      escapeValue: false,
    },
  });
