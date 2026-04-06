import React from 'react';
import { ParametrosParametrosdialog } from '../../../../domain/model/ParametrosParametrosdialog';

interface ParametrosParametrosdialogDetailProps {
  item: ParametrosParametrosdialog;
  onEdit?: (item: ParametrosParametrosdialog) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: parametros.zul / parametrosDialog.zul
 * Muestra todos los campos de un ParametrosParametrosdialog en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const ParametrosParametrosdialogDetail: React.FC<ParametrosParametrosdialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="parametros-parametrosdialog-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de parametros.zul / parametrosDialog.zul</h3>
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
