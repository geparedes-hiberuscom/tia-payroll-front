import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { Modal } from '@shared/infrastructure/input/adapter/components/Modal';

interface ParametrosDeleteConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  parametroName?: string;
}

export const ParametrosDeleteConfirmModal: React.FC<ParametrosDeleteConfirmModalProps> = ({
  open,
  onConfirm,
  onCancel,
  loading,
  parametroName,
}) => {
  return (
    <Modal open={open} setIsOpen={onCancel} title="Confirmar eliminación">
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ marginBottom: '0.5rem', color: '#333' }}>
          ¿Estás seguro de que deseas eliminar el parámetro?
        </p>
        {parametroName && (
          <p style={{ marginBottom: 0, fontWeight: 500, color: '#666' }}>
            <strong>{parametroName}</strong>
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <UIButton
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </UIButton>
        <UIButton
          variant="secondary"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
        </UIButton>
      </div>
    </Modal>
  );
};
