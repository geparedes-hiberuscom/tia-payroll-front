import React from 'react';
import { Rubroplantillacontabledialog } from '../../../../domain/model/Rubroplantillacontabledialog';

interface RubroplantillacontabledialogDetailProps {
  item: Rubroplantillacontabledialog;
  onEdit?: (item: Rubroplantillacontabledialog) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: rubroplantillaContableDialog.zul
 * Muestra todos los campos de un Rubroplantillacontabledialog en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const RubroplantillacontabledialogDetail: React.FC<RubroplantillacontabledialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="rubroplantillacontabledialog-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de rubroplantillaContableDialog.zul</h3>
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
