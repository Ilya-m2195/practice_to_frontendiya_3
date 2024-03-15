import { useEffect } from 'react';

import { notifications } from '@mantine/notifications';
import { t } from 'i18next';

import { useAppSelector } from 'hooks';
import { getErrorMessage } from 'store';

export const useNotificationError = (): void => {
  const errorMessage = useAppSelector(getErrorMessage);

  useEffect(() => {
    if (errorMessage) {
      notifications.show({
        id: 'error',
        withCloseButton: true,
        autoClose: 5000,
        title: t('error'),
        message: t(errorMessage),
        color: 'red',
        className: 'my-notification-class',
        loading: false,
      });
    }
  }, [errorMessage]);
};
