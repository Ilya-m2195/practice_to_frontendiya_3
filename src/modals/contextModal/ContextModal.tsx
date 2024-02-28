import { ReactNode } from 'react';

import { ContextModalProps } from '@mantine/modals';

export const ContextModal = ({
  innerProps,
}: ContextModalProps<{ modalBody: ReactNode }>): ReactNode => {
  return <div>{innerProps.modalBody}</div>;
};
