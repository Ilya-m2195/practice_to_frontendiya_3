import { FC } from 'react';

import { Stack } from '@mantine/core';

import { ProfileInfo, ProfileContent } from 'components';

export const ProfilePage: FC = () => {
  return (
    <Stack>
      <ProfileInfo />
      <ProfileContent />
    </Stack>
  );
};
