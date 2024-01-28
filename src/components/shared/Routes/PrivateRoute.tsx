import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { pathLogin } from 'constants/constants';
import React from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { getIsAuth } from 'store/selectors';

export const PrivateRoute: FC = () => {
  const isAuth = useAppSelector(getIsAuth);
  
  return isAuth ? <Outlet /> : <Navigate to={pathLogin} />;
};
