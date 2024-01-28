import { FC } from 'react';

import { Group } from '@mantine/core';

import { SignInGitHub } from '../../shared/auth/SignInGitHub';
import { SignInGoogle } from '../../shared/auth/SignInGoogle';
import React from 'react';

export const LoginPage: FC = () => {
  return (
    <Group display='flex' align='center' justify='center' ml='-xl'>
      <SignInGitHub />
      <SignInGoogle />
    </Group>
  );
};
