import { UserRole, NamesActiveStyles, Path } from 'constants';

import { FC } from 'react';

import { Flex } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import 'styles/navigation.css';

import { useAppSelector } from 'hooks';
import { getRole } from 'store';

export const Navigation: FC = () => {
  const currentUserRole = useAppSelector(getRole);

  const { t } = useTranslation();

  return (
    <Flex justify='center' align-items='center' direction='column'>
      <NavLink to={Path.Home} className={NamesActiveStyles.ItemStyle}>
        {t('home')}
      </NavLink>
      {currentUserRole === UserRole.Admin && (
        <NavLink to={Path.Users} className={NamesActiveStyles.ItemStyle}>
          {t('users')}
        </NavLink>
      )}
    </Flex>
  );
};
