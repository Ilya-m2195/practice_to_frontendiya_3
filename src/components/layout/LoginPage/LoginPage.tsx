import { FC } from 'react';

import { Group } from '@mantine/core';

import { SignInGitHub } from '../../shared/auth/SignInGitHub';
import { SignInGoogle } from '../../shared/auth/SignInGoogle';

export const LoginPage: FC = () => {
  return (
    <Group display='flex' align='center' justify='center'>
      <SignInGitHub />
      <SignInGoogle />
    </Group>
  );
};
