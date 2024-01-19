import { FC } from 'react';

import { Button, TextInput, Box, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { addUser } from '../../../api/api';
import { MARGIN_16, MARGIN_32, errorMessage } from '../../../constants/constants';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useGetUsers } from '../../../hooks/useGetUsers';
import { setUser } from '../../../store/slices/mainSlice';
import { IUser } from '../../../types/types';

type Props = {
  email: string;
  id: string;
};

export const AddUserNickForm: FC<Props> = ({ email, id }) => {
  const dispatch = useAppDispatch();
  const goBackHandler = (): void => navigate(-1);
  const users = useGetUsers();

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
      nickname: (value) =>
        users.find((el: IUser) => el.nickname === value) === undefined
          ? null
          : errorMessage,
    },
  });

  return (
    <Box maw={300} mb={MARGIN_32}>
      <form
        onSubmit={form.onSubmit((values) => {
          addUser({
            email,
            id,
            role: values.role,
            nickname: values.nickname,
            balance: values.balance,
            phone: values.phone,
            fullName: values.fullName,
          });
          const currentUserInfo: IUser = {
            email,
            id,
            role: values.role,
            nickname: values.nickname,
            balance: values.balance,
            phone: values.phone,
            fullName: values.fullName,
          };

          dispatch(setUser(currentUserInfo));
          form.reset();
        })}
      >
        <Group mb={MARGIN_16}>
          <Button mb={MARGIN_16} onClick={goBackHandler}>
            {t('back')}
          </Button>
          <Button mb={MARGIN_16} type='submit'>
            {t('addClient')}
          </Button>
        </Group>

        <TextInput
          label={t('nickname')}
          placeholder={t('nickname')}
          {...form.getInputProps('addNickname')}
        />
      </form>
    </Box>
  );
};
