import { FC } from 'react';

import { Avatar, Group, Text } from '@mantine/core';

import { urlPicture } from 'constant';

type Props = {
  name: string;
  photoURL: Nullable<string>;
};

export const UserName: FC<Props> = ({ name, photoURL }) => {
  const avatar = photoURL || urlPicture;

  return (
    <Group>
      <Avatar src={avatar} />
      <Text>{name}</Text>
    </Group>
  );
};
