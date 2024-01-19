import { FC, useState } from 'react';

import { Group } from '@mantine/core';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

import '../../../styles/navigation.css';

import { admin, pathHome, pathUsers } from '../../../constants/constants';
import { useAppSelector } from '../../../hooks/useAppSelector';

export const Navigation: FC = () => {
  const [currentLink, setCurrentLink] = useState(pathHome);
  const CurrentUserRole = useAppSelector((state) => state.main.role);

  const setCurrentLinkHandler = (path: string): void => setCurrentLink(path);

  const activeStyle = 'active';
  const itemStyle = 'item';

  return (
    <Group justify='center' mt={-30}>
      <Link
        to={pathHome}
        className={currentLink === pathHome ? activeStyle : itemStyle}
        onClick={() => setCurrentLinkHandler(pathHome)}
      >
        {t('home')}
      </Link>
      {CurrentUserRole === admin && (
        <Link
          to={pathUsers}
          className={currentLink === pathUsers ? activeStyle : itemStyle}
          onClick={() => setCurrentLinkHandler(pathUsers)}
        >
          {t('users')}
        </Link>
      )}
    </Group>
  );
};
