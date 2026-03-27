import React from 'react';
import { Consueldo } from '../../../../domain/model/Consueldo';

interface ConsueldoCardProps {
  item: Consueldo;
  onSelect?: (item: Consueldo) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Consueldo) => void;
}

/**
 * Componente Card: conSueldo.zul
 * Muestra un resumen individual de un Consueldo.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const ConsueldoCard: React.FC<ConsueldoCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`consueldo-card-${item.id}`}
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
