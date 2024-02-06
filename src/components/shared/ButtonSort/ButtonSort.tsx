import { FC } from 'react';

import { Button } from '@mantine/core';
import { IconArrowsSort } from '@tabler/icons-react';

import { UsersKeys } from 'constants/enums';

type Props = {
  nameField: UsersKeys;
  requestSort: (fill: UsersKeys) => void;
};

export const ButtonSort: FC<Props> = ({ nameField, requestSort }) => {
  const requestSortHandler = (): void => {
    requestSort(nameField);
  };

  return (
    <Button ml={10} p={5} variant='default' onClick={requestSortHandler}>
      <IconArrowsSort width={15} />
    </Button>
  );
};
