import { FC } from 'react';

import { Group, Button, Table } from '@mantine/core';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

import { MARGIN_32, pathUserEditing } from '../../../constants/constants';
import { useSortableData } from '../../../hooks/useSortableData';
import { IUser } from '../../../types/types';
import { ButtonSort } from '../ButtonSort/ButtonSort';
import { UserName } from '../UserName/UserName';

type Props = {
  users: Array<IUser>;
};

export const UsersTable: FC<Props> = ({ users }) => {
  const { items, requestSort } = useSortableData(users);

  const rows = items.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Link to={pathUserEditing + element.id}>
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
      <>
        <Group mb={MARGIN_32}>
          <input type='text' placeholder={t('search')} />
          <Button>X {t('reset')}</Button>
        </Group>
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
      </>
    )
  );
};
