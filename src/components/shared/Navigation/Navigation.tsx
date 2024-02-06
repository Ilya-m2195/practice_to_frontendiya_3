import { FC } from 'react';

import { Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import 'styles/navigation.css';

import { admin, pathHome, pathUsers } from 'constants/constants';
import { NamesActiveStyles } from 'constants/enums';
import { useAppSelector } from 'hooks/useAppSelector';
import { getRole } from 'store/selectors';

export const Navigation: FC = () => {
  const currentUserRole = useAppSelector(getRole);
  const { t } = useTranslation();

  return (
    <Group justify='center'>
      <NavLink to={pathHome} className={NamesActiveStyles.itemStyle}>
        {t('home')}
      </NavLink>
      {currentUserRole === admin && (
        <NavLink to={pathUsers} className={NamesActiveStyles.itemStyle}>
          {t('users')}
        </NavLink>
      )}
    </Group>
  );
};
