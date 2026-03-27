import React from 'react';
import { Acumulados } from '../../../../domain/model/Acumulados';

interface AcumuladosCardProps {
  item: Acumulados;
  onSelect?: (item: Acumulados) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Acumulados) => void;
}

/**
 * Componente Card: acumulados.zul
 * Muestra un resumen individual de un Acumulados.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const AcumuladosCard: React.FC<AcumuladosCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`acumulados-card-${item.id}`}
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
