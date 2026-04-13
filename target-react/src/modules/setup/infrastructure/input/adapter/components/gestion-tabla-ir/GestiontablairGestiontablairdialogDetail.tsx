import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { GestiontablairGestiontablairdialog } from '../../../../../domain/model/GestiontablairGestiontablairdialog';

interface GestiontablairGestiontablairdialogDetailProps {
  item: GestiontablairGestiontablairdialog;
  onEdit?: (item: GestiontablairGestiontablairdialog) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Muestra todos los campos de un GestiontablairGestiontablairdialog en detalle.
 *
 * Copilot — Mostrar todos los campos del domain model.
 */
export const GestiontablairGestiontablairdialogDetail: React.FC<GestiontablairGestiontablairdialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="gestiontablair-gestiontablairdialog-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de gestionTablaIR.zul / gestionTablaIRDialog.zul</h3>
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
