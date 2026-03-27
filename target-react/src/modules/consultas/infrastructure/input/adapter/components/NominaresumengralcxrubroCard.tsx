import React from 'react';
import { Nominaresumengralcxrubro } from '../../../../domain/model/Nominaresumengralcxrubro';

interface NominaresumengralcxrubroCardProps {
  item: Nominaresumengralcxrubro;
  onSelect?: (item: Nominaresumengralcxrubro) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Nominaresumengralcxrubro) => void;
}

/**
 * Componente Card: nominaresumenGralCxRubro.zul
 * Muestra un resumen individual de un Nominaresumengralcxrubro.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const NominaresumengralcxrubroCard: React.FC<NominaresumengralcxrubroCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`nominaresumengralcxrubro-card-${item.id}`}
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
