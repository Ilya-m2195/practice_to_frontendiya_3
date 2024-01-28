import { FC, useState } from 'react';

import { Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import '../../../styles/navigation.css';

import { admin, pathHome, pathUsers } from '../../../constants/constants';
import { NamesActiveStyles } from '../../../constants/enums';
import { useAppSelector } from '../../../hooks/useAppSelector';
import React from 'react';

export const Navigation: FC = () => {
  const [currentLink, setCurrentLink] = useState(pathHome);
  const CurrentUserRole = useAppSelector((state) => state.main.role);
  const { t } = useTranslation();

  const setCurrentLinkHandler = (path: string): void => setCurrentLink(path);

  return (
    <Group justify='center' mt={-30}>
      <Link
        to={pathHome}
        className={
          currentLink === pathHome
            ? NamesActiveStyles.activeStyle
            : NamesActiveStyles.itemStyle
        }
        onClick={() => setCurrentLinkHandler(pathHome)}
      >
        {t('home')}
      </Link>
      {CurrentUserRole === admin && (
        <Link
          to={pathUsers}
          className={
            currentLink === pathUsers
              ? NamesActiveStyles.activeStyle
              : NamesActiveStyles.itemStyle
          }
          onClick={() => setCurrentLinkHandler(pathUsers)}
        >
          {t('users')}
        </Link>
      )}
    </Group>
  );
};
