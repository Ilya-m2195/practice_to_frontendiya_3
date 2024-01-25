import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { admin, pathHome } from '../../../constants/constants';
import { useAppSelector } from '../../../hooks/useAppSelector';

export const PrivateRouteAdmin: FC = () => {
  const role = useAppSelector((state) => state.main.role);

  return role === admin ? <Outlet /> : <Navigate to={pathHome} />;
};
