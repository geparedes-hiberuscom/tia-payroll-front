import { ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { ModalContentStyles } from './Modal.styles';

export interface ModalProps extends VariantProps<typeof ModalContentStyles> {
  children: ReactNode;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  closeLabel?: string;
}
