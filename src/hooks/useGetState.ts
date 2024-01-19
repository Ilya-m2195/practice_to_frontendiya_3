import { IInitialState } from '../types/types';

import { useAppSelector } from './useAppSelector';

export const useGetState = (): IInitialState => {
  const state = useAppSelector((state) => state.main);

  return state;
};
