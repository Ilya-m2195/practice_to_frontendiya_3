import { FC } from 'react';

import { AppShell, Group } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import './styles/reset.css';

import { Home } from './components/layout/Home/Home';
import { LoginPage } from './components/layout/LoginPage/LoginPage';
import { UserEditing } from './components/layout/UserEditing/UserEditing';
import { Users } from './components/layout/Users/Users';
import { AddUserNickForm } from './components/shared/AddUserNickForm/AddUserNickForm';
import { LogOutUser } from './components/shared/auth/LogOutUser';
import { ErrorMessage } from './components/shared/ErrorMessage/ErrorMessage';
import { LoaderFC } from './components/shared/LoaderFC/LoaderFC';
import { Navigation } from './components/shared/Navigation/Navigation';
import { LoginRoute } from './components/shared/Routes/LoginRoute';
import { PrivateRoute } from './components/shared/Routes/PrivateRoute';
import { PrivateRouteAdmin } from './components/shared/Routes/PrivateRouteAdmin';
import { SwitchButton } from './components/shared/SwitchButton/SwitchButton';
import { SwitchLanguageBtn } from './components/shared/SwitchLanguageBtn/SwitchLanguageBtn';
import {
  MARGIN_16,
  pathHome,
  pathLogin,
  pathSetNick,
  pathUserEditing,
  pathUsers,
} from './constants/constants';
import { useAppSelector } from './hooks/useAppSelector';

export const App: FC = () => {
  const isLoading = useAppSelector((state) => state.main.isLoading);
  const isError = useAppSelector((state) => state.main.isError);
  const isAuth = useAppSelector((state) => state.main.isAuth);

  if (isLoading) {
    return <LoaderFC />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 150, breakpoint: 'sm' }}
      padding='xl'
    >
      <AppShell.Header p='sm'>
        <Group display='flex' gap={MARGIN_16} w={200}>
          <SwitchButton />
          <SwitchLanguageBtn />
        </Group>
        {isAuth && <Navigation />}
      </AppShell.Header>
      <AppShell.Navbar p='xl'>
        <LogOutUser />
      </AppShell.Navbar>
      <AppShell.Main>
        <Routes>
          <Route element={<LoginRoute />}>
            <Route path={pathLogin} element={<LoginPage />} />
            <Route path={pathSetNick} element={<AddUserNickForm />} />
          </Route>
          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route path={pathHome} element={<Home />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path={pathUsers} element={<Users />} />
            <Route path={`${pathUserEditing}:id`} element={<UserEditing />} />
          </Route>
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};
