import { FC } from 'react';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { SearchInput } from 'components';
import { useAppSelector } from 'hooks';
import { getIsAuth } from 'store';

export const Header: FC = () => {
  const isAuth = useAppSelector(getIsAuth);
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell.Header p='sm'>
      {isAuth && <SearchInput />}
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom='sm'
        size='md'
        pos='absolute'
        top={10}
      />
    </AppShell.Header>
  );
};
