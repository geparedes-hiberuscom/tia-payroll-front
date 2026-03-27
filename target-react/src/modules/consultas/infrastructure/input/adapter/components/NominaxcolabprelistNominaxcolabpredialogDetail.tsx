import React from 'react';
import { NominaxcolabprelistNominaxcolabpredialog } from '../../../../domain/model/NominaxcolabprelistNominaxcolabpredialog';

interface NominaxcolabprelistNominaxcolabpredialogDetailProps {
  item: NominaxcolabprelistNominaxcolabpredialog;
  onEdit?: (item: NominaxcolabprelistNominaxcolabpredialog) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: nominaxColabPreList.zul / nominaxColabPreDialog.zul
 * Muestra todos los campos de un NominaxcolabprelistNominaxcolabpredialog en detalle.
 *
 * TODO: Copilot — Mostrar todos los campos del domain model.
 */
export const NominaxcolabprelistNominaxcolabpredialogDetail: React.FC<NominaxcolabprelistNominaxcolabpredialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="nominaxcolabprelist-nominaxcolabpredialog-detail" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de nominaxColabPreList.zul / nominaxColabPreDialog.zul</h3>
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
