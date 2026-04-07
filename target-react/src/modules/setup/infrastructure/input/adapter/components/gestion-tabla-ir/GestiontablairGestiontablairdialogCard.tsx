import React from 'react';
import { GestiontablairGestiontablairdialog } from '../../../../domain/model/GestiontablairGestiontablairdialog';

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
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const GestiontablairGestiontablairdialogCard: React.FC<GestiontablairGestiontablairdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`gestiontablair-gestiontablairdialog-card-${item.id}`}
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
        <strong>Año {item.anio} - Nivel {item.nivel}</strong>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
          Tipo: {item.tipo} | Mín: {item.valorMinimo}
        </p>
        {item.valorMaximo && <span style={{ color: '#888' }}>Máx: {item.valorMaximo}</span>}
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
