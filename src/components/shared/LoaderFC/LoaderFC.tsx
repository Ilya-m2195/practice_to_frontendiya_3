import { FC } from 'react';
import '../../../styles/loader.css';

import { Loader } from '@mantine/core';

export const LoaderFC: FC = () => {
  return <Loader className='loader' color='indigo' />;
};
