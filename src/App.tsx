import { FC } from 'react';

import { RouterProvider } from 'react-router-dom';

import { LoaderFC } from 'components';
import 'styles/reset.css';
import { useAppSelector, useNotificationError } from 'hooks';
import { router } from 'routes';
import { getIsLoading } from 'store';

export const App: FC = () => {
  const isLoading = useAppSelector(getIsLoading);

  useNotificationError();

  if (isLoading) {
    return <LoaderFC />;
  }

  return <RouterProvider router={router} />;
};
