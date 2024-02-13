import { Path } from 'constants';

import { FC } from 'react';

import { Flex, Table, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { headerTableNames } from './config';

import { ButtonSort, UserName } from 'components';
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
          <UserName name={element.fullName} />
        </Link>
      </Table.Td>
      <Table.Td align='center'>{element.role}</Table.Td>
      <Table.Td align='center'>{element.nickname}</Table.Td>
      <Table.Td align='center'>{element.phone}</Table.Td>
      <Table.Td align='center'>{element.email}</Table.Td>
      <Table.Td align='center'>{element.balance}</Table.Td>
    </Table.Tr>
  ));

  const headerTable = headerTableNames.map((el) => {
    return (
      <Table.Th key={el}>
        <Flex wrap='nowrap' gap={5} align='center'>
          <Text w={80}> {t(el)} </Text>
          <ButtonSort nameField={el} requestSort={requestSort} />
        </Flex>
      </Table.Th>
    );
  });

  return (
    users && (
      <Table.ScrollContainer minWidth={766}>
        <Table horizontalSpacing='xl' withColumnBorders>
          <Table.Thead>
            <Table.Tr>{headerTable}</Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rowsTables}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    )
  );
};
