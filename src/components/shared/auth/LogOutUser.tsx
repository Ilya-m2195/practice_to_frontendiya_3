import { FC } from 'react';

import { IconLogout2 } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { logOutUserThank } from 'store';

export const LogOutUser: FC = () => {
  const theme = {
    variant: 'transparent',
    type: 'button',
    cursor: 'pointer',
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logOutHandler = (): void => {
    dispatch(logOutUserThank({ navigate }));
  };

  return <IconLogout2 {...theme} onClick={logOutHandler} />;
};
