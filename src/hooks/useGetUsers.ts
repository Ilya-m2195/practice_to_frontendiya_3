import { IUser } from '../types/types';

import { useAppSelector } from './useAppSelector';

export const useGetUsers = (): Array<IUser> => {
  const users = useAppSelector((state) => state.main.users);

  return users;
};
