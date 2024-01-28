import { FC } from 'react';

import { Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { pathUserEditing } from '../../../constants/constants';
import { UsersKeys } from '../../../constants/enums';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSortableData } from '../../../hooks/useSortableData';
import { ButtonSort } from '../ButtonSort/ButtonSort';
import { UserName } from '../UserName/UserName';
import React from 'react';

export const UsersTable: FC = () => {
  const users = useAppSelector((state) => state.main.users);
  const { sortUsers, requestSort } = useSortableData(users);
  const { t } = useTranslation();

  const rows = sortUsers.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Link to={`${pathUserEditing}${element.id}`}>
          <UserName name={element.fullName} />
        </Link>
      </Table.Td>
      <Table.Td>{element.role}</Table.Td>
      <Table.Td>{element.nickname}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
    </Table.Tr>
  ));

  return (
    users && (
      <Table withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              {t('fullName')}
              <ButtonSort nameField={UsersKeys.fullName} requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('role')}
              <ButtonSort nameField={UsersKeys.role} requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('nickname')}
              <ButtonSort nameField={UsersKeys.nickname} requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('phone')}
              <ButtonSort nameField={UsersKeys.phone} requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('email')}
              <ButtonSort nameField={UsersKeys.email} requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('balance')}
              <ButtonSort nameField={UsersKeys.balance} requestSort={requestSort} />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    )
  );
};
