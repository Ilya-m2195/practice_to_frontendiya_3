import { FC } from 'react';

import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { NamesDBCollection } from 'constant';
import { useAppDispatch, useRole } from 'hooks';
import { IProduct, setProductThunk, updateShopDataThunk } from 'store';

type Props = {
  id?: string;
  oldProductValues?: IProduct;
};

export const ProductsModal: FC<Props> = ({ id, oldProductValues }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAdmin } = useRole();

  const getInitialValues = (): IProduct => {
    return {
      productName: oldProductValues?.productName || '',
      availabilityProduct: oldProductValues?.availabilityProduct || 0,
      productPrice: oldProductValues?.productPrice || 0,
      productImage: oldProductValues?.productImage || '',
    };
  };

  const { values, reset, onSubmit, getInputProps } = useForm({
    initialValues: getInitialValues(),
  });

  const onSubmitHandler = (valuesForm: typeof values): void => {
    if (id) {
      dispatch(
        updateShopDataThunk({
          id,
          values: valuesForm,
          nameDBCollection: NamesDBCollection.Products,
        }),
      );

      return;
    }

    dispatch(setProductThunk(valuesForm));

    reset();
  };

  return (
    isAdmin && (
      <Box>
        <Box maw={340} mx='auto'>
          <form onSubmit={onSubmit(onSubmitHandler)}>
            <TextInput
              label={t('productName')}
              placeholder={t('productName')}
              {...getInputProps('productName')}
              mb='16'
            />
            <TextInput
              label={t('availabilityProduct')}
              placeholder={t('availabilityProduct')}
              {...getInputProps('availabilityProduct')}
              mb='16'
              type='number'
            />
            <TextInput
              label={t('productPrice')}
              placeholder={t('productPrice')}
              {...getInputProps('productPrice')}
              mb='16'
              type='number'
            />
            <TextInput
              label={t('productImage')}
              placeholder={t('productImage')}
              {...getInputProps('productImage')}
              mb='16'
            />
            <Group justify='flex-end' mt='md'>
              <Button type='submit'>{t('save')}</Button>
            </Group>
          </form>
        </Box>
      </Box>
    )
  );
};
