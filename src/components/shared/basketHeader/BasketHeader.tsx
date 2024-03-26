import React, { FC } from 'react';

import { Stack, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import styles from './basketHeader.module.css';

import { Path } from 'constant';
import { useAppSelector } from 'hooks';
import { getBasketCount } from 'store';

export const BasketHeader: FC = () => {
  const basketCountItems = useAppSelector(getBasketCount);

  return (
    <Stack>
      <Link
        className={styles.linkBasket}
        aria-label='logo'
        role='link'
        aria-current='page'
        to={Path.Home}
      >
        {basketCountItems && (
          <Indicator display='flex' label={basketCountItems} size={16} offset={5}>
            <IconShoppingCart stroke={2} color='white' />
          </Indicator>
        )}

        {!basketCountItems && <IconShoppingCart stroke={2} color='white' />}
      </Link>
    </Stack>
  );
};
