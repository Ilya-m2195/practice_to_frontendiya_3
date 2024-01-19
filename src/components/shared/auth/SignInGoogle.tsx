import { FC } from 'react';

import { Button } from '@mantine/core';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { LogInUser } from '../../../api/api';
import { googleProvider } from '../../../firebase/firebase';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useGetUsers } from '../../../hooks/useGetUsers';

export const SignInGoogle: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useGetUsers();

  const LogInUserGoogle = (): Promise<void> =>
    LogInUser(googleProvider, users, dispatch, navigate);

  return (
    <Button variant='filled' onClick={LogInUserGoogle}>
      {t('login')} Google
    </Button>
  );
};
