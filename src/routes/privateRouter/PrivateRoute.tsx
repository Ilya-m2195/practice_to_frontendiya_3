import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { Path } from 'constant';
import { useAppSelector } from 'hooks';
import { getIsAuth } from 'store';

export const PrivateRoute: FC = () => {
  const isAuth = useAppSelector(getIsAuth);

  return isAuth ? <Outlet /> : <Navigate to={Path.Home} />;
};
