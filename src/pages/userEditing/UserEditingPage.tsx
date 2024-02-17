import { FC } from 'react';

import { Box, Button, Flex, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { validateNickname } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getIsOccupiedNick, getLimitUsersThank, getUsers, updateUserThank } from 'store';
import { IUpdateUser } from 'types';

export const UserEditingPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOccupiedNick = useAppSelector(getIsOccupiedNick);

  const { t } = useTranslation();
  const { id } = useParams();
  const users = useAppSelector(getUsers);
  const limit = users.length;

  const goBackHandler = (): void => {
    navigate(-1);
  };
  const onSubmitHandler = (values: IUpdateUser): void => {
    if (!id) {
      return;
    }

    dispatch(updateUserThank({ id, values }));
    dispatch(getLimitUsersThank({ nickname: 'nickname', limit }));

    form.reset();
  };

  const form = useForm({
    validateInputOnChange: ['nickname'],
    initialValues: {
      nickname: '',
      fullName: '',
      role: 'user',
      phone: '',
    },
    validate: {
      nickname: (value) => validateNickname(dispatch, value, isOccupiedNick),
    },
  });

  return (
    <Box>
      <Title mb='xl' order={2}>
        {t('clientEditing')}
      </Title>
      <Button mb='lg' onClick={goBackHandler}>
        {t('backToClients')}
      </Button>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Flex gap='md' align='end' wrap='wrap'>
          <TextInput
            label={t('nickname')}
            placeholder={t('addNickname')}
            {...form.getInputProps('nickname')}
          />
          <TextInput
            label={t('fullName')}
            placeholder={t('AddFullName')}
            {...form.getInputProps('fullName')}
          />
          <Select
            label={t('role')}
            data={['user', 'admin']}
            {...form.getInputProps('role')}
          />
          <TextInput
            disabled
            label={t('phone')}
            placeholder='+7-999-999-99-99'
            {...form.getInputProps('phone')}
          />
          <Button type='submit'>{t('save')}</Button>
        </Flex>
      </form>
    </Box>
  );
};
