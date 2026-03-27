import React from 'react';
import { Dtoscompartidossubrecursos } from '../../../../domain/model/Dtoscompartidossubrecursos';

interface DtoscompartidossubrecursosCardProps {
  item: Dtoscompartidossubrecursos;
  onSelect?: (item: Dtoscompartidossubrecursos) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Dtoscompartidossubrecursos) => void;
}

/**
 * Componente Card: DTOs compartidos (subrecursos)
 * Muestra un resumen individual de un Dtoscompartidossubrecursos.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const DtoscompartidossubrecursosCard: React.FC<DtoscompartidossubrecursosCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`dtoscompartidossubrecursos-card-${item.id}`}
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
