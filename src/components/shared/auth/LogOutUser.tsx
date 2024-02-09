import { FC } from 'react';

import { Button } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';

import { useAppDispatch } from 'hooks';
import { logOutUserThank } from 'store';

export const LogOutUser: FC = () => {
  const theme = {
    color: 'rgba(99, 99, 99, 1)',
    variant: 'default',
    w: '55px',
  };
  const dispatch = useAppDispatch();

  const logOutHandler = (): void => {
    dispatch(logOutUserThank());
  };

  return (
    <Button {...theme} onClick={logOutHandler}>
      <IconLogout2 width={20} height={20} color='grey' className='buttonOut' />
    </Button>
  );
};
