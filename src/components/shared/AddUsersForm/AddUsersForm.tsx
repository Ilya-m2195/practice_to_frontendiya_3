import { FC } from 'react';

import { Group, Button, TextInput, Box, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMask } from '@react-input/mask';
import { useTranslation } from 'react-i18next';

import { MARGIN_16, MARGIN_32 } from '../../../constants/constants';

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
  const inputRef = useMask({ mask: '+7 (___) ___-__-__', replacement: { _: /\d/ } });

  return (
    <Box maw={700} mb={MARGIN_32} mt={MARGIN_16}>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          form.reset();
        })}
      >
        <Group mb={MARGIN_32}>
          <span>
            {t('totalCount')} {usersCount}
          </span>
          <Button type='submit'>{t('addClient')}</Button>
        </Group>
        <Flex gap={MARGIN_16}>
          <TextInput
            ref={inputRef}
            mb={MARGIN_16}
            label={t('phone')}
            placeholder='+7 (999) 999-99-99'
            {...form.getInputProps('phone')}
          />
          <TextInput
            mb={MARGIN_16}
            label={t('nickname')}
            placeholder={t('addNickname')}
            {...form.getInputProps('nickname')}
          />
          <TextInput
            mb={MARGIN_16}
            label={t('fullName')}
            placeholder={t('AddFullName')}
            {...form.getInputProps('fullName')}
          />
        </Flex>
      </form>
    </Box>
  );
};
