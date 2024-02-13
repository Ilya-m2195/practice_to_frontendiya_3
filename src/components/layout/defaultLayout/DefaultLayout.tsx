import { FC, Suspense } from 'react';

import { AppShell, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import {
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

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{ width: 150, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='xl'
    >
      <AppShell.Header p='sm'>
        {isAuth && <Navigation />}
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom='sm'
          size='md'
          pos='absolute'
          top={10}
        />
      </AppShell.Header>
      <AppShell.Navbar p='xl' className='navBar'>
        <Flex direction='column' align='center' gap={20}>
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
