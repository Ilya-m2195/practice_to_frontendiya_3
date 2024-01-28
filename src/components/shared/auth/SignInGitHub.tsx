import { FC } from 'react';

import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { provider } from '../../../firebase/firebase';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logInUserThank } from '../../../store/slices/mainSlice';
import React from 'react';

export const SignInGitHub: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logInUserGitHub = (): void => {
    dispatch(logInUserThank({ provider, navigate }));
  };

  return (
    <Button variant='filled' onClick={logInUserGitHub}>
      {t('login')} Github
    </Button>
  );
};
