import React from 'react';
import { Nominaresumengralcxrubro } from '../../../../domain/model/Nominaresumengralcxrubro';

interface NominaresumengralcxrubroDetailProps {
  item: Nominaresumengralcxrubro;
  onEdit?: (item: Nominaresumengralcxrubro) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: nominaresumenGralCxRubro.zul
 * Muestra todos los campos de un Nominaresumengralcxrubro en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const NominaresumengralcxrubroDetail: React.FC<NominaresumengralcxrubroDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="nominaresumengralcxrubro-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de nominaresumenGralCxRubro.zul</h3>
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
