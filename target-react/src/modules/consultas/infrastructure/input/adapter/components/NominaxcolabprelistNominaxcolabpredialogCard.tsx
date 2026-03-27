import React from 'react';
import { NominaxcolabprelistNominaxcolabpredialog } from '../../../../domain/model/NominaxcolabprelistNominaxcolabpredialog';

interface NominaxcolabprelistNominaxcolabpredialogCardProps {
  item: NominaxcolabprelistNominaxcolabpredialog;
  onSelect?: (item: NominaxcolabprelistNominaxcolabpredialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: NominaxcolabprelistNominaxcolabpredialog) => void;
}

/**
 * Componente Card: nominaxColabPreList.zul / nominaxColabPreDialog.zul
 * Muestra un resumen individual de un NominaxcolabprelistNominaxcolabpredialog.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const NominaxcolabprelistNominaxcolabpredialogCard: React.FC<NominaxcolabprelistNominaxcolabpredialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`nominaxcolabprelist-nominaxcolabpredialog-card-${item.id}`}
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
