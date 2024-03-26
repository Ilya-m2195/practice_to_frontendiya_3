import { FC } from 'react';

import { Flex, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';

import {
  SearchInput,
  SwitchButton,
  SwitchLanguageBtn,
  SvgSprite,
  UserInfoHeader,
  BasketHeader,
} from 'components';
import styles from 'components/widget/header/header.module.css';
import { Path } from 'constant';
import { useAppSelector } from 'hooks';
import { getIsAuth } from 'store';

interface IProps {
  opened: boolean;
  toggle: () => void;
}

export const Header: FC<IProps> = ({ opened, toggle }) => {
  const isAuth = useAppSelector(getIsAuth);

  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <Flex direction='row' gap={{ base: 'sm', sm: 'lg' }} justify='space-between'>
      <Link
        className={styles.logo}
        aria-label='logo'
        role='link'
        aria-current='page'
        to={Path.Home}
      >
        <SvgSprite id='logo' size={['109', '27']} color='#fffff' />
      </Link>

      <Flex align='center' gap='sm'>
        {isAuth && matches && <SearchInput />}
        {matches && <SwitchLanguageBtn />}
        {matches && <SwitchButton />}
        {isAuth && <BasketHeader />}
        {isAuth && <UserInfoHeader />}
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='md' />
      </Flex>
    </Flex>
  );
};
