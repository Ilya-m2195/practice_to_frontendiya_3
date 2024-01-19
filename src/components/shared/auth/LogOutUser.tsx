import { FC } from 'react';

import { Button } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';

import { LogOut } from '../../../api/api';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

export const LogOutUser: FC = () => {
  const dispatch = useAppDispatch();
  const logOutHandler = (): Promise<void> => LogOut(dispatch);

  return (
    <Button variant='outline' color='rgba(99, 99, 99, 1)' onClick={logOutHandler}>
      <IconLogout2 size={36} color='grey' />
    </Button>
  );
};
