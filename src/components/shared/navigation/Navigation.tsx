import { FC } from 'react';

import { Flex, Group } from '@mantine/core';
import {
  IconBuildingStore,
  IconCalendarTime,
  IconDeviceGamepad2,
  IconHome,
  IconLogin2,
  IconSettings,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';

import { LogOutUser } from '../auth/LogOutUser';
import { NavigationElement } from '../navigationElement/NavigationElement';

import { Path } from 'constant';
import { useAppSelector, useRole } from 'hooks';
import { getIsAuth } from 'store';

import 'styles/navigation.css';

export const Navigation: FC = () => {
  const isAuth = useAppSelector(getIsAuth);

  const { isAdmin } = useRole();

  if (!isAuth) {
    return (
      <Flex
        justify='space-between'
        align='center'
        direction='column'
        w='100%'
        gap='10'
        h='100%'
      >
        <NavigationElement
          label='authorization'
          path={Path.Login}
          icon={<IconLogin2 />}
        />
      </Flex>
    );
  }

  return (
    <Flex
      justify='space-between'
      align='center'
      direction='column'
      w='100%'
      gap='10'
      h='100%'
    >
      <Group>
        <NavigationElement label='home' path={Path.Home} icon={<IconHome />} />
        <NavigationElement label='shop' path={Path.Shop} icon={<IconBuildingStore />} />
        <NavigationElement
          label='reservation'
          path={Path.Reservation}
          icon={<IconCalendarTime />}
        />
        <NavigationElement
          label='tournaments'
          path={Path.Tournaments}
          icon={<IconDeviceGamepad2 />}
        />

        {isAdmin && (
          <>
            <NavigationElement
              label='users'
              path={Path.Users}
              icon={<IconUsersGroup />}
            />
            <NavigationElement label='adminPanel' path={Path.Admin} icon={<IconUser />} />
          </>
        )}
      </Group>
      <Group>
        <NavigationElement
          label='settings'
          path={Path.Settings}
          icon={<IconSettings />}
        />
        <NavigationElement label='logout' path={Path.Login} icon={<LogOutUser />} />
      </Group>
    </Flex>
  );
};
