import { FC } from 'react';

import { Button } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logOutUserThank } from '../../../store/slices/mainSlice';
import React from 'react';

export const LogOutUser: FC = () => {
  const dispatch = useAppDispatch();
  const logOutHandler = (): void => {
    dispatch(logOutUserThank());
  };

  return (
    <Button variant='outline' color='rgba(99, 99, 99, 1)' onClick={logOutHandler}>
      <IconLogout2 size={36} color='grey' />
    </Button>
  );
};
