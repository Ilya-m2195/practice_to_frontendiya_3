import { FC, useEffect } from 'react';

import { Box, Button, Card, CloseButton, Flex, Group, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { limit } from './config';

import { CategoriesModal, ProductsModal, ShopCard } from 'components';
import { ModalsId, NamesActiveStyles, NamesDBCollection, Path } from 'constant';
import { useAppDispatch, useAppSelector, useRole } from 'hooks';
import {
  getCategoriesDataThunk,
  getCategoryId,
  getProductCategories,
  getProducts,
  getProductsDataThunk,
  IProduct,
  removeShopDataThunk,
  setCurrentCategoryId,
} from 'store';

export const ShopPage: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const products = useSelector(getProducts);
  const productCategories = useAppSelector(getProductCategories);
  const productCategoryId = useAppSelector(getCategoryId);

  const { isAdmin } = useRole();

  const openCategoriesModal = (id?: string): void => {
    modals.openContextModal({
      modal: ModalsId.FormModal,
      title: t('addCategory'),
      centered: true,
      innerProps: {
        modalBody: <CategoriesModal id={id} />,
      },
    });
  };

  const openProductsModal = (id?: string, oldProductValues?: IProduct): void => {
    modals.openContextModal({
      modal: ModalsId.FormModal,
      title: t('addProduct'),
      centered: true,
      innerProps: {
        modalBody: <ProductsModal id={id} oldProductValues={oldProductValues} />,
      },
    });
  };

  const setCategoryIdHandler = (id?: string): void => {
    if (!id) {
      return;
    }
    dispatch(setCurrentCategoryId(id));
    dispatch(getProductsDataThunk(limit));
  };

  const removeCategoryHandler = (id?: string): void => {
    if (!id) {
      return;
    }

    dispatch(
      removeShopDataThunk({ id, nameDBCollection: NamesDBCollection.ProductCategories }),
    );
  };

  useEffect(() => {
    dispatch(getCategoriesDataThunk(limit));
  }, [dispatch, getCategoriesDataThunk, limit]);

  return (
    <Box>
      <Title order={2} mb='xs'>
        {t('shop')}
      </Title>
      <Flex justify='start' align='center' direction='row' mb='xl' gap={20}>
        {productCategories.map((category) => (
          <Flex align='center' gap='md' key={category.id}>
            <NavLink
              to={`${Path.Shop}/${category.nameCategory}`}
              className={NamesActiveStyles.ItemStyle}
              onClick={() => setCategoryIdHandler(category.id)}
            >
              {category.nameCategory}
            </NavLink>
            {isAdmin && (
              <Group gap='5'>
                <Button
                  onClick={() => openCategoriesModal(category.id!)}
                  variant='transparent'
                  p='0'
                  color='grey'
                >
                  <IconPencil size='20' />
                </Button>
                <CloseButton
                  variant='transparent'
                  onClick={() => removeCategoryHandler(category.id)}
                />
              </Group>
            )}
          </Flex>
        ))}
        {isAdmin && (
          <Button onClick={() => openCategoriesModal()} variant='subtle'>
            + {t('addCategory')}
          </Button>
        )}
      </Flex>
      {productCategoryId && (
        <Flex gap='32' wrap='wrap' align='end'>
          {products.map((product) => (
            <ShopCard
              key={product.productName}
              productImage={product.productImage}
              availabilityProduct={product.availabilityProduct}
              productName={product.productName}
              productPrice={product.productPrice}
              id={product.id}
            />
          ))}
          {isAdmin && (
            <Button
              onClick={() => openProductsModal()}
              variant='subtle'
              mih='355'
              p='0'
              radius='md'
            >
              <Card w='235' withBorder radius='md' h='100%'>
                <Flex align='center' justify='center' h='100%'>
                  + {t('addProduct')}
                </Flex>
              </Card>
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};
