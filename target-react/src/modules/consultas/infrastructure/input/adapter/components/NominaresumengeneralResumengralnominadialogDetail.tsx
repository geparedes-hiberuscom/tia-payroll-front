import React from 'react';
import { NominaresumengeneralResumengralnominadialog } from '../../../../domain/model/NominaresumengeneralResumengralnominadialog';

interface NominaresumengeneralResumengralnominadialogDetailProps {
  item: NominaresumengeneralResumengralnominadialog;
  onEdit?: (item: NominaresumengeneralResumengralnominadialog) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 * Muestra todos los campos de un NominaresumengeneralResumengralnominadialog en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const NominaresumengeneralResumengralnominadialogDetail: React.FC<NominaresumengeneralResumengralnominadialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="nominaresumengeneral-resumengralnominadialog-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de nominaresumenGeneral.zul / ResumenGralNominaDialog.zul</h3>
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
