import { ChangeEvent, FC, useEffect, useState } from 'react';

import { NativeSelect } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Languages } from 'constants/enums';

export const SwitchLanguageBtn: FC = () => {
  const languageValueLocalStorage = localStorage.getItem('currentLanguage');
  const setCurrentLanguage = (): string => {
    return languageValueLocalStorage || Languages.en;
  };
  const [valueLanguage, setValueLanguage] = useState<Languages | string>(
    setCurrentLanguage(),
  );
  const { i18n } = useTranslation();

  const changeLanguageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValueLanguage(e.currentTarget.value);
    localStorage.setItem('currentLanguage', e.currentTarget.value);
  };

  useEffect(() => {
    i18n.changeLanguage(valueLanguage);
  }, [valueLanguage]);

  return (
    <NativeSelect
      w={75}
      value={valueLanguage}
      onChange={changeLanguageHandler}
      data={[Languages.en, Languages.ru]}
    />
  );
};
