import { FC } from 'react';

import { Box, Button, Flex, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { validateNickname } from 'helpers/validateNickname';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getIsOccupiedNick } from 'store/selectors';
import { updateUserThank } from 'store/slices/mainSlice';
import { IValuesUserEditing } from 'types/types';

export const UserEditing: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOccupiedNick = useAppSelector(getIsOccupiedNick);

  const { t } = useTranslation();
  const { id } = useParams();

  const goBackHandler = (): void => {
    navigate(-1);
  };
  const onSubmitHandler = (values: IValuesUserEditing): void => {
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
      role: 'user',
    },
    validate: {
      nickname: (value) => validateNickname(dispatch, value, isOccupiedNick),
    },
  });

  return (
    <Box>
      <Button mb='md' onClick={goBackHandler}>
        {t('backToClients')}
      </Button>
      <Title mb='md' order={2}>
        {t('clientEditing')}
      </Title>
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
          <Button type='submit'>{t('save')}</Button>
        </Flex>
      </form>
    </Box>
  );
};
