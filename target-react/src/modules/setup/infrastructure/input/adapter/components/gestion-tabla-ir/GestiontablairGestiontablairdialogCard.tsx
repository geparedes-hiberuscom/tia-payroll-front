import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { GestiontablairGestiontablairdialog } from '../../../../../domain/model/GestiontablairGestiontablairdialog';

interface GestiontablairGestiontablairdialogCardProps {
  item: GestiontablairGestiontablairdialog;
  onSelect?: (item: GestiontablairGestiontablairdialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: GestiontablairGestiontablairdialog) => void;
}

/**
 * Componente Card: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Muestra un resumen individual de un GestiontablairGestiontablairdialog.
 *
 * Copilot — Agregar campos reales del domain model.
 */
export const GestiontablairGestiontablairdialogCard: React.FC<GestiontablairGestiontablairdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <button
      type="button"
      data-testid={`gestiontablairgestiontablair-card-${item.id}`}
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
        <strong>Año {item.anio} - Nivel {item.nivel}</strong>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
          Tipo: {item.tipo} | Mín: {item.valorMinimo}
        </p>
        {item.valorMaximo && <span style={{ color: '#888' }}>Máx: {item.valorMaximo}</span>}
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
