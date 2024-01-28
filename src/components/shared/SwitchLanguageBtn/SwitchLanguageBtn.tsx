import { ChangeEvent, FC, useState } from 'react';

import { NativeSelect } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Languages } from '../../../constants/enums';
import React from 'react';

export const SwitchLanguageBtn: FC = () => {
  const [value, setValue] = useState<Languages | string>(Languages.en);
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
      data={[Languages.en, Languages.ru]}
    />
  );
};
