import { FC } from 'react';

import { Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './errorMessage.module.css';
import React from 'react';

export const ErrorMessage: FC = () => {
  const { t } = useTranslation();

  return (
    <Title mt={32} className={styles.errorMessage} order={2}>
      {t('errorMessage')}
    </Title>
  );
};
