import { FC } from 'react';

import { Flex } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { NamesActiveStyles, Path } from 'constant';
import { useRole } from 'hooks';

import 'styles/navigation.css';

export const Navigation: FC = () => {
  const { t } = useTranslation();

  const { isAdmin } = useRole();

  return (
    <Flex justify='center' align-items='center' direction='column'>
      <NavLink to={Path.Home} className={NamesActiveStyles.ItemStyle}>
        {t('home')}
      </NavLink>
      <NavLink to={Path.Shop} className={NamesActiveStyles.ItemStyle}>
        {t('shop')}
      </NavLink>
      {isAdmin && (
        <NavLink to={Path.Users} className={NamesActiveStyles.ItemStyle}>
          {t('users')}
        </NavLink>
      )}
    </Flex>
  );
};
