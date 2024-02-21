import { FC } from 'react';

import { Flex, Text } from '@mantine/core';
import { IconCoins } from '@tabler/icons-react';

type Props = {
  NumberCoins: number;
};

export const Balance: FC<Props> = ({ NumberCoins }) => {
  return (
    <Flex align='center' gap={7}>
      <IconCoins color='gold' />
      <Text c='gold'>{NumberCoins}</Text>
    </Flex>
  );
};
