import { FC } from 'react';

import { Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { pathUserEditing } from '../../../constants/constants';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSortableData } from '../../../hooks/useSortableData';
import { ButtonSort } from '../ButtonSort/ButtonSort';
import { UserName } from '../UserName/UserName';

export const UsersTable: FC = () => {
  const users = useAppSelector((state) => state.main.users);
  const { items, requestSort } = useSortableData(users);
  const { t } = useTranslation();

  const rows = items.map((element) => (
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
              <ButtonSort nameField='fullName' requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('role')}
              <ButtonSort nameField='role' requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('nickname')}
              <ButtonSort nameField='nickname' requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('phone')}
              <ButtonSort nameField='phone' requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('email')}
              <ButtonSort nameField='email' requestSort={requestSort} />
            </Table.Th>
            <Table.Th>
              {t('balance')}
              <ButtonSort nameField='balance' requestSort={requestSort} />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    )
  );
};
