import React from 'react';
import { Nominaresumengralxrubro } from '../../../../domain/model/Nominaresumengralxrubro';

interface NominaresumengralxrubroDetailProps {
  item: Nominaresumengralxrubro;
  onEdit?: (item: Nominaresumengralxrubro) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: nominaresumenGralxRubro.zul
 * Muestra todos los campos de un Nominaresumengralxrubro en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const NominaresumengralxrubroDetail: React.FC<NominaresumengralxrubroDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="nominaresumengralxrubro-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de nominaresumenGralxRubro.zul</h3>
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
