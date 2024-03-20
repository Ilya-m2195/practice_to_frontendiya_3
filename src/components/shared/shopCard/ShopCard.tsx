import { FC } from 'react';

import { Button, Card, CloseButton, Flex, Group, Image, Text } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconPencil } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { Balance } from '../balance/Balance';
import { ProductsModal } from '../productsModal/ProductsModal';

import { ModalsId, NamesDBCollection } from 'constant';
import { useAppDispatch, useRole } from 'hooks';
import { IProduct, removeShopDataThunk } from 'store';

export const ShopCard: FC<IProduct> = ({
  productName,
  availabilityProduct,
  productPrice,
  productImage,
  id,
}) => {
  const { t } = useTranslation();
  const [count, handlers] = useCounter(0, { min: 0, max: availabilityProduct });
  const dispatch = useAppDispatch();
  const { isAdmin } = useRole();

  const titleProductsModal = t('addProduct');

  const openProductsModal = (id?: string, oldProductValues?: IProduct): void => {
    modals.openContextModal({
      modal: ModalsId.FormModal,
      title: titleProductsModal,
      centered: true,
      innerProps: {
        modalBody: <ProductsModal id={id} oldProductValues={oldProductValues} />,
      },
    });
  };

  const removeProductHandler = (): void => {
    if (!id) {
      return;
    }

    dispatch(removeShopDataThunk({ id, nameDBCollection: NamesDBCollection.Products }));
  };

  return (
    <Card w='235' withBorder radius='md' p='md' mih='355'>
      {isAdmin && (
        <Card.Section withBorder>
          <Flex align='center' justify='end' gap='5'>
            <Button
              onClick={() =>
                openProductsModal(id, {
                  productName,
                  availabilityProduct,
                  productPrice,
                  productImage,
                })
              }
              variant='transparent'
              p='0'
              color='grey'
            >
              <IconPencil size='20' />
            </Button>
            <CloseButton variant='transparent' onClick={removeProductHandler} />
          </Flex>
        </Card.Section>
      )}
      <Card.Section mt='xs' withBorder>
        <Flex align='center' justify='center'>
          <Image src={productImage} alt={productName} maw='150' h='150' />
        </Flex>
      </Card.Section>
      <Card.Section withBorder mt='md'>
        <Flex align='center' direction='column' gap='sm' mb='sm'>
          <Text fz='lg' fw='500'>
            {productName}
          </Text>
          <Group justify='space-between' gap='xl'>
            <Text size='xs'>
              {t('count')} {availabilityProduct}
            </Text>
            <Group wrap='nowrap'>
              <Button
                size='compact-sm'
                disabled={count === 0}
                onClick={handlers.decrement}
                w='30'
              >
                -
              </Button>
              <Text>{count}</Text>
              <Button size='compact-sm' onClick={handlers.increment} w='30'>
                +
              </Button>
            </Group>
          </Group>
        </Flex>
      </Card.Section>
      <Group mt='xs' justify='space-between'>
        <Balance NumberCoins={productPrice} />
        <Button radius='md' style={{ flex: 1 }}>
          {t('addToBasket')}
        </Button>
      </Group>
    </Card>
  );
};
