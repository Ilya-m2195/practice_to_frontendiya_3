import { FC } from 'react';

import { Box, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks';
import { getEmail, getNickname } from 'store';

export const HomePage: FC = () => {
  const nickname = useAppSelector(getNickname);
  const email = useAppSelector(getEmail);
  const { t } = useTranslation();

  return (
    <Box>
      {email && (
        <Group>
          <Text> {t('welcome')}</Text>
          <Text> {nickname}</Text>
        </Group>
      )}
      Hello
    </Box>
  );
};
