import { FC, useEffect } from 'react';

import { Title } from '@mantine/core';
import { t } from 'i18next';

import { getUsers } from '../../../api/api';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useGetUsers } from '../../../hooks/useGetUsers';
import { AddUsersForm } from '../../shared/AddUsersForm/AddUsersForm';
import { UsersTable } from '../../shared/UsersTable/UsersTable';

export const Users: FC = () => {
  const users = useGetUsers();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers(dispatch);
  }, [users]);

  return (
    <div>
      <Title order={2}>{t('clients')}</Title>

      <AddUsersForm usersCount={users.length} />
      <UsersTable users={users} />
    </div>
  );
};
