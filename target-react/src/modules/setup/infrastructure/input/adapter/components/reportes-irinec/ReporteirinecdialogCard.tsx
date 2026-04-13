import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { ReporteirinecdialogResponse } from '../../dto/ReporteirinecdialogDto';

interface ReporteirinecdialogCardProps {
  item: ReporteirinecdialogResponse;
  onSelect?: (item: ReporteirinecdialogResponse) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: ReporteirinecdialogResponse) => void;
}

/**
 * Componente Card: ReporteIRINECDialog.zul
 * Muestra un resumen individual de un Reporteirinecdialog.
 */
export const ReporteirinecdialogCard: React.FC<ReporteirinecdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <button
      type="button"
      data-testid={`reporteirinecdialog-card-${item.id}`}
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
