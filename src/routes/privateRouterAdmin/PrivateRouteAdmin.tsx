import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { UserRole, Path } from 'constant';
import { useAppSelector } from 'hooks';
import { getRole } from 'store';

export const PrivateRouteAdmin: FC = () => {
  const role = useAppSelector(getRole);

  return role === UserRole.Admin ? <Outlet /> : <Navigate to={Path.Home} />;
};
