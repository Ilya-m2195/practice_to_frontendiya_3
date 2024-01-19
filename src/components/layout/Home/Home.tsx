import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { useGetState } from '../../../hooks/useGetState';

export const Home: FC = () => {
  const state = useGetState();
  const { t } = useTranslation();

  return (
    <div>
      {state.email && (
        <div>
          <span> {t('welcome')}</span>
          <span> {state.nickname}</span>
        </div>
      )}
    </div>
  );
};
