import { createBrowserRouter } from 'react-router-dom';

import { PrivateRouteAdmin } from './privateRouterAdmin/PrivateRouteAdmin';
import { Path } from './types';

import { DefaultLayout, AddUserNickForm, ErrorMessage } from 'components';
import { UsersPage, HomePage, LoginPage, UserEditingPage } from 'pages';
import { LoginRoute, PrivateRoute } from 'routes';

export const router = createBrowserRouter([
  {
    path: Path.Home,
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
            element: <AddUserNickForm />,
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
