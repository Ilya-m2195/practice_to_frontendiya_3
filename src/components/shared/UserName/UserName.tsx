import { FC } from 'react';

import { Avatar, Group } from '@mantine/core';

import { urlPicture } from '../../../constants/constants';

type Props = {
  name: string;
};

export const UserName: FC<Props> = ({ name }) => {
  return (
    <Group>
      <Avatar src={urlPicture} />
      <span>{name}</span>
    </Group>
  );
};
