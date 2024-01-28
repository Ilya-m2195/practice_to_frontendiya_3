import { FC } from 'react';

import { Switch, useMantineTheme, rem, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

import { ColorTheme } from '../../../constants/enums';

import { sizeValue, yellowValue, blueVale } from './config';
import React from 'react';

export const SwitchButton: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const setLight = (): void => setColorScheme(ColorTheme.light);
  const setDark = (): void => setColorScheme(ColorTheme.dark);

  const sunIcon = (
    <IconSun
      style={{ width: rem(sizeValue), height: rem(sizeValue) }}
      color={theme.colors.yellow[yellowValue]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(sizeValue), height: rem(sizeValue) }}
      color={theme.colors.blue[blueVale]}
    />
  );

  return (
    <Switch
      size='xl'
      color='dark.4'
      onClick={colorScheme === ColorTheme.dark ? setLight : setDark}
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};
