import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { ReporteirinecdialogResponse } from '../../dto/ReporteirinecdialogDto';

interface ReporteirinecdialogDetailProps {
  item: ReporteirinecdialogResponse;
  onEdit?: (item: ReporteirinecdialogResponse) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: ReporteIRINECDialog.zul
 * Muestra todos los campos de un Reporteirinecdialog en detalle.
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
        {onBack && <UIButton variant="secondary" onClick={onBack}>← Volver</UIButton>}
      </div>

      <dl>
        <dt><strong>ID</strong></dt>
        <dd>{item.id}</dd>
      </dl>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {onEdit && <UIButton variant="primary" onClick={() => onEdit(item)}>Editar</UIButton>}
        {onDelete && (
          <UIButton variant="secondary" onClick={() => onDelete(item.id)}>
            Eliminar
          </UIButton>
        )}
      </div>
    </div>
  );
};
