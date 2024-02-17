import { FC, useEffect } from 'react';

import { Box, Button, Center, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { limit } from './config';

import { UsersTable } from 'components';
import { useAppDispatch } from 'hooks';
import {
  getLengthDataUsers,
  getLimitUsersThank,
  getMoreUsersThank,
  getUsers,
} from 'store';

export const UsersPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const lengthAllUsersData = useSelector(getLengthDataUsers);

  const usersLength = users.length;
  const visibleMoreBtn = usersLength < lengthAllUsersData;
  const getMoreDataHandler = (): void => {
    dispatch(getMoreUsersThank({ nickname: 'nickname', limit }));
  };

  useEffect(() => {
    if (!usersLength) {
      dispatch(getLimitUsersThank({ nickname: 'nickname', limit }));
    }
  }, [limit]);

  return (
    <Box>
      <Title order={2} mb={16}>
        {t('clients')}
      </Title>
      <UsersTable />
      {visibleMoreBtn && (
        <Center mt='30'>
          <Button onClick={getMoreDataHandler}>{t('showMore')}</Button>
        </Center>
      )}
    </Box>
  );
};
