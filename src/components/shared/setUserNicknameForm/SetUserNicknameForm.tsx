import { FC } from 'react';

import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';

import { validateNickname } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getId, getIsOccupiedNick, updateUserThank } from 'store';

export const SetUserNicknameForm: FC = () => {
  const id = useAppSelector(getId);
  const isOccupiedNick = useAppSelector(getIsOccupiedNick);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onSubmitHandler = ({ nickname }: { nickname: string }): void => {
    const values = {
      nickname,
    };

    dispatch(updateUserThank({ id, values })).then(() => {
      modals.closeAll();
      form.reset();
    });
  };

  const form = useForm({
    validateInputOnChange: ['nickname'],
    initialValues: {
      nickname: '',
    },
    validate: {
      nickname: (value) => validateNickname(dispatch, value, isOccupiedNick),
    },
  });

  return (
    <form onSubmit={form.onSubmit((value) => onSubmitHandler(value))}>
      <TextInput
        label={t('nickname')}
        placeholder={t('addNickname')}
        {...form.getInputProps('nickname')}
        withAsterisk
      />
      <Button mt='md' type='submit'>
        {t('setNickname')}
      </Button>
    </form>
  );
};
