import { UserRole } from '../constant';
import { getRole } from '../store';

import { useAppSelector } from './useAppSelector';

interface IReturnType {
  [key: string]: boolean;
}

export const useRole = (): IReturnType => {
  const isAdmin = useAppSelector(getRole) === UserRole.Admin;
  const isUser = useAppSelector(getRole) === UserRole.User;

  return { isAdmin, isUser };
};
