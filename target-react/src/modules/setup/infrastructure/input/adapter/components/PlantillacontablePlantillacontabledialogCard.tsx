import React from 'react';
import { PlantillacontablePlantillacontabledialog } from '../../../../domain/model/PlantillacontablePlantillacontabledialog';

interface PlantillacontablePlantillacontabledialogCardProps {
  item: PlantillacontablePlantillacontabledialog;
  onSelect?: (item: PlantillacontablePlantillacontabledialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: PlantillacontablePlantillacontabledialog) => void;
}

/**
 * Componente Card: plantillaContable.zul / plantillaContableDialog.zul
 * Muestra un resumen individual de un PlantillacontablePlantillacontabledialog.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const PlantillacontablePlantillacontabledialogCard: React.FC<PlantillacontablePlantillacontabledialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`plantillacontable-plantillacontabledialog-card-${item.id}`}
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
