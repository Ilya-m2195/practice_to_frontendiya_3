import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { pathHome } from '../../../constants/constants';

type Props = {
  isAuth: boolean;
};

export const LoginRoute: FC<Props> = ({ isAuth }) => {
  return !isAuth ? <Outlet /> : <Navigate to={pathHome} />;
};
