import { Path } from 'constants';

import { FC } from 'react';

import { Flex, Avatar, Group, Text, Box } from '@mantine/core';
import { IconCoins } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { getNickname, getPhotoURl, getBalance } from 'store';

export const UserInfoHeader: FC = () => {
  const photoUrl = useAppSelector(getPhotoURl);
  const balance = useAppSelector(getBalance);
  const nickname = useAppSelector(getNickname);

  return (
    <Link to={Path.Profile} className='user-info-link'>
      <Flex className='user-info' gap='sm' align='center'>
        <Avatar size='md' radius='sm' src={photoUrl} />

        <Box>
          <Text size='sm'>{nickname}</Text>
          <Group gap='sm'>
            <IconCoins size={16} color='gold' />
            <Text c='gold'>{balance}</Text>
          </Group>
        </Box>
      </Flex>
    </Link>
  );
};
