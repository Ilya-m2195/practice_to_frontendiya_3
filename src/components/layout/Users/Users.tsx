import { FC, useEffect } from 'react';

import { Box, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { UsersTable } from '../../shared/UsersTable/UsersTable';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { getUsersThank } from 'store/slices/mainSlice';

export const Users: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThank());
  }, []);

  return (
    <Box>
      <Title order={2} mb={16}>
        {t('clients')}
      </Title>
      <UsersTable />
    </Box>
  );
};
