import { FC } from 'react';

import { Burger } from '@mantine/core';

import { SearchInput } from 'components';
import { useAppSelector } from 'hooks';
import { getIsAuth } from 'store';

interface IProps {
  opened: boolean;
  toggle: () => void;
}

export const Header: FC<IProps> = ({ opened, toggle }) => {
  const isAuth = useAppSelector(getIsAuth);

  return (
    <>
      {isAuth && <SearchInput />}
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom='sm'
        size='md'
        pos='absolute'
        top={10}
      />
    </>
  );
};
