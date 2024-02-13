import { admin, Path } from 'constants';

import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { getRole } from 'store';

export const PrivateRouteAdmin: FC = () => {
  const role = useAppSelector(getRole);

  return role === admin ? <Outlet /> : <Navigate to={Path.Home} />;
};
