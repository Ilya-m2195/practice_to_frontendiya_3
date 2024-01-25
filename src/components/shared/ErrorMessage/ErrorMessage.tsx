import { FC } from 'react';
import '../../../styles/errorMessage.css';

import { useTranslation } from 'react-i18next';

export const ErrorMessage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className='errorMessageBlock'>
      <h2>{t('errorMessage')}</h2>
    </div>
  );
};
