import React from 'react';
import { GeningproyectadosResponse } from '../dto/GeningproyectadosDto';

interface GeningproyectadosCardProps {
  item: GeningproyectadosResponse;
  onSelect?: (item: GeningproyectadosResponse) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: GeningproyectadosResponse) => void;
}

/**
 * Componente Card: genIngProyectados.zul
 * Muestra un resumen individual de un Geningproyectados.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const GeningproyectadosCard: React.FC<GeningproyectadosCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`geningproyectados-card-${item.id}`}
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
