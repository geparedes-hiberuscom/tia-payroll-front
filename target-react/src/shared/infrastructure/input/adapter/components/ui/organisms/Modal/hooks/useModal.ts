import { useMemo } from 'react';
import { ModalProps } from '../Modal.types';

export const useModal = ({ closeLabel = 'Cerrar' }: Pick<ModalProps, 'closeLabel'>) => {
  const resolvedCloseLabel = useMemo(() => closeLabel, [closeLabel]);

  return {
    resolvedCloseLabel,
  };
};
