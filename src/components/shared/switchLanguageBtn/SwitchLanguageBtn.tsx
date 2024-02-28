import { ChangeEvent, FC, useEffect, useState } from 'react';

import { NativeSelect, rem } from '@mantine/core';
import { IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { sizeIcon, widthSwitcher } from 'components/shared/switchLanguageBtn/config';
import { Languages } from 'constant';

export const SwitchLanguageBtn: FC = () => {
  const languageValueLocalStorage = localStorage.getItem('currentLanguage');
  const setCurrentLanguage = (): string => {
    return languageValueLocalStorage || Languages.En;
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
      leftSection={<IconWorld style={{ width: rem(sizeIcon), height: rem(sizeIcon) }} />}
      w={widthSwitcher}
      value={valueLanguage}
      onChange={changeLanguageHandler}
      data={[Languages.En, Languages.Ru]}
    />
  );
};
