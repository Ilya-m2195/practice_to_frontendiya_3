import { FC } from 'react';

import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { NamesDBCollection } from 'constant';
import { useAppDispatch, useRole } from 'hooks';
import { setProductCategoryThunk, updateShopDataThunk } from 'store';

type Props = {
  id?: string;
};

export const CategoriesModal: FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAdmin } = useRole();

  const { onSubmit, reset, values, getInputProps } = useForm({
    initialValues: {
      nameCategory: '',
    },
  });

  const onSubmitHandler = (valuesForm: typeof values): void => {
    if (id) {
      dispatch(
        updateShopDataThunk({
          id,
          values: valuesForm,
          nameDBCollection: NamesDBCollection.ProductCategories,
        }),
      );

      reset();

      return;
    }
    dispatch(setProductCategoryThunk(valuesForm));
    reset();
  };

  return (
    isAdmin && (
      <form onSubmit={onSubmit(onSubmitHandler)}>
        <Box maw={340} mx='auto'>
          <TextInput
            label={t('nameCategory')}
            placeholder={t('nameCategory')}
            {...getInputProps('nameCategory')}
            mb='16'
          />
          <Group justify='flex-end' mt='md'>
            <Button type='submit'>{t('save')}</Button>
          </Group>
        </Box>
      </form>
    )
  );
};
