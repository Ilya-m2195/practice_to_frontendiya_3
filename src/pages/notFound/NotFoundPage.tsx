import { FC } from 'react';

import { Box, Button, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Box h='calc(100vh - (2 * var(--app-shell-padding)) - var(--app-shell-header-offset, 0px)'>
      <Stack align='center' justify='center' h='100%'>
        <Text size='104px' color='blue'>
          404
        </Text>
        <Text size='24px'>{t('pageNotFound')}</Text>
        <Button onClick={() => navigate('/')}>{t('goToMainPage')}</Button>
      </Stack>
    </Box>
  );
};
