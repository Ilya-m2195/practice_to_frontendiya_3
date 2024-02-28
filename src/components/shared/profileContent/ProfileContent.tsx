import { FC } from 'react';

import { Tabs } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const ProfileContent: FC = () => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue='team'>
      <Tabs.List>
        <Tabs.Tab value='team'>{t('team')}</Tabs.Tab>
        <Tabs.Tab value='friends'>{t('friends')}</Tabs.Tab>
        <Tabs.Tab value='statistics'>{t('statistics')}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='team'>Gallery tab content</Tabs.Panel>
      <Tabs.Panel value='friends'>Messages tab content</Tabs.Panel>
      <Tabs.Panel value='statistics'>Settings tab content</Tabs.Panel>
    </Tabs>
  );
};
