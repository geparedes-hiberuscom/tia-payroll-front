import React from 'react';
import { ParametrosParametrosdialogResponse } from '../../dto/ParametrosParametrosdialogDto';

interface ParametrosParametrosdialogDetailProps {
  item: ParametrosParametrosdialogResponse;
  onEdit?: (item: ParametrosParametrosdialogResponse) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: parametros.zul / parametrosDialog.zul
 * Muestra todos los campos de un ParametrosParametrosdialog en detalle.
 *
 * Copilot — Mostrar todos los campos del domain model.
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
        <dt><strong>Entorno / ID Parámetro</strong></dt>
        <dd>{item.entorno} / {item.idParametro}</dd>
        {/*Agregar todos los campos del domain model */}
      </dl>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {onEdit && <button onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && (
          <button onClick={() => onDelete(`${item.entorno}:${item.idParametro}`)} style={{ color: 'red' }}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
