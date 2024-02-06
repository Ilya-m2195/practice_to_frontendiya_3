import { FC } from 'react';

import { Avatar, Group, Text } from '@mantine/core';

import { urlPicture } from 'constants/constants';

type Props = {
  name: string;
};

export const UserName: FC<Props> = ({ name }) => {
  return (
    <Group>
      <Avatar src={urlPicture} />
      <Text>{name}</Text>
    </Group>
  );
};
