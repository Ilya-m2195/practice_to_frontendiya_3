import { FC } from 'react';

import { Box, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useAppSelector';
import { getEmail, getNickname } from 'store/selectors';

export const Home: FC = () => {
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
    </Box>
  );
};
