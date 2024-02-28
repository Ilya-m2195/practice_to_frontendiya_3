import { FC } from 'react';

import { Box, Button, Flex, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { UserRole } from 'constant';
import { validateNickname } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getIsOccupiedNick, updateUserThank } from 'store';
import { IUpdateUser } from 'types';

export const UserEditingPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const isOccupiedNick = useAppSelector(getIsOccupiedNick);

  const { t } = useTranslation();

  const goBackHandler = (): void => {
    navigate(-1);
  };
  const onSubmitHandler = (values: IUpdateUser): void => {
    if (!id) {
      return;
    }

    dispatch(updateUserThank({ id, values }));

    form.reset();
  };

  const form = useForm({
    validateInputOnChange: ['nickname'],
    initialValues: {
      nickname: '',
      fullName: '',
      phone: '',
      role: UserRole.User,
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
            data={[UserRole.User, UserRole.Admin]}
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
