import React from 'react';
import { Rubroplantillacontabledialog } from '../../../../domain/model/Rubroplantillacontabledialog';

interface RubroplantillacontabledialogCardProps {
  item: Rubroplantillacontabledialog;
  onSelect?: (item: Rubroplantillacontabledialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Rubroplantillacontabledialog) => void;
}

/**
 * Componente Card: rubroplantillaContableDialog.zul
 * Muestra un resumen individual de un Rubroplantillacontabledialog.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const RubroplantillacontabledialogCard: React.FC<RubroplantillacontabledialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`rubroplantillacontabledialog-card-${item.id}`}
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
