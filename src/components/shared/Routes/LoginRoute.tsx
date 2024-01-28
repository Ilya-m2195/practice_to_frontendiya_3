import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { pathHome } from '../../../constants/constants';
import { useAppSelector } from '../../../hooks/useAppSelector';
import React from 'react';

export const LoginRoute: FC = () => {
  const isAuth = useAppSelector((state) => state.main.isAuth);

  return !isAuth ? <Outlet /> : <Navigate to={pathHome} />;
};
