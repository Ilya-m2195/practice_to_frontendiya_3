import { ChangeEvent, FC, useState } from 'react';

import { NativeSelect } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const SwitchLanguageBtn: FC = () => {
  const en = 'en';
  const ru = 'ru';
  const [value, setValue] = useState(en);
  const { i18n } = useTranslation();

  const changeLanguageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.currentTarget.value);
    i18n.changeLanguage(e.currentTarget.value);
  };

  return (
    <NativeSelect
      w={75}
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => changeLanguageHandler(e)}
      data={[en, ru]}
    />
  );
};
