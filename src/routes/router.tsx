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

const TournamentsPage = lazy(() =>
  import('pages').then(({ TournamentsPage }) => ({ default: TournamentsPage })),
);

const ReservationPage = lazy(() =>
  import('pages').then(({ ReservationPage }) => ({ default: ReservationPage })),
);

const AdminPanelPage = lazy(() =>
  import('pages').then(({ AdminPanelPage }) => ({ default: AdminPanelPage })),
);

const SettingsPage = lazy(() =>
  import('pages').then(({ SettingsPage }) => ({ default: SettingsPage })),
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
            path: Path.Tournaments,
            element: <TournamentsPage />,
          },
          {
            path: Path.Reservation,
            element: <ReservationPage />,
          },
          {
            path: Path.Settings,
            element: <SettingsPage />,
          },
          {
            path: Path.Shop,
            element: <ShopPage />,
            children: [
              {
                path: `${Path.Shop}:name`,
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
            path: Path.Admin,
            element: <AdminPanelPage />,
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
