import { FC } from 'react';

import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';

import { minLength } from 'components/shared/steamForm/config';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getId, updateUserThank } from 'store';

export const SteamForm: FC = () => {
  const id = useAppSelector(getId);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const form = useForm({
    validateInputOnChange: ['steam'],
    initialValues: {
      steam: '',
    },
    validate: {
      steam: (value) => (value.length < minLength ? t('errorNameLength') : null),
    },
  });

  const onSubmitHandler = ({ steam }: { steam: string }): void => {
    const values = {
      steam,
    };

    dispatch(updateUserThank({ id, values })).then(() => {
      modals.closeAll();
      form.reset();
    });
  };

  return (
    <form onSubmit={form.onSubmit((value) => onSubmitHandler(value))}>
      <TextInput
        label={t('steam')}
        placeholder={t('addSteamAccount')}
        {...form.getInputProps('steam')}
        withAsterisk
      />
      <Button mt='md' type='submit'>
        {t('setSteam')}
      </Button>
    </form>
  );
};
