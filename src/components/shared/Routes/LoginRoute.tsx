import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { pathHome } from 'constants/constants';
import { useAppSelector } from 'hooks/useAppSelector';
import { getIsAuth } from 'store/selectors';

export const LoginRoute: FC = () => {
  const isAuth = useAppSelector(getIsAuth);

  return !isAuth ? <Outlet /> : <Navigate to={pathHome} />;
};
