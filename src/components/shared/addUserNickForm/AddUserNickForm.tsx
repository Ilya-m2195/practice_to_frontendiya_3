import { FC } from 'react';

import { Button, TextInput, Box, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { validateNickname } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getEmail, getId, getIsOccupiedNick, addUserThank } from 'store';
import { IValuesAddUserNickForm } from 'types';

export const AddUserNickForm: FC = () => {
  const id = useAppSelector(getId);
  const email = useAppSelector(getEmail);
  const isOccupiedNick = useAppSelector(getIsOccupiedNick);
  const dispatch = useAppDispatch();

  const goBackHandler = (): void => {
    navigate(-1);
  };

  const onSubmitHandler = ({
    role,
    nickname,
    balance,
    phone,
    fullName,
  }: IValuesAddUserNickForm): void => {
    dispatch(
      addUserThank({
        email,
        id,
        role,
        nickname,
        balance,
        phone,
        fullName,
      }),
    );
    form.reset();
  };

  const { t } = useTranslation();

  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: ['nickname'],
    initialValues: {
      fullName: '',
      nickname: '',
      role: 'user',
      phone: '',
      balance: 0,
    },
    validate: {
      nickname: (value) => validateNickname(dispatch, value, isOccupiedNick),
    },
  });

  return (
    <Box maw={300} mb='lg'>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Group mb='md'>
          <Button mb='md' onClick={goBackHandler}>
            {t('back')}
          </Button>
          <Button mb='md' type='submit'>
            {t('setNickname')}
          </Button>
        </Group>
        <TextInput
          label={t('nickname')}
          placeholder={t('addNickname')}
          {...form.getInputProps('nickname')}
          withAsterisk
        />
      </form>
    </Box>
  );
};
