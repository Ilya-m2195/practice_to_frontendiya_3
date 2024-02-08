import React, { FC } from 'react';

import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { gitHubProvider } from 'firebase';
import { useAppDispatch } from 'hooks';
import { logInUserThank } from 'store';

export const SignInGitHub: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const provider = gitHubProvider;

  const logInUserGitHub = (): void => {
    dispatch(logInUserThank({ provider, navigate }));
  };

  return (
    <Button variant='filled' onClick={logInUserGitHub}>
      {t('login')} Github
    </Button>
  );
};
