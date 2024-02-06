import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { admin, pathHome } from 'constants/constants';
import { useAppSelector } from 'hooks/useAppSelector';
import { getRole } from 'store/selectors';

export const PrivateRouteAdmin: FC = () => {
  const role = useAppSelector(getRole);

  return role === admin ? <Outlet /> : <Navigate to={pathHome} />;
};
