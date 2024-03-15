import { FC } from 'react';

import { Button, Group, rem, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPhoneCall, IconSettings } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { SetUserNicknameForm, AvatarProfile, SteamButton } from 'components';
import { ModalsId } from 'constant';
import { useAppSelector, useChangeFormatDate } from 'hooks';
import { iconSize } from 'pages/profile/config';
import { getCreatedAt, getFullName, getNickname, getPhone, getPhotoURl } from 'store';

export const ProfileInfo: FC = () => {
  const photoURL = useAppSelector(getPhotoURl);
  const fullName = useAppSelector(getFullName);
  const createdAt = useAppSelector(getCreatedAt);
  const nickname = useAppSelector(getNickname);
  const phone = useAppSelector(getPhone);

  const { t } = useTranslation();

  const date = useChangeFormatDate(createdAt);

  const title = t('updateNickname');

  const openModal = (): void => {
    modals.openContextModal({
      modal: ModalsId.FormModal,
      title,
      centered: true,
      innerProps: {
        modalBody: <SetUserNicknameForm />,
      },
    });
  };

  return (
    <Group>
      <AvatarProfile photoURL={photoURL} />
      <Stack gap='0'>
        <Text size='md' color='dimmed' fw={500}>
          {fullName}
        </Text>
        <Title order={4}>{nickname}</Title>
        {createdAt && (
          <Text mt='5' size='sm' color='dimmed'>
            {`${t('participatesWith')} ${date}`}
          </Text>
        )}
        {phone && (
          <Group gap='10px'>
            <IconPhoneCall size={iconSize} color='white' opacity='0.4' />
            <Text mt='5' size='sm' color='dimmed'>
              {phone}
            </Text>
          </Group>
        )}
        <SteamButton />
      </Stack>

      <Button variant='light' size='sm' aria-label='Settings' onClick={openModal}>
        <IconSettings style={{ width: rem('20') }} stroke={1.5} />
      </Button>
    </Group>
  );
};
