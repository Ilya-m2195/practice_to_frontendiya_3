import { FC, useState } from 'react';

import { Stack, Text, Group, Button, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconCoins, IconArrowBackUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { BalanceOperation } from 'constant';
import { useAppDispatch } from 'hooks';
import { setBalanceHistoryThunk } from 'store';

interface IProps {
  userId: string;
}

export const ChangeBalanceForm: FC<IProps> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const [operationType, setOperationType] = useState<Nullable<BalanceOperation>>(null);

  const { onSubmit, getInputProps, reset, values } = useForm({
    validateInputOnChange: ['amount'],
    validate: {
      amount: (value) => (value <= 0 ? t('errorAmount') : null),
    },
  });

  const onSubmitHandler = (value: typeof values): void => {
    const data = {
      value: value.amount,
      typeOperation: operationType,
    };

    if (userId && operationType) {
      dispatch(setBalanceHistoryThunk(data)).then(() => {
        setOperationType(null);
        reset();
        modals.closeAll();
      });
    }
  };

  return (
    <form onSubmit={onSubmit(onSubmitHandler)}>
      <Stack align='center' mt='md'>
        {!operationType && <Text size='18px'>{t('selectBalanceOperation')}</Text>}

        {!operationType && (
          <Group mt='sm' mb='md' justify='center'>
            <Button
              color='red'
              onClick={() => setOperationType(BalanceOperation.WriteOff)}
            >
              {t('writeOff')}
            </Button>
            <Button
              color='green'
              onClick={() => setOperationType(BalanceOperation.Accrue)}
            >
              {t('accrue')}
            </Button>
          </Group>
        )}

        {operationType && (
          <Stack mb='md'>
            <Text size='18px'>{t('enterAmount')}</Text>
            <Text size='16px'>{t('conversion')}</Text>
            <NumberInput
              leftSection={<IconCoins size={20} />}
              thousandSeparator=','
              decimalScale={2}
              min={0}
              placeholder={t('amount')}
              {...getInputProps('amount')}
            />

            <Group mt='sm' justify='center'>
              <Button
                leftSection={<IconArrowBackUp size={20} />}
                variant='light'
                onClick={() => setOperationType(null)}
              >
                {t('back')}
              </Button>

              <Button type='submit'>{t('save')}</Button>
            </Group>
          </Stack>
        )}
      </Stack>
    </form>
  );
};
