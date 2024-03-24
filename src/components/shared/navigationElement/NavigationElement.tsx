import { FC, ReactElement } from 'react';

import { Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { NamesActiveStyles, Path } from 'constant';

type Props = {
  label: string;
  path: Path;
  icon: ReactElement;
};

export const NavigationElement: FC<Props> = ({ label, path, icon }) => {
  const { t } = useTranslation();

  return (
    <Tooltip label={t(label)} position='right' offset={10}>
      <NavLink to={path} className={NamesActiveStyles.ItemStyle}>
        {icon}
      </NavLink>
    </Tooltip>
  );
};
