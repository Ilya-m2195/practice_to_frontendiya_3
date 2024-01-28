import { FC } from 'react';

import { Loader } from '@mantine/core';

import style from './loaderFC.module.css';
import React from 'react';

export const LoaderFC: FC = () => {
  return <Loader className={style.loader} />;
};
