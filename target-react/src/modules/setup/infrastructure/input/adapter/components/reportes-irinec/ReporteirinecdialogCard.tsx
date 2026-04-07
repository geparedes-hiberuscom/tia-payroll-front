import React from 'react';
import { ReporteirinecdialogResponse } from '../dto/ReporteirinecdialogDto';

interface ReporteirinecdialogCardProps {
  item: ReporteirinecdialogResponse;
  onSelect?: (item: ReporteirinecdialogResponse) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: ReporteirinecdialogResponse) => void;
}

/**
 * Componente Card: ReporteIRINECDialog.zul
 * Muestra un resumen individual de un Reporteirinecdialog.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const ReporteirinecdialogCard: React.FC<ReporteirinecdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`reporteirinecdialog-card-${item.id}`}
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
