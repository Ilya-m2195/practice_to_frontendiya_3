import { FC, useEffect } from 'react';

import { Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getUsersThank } from '../../../store/slices/mainSlice';
import { UsersTable } from '../../shared/UsersTable/UsersTable';

export const Users: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThank());
  }, []);

  return (
    <div>
      <Title order={2}>{t('clients')}</Title>
      <UsersTable />
    </div>
  );
};
