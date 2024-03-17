import { FC, useEffect, useState } from 'react';

import { InputBase, Combobox, useCombobox, Avatar } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { delay } from 'components/shared/searchInput/config';
import classes from 'components/shared/searchInput/searchInput.module.css';
import { getSearchData, searchDataThank, useAppDispatch } from 'store';

export const SearchInput: FC = () => {
  const dispatch = useAppDispatch();
  const searchData = useSelector(getSearchData);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState('');
  const [search] = useDebouncedValue(value, delay);
  const { t } = useTranslation();

  const requestData = (): void => {
    if (!search.length) return;

    dispatch(searchDataThank(search));
  };

  const setValueOnBlurb = (): void => {
    combobox.closeDropdown();
    setValue(value || '');
  };

  const handleSearch = (value: string): void => {
    combobox.openDropdown();
    combobox.updateSelectedOptionIndex();
    setValue(value);
  };

  useEffect(() => {
    requestData();
  }, [search, requestData]);

  return (
    <Combobox
      store={combobox}
      withinPortal
      classNames={{
        option: classes.option,
      }}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          leftSection={<IconSearch />}
          value={value}
          onChange={(event) => handleSearch(event.currentTarget.value)}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={setValueOnBlurb}
          placeholder={t('friendSearch')}
          rightSectionPointerEvents='none'
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {!searchData && <Combobox.Empty>{t('nothingFound')}</Combobox.Empty>}

          {searchData &&
            searchData?.map((item) => (
              <Combobox.Option value={item.nickname} key={item.nickname}>
                <Avatar size={24} src={item.photoURL} radius={24} />
                <span style={{ marginLeft: 10 }}>{item.nickname}</span>
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
