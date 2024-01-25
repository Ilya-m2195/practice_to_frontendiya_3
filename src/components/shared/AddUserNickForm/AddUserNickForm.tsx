import { FC, useEffect } from 'react';

import { Button, TextInput, Box, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { MARGIN_16, MARGIN_32 } from '../../../constants/constants';
import { validateNickname } from '../../../helpers/validateNickname';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { addUserThank, getUsersThank } from '../../../store/slices/mainSlice';

export const AddUserNickForm: FC = () => {
  const id = useAppSelector((state) => state.main.id);
  const email = useAppSelector((state) => state.main.email);
  const users = useAppSelector((state) => state.main.users);
  const dispatch = useAppDispatch();
  const goBackHandler = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getUsersThank());
  }, []);

  const { t } = useTranslation();

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      fullName: '',
      nickname: '',
      role: 'user',
      phone: '',
      balance: 0,
    },
    validate: {
      nickname: (value) => validateNickname(value, users),
    },
  });

  return (
    <Box maw={300} mb={MARGIN_32}>
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(
            addUserThank({
              email,
              id,
              role: values.role,
              nickname: values.nickname,
              balance: values.balance,
              phone: values.phone,
              fullName: values.fullName,
            }),
          );
          form.reset();
        })}
      >
        <Group mb={MARGIN_16}>
          <Button mb={MARGIN_16} onClick={goBackHandler}>
            {t('back')}
          </Button>
          <Button mb={MARGIN_16} type='submit'>
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
