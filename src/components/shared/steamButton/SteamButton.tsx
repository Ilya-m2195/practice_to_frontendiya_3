import { FC } from 'react';

import { Button, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconBrandSteam } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { SteamForm } from 'components';
import { iconSize } from 'components/shared/steamButton/config';
import style from 'components/shared/steamButton/steamButton.module.css';
import { useAppSelector } from 'hooks';
import { getSteam } from 'store';

export const SteamButton: FC = () => {
  const steam = useAppSelector(getSteam);

  const { t } = useTranslation();

  const title = t('addSteamAccount');

  const openModal = (): void => {
    modals.openContextModal({
      modal: 'changeNickname',
      title,
      centered: true,
      innerProps: {
        modalBody: <SteamForm />,
      },
    });
  };

  return (
    <>
      <Button
        leftSection={<IconBrandSteam size={iconSize} color='white' />}
        p='0'
        justify='flexstart'
        variant='transparent'
        size='sm'
        aria-label='Settings'
        color='white'
        onClick={openModal}
      >
        {!steam && t('addSteamAccount')}
        {steam && t('updateSteamAccount')}
      </Button>

      {steam && (
        <Group gap='10px'>
          <IconBrandSteam size={iconSize} color='white' opacity='0.4' />
          <Text className={style.steamAcc} size='sm' color='dimmed'>
            {steam}
          </Text>
        </Group>
      )}
    </>
  );
};
