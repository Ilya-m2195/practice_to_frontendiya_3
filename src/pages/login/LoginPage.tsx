import { FC } from 'react';

import { Group } from '@mantine/core';

import { SignInGitHub, SignInGoogle } from 'components';

export const LoginPage: FC = () => {
  return (
    <Group display='flex' align='center' justify='center' ml='-xl'>
      <SignInGitHub />
      <SignInGoogle />
    </Group>
  );
};
