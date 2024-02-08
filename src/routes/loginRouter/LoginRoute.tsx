import { pathHome } from 'constants';

import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { getIsAuth } from 'store';

export const LoginRoute: FC = () => {
  const isAuth = useAppSelector(getIsAuth);

  return !isAuth ? <Outlet /> : <Navigate to={pathHome} />;
};
