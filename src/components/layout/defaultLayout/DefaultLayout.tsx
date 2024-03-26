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
  LoaderFC,
} from 'components';

export const DefaultLayout: FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const matches = useMediaQuery('(max-width: 767.5px)');

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{ width: 100, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='xl'
    >
      <AppShell.Header p='sm'>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p='xl' className='navBar'>
        <Flex direction='column' align='center' gap={20} h='100%'>
          {matches && <SearchInput />}
          {matches && <SwitchButton />}
          {matches && <SwitchLanguageBtn />}
          <Navigation />
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
