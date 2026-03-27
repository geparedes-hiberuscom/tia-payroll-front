import React from 'react';
import { Dtoscompartidossubrecursos } from '../../../../domain/model/Dtoscompartidossubrecursos';

interface DtoscompartidossubrecursosDetailProps {
  item: Dtoscompartidossubrecursos;
  onEdit?: (item: Dtoscompartidossubrecursos) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: DTOs compartidos (subrecursos)
 * Muestra todos los campos de un Dtoscompartidossubrecursos en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const DtoscompartidossubrecursosDetail: React.FC<DtoscompartidossubrecursosDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="dtoscompartidossubrecursos-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de DTOs compartidos (subrecursos)</h3>
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
