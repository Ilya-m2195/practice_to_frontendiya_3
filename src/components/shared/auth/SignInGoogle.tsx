import { FC } from 'react';

import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { googleProvider } from 'firebase';
import { useAppDispatch } from 'hooks';
import { logInUserThank } from 'store';

export const SignInGoogle: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const provider = googleProvider;

  const logInUserGoogle = (): void => {
    dispatch(logInUserThank({ provider, navigate }));
  };

  return (
    <Button variant='filled' onClick={logInUserGoogle}>
      {t('login')} Google
    </Button>
  );
};
