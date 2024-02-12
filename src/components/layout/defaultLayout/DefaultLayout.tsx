import { FC, Suspense } from 'react';

import { AppShell, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import {
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
  const [opened] = useDisclosure();

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{ width: 150, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='xl'
    >
      <Header />
      <AppShell.Navbar p='xl' className='navBar'>
        <Flex direction='column' align='center' gap={20}>
          {isAuth && <Navigation />}
          <LogOutUser />
          <SwitchButton />
          <SwitchLanguageBtn />
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
