import { FC } from 'react';

import { Flex, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './errorMessage.module.css';

type Props = {
  errorMessage: string;
};

export const ErrorMessage: FC<Props> = ({ errorMessage }) => {
  const { t } = useTranslation();

  return (
    <Flex direction='column'>
      <Title mt={32} className={styles.errorMessage} order={2}>
        {t('errorMessage')}
      </Title>
      <Title mt={32} className={styles.errorMessage} order={3}>
        ( {errorMessage.toString()} )
      </Title>
    </Flex>
  );
};
