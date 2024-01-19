import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { pathLogin } from '../../../constants/constants';

type Props = {
  isAuth: boolean;
};

export const PrivateRoute: FC<Props> = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to={pathLogin} />;
};
