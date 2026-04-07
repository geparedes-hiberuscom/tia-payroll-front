import React from 'react';
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
        <button
          onClick={onCancel}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#8A9BA8',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6C5C51',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </Modal>
  );
};
