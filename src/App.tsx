import { FC } from 'react';

import { AppShell, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import 'styles/reset.css';

import {
  pathHome,
  pathLogin,
  pathSetNick,
  pathUserEditing,
  pathUsers,
} from './constants/constants';
import { useAppSelector } from './hooks/useAppSelector';
import { getIsAuth, getErrorMessage, getIsLoading } from './store/selectors';

import { Home } from 'components/layout/Home/Home';
import { LoginPage } from 'components/layout/LoginPage/LoginPage';
import { UserEditing } from 'components/layout/UserEditing/UserEditing';
import { Users } from 'components/layout/Users/Users';
import { AddUserNickForm } from 'components/shared/AddUserNickForm/AddUserNickForm';
import { LogOutUser } from 'components/shared/auth/LogOutUser';
import { ErrorMessage } from 'components/shared/ErrorMessage/ErrorMessage';
import { LoaderFC } from 'components/shared/LoaderFC/LoaderFC';
import { Navigation } from 'components/shared/Navigation/Navigation';
import { LoginRoute } from 'components/shared/Routes/LoginRoute';
import { PrivateRoute } from 'components/shared/Routes/PrivateRoute';
import { PrivateRouteAdmin } from 'components/shared/Routes/PrivateRouteAdmin';
import { SwitchButton } from 'components/shared/SwitchButton/SwitchButton';
import { SwitchLanguageBtn } from 'components/shared/SwitchLanguageBtn/SwitchLanguageBtn';

export const App: FC = () => {
  const isLoading = useAppSelector(getIsLoading);
  const errorMessage = useAppSelector(getErrorMessage);
  const isAuth = useAppSelector(getIsAuth);
  const { t } = useTranslation();
  const [opened, { toggle }] = useDisclosure();

  if (isLoading) {
    return <LoaderFC />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

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
        <Routes>
          <Route element={<LoginRoute />}>
            <Route path={pathLogin} element={<LoginPage />} />
            <Route path={pathSetNick} element={<AddUserNickForm />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={pathHome} element={<Home />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path={pathUsers} element={<Users />} />
            <Route path={`${pathUserEditing}:id`} element={<UserEditing />} />
          </Route>
          <Route
            path='*'
            element={<ErrorMessage errorMessage={t('errorMessagePageNotFound')} />}
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};
