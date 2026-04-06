import React from 'react';
import { ContratoplantillaContratoplantilladialog } from '../../../../domain/model/ContratoplantillaContratoplantilladialog';

interface ContratoplantillaContratoplantilladialogCardProps {
  item: ContratoplantillaContratoplantilladialog;
  onSelect?: (item: ContratoplantillaContratoplantilladialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: ContratoplantillaContratoplantilladialog) => void;
}

/**
 * Componente Card: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Muestra un resumen individual de un ContratoplantillaContratoplantilladialog.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const ContratoplantillaContratoplantilladialogCard: React.FC<ContratoplantillaContratoplantilladialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`contratoplantilla-contratoplantilladialog-card-${item.id}`}
      style={{
        padding: '1rem',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: onSelect ? 'pointer' : 'default',
      }}
      onClick={() => onSelect?.(item)}
    >
      <div>
        <strong>{item.id}</strong>
        {/* TODO: Mostrar campos del dominio */}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && (
          <button onClick={(e) => { e.stopPropagation(); onEdit(item); }}>
            Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
            style={{ color: 'red' }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
