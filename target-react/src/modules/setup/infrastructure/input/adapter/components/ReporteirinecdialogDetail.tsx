import React from 'react';
import { ReporteirinecdialogResponse } from '../dto/ReporteirinecdialogDto';

interface ReporteirinecdialogDetailProps {
  item: ReporteirinecdialogResponse;
  onEdit?: (item: ReporteirinecdialogResponse) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: ReporteIRINECDialog.zul
 * Muestra todos los campos de un Reporteirinecdialog en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const ReporteirinecdialogDetail: React.FC<ReporteirinecdialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="reporteirinecdialog-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de ReporteIRINECDialog.zul</h3>
        {onBack && <button onClick={onBack}>← Volver</button>}
      </div>

      <dl>
        <dt><strong>ID</strong></dt>
        <dd>{item.id}</dd>
        {/* TODO: Agregar todos los campos del domain model */}
      </dl>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {onEdit && <button onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && (
          <button onClick={() => onDelete(item.id)} style={{ color: 'red' }}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
