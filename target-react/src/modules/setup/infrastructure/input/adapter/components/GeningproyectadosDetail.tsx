import React from 'react';
import { GeningproyectadosResponse } from '../dto/GeningproyectadosDto';

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
 * TODO: Copilot — Mostrar todos los campos del domain model.
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
