import { admin, NamesActiveStyles, Path } from 'constants';

import { FC } from 'react';

import { Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import 'styles/navigation.css';

import { useAppSelector } from 'hooks';
import { getRole } from 'store';

export const Navigation: FC = () => {
  const currentUserRole = useAppSelector(getRole);
  const { t } = useTranslation();

  return (
    <Group justify='center'>
      <NavLink to={Path.Home} className={NamesActiveStyles.ItemStyle}>
        {t('home')}
      </NavLink>
      {currentUserRole === admin && (
        <NavLink to={Path.Users} className={NamesActiveStyles.ItemStyle}>
          {t('users')}
        </NavLink>
      )}
    </Group>
  );
};
