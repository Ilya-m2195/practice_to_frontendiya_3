import { FC } from 'react';

import { Switch, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

import { ColorTheme } from 'constants/enums';

import  style  from './SwitchButton.module.css';
import React from 'react';

export const SwitchButton: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const setColorTheme = (): void => {
    colorScheme === ColorTheme.dark
      ? setColorScheme(ColorTheme.light)
      : setColorScheme(ColorTheme.dark);
  };

  const sunIcon = <IconSun className={style.iconSun}/>;
  const moonIcon = <IconMoonStars className={style.iconMoon}/>;

  return (
    <Switch
      size='xl'
      color='dark.4'
      onClick={setColorTheme}
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};
