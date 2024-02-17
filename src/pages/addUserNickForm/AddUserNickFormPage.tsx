import { UserRole } from 'constants';

import { FC } from 'react';

import { Button, TextInput, Box, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { validateNickname } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getEmail, getId, getIsOccupiedNick, getPhotoURl } from 'store';
import { setUserThank } from 'store/slices/mainSlice';
import { IValuesAddUserNickForm } from 'types';

export const AddUserNickFormPage: FC = () => {
  const id = useAppSelector(getId);
  const email = useAppSelector(getEmail);
  const photoURL = useAppSelector(getPhotoURl);
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
    const searchNickname = nickname.toLowerCase();

    const values = {
      email,
      id,
      role,
      nickname,
      balance,
      phone,
      fullName,
      photoURL,
      searchNickname,
    };

    dispatch(setUserThank({ id, values }));
    form.reset();
  };

  const { t } = useTranslation();

  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: ['nickname'],
    initialValues: {
      fullName: '',
      nickname: '',
      role: UserRole.User,
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
