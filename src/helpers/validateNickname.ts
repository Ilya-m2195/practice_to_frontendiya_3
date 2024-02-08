import { t } from 'i18next';

import { isOccupiedNickThank, AppDispatch } from 'store';

export const validateNickname = (
  dispatch: AppDispatch,
  value: string,
  isOccupiedNick: boolean,
): string | undefined => {
  dispatch(isOccupiedNickThank(value));

  if (isOccupiedNick) {
    return t('errorMessageNicknameField');
  }
  if (!value.length) {
    return t('errorMessageEmptyField');
  }
};
