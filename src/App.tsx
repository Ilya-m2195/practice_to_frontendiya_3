import { FC } from 'react';

import { RouterProvider } from 'react-router-dom';
import 'styles/reset.css';

import { LoaderFC, ErrorMessage } from 'components';
import { useAppSelector } from 'hooks';
import { router } from 'routes';
import { getErrorMessage, getIsLoading } from 'store';

export const App: FC = () => {
  const isLoading = useAppSelector(getIsLoading);
  const errorMessage = useAppSelector(getErrorMessage);

  if (isLoading) {
    return <LoaderFC />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return <RouterProvider router={router} />;
};
