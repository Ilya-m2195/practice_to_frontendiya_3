import { FC } from 'react';

import { Switch, useMantineTheme, rem, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const sizeValue = 20;
const blueVale = 6;
const yellowValue = 4;

export const SwitchButton: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const light = 'light';
  const dark = 'dark';

  const setLight = (): void => setColorScheme(light);
  const setDark = (): void => setColorScheme(dark);

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
      onClick={colorScheme === dark ? setLight : setDark}
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};
