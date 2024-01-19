import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { admin, pathHome } from '../../../constants/constants';

type Props = {
  role: string;
};

export const PrivateRouteAdmin: FC<Props> = ({ role }) => {
  return role === admin ? <Outlet /> : <Navigate to={pathHome} />;
};
