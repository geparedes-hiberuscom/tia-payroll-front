import React from 'react';
import { PlantillacontablePlantillacontabledialog } from '../../../../domain/model/PlantillacontablePlantillacontabledialog';

interface PlantillacontablePlantillacontabledialogDetailProps {
  item: PlantillacontablePlantillacontabledialog;
  onEdit?: (item: PlantillacontablePlantillacontabledialog) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: plantillaContable.zul / plantillaContableDialog.zul
 * Muestra todos los campos de un PlantillacontablePlantillacontabledialog en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const PlantillacontablePlantillacontabledialogDetail: React.FC<PlantillacontablePlantillacontabledialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="plantillacontable-plantillacontabledialog-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de plantillaContable.zul / plantillaContableDialog.zul</h3>
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
