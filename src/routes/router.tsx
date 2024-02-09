import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { Path } from '../constants';

import { PrivateRouteAdmin } from './privateRouterAdmin/PrivateRouteAdmin';

import { DefaultLayout, ErrorMessage } from 'components';
import { LoginRoute, PrivateRoute } from 'routes';

const UsersPage = lazy(() =>
  import('pages').then(({ UsersPage }) => ({ default: UsersPage })),
);
const AddUserNickFormPage = lazy(() =>
  import('pages').then(({ AddUserNickFormPage }) => ({ default: AddUserNickFormPage })),
);
const HomePage = lazy(() =>
  import('pages').then(({ HomePage }) => ({ default: HomePage })),
);
const LoginPage = lazy(() =>
  import('pages').then(({ LoginPage }) => ({ default: LoginPage })),
);
const UserEditingPage = lazy(() =>
  import('pages').then(({ UserEditingPage }) => ({ default: UserEditingPage })),
);

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <LoginRoute />,
        children: [
          {
            path: Path.Login,
            element: <LoginPage />,
          },
          {
            path: Path.SetNick,
            element: <AddUserNickFormPage />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: Path.Home,
            element: <HomePage />,
          },
        ],
      },
      {
        element: <PrivateRouteAdmin />,
        children: [
          {
            path: Path.Users,
            element: <UsersPage />,
          },
          {
            path: `${Path.UserEditing}:id`,
            element: <UserEditingPage />,
          },
        ],
      },
      {
        path: '*',
        element: <ErrorMessage errorMessage='errorMessagePageNotFound' />,
      },
    ],
  },
]);
