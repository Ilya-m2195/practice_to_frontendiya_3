import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { pathLogin } from '../../../constants/constants';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';

export const PrivateRoute: FC = () => {
  const isAuth = useAppSelector((state) => state.main.isAuth);
  
  return isAuth ? <Outlet /> : <Navigate to={pathLogin} />;
};
