import { FC, Suspense } from 'react';

import { AppShell, Flex } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import {
  SearchInput,
  Header,
  Navigation,
  SwitchButton,
  SwitchLanguageBtn,
  LogOutUser,
  LoaderFC,
} from 'components';
import { useAppSelector } from 'hooks';
import { getIsAuth } from 'store';

export const DefaultLayout: FC = () => {
  const isAuth = useAppSelector(getIsAuth);

  const [opened, { toggle }] = useDisclosure();
  const matches = useMediaQuery('(max-width: 767.5px)');

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{ width: 150, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='xl'
    >
      <AppShell.Header p='sm'>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p='xl' className='navBar'>
        <Flex direction='column' align='center' gap={20}>
          {matches && <SearchInput />}
          {isAuth && <Navigation />}
          <LogOutUser />
          {matches && <SwitchButton />}
          {matches && <SwitchLanguageBtn />}
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        <Suspense fallback={<LoaderFC />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};
