import { FC, useEffect } from 'react';

import { Button } from '@mantine/core';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { LogInUser, getUsers } from '../../../api/api';
import { provider } from '../../../firebase/firebase';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useGetUsers } from '../../../hooks/useGetUsers';

export const SignInGitHub: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useGetUsers();

  useEffect(() => {
    getUsers(dispatch);
  }, [users]);

  const LogInUserGitHub = (): Promise<void> =>
    LogInUser(provider, users, dispatch, navigate);

  return (
    <Button variant='filled' onClick={LogInUserGitHub}>
      {t('login')} Github
    </Button>
  );
};
