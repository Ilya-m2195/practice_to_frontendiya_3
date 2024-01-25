import { FC } from 'react';

import { Box, Button, Flex, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { MARGIN_16 } from '../../../constants/constants';
import { validateNickname } from '../../../helpers/validateNickname';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { updateUserThank } from '../../../store/slices/mainSlice';

export const UserEditing: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goBackHandler = (): void => {
    navigate(-1);
  };
  const { t } = useTranslation();
  const { id } = useParams();

  const users = useAppSelector((state) => state.main.users);
  const form = useForm({
    initialValues: {
      nickname: '',
      fullName: '',
      role: 'user',
    },

    validate: {
      nickname: (value) => validateNickname(value, users),
    },
  });

  return (
    <Box>
      <Button mb={MARGIN_16} onClick={goBackHandler}>
        {t('backToClients')}
      </Button>
      <Title mb={MARGIN_16} order={2}>
        {t('clientEditing')}
      </Title>
      <form
        onSubmit={form.onSubmit((values) => {
          if (!id) {
            return;
          }
          dispatch(updateUserThank({ id, values }));
          form.reset();
        })}
      >
        <Flex gap={MARGIN_16} align='end'>
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
          <Button type='submit'>{t('save')}</Button>
        </Flex>
      </form>
    </Box>
  );
};
