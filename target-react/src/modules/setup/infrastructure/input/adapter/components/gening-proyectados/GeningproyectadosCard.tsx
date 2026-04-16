import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { GeningproyectadosResponse } from '../../dto/GeningproyectadosDto';

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
 *Copilot — Agregar campos reales del domain model.
 */
export const GeningproyectadosCard: React.FC<GeningproyectadosCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <button
      type="button"
      data-testid={`geningproyectados-card-${item.id}`}
      style={{
        padding: '1rem',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: onSelect ? 'pointer' : 'default',
        border: 'none',
        background: 'transparent',
        textAlign: 'left',
        width: '100%',
      }}
      onClick={() => onSelect?.(item)}
    >
      <div>
        <strong>{item.id}</strong>
        {/*Mostrar campos del dominio */}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && (
          <UIButton variant="primary" size="small" onClick={(e) => { e.stopPropagation(); onEdit(item); }}>
            Editar
          </UIButton>
        )}
        {onDelete && (
          <UIButton
            variant="secondary"
            size="small"
            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          >
            Eliminar
          </UIButton>
        )}
      </div>
    </button>
  );
};
