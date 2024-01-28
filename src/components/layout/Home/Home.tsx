import { FC } from 'react';

import { Box, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../hooks/useAppSelector';
import React from 'react';

export const Home: FC = () => {
  const nickname = useAppSelector((state) => state.main.nickname);
  const email = useAppSelector((state) => state.main.email);
  const { t } = useTranslation();

  return (
    <Box>
      {email && (
        <Group>
          <Text> {t('welcome')}</Text>
          <Text> {nickname}</Text>
        </Group>
      )}
    </Box>
  );
};
