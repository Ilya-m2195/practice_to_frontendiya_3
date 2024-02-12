import { FC, useState } from 'react';

import { InputBase, Combobox, useCombobox, Avatar } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { delay } from 'components/shared/searchInput/config';
import classes from 'components/shared/searchInput/searchInput.module.css';
import { useDebounced } from 'hooks';
import { searchDataThank, useAppDispatch } from 'store';
import { getSearchData } from 'store/selectors';

export const SearchInput: FC = () => {
  const dispatch = useAppDispatch();
  const searchData = useSelector(getSearchData);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  const options = searchData?.map((item) => (
    <Combobox.Option value={item.nickname} key={item.nickname}>
      <Avatar size={24} src={item.avatar} radius={24} />
      <span style={{ marginLeft: 10 }}>{item.nickname}</span>
    </Combobox.Option>
  ));

  const requestData = (): void => {
    if (!search.length) return;

    dispatch(searchDataThank(search));
  };

  const handleSearch = (value: string): void => {
    combobox.openDropdown();
    combobox.updateSelectedOptionIndex();
    setSearch(value);
  };

  useDebounced({
    callback: requestData,
    delay,
    dependencies: [search],
  });

  return (
    <Combobox
      store={combobox}
      withinPortal
      classNames={{
        option: classes.option,
      }}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          leftSection={<IconSearch />}
          value={search}
          onChange={(event) => handleSearch(event.currentTarget.value)}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder={t('friendSearch')}
          rightSectionPointerEvents='none'
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {searchData ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
