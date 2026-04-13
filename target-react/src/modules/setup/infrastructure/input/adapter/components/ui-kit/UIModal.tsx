import React, { useEffect } from 'react';
import { uiKitColors } from '../../styles/uiKitColors';
import { uiKitSizes } from '../../styles/uiKitSizes';

interface UIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeable?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  closeIcon?: React.ReactNode;
}

export const UIModal: React.FC<UIModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeable = true,
  size = 'medium',
  className,
  closeIcon,
}) => {
  const sizeMap = {
    small: '400px',
    medium: '600px',
    large: '800px',
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeable) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeable, onClose]);

  if (!isOpen) return null;

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: `1px solid ${uiKitColors.borders.light}`,
    flexShrink: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: uiKitSizes.typography.fontSize.xl,
    fontWeight: uiKitSizes.typography.fontWeight.semibold,
    color: uiKitColors.neutral.gray900,
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: uiKitColors.neutral.gray600,
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: uiKitSizes.transition.fast,
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px',
    overflow: 'auto',
    flex: 1,
  };

  const footerStyle: React.CSSProperties = {
    padding: '16px 24px',
    borderTop: `1px solid ${uiKitColors.borders.light}`,
    backgroundColor: uiKitColors.backgrounds.light,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    flexShrink: 0,
  };

  const dialogStyle: React.CSSProperties = {
    width: '90%',
    maxWidth: sizeMap[size],
    maxHeight: '90vh',
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    border: 'none',
    borderRadius: '12px',
    padding: 0,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        dialog {
          border: none;
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
      <dialog
        className={className}
        style={dialogStyle}
        open={isOpen}
        onCancel={closeable ? onClose : undefined}
      >
        {(title || closeable) && (
          <div style={headerStyle}>
            {title && <h2 id="modal-title" style={titleStyle}>{title}</h2>}
            {closeable && (
              <button
                style={closeButtonStyle}
                onClick={onClose}
                aria-label="Cerrar modal"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = uiKitColors.neutral.gray900;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = uiKitColors.neutral.gray600;
                }}
              >
                {closeIcon || '✕'}
              </button>
            )}
          </div>
        )}
        <div style={contentStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </dialog>
    </>
  );
};
