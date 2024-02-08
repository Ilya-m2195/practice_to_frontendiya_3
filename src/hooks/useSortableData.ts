import { UsersKeys } from 'constants';

import { useState, useMemo } from 'react';

import { IUser } from 'types';

interface IConfig {
  key: UsersKeys;
  direction: string;
}

interface IReturnType {
  sortUsers: Array<IUser>;
  requestSort: (key: UsersKeys) => void;
}

export const useSortableData = (sortUsers: Array<IUser>): IReturnType => {
  const [sortConfig, setSortConfig] = useState<IConfig | undefined>();

  const requestSort = (key: UsersKeys): void => {
    let direction = 'ascending';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = useMemo(() => {
    const sortableUsers = [...sortUsers];

    if (sortConfig) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableUsers;
  }, [sortUsers, sortConfig]);

  return { sortUsers: sortedUsers, requestSort };
};
