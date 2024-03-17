import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { PrivateRouteAdmin } from './privateRouterAdmin/PrivateRouteAdmin';

import { DefaultLayout } from 'components';
import { Path } from 'constant';
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
const ProfilePage = lazy(() =>
  import('pages').then(({ ProfilePage }) => ({ default: ProfilePage })),
);
const NotFoundPage = lazy(() =>
  import('pages').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
);

const ShopPage = lazy(() =>
  import('pages').then(({ ShopPage }) => ({ default: ShopPage })),
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
          {
            path: Path.Shop,
            element: <ShopPage />,
            children: [
              {
                path: `${Path.Shop}:name`,
                element: <UserEditingPage />,
              },
            ],
          },
          {
            path: Path.Profile,
            element: <ProfilePage />,
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
        element: <NotFoundPage />,
      },
    ],
  },
]);
