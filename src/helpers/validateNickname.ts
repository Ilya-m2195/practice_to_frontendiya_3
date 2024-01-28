import { t } from 'i18next';

import { IUser } from '../types/types';

export const validateNickname = (
  value: string,
  users: Array<IUser>,
): string | undefined => {
  const isOccupiedField = users.find((el) => el.nickname === value);

  if (isOccupiedField) {
    return t('errorMessageNicknameField');
  }
  if (!value.length) {
    return t('errorMessageEmptyField');
  }
};
