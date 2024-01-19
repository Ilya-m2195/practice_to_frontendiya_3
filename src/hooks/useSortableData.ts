import { useState, useMemo } from 'react';

interface IConfig {
  key: string;
  direction: string;
}

interface IReturnType {
  items: Array<any>;
  requestSort: (key: string) => void;
}

export const useSortableData = (
  items: Array<any>,
  config: IConfig | null = null,
): IReturnType => {
  const [sortConfig, setSortConfig] = useState<IConfig | null>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string): void => {
    let direction = 'ascending';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort };
};
