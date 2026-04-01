import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ children, open, setIsOpen, title }) => {
  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 50,
          }}
        />
        <Dialog.Content
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '2rem',
            minWidth: '400px',
            maxWidth: '90vw',
            maxHeight: '85vh',
            overflowY: 'auto',
            zIndex: 51,
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          }}
        >
          <Dialog.Title style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            {title}
          </Dialog.Title>
          {children}
          <Dialog.Close
            aria-label="Cerrar"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: 1,
            }}
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
