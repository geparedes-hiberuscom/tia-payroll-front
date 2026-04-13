import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { GeningproyectadosResponse } from '../../dto/GeningproyectadosDto';

interface GeningproyectadosDetailProps {
  item: GeningproyectadosResponse;
  onEdit?: (item: GeningproyectadosResponse) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: genIngProyectados.zul
 * Muestra todos los campos de un Geningproyectados en detalle.
 *
 * Copilot — Mostrar todos los campos del domain model.
 */
export const GeningproyectadosDetail: React.FC<GeningproyectadosDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="geningproyectados-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de genIngProyectados.zul</h3>
        {onBack && <UIButton variant="secondary" onClick={onBack}>← Volver</UIButton>}
      </div>

      <dl>
        <dt><strong>ID</strong></dt>
        <dd>{item.id}</dd>
        {/* Agregar todos los campos del domain model */}
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
