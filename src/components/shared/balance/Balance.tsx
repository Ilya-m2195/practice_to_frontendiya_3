import { FC } from 'react';

import { Flex, Text } from '@mantine/core';
import { IconCoins } from '@tabler/icons-react';

import { color } from './config';

type Props = {
  NumberCoins: number;
};

export const Balance: FC<Props> = ({ NumberCoins }) => {
  return (
    <Flex align='center' gap={7} color='#d9e80c'>
      <IconCoins color={color} />
      <Text c={color}>{NumberCoins}</Text>
    </Flex>
  );
};
