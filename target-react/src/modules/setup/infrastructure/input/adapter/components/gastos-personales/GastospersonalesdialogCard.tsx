import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { Gastospersonalesdialog } from '../../../../../domain/model/Gastospersonalesdialog';

interface GastospersonalesdialogCardProps {
  item: Gastospersonalesdialog;
  onSelect?: (item: Gastospersonalesdialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Gastospersonalesdialog) => void;
}

/**
 * Componente Card: GastosPersonalesDialog.zul
 * Muestra un resumen individual de un Gastospersonalesdialog.
 *
 * Copilot — Agregar campos reales del domain model.
 */
export const GastospersonalesdialogCard: React.FC<GastospersonalesdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <button
      type="button"
      data-testid={`gastospersonalesdialog-card-${item.id}`}
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
        <strong>{item.descripcion}</strong>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
          {item.empresaNombre} ({item.empresaId}) - Año {item.anio}
        </p>
        {item.montoMaximo && <span style={{ color: '#888' }}>Monto Máx: {item.montoMaximo}</span>}
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
