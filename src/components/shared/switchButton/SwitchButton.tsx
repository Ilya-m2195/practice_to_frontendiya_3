import { FC } from 'react';

import { Switch, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

import style from './SwitchButton.module.css';

import { ColorTheme } from 'constant';

export const SwitchButton: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const setColorTheme = (): void => {
    return colorScheme === ColorTheme.Dark
      ? setColorScheme(ColorTheme.Light)
      : setColorScheme(ColorTheme.Dark);
  };

  const sunIcon = <IconSun className={style.iconSun} />;
  const moonIcon = <IconMoonStars className={style.iconMoon} />;

  return (
    <Switch
      size='md'
      color='dark.4'
      onClick={setColorTheme}
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};
