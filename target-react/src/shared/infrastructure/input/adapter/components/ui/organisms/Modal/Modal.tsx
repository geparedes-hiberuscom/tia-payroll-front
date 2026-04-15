

import * as Dialog from '@radix-ui/react-dialog';
import { cn } from 'utils-tailwindcss';
import {
  ModalOverlayStyles,
  ModalContentStyles,
  ModalTitleStyles,
  ModalCloseStyles,
} from './Modal.styles';
import { useModal } from './hooks/useModal';
import { ModalProps } from './Modal.types';
import React from 'react';

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  setIsOpen,
  title,
  closeLabel,
  size,
}) => {
  const { resolvedCloseLabel } = useModal({ closeLabel });

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={ModalOverlayStyles()} />
        <Dialog.Content className={cn(ModalContentStyles({ size }))}>
          <Dialog.Title className={ModalTitleStyles()}>{title}</Dialog.Title>
          {children}
          <Dialog.Close aria-label={resolvedCloseLabel} className={ModalCloseStyles()}>
            x
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
