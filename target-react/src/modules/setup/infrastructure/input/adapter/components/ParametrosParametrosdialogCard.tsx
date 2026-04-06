import React from 'react';
import { ParametrosParametrosdialog } from '../../../../domain/model/ParametrosParametrosdialog';

interface ParametrosParametrosdialogCardProps {
  item: ParametrosParametrosdialog;
  onSelect?: (item: ParametrosParametrosdialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: ParametrosParametrosdialog) => void;
}

/**
 * Componente Card: parametros.zul / parametrosDialog.zul
 * Muestra un resumen individual de un ParametrosParametrosdialog.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const ParametrosParametrosdialogCard: React.FC<ParametrosParametrosdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`parametros-parametrosdialog-card-${item.id}`}
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
        <strong>{item.parametro}</strong>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
          {item.entorno} / {item.idParametro}
        </p>
        {item.datoCadena && <span style={{ color: '#888' }}>Texto: {item.datoCadena}</span>}
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
