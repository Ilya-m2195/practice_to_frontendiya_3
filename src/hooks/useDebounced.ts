import { useEffect, useRef } from 'react';

interface UseDebouncedEffectProps {
  callback: () => void;
  delay: number;
  dependencies: (string | boolean)[];
}

export const useDebounced = ({
  callback,
  delay,
  dependencies,
}: UseDebouncedEffectProps): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, delay]);
};
