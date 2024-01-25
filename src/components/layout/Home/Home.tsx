import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../hooks/useAppSelector';

export const Home: FC = () => {
  const nickname = useAppSelector((state) => state.main.nickname);
  const email = useAppSelector((state) => state.main.email);
  const { t } = useTranslation();

  return (
    <div>
      {email && (
        <div>
          <span> {t('welcome')}</span>
          <span> {nickname}</span>
        </div>
      )}
    </div>
  );
};
