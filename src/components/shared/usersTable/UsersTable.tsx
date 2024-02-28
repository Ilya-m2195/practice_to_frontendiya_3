import { FC } from 'react';

import { Badge, Flex, Table, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Balance } from '../balance/Balance';

import { headerTableNames, UserColor } from './config';

import { ButtonSort, UserName } from 'components';
import { Path } from 'constant';
import { useAppSelector, useSortableData } from 'hooks';
import { getUsers } from 'store';

export const UsersTable: FC = () => {
  const users = useAppSelector(getUsers);
  const { sortUsers, requestSort } = useSortableData(users);
  const { t } = useTranslation();

  const rowsTables = sortUsers.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td align='center'>
        <Link to={`${Path.UserEditing}${element.id}`}>
          <UserName name={element.fullName} photoURL={element.photoURL} />
        </Link>
      </Table.Td>
      <Table.Td>
        <Badge color={UserColor[element.role]}>{element.role}</Badge>
      </Table.Td>
      <Table.Td>{element.nickname}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>
        <Balance NumberCoins={element.balance} />
      </Table.Td>
    </Table.Tr>
  ));

  const headerTable = headerTableNames.map((el) => {
    return (
      <Table.Th key={el}>
        <Flex wrap='nowrap' gap={5} align='start'>
          <Text mr='16'> {t(el)} </Text>
          <ButtonSort nameField={el} requestSort={requestSort} />
        </Flex>
      </Table.Th>
    );
  });

  return (
    users && (
      <Table.ScrollContainer minWidth={766}>
        <Table horizontalSpacing='sm' striped>
          <Table.Thead>
            <Table.Tr>{headerTable}</Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rowsTables}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    )
  );
};
