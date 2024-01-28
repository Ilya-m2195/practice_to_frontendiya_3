import { useAppDispatch } from 'hooks/useAppDispatch';
import { t } from 'i18next';
import { isOccupiedNickThank } from 'store/slices/mainSlice';
import { AppDispatch } from 'store/store';

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
