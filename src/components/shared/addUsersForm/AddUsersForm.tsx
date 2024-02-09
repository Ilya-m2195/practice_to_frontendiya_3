import { FC } from 'react';

import { Group, Button, TextInput, Box, Flex, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMask } from '@react-input/mask';
import { useTranslation } from 'react-i18next';

import { IValuesAddUserNickForm } from 'types';

type Props = {
  usersCount: number;
};

export const AddUsersForm: FC<Props> = ({ usersCount }) => {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      phone: '',
      nickname: '',
      fullName: '',
      role: 'user',
      email: '',
      balance: 0,
    },
  });

  const onSubmitHandler = (values: IValuesAddUserNickForm): void => {
    console.log(values);
    form.reset();
  };

  const inputRef = useMask({ mask: '+7 (___) ___-__-__', replacement: { _: /\d/ } });

  return (
    <Box maw={700} mb='lg' mt='md'>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Group mb='lg'>
          <Text>
            {t('totalCount')} {usersCount}
          </Text>
          <Button type='submit'>{t('addClient')}</Button>
        </Group>
        <Flex gap='md'>
          <TextInput
            ref={inputRef}
            mb='md'
            label={t('phone')}
            placeholder='+7 (999) 999-99-99'
            {...form.getInputProps('phone')}
          />
          <TextInput
            mb='md'
            label={t('nickname')}
            placeholder={t('addNickname')}
            {...form.getInputProps('nickname')}
          />
          <TextInput
            mb='md'
            label={t('fullName')}
            placeholder={t('AddFullName')}
            {...form.getInputProps('fullName')}
          />
        </Flex>
      </form>
    </Box>
  );
};
